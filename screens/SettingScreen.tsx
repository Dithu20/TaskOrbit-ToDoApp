// src/screens/SettingScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function SettingScreen() {
  const { logout } = useAuth();
  const { mode, toggleTheme } = useTheme();

  const bg = mode === "dark" ? "#0f1724" : "#FFFFFF";
  const text = mode === "dark" ? "#FFFFFF" : "#0f1724";
  const sub = mode === "dark" ? "#94a3b8" : "#64748B";

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.header, { color: text }]}>Settings</Text>

      <View style={styles.section}>
        <Text style={[styles.label, { color: sub }]}>Theme:</Text>

        <TouchableOpacity style={styles.themeBtn} onPress={toggleTheme}>
          <Text style={[styles.themeBtnText, { color: text }]}>
            {mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22 },
  header: { fontSize: 26, fontWeight: "800", marginBottom: 20 },

  section: { marginBottom: 30 },
  label: { fontSize: 16, marginBottom: 8 },

  themeBtn: {
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
  },
  themeBtnText: { fontSize: 16 },

  logoutBtn: {
    padding: 14,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
