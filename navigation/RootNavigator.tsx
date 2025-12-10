import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import ItemEditorScreen from "../screens/ItemEditorScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  useEffect(() => {
    console.log("🚀 RootNavigator - Initializing navigation stack");
    console.log("📋 RootNavigator - Registered screens:");
    console.log("   ✅ Login");
    console.log("   ✅ Register");
    console.log("   ✅ ForgotPassword");
    console.log("   ✅ Home");
    console.log("   ✅ AddTask");
    console.log("   ✅ TaskDetail");
    console.log("   ✅ ItemEditorScreen");
  }, []);

  return (
    <Stack.Navigator id="root-stack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="ItemEditorScreen" component={ItemEditorScreen} />
    </Stack.Navigator>
  );
}
