// src/screens/HomeScreen.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  Animated,
  Platform,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { subscribeUserTasks, deleteTask, updateTask } from "../services/taskService";
import { Task } from "../types";
import DashboardCharts from "../components/Charts"; // ✅ CORRECT IMPORT
import SideMenu from "../components/SideMenu"; // ✅ CORRECT IMPORT

/**
 * HomeScreen — Neon + Dark UI (matches LoginScreen)
 */

/* ---------- Priority color helper ---------- */
const getPriorityStripeStyle = (p?: string) => {
  switch (p) {
    case "high":
      return { backgroundColor: "#ff6b6b" };
    case "medium":
      return { backgroundColor: "#f59e0b" };
    default:
      return { backgroundColor: "#10b981" };
  }
};

export default function HomeScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("all");

  // Menu drawer state
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme state
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  // Animations
  const screenFade = useRef(new Animated.Value(0)).current;
  const listFade = useRef(new Animated.Value(0)).current;

  /* Fade screen on mount */
  useEffect(() => {
    Animated.timing(screenFade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  /* Firestore task subscription */
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const unsub = subscribeUserTasks(user.uid, (items: Task[]) => {
      const sorted = items.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );

      setTasks(sorted);
      setLoading(false);

      Animated.timing(listFade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }).start();
    });

    return () => unsub();
  }, [user]);

  /* Search & filter logic */
  const q = searchQuery.toLowerCase().trim();
  const filtered = tasks.filter((t) => {
    const tabOK = activeTab === "all" ? true : t.status === activeTab;
    const searchOK =
      !q ||
      t.title.toLowerCase().includes(q) ||
      (t.description || "").toLowerCase().includes(q) ||
      (t.category || "").toLowerCase().includes(q);

    return tabOK && searchOK;
  });

  /* Toggle status */
  const handleToggle = async (t: Task) => {
    if (!t.id) return;
    const newStatus = t.status === "completed" ? "active" : "completed";

    setTasks((p) => p.map((i) => (i.id === t.id ? { ...i, status: newStatus } : i)));

    try {
      await updateTask(t.id, { status: newStatus });
    } catch {
      setTasks((p) => p.map((i) => (i.id === t.id ? { ...i, status: t.status } : i)));
      Alert.alert("Error updating task");
    }
  };

  /* Delete task */
  const handleDelete = (id?: string) => {
    if (!id) return;

    Alert.alert("Delete", "Delete this task permanently?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(id);
            setTasks((p) => p.filter((t) => t.id !== id));
          } catch {
            Alert.alert("Delete failed");
          }
        },
      },
    ]);
  };

  /* Render each task */
  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const mount = new Animated.Value(0);

    Animated.timing(mount, {
      toValue: 1,
      duration: 360,
      delay: index * 28,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View
        style={[
          styles.taskCard,
          {
            opacity: mount,
            transform: [
              { translateY: mount.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) },
            ],
          },
        ]}
      >
        <View style={[styles.neonStripe, getPriorityStripeStyle(item.priority)]} />

        <View style={styles.cardInner}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.taskTitle, item.status === "completed" && styles.completed]}>
              {item.title}
            </Text>

            {item.description ? (
              <Text style={styles.taskDesc} numberOfLines={1}>{item.description}</Text>
            ) : null}

            <View style={styles.metaRow}>
              {item.category ? <Text style={styles.category}>#{item.category}</Text> : null}

              <View style={styles.priorityPill}>
                <Text style={styles.priorityText}>{(item.priority || "low").toUpperCase()}</Text>
              </View>

              <Text style={styles.dateText}>
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
              </Text>
            </View>
          </View>

          {/* Icons */}
          <View style={styles.actionsColumn}>
            <TouchableOpacity onPress={() => handleToggle(item)}>
              <Text style={styles.icon}>{item.status === "completed" ? "↩️" : "✅"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}>
              <Text style={styles.icon}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.icon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <Animated.View style={[styles.screen, { opacity: screenFade }]}>
      {/* Header */}
      <View style={styles.headerWrap}>
        <View>
          <Text style={styles.brand}>TaskOrbit</Text>
          <Text style={styles.greeting}>Hello {user?.email?.split("@")[0]}</Text>
          <Text style={styles.sub}>Your tasks & progress</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Menu Button */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuOpen(true)}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity onPress={() => logout()} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search + Tabs */}
      <View style={styles.controls}>
        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>🔎</Text>
          <TextInput
            placeholder="Search tasks..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(["all", "active", "completed"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setActiveTab(t)}
              style={[styles.tab, activeTab === t && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Charts */}
      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <DashboardCharts items={tasks} />
      </View>

      {/* Task List */}
      <Animated.View style={{ flex: 1, opacity: listFade }}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#06b6d4" />
          </View>
        ) : filtered.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.empty}>No tasks found</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(i) => i.id!}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 18, paddingBottom: 140 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        )}
      </Animated.View>


