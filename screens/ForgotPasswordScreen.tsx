import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import Button from "../components/Button";

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert(
        "Success",
        "A password reset link has been sent to your email."
      );
      console.log("Password reset email sent");

      // 🔥 FIX: SAFE BACK NAVIGATION
      if (
        navigation &&
        typeof navigation.canGoBack === "function" &&
        navigation.canGoBack()
      ) {
        navigation.goBack();
      } else {
        navigation.navigate("Login");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to send reset link");
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <Button title="Send Reset Link" onPress={resetPassword} />

      {/* 🔥 FIX: BACK BUTTON ALSO SAFE */}
      <TouchableOpacity
        onPress={() => {
          if (
            navigation &&
            typeof navigation.canGoBack === "function" &&
            navigation.canGoBack()
          ) {
            navigation.goBack();
          } else {
            navigation.navigate("Login");
          }
        }}
      >
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06121a",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 15,
  },
  backText: {
    color: "#06b6d4",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
});
