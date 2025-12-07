// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    try {
      setLoading(true);
      await login(email.trim(), pass);
    } catch (e: any) {
      Alert.alert("Login failed", e.message || "Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={{ width: 120, height: 120, marginBottom: 16 }} />
      <Text style={styles.title}>TaskOrbit</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={pass} onChangeText={setPass} />
      <Button title={loading ? "Logging..." : "Login"} onPress={doLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{ marginTop: 8 }}>
        <Text style={{ color: "#fff", fontSize: 14 }}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 12 }}>
        <Text style={{ color: "#fff" }}>Don't have account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724", padding: 20, alignItems: "center", justifyContent: "center" },
  title: { color: "#fff", fontSize: 22, marginBottom: 16 },
  input: { width: "100%", backgroundColor: "#fff", padding: 12, borderRadius: 8, marginVertical: 8 }
});
