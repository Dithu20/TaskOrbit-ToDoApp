import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export default function TaskListScreen({ route, navigation }) {
  const category = route?.params?.category;

  if (!category) {
    return (
      <View style={styles.errorView}>
        <Text style={{ color: "#fff" }}>No category selected!</Text>
      </View>
    );
  }

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("category", "==", category));

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTasks(list);
    });

    return unsub;
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.toUpperCase()} TASKS</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskBox}
            onPress={() =>
              navigation.navigate("TaskDetailScreen", { taskId: item.id })
            }
          >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDesc}>{item.description || "No description"}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724", padding: 20 },
  errorView: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 15 },
  taskBox: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  taskTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  taskDesc: { color: "#aaa", marginTop: 5 },
});
