// src/services/taskService.ts
import { collection, addDoc, doc, deleteDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import { Task } from "../types";

const tasksCol = collection(db, "tasks");

export const addTask = async (task: Omit<Task, "id" | "createdAt">) => {
  const now = new Date();
  const docRef = await addDoc(tasksCol, { ...task, createdAt: now.toISOString() });
  return docRef.id;
};

export const updateTask = async (taskId: string, data: Partial<Task>) => {
  const docRef = doc(db, "tasks", taskId);
  await updateDoc(docRef, data);
};

export const deleteTask = async (taskId: string) => {
  await deleteDoc(doc(db, "tasks", taskId));
};

export const subscribeUserTasks = (userId: string, cb: (tasks: Task[]) => void) => {
  const q = query(tasksCol, where("ownerId", "==", userId));
  return onSnapshot(q, (snap) => {
    const items: Task[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
    cb(items);
  });
};
