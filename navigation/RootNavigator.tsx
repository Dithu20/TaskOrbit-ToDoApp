import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import ItemEditorScreen from "../screens/ItemEditorScreen";
import SettingScreen from "../screens/SettingScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useAuth();

  // Show nothing until Firebase checks auth state
  if (loading) return null;

  return (
    <Stack.Navigator id="root" screenOptions={{ headerShown: false }}>
      {user ? (
        // 🔥 USER LOGGED IN → SHOW APP SCREENS
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          <Stack.Screen name="ItemEditor" component={ItemEditorScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </>
      ) : (
        // 🔥 USER LOGGED OUT → SHOW LOGIN/REGISTER
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
