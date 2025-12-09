// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/AuthContext";
// import RootNavigator from "./navigation/RootNavigator"; 
import { StatusBar } from "react-native";
import RootNavigator from "./navigation/RootNavigator";
import TaskDetailScreen from "./screens/TaskDetailScreen";

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
