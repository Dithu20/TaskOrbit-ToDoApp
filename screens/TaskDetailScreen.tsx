import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { deleteTask } from "../services/taskService";

export default function TaskDetailScreen({ route, navigation }: any) {
  const { taskId } = route.params || {};
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const loadTask = async () => {
      try {
        const snap = await getDoc(doc(db, "tasks", taskId));
        if (snap.exists()) {
          setTask({ id: snap.id, ...(snap.data() as any) });
        }
      } catch (e: any) {
        Alert.alert("Error", e.message);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskId]);

  const onDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTask(taskId);
              Alert.alert("Deleted", "Task has been removed.");
              navigation.goBack();
            } catch (err: any) {
              Alert.alert("Error", err.message || "Delete failed");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Task not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>

      {task.description ? (
        <Text style={styles.description}>{task.description}</Text>
      ) : (
        <Text style={styles.noDescription}>No description added</Text>
      )}

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.status}>
        {task.completed ? "Completed ✓" : "Pending ⏳"}
      </Text>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#4f8bff" }]}
          onPress={() => navigation.navigate("ItemEditorScreen", { taskId })}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#ff4d4d" }]}
          onPress={onDelete}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724", padding: 20 },
  title: { color: "#fff", fontSize: 24, marginBottom: 10, fontWeight: "700" },
  description: { color: "#ddd", fontSize: 16, marginBottom: 20 },
  noDescription: { color: "#777", fontSize: 16, marginBottom: 20, fontStyle: "italic" },
  label: { color: "#aaa", fontSize: 14, marginTop: 10 },
  status: { color: "#fff", fontSize: 18, marginTop: 4 },
  btnRow: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },
  btn: {
    padding: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
