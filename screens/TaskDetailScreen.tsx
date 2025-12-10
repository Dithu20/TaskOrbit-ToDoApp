
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { deleteTask } from "../services/taskService";

export default function TaskDetailScreen({ route, navigation }) {
  const taskId = route?.params?.taskId;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const load = async () => {
      const snap = await getDoc(doc(db, "tasks", taskId));
      if (snap.exists()) setTask({ id: snap.id, ...snap.data() });
      setLoading(false);
    };

    load();
  }, [taskId]);

  if (!taskId) {
    return (
      <View style={styles.error}>
        <Text style={{ color: "#fff" }}>Task ID missing!</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.error}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.error}>
        <Text style={{ color: "#fff" }}>Task not found</Text>
      </View>
    );
  }

  const deletePress = () => {
    Alert.alert("Delete", "Delete this task?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteTask(taskId);
          navigation.goBack();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>

      <Text style={styles.desc}>{task.description || "No description"}</Text>

      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>{task.category}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#4f8bff" }]}
          onPress={() => navigation.navigate("ItemEditorScreen", { taskId })}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#ff4d4d" }]}
          onPress={deletePress}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724", padding: 20 },
  error: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { color: "#fff", fontSize: 24, fontWeight: "700" },
  desc: { color: "#ccc", marginVertical: 20 },
  label: { color: "#aaa", marginTop: 10 },
  value: { color: "#fff", fontSize: 18 },
  row: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },
  btn: {
    width: "48%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});