// src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const doRegister = async () => {
    try {
      setLoading(true);
      await register(email.trim(), pass);
    } catch (e: any) {
      Alert.alert("Register failed", e.message || "Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={pass} onChangeText={setPass} />
      <Button title={loading ? "Creating..." : "Register"} onPress={doRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724", padding: 20, alignItems: "center", justifyContent: "center" },
  title: { color: "#fff", fontSize: 22, marginBottom: 16 },
  input: { width: "100%", backgroundColor: "#fff", padding: 12, borderRadius: 8, marginVertical: 8 }
});