{/* Add task */}
      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddTaskScreen")}
      >
        <View style={styles.fabInner}>
          <Text style={styles.fabPlus}>＋</Text>
        </View>
      </TouchableOpacity>

      {/* Side Menu */}
      <SideMenu 
      isOpen={menuOpen}
      onClose={() => setMenuOpen(false)}
      user={user}
      navigate={(screenName: string) => navigation.navigate(screenName)}
    />

    </Animated.View>
  );
}

/* ------------ STYLES ------------ */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#06121a" },

  headerWrap: {
    paddingTop: Platform.OS === "ios" ? 56 : 28,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  brand: { color: "#fff", fontSize: 20, fontWeight: "800" },
  greeting: { color: "#fff", fontSize: 16, marginTop: 6, fontWeight: "700" },
  sub: { color: "rgba(255,255,255,0.6)", marginTop: 4, fontSize: 12 },

  /* Menu Button */
  menuButton: {
    marginRight: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  menuIcon: { color: "#06b6d4", fontSize: 20, fontWeight: "900" },

  logoutBtn: {
    backgroundColor: "#06b6d4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  logoutText: { color: "#02262a", fontWeight: "800" },

  controls: { paddingHorizontal: 20, paddingBottom: 12 },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 48,
  },
  inputIcon: { color: "#fff", marginRight: 8, fontSize: 16 },
  input: { flex: 1, color: "#fff", fontSize: 15 },

  tabRow: { flexDirection: "row", marginTop: 12 },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.03)",
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: "#06b6d4",
  },
  tabText: { color: "rgba(255,255,255,0.7)", fontWeight: "700", textTransform: "capitalize" },
  tabTextActive: { color: "#02262a" },

  /* Task Card */
  taskCard: {
    flexDirection: "row",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },

  neonStripe: { width: 6 },

  cardInner: { flex: 1, padding: 12, flexDirection: "row" },

  taskTitle: { color: "#fff", fontSize: 15, fontWeight: "800" },
  completed: { color: "rgba(255,255,255,0.4)", textDecorationLine: "line-through" },
  taskDesc: { color: "rgba(255,255,255,0.6)", marginTop: 6 },

  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  category: {
    color: "rgba(255,255,255,0.7)",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    fontWeight: "700",
  },

  priorityPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  priorityText: { color: "#fff", fontWeight: "700", fontSize: 11 },

  dateText: { marginLeft: "auto", color: "rgba(255,255,255,0.5)" },

  actionsColumn: { marginLeft: 10, justifyContent: "space-between", alignItems: "center" },
  icon: { fontSize: 20 },

  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { color: "rgba(255,255,255,0.6)" },

  /* FAB */
  fab: {
    position: "absolute",
    right: 20,
    bottom: 34,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  fabInner: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(6,182,212,0.12)",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  fabPlus: { fontSize: 34, fontWeight: "900", color: "#06b6d4" },
});