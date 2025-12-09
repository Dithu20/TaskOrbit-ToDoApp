import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CategoryScreen({ navigation }) {
  const categories = [
    { name: "personal", label: "Personal" },
    { name: "work", label: "Work" },
    { name: "home", label: "Home" },
    { name: "important", label: "Important" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Category</Text>

      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.name}
          style={styles.btn}
          onPress={() =>
            navigation.navigate("TaskListScreen", { category: cat.name })
          }
        >
          <Text style={styles.btnText}>{cat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f1724" },
  title: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 20 },
  btn: {
    backgroundColor: "#1e293b",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontSize: 18 },
});
