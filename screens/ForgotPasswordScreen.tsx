import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import Button from "../components/Button";

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Email is required");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert("Success", "Password reset link sent to your email.");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to send reset email");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        value={email}
        onChangeText={(t) => setEmail(t)}
      />

      <Button title="Send Reset Link" onPress={resetPassword} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
        <Text style={{ color: "#fff" }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724", padding: 20, justifyContent: "center" },
  title: { color: "#fff", fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 12 }
});
