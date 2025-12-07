import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function SettingScreen() {
  const { logout } = useAuth();

  const doLogout = async () => {
    try {
      await logout();
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to logout");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.label}>App Name:</Text>
        <Text style={styles.value}>TaskOrbit</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Version:</Text>
        <Text style={styles.value}>1.0.0</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={doLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f1724" },
  header: { color: "#fff", fontSize: 24, marginBottom: 20 },
  section: { marginBottom: 20 },
  label: { color: "#bbb", fontSize: 16 },
  value: { color: "#fff", fontSize: 18, marginTop: 4 },
  logoutBtn: {
    backgroundColor: "#ff4d4d",
    padding: 14,
    borderRadius: 10,
    marginTop: 40,
    alignItems: "center"
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "700" }
});
