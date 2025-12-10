// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/AuthContext";
// import RootNavigator from "./navigation/RootNavigator"; 
import { StatusBar } from "react-native";
import RootNavigator from "./navigation/RootNavigator";
import TaskDetailScreen from "./screens/TaskDetailScreen";
import CategoryScreen from "./screens/CategoryScreen";
import TaskListScreen from "./screens/TaskListScreen";
import SettingScreen from "./screens/SettingScreen";
import AddTaskScreen from "./screens/AddTaskScreen";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <RootNavigator />

        
      </NavigationContainer>
    </AuthProvider>
  );
}
