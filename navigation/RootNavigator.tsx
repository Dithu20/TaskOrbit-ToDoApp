import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import ItemEditorScreen from "../screens/ItemEditorScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import SettingScreen from "../screens/SettingScreen";
// import ProfileScreen from "../screens/ProfileScreen";

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
      {/* <Stack.Screen name="profile" component={ProfileScreen} /> */}

      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
      <Stack.Screen name="ItemEditorScreen" component={ItemEditorScreen} />
    </Stack.Navigator>
  );
}
