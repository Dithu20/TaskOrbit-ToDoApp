import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Alert, Text } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import Button from "../components/Button";
import { db } from "../services/firebase";
import { updateTask } from "../services/taskService";

export default function ItemEditorScreen({ route, navigation }: any) {
  const { taskId } = route.params || {};

  const [task, setTask] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (!taskId) return;

    (async () => {
      const snap = await getDoc(doc(db, "tasks", taskId));
      if (snap.exists()) {
        const data = snap.data();
        setTask(data);
        setTitle(data.title);
        setDesc(data.description || "");
      }
    })();
  }, [taskId]);

  const save = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    try {
      await updateTask(taskId, {
        title: title.trim(),
        description: desc.trim(),
      });
      Alert.alert("Updated", "Task updated successfully!");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Update failed");
    }
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Loading task...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        style={[styles.input, { height: 120 }]}
        multiline
      />

      <Button title="Save Changes" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f1724" },
  input: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});
