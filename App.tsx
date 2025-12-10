// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/AuthContext";
// import RootNavigator from "./navigation/RootNavigator"; 
import { StatusBar } from "react-native";
import RootNavigator from "./navigation/RootNavigator";
import TaskDetailScreen from "./screens/TaskDetailScreen";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
