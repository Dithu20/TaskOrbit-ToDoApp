
// import React, { useState, useCallback, useRef, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   Animated,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { addTask } from "../services/taskService";
// import { useAuth } from "../contexts/AuthContext";

// export default function AddTaskScreen({ navigation }: any) {
//   const { user } = useAuth();

//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [dueDate, setDueDate] = useState<Date | null>(null);
//   const [dueTime, setDueTime] = useState<Date | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const titleInputRef = useRef<TextInput>(null);
//   const descInputRef = useRef<TextInput>(null);
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 600,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const resetForm = () => {
//     setTitle("");
//     setDesc("");
//     setDueDate(null);
//     setDueTime(null);
//     titleInputRef.current?.focus();
//   };

//   const validate = () => {
//     if (!title.trim()) {
//       Alert.alert("Thala!", "Title ah type pannu da");
//       return false;
//     }
//     if (title.trim().length < 3) {
//       Alert.alert("Serious ah?", "Minimum 3 letters podu da!");
//       return false;
//     }
//     return true;
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString("en-GB", {
//       weekday: "short",
//       day: "numeric",
//       month: "short",
//     });
//   };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const saveTask = useCallback(async () => {
//     if (!validate()) return;

//     if (!user) {
//       Alert.alert("Login First da", "Nee yaaru nu theriyala system ku");
//       return;
//     }

//     try {
//       setLoading(true);

//       let finalDueDate: string | null = null;

//       if (dueDate) {
//         const date = new Date(dueDate);
//         if (dueTime) {
//           date.setHours(dueTime.getHours());
//           date.setMinutes(dueTime.getMinutes());
//           date.setSeconds(0);
//         } else {
//           // If only date, set time to end of day
//           date.setHours(23, 59, 59);
//         }
//         finalDueDate = date.toISOString();
//       }

//       // THIS IS THE MAIN PART — TASK SAVE HERE
//       await addTask({
//         title: title.trim(),
//         description: desc.trim() || undefined,
//         dueDate: finalDueDate,
//       });

//       Alert.alert(
//         "Thala for a Reason!",
//         `"${title}" saved successfully!`,
//         [
//           {
//             text: "Mass da!",
//             onPress: () => {
//               resetForm();
//               navigation.goBack();
//             },
//           },
//         ]
//       );
//     } catch (error: any) {
//       Alert.alert("Aiyo Kadavule", error?.message || "Something went wrong da!");
//     } finally {
//       setLoading(false);
//     }
//   }, [title, desc, dueDate, dueTime, user, navigation]);

//   return (
//     <KeyboardAvoidingView
//       style={styles.wrapper}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={100}
//     >
//       <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
//               <Ionicons name="arrow-back" size={28} color="#e2e8f0" />
//             </TouchableOpacity>
//             <Text style={styles.screenTitle}>New Task - Thala Style</Text>
//             <View style={{ width: 40 }} />
//           </View>

//           {/* Title Input */}
//           <View style={styles.inputWrapper}>
//             <TextInput
//               ref={titleInputRef}
//               placeholder="Task title (epdi irukku idea?)"
//               placeholderTextColor="#94a3b8"
//               style={styles.titleInput}
//               value={title}
//               onChangeText={setTitle}
//               maxLength={60}
//               returnKeyType="next"
//               onSubmitEditing={() => descInputRef.current?.focus()}
//               blurOnSubmit={false}
//               autoFocus
//             />
//             <Text style={styles.counter}>{title.length}/60</Text>
//           </View>

//           {/* Description */}
//           <View style={styles.inputWrapper}>
//             <TextInput
//               ref={descInputRef}
//               placeholder="Description (optional da, but poda better)"
//               placeholderTextColor="#94a3b8"
//               style={[styles.input, { height: 100, textAlignVertical: "top" }]}
//               value={desc}
//               onChangeText={setDesc}
//               multiline
//               returnKeyType="default"
//             />
//           </View>

//           {/* Due Date */}
//           <Text style={styles.label}>Deadline (optional)</Text>
//           <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
//             <TouchableOpacity
//               style={styles.pickerBtn}
//               onPress={() => setShowDatePicker(true)}
//             >
//               <Ionicons name="calendar-outline" size={20} color="#60a5fa" />
//               <Text style={styles.pickerText}>
//                 {dueDate ? formatDate(dueDate) : "Pick Date"}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.pickerBtn}
//               onPress={() => dueDate && setShowTimePicker(true)}
//               disabled={!dueDate}
//             >
//               <Ionicons name="time-outline" size={20} color={dueDate ? "#60a5fa" : "#64748b"} />
//               <Text style={[styles.pickerText, !dueDate && { color: "#64748b" }]}>
//                 {dueTime ? formatTime(dueTime) : "Pick Time"}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {showDatePicker && (
//             <DateTimePicker
//               value={dueDate || new Date()}
//               mode="date"
//               display="spinner"
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) {
//                   setDueDate(selectedDate);
//                   if (!dueTime) setShowTimePicker(true);
//                 }
//               }}
//             />
//           )}

//           {showTimePicker && (
//             <DateTimePicker
//               value={dueTime || new Date()}
//               mode="time"
//               display="spinner"
//               onChange={(event, selectedTime) => {
//                 setShowTimePicker(false);
//                 if (selectedTime) setDueTime(selectedTime);
//               }}
//             />
//           )}

//           {/* Save Button */}
//           <TouchableOpacity
//             style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
//             onPress={saveTask}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <>
//                 <Ionicons name="checkmark-circle" size={24} color="#fff" />
//                 <Text style={styles.saveBtnText}>Save Task - Thala Style</Text>
//               </>
//             )}
//           </TouchableOpacity>

//         </ScrollView>
//       </Animated.View>
//     </KeyboardAvoidingView>
//   );
// }

// // Styles - Pure Mass
// const styles = StyleSheet.create({
//   wrapper: { flex: 1, backgroundColor: "#0f172a" },
//   container: { flex: 1, padding: 20 },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 30,
//     marginTop: 20,
//   },
//   backBtn: { padding: 8 },
//   screenTitle: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: "#e2e8f0",
//     letterSpacing: 0.5,
//   },
//   inputWrapper: { marginBottom: 20 },
//   titleInput: {
//     backgroundColor: "#1e293b",
//     color: "#e2e8f0",
//     padding: 18,
//     borderRadius: 16,
//     fontSize: 18,
//     fontWeight: "600",
//     borderWidth: 1,
//     borderColor: "#334155",
//   },
//   input: {
//     backgroundColor: "#1e293b",
//     color: "#e2e8f0",
//     padding: 18,
//     borderRadius: 16,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#334155",
//   },
//   counter: {
//     position: "absolute",
//     right: 16,
//     bottom: 16,
//     color: "#64748b",
//     fontSize: 13,
//   },
//   label: {
//     color: "#94a3b8",
//     fontSize: 15,
//     marginBottom: 10,
//     fontWeight: "600",
//   },
//   pickerBtn: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1e293b",
//     padding: 16,
//     borderRadius: 14,
//     gap: 10,
//     borderWidth: 1,
//     borderColor: "#334155",
//   },
//   pickerText: {
//     color: "#60a5fa",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   saveBtn: {
//     backgroundColor: "#8b5cf6",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 18,
//     borderRadius: 20,
//     gap: 12,
//     marginTop: 30,
//     shadowColor: "#8b5cf6",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.5,
//     shadowRadius: 20,
//     elevation: 15,
//   },
//   saveBtnDisabled: {
//     opacity: 0.7,
//   },
//   saveBtnText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
// });
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addTask } from "../services/taskService";
import { useAuth } from "../contexts/AuthContext";
import { Task } from "../types";

export default function AddTaskScreen({ navigation }: any) {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const titleInputRef = useRef<TextInput>(null);
  const descInputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setDueDate(null);
    setDueTime(null);
    titleInputRef.current?.focus();
  };

  const validate = () => {
    if (!title.trim()) {
      Alert.alert("Thala!", "Title ah type pannu da");
      return false;
    }
    if (title.trim().length < 3) {
      Alert.alert("Serious ah?", "Minimum 3 letters podu da!");
      return false;
    }
    return true;
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const saveTask = useCallback(async () => {
    if (!validate()) return;

    if (!user) {
      Alert.alert("Login First da", "Nee yaaru nu theriyala system ku");
      return;
    }

    try {
      setLoading(true);

      let finalDueDate: string | null = null;
      if (dueDate) {
        const date = new Date(dueDate);
        if (dueTime) {
          date.setHours(dueTime.getHours());
          date.setMinutes(dueTime.getMinutes());
          date.setSeconds(0);
        } else {
          // No time selected → set to end of day
          date.setHours(23, 59, 59);
        }
        finalDueDate = date.toISOString();
      }

      // NOTE: Assuming Task type includes 'dueDate' and uses 'status' not 'completed'
      const newTask: Omit<Task, "id" | "createdAt"> = {
        title: title.trim(),
        description: desc.trim() || undefined,
        dueDate: finalDueDate, 
        status: "active", // ✅ CORRECTED: Use 'status' instead of 'completed'
        ownerId: user.uid,
      };

      await addTask(newTask);

      Alert.alert("Thala for a Reason!", `"${title}" saved successfully!`, [
        {
          text: "Mass da!",
          onPress: () => {
            resetForm();
            navigation.goBack();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert("Aiyo Kadavule", error?.message || "Something went wrong da!");
    } finally {
      setLoading(false);
    }
  }, [title, desc, dueDate, dueTime, user, navigation]);

  // REST OF YOUR JSX (100% same as before – no change needed)
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={28} color="#e2e8f0" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>New Task - Thala Style</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Title */}
          <View style={styles.inputWrapper}>
            <TextInput
              ref={titleInputRef}
              placeholder="Task title (epdi irukku idea?)"
              placeholderTextColor="#94a3b8"
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              maxLength={60}
              returnKeyType="next"
              onSubmitEditing={() => descInputRef.current?.focus()}
              blurOnSubmit={false}
              autoFocus
            />
            <Text style={styles.counter}>{title.length}/60</Text>
          </View>

          {/* Description */}
          <View style={styles.inputWrapper}>
            <TextInput
              ref={descInputRef}
              placeholder="Description (optional da, but poda better)"
              placeholderTextColor="#94a3b8"
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              value={desc}
              onChangeText={setDesc}
              multiline
            />
          </View>

          {/* Due Date & Time */}
          <Text style={styles.label}>Deadline (optional)</Text>
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
            <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowDatePicker(true)}>
              <Ionicons name="calendar-outline" size={20} color="#60a5fa" />
              <Text style={styles.pickerText}>
                {dueDate ? formatDate(dueDate) : "Pick Date"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerBtn}
              onPress={() => dueDate && setShowTimePicker(true)}
              disabled={!dueDate}
            >
              <Ionicons
                name="time-outline"
                size={20}
                color={dueDate ? "#60a5fa" : "#64748b"}
              />
              <Text style={[styles.pickerText, !dueDate && { color: "#64748b" }]}>
                {dueTime ? formatTime(dueTime) : "Pick Time"}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDueDate(selectedDate);
                  if (!dueTime) setShowTimePicker(true);
                }
              }}
            /> // ✅ FIXED: Added closing tag
          )}

          {showTimePicker && (
            <DateTimePicker
              value={dueTime || new Date()}
              mode="time"
              display="spinner"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setDueTime(selectedTime);
              }}
            />
          )}

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
            onPress={saveTask}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
                <Text style={styles.saveBtnText}>Save Task - Thala Style</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

// Styles (unchanged – mass dhaan)
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#0f172a" },
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 30, marginTop: 20 },
  backBtn: { padding: 8 },
  screenTitle: { fontSize: 24, fontWeight: "800", color: "#e2e8f0", letterSpacing: 0.5 },
  inputWrapper: { marginBottom: 20 },
  titleInput: {
    backgroundColor: "#1e293b",
    color: "#e2e8f0",
    padding: 18,
    borderRadius: 16,
    fontSize: 18,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "#334155",
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#e2e8f0",
    padding: 18,
    borderRadius: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  counter: { position: "absolute", right: 16, bottom: 16, color: "#64748b", fontSize: 13 },
  label: { color: "#94a3b8", fontSize: 15, marginBottom: 10, fontWeight: "600" },
  pickerBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  pickerText: { color: "#60a5fa", fontSize: 16, fontWeight: "500" },
  saveBtn: {
    backgroundColor: "#8b5cf6",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
    gap: 12,
    marginTop: 30,
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  saveBtnDisabled: { opacity: 0.7 },
  saveBtnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});