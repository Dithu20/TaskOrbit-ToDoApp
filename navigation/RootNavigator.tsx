import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import TaskListScreen from "../screens/TaskListScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import ItemEditorScreen from "../screens/ItemEditorScreen";
import AddTaskScreen from "../screens/AddTaskScreen";


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator id="root-stack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
      <Stack.Screen name="ItemEditorScreen" component={ItemEditorScreen} />
      <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    </Stack.Navigator>
  );
}
