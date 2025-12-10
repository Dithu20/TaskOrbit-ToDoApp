// src/screens/AddTaskScreen.tsx
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import { addTask } from "../services/taskService";
import { useAuth } from "../contexts/AuthContext";

export default function AddTaskScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useAuth();

  const save = async () => {
    if (!title.trim()) { Alert.alert("Title required"); return; }
    try {
      if (!user) throw new Error("Not logged in");
      await addTask({ title: title.trim(), description: desc.trim(), ownerId: user.uid, status: "active" });
      navigation.goBack();
    } catch (e: any) {
      Alert.alert("Error", e.message || "Try again");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Description" style={[styles.input, { height: 120 }]} value={desc} onChangeText={setDesc} multiline />
      <Button title="Save" onPress={save} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0f1724" },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 12 }
});
