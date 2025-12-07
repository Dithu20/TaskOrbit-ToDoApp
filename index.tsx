import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
// import TaskDetailScreen from "./screens/TaskDetailScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import SettingScreen from "./screens/SettingScreen";
import ItemEditorScreen from "./screens/ItemEditorScreen";

import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";

// ------ Types ------
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddTask: undefined;
  TaskDetail: { taskId: string } | undefined;
  ForgotPassword: undefined;
  SettingScreen: undefined;
  ItemEditorScreen: undefined;
};

// ------ Navigator ------
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator id="root-stack" screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            {/* <Stack.Screen name="TaskDetail" component={TaskDetailScreen} /> */}
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="ItemEditorScreen" component={ItemEditorScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
