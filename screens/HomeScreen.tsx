// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { subscribeUserTasks, deleteTask, updateTask } from "../services/taskService";
import { Task } from "../types";

export default function HomeScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeUserTasks(user.uid, (items) => setTasks(items));
    return () => unsub();
  }, [user]);

  const onDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteTask(id);
    } catch (e: any) {
      Alert.alert("Delete failed", e.message || "");
    }
  };

  const toggleDone = async (t: Task) => {
    if (!t.id) return;
    await updateTask(t.id, { completed: !t.completed });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <TouchableOpacity onPress={() => logout()}><Text style={{ color: "#fff" }}>Logout</Text></TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(i) => i.id!}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#fff", fontSize: 16, textDecorationLine: item.completed ? "line-through" : "none" }}>{item.title}</Text>
              {item.description ? <Text style={{ color: "#ddd" }}>{item.description}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => toggleDone(item)} style={{ marginRight: 12 }}>
              <Text style={{ color: "#fff" }}>{item.completed ? "Undo" : "Done"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item.id)}><Text style={{ color: "#ff6b6b" }}>Delete</Text></TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ color: "#aaa", marginTop: 20 }}>No tasks yet</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddTask")}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0f1724" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  title: { color: "#fff", fontSize: 22 },
  item: { flexDirection: "row", padding: 12, borderRadius: 8, backgroundColor: "#111827", marginBottom: 8, alignItems: "center" },
  fab: { position: "absolute", right: 20, bottom: 30, backgroundColor: "#5b8cff", width: 56, height: 56, borderRadius: 28, justifyContent: "center", alignItems: "center" }
});
