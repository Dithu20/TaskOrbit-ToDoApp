// src/components/SideMenu.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { getAvatarInitials, getUsernameFromEmail } from "../utils/helpers";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  navigate: (screen: string) => void;
}

export default function SideMenu({
  isOpen,
  onClose,
  user,
  navigate,
}: SideMenuProps) {
  const { mode, toggleTheme } = useTheme();
  const username = getUsernameFromEmail(user?.email || "");

  const slideAnim = useRef(new Animated.Value(-300)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 260, useNativeDriver: true }),
        Animated.timing(backdropAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: -300, duration: 220, useNativeDriver: true }),
        Animated.timing(backdropAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      ]).start();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = () => {
    onClose();
    navigate("Login");
  };

  const bg = mode === "dark" ? "#0B0F14" : "#FFFFFF";
  const text = mode === "dark" ? "#E2E8F0" : "#1E293B";
  const sub = mode === "dark" ? "#94A3B8" : "#64748B";

  return (
    <>
      {/* BACKDROP */}
      <Animated.View style={[styles.backdrop, { opacity: backdropAnim }]}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* DRAWER */}
      <Animated.View
        style={[
          styles.drawer,
          { backgroundColor: bg, transform: [{ translateX: slideAnim }] },
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatarBox}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatarImg} />
            ) : (
              <Text style={styles.avatarInitials}>{getAvatarInitials(username)}</Text>
            )}
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={{ fontSize: 22, color: sub }}>✖</Text>
          </TouchableOpacity>

          <Text style={[styles.username, { color: text }]}>{username}</Text>
          <Text style={[styles.email, { color: sub }]}>{user?.email}</Text>
        </View>

        {/* MENU */}
        <View style={styles.menu}>
          <MenuItem
            icon="📊"
            label="Dashboard"
            color={text}
            onPress={() => {
              navigate("Home");
              onClose();
            }}
          />

          <MenuItem
            icon="📝"
            label="My Tasks"
            color={text}
            onPress={() => {
              navigate("Home");
              onClose();
            }}
          />

          <MenuItem
            icon="⚙️"
            label="Settings"
            color={text}
            onPress={() => {
              navigate("Settings"); // ← Correct name
              onClose();
            }}
          />

          {/* DIVIDER */}
          <View style={styles.divider} />

          {/* THEME TOGGLE */}
          <TouchableOpacity style={styles.themeRow} onPress={toggleTheme}>
            <Text style={{ fontSize: 22 }}>{mode === "dark" ? "🌙" : "🌞"}</Text>
            <Text style={[styles.themeLabel, { color: text }]}>Dark Mode</Text>

            <View style={[styles.switchOuter, mode === "dark" && styles.switchOuterActive]}>
              <Animated.View
                style={[styles.switchKnob, mode === "dark" && styles.switchKnobActive]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={{ fontSize: 20, color: "#ef4444" }}>🚪</Text>
            <Text style={styles.logoutLabel}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const MenuItem = ({
  icon,
  label,
  onPress,
  color,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  color: string;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={{ fontSize: 20 }}>{icon}</Text>
    <Text style={[styles.menuText, { color }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 280,
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 10,
  },

  /* HEADER */
  header: { marginBottom: 24 },
  avatarBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: { color: "#38bdf8", fontSize: 26, fontWeight: "800" },
  avatarImg: { width: 70, height: 70, borderRadius: 35 },
  closeBtn: { position: "absolute", right: 0, top: 0 },
  username: { fontSize: 18, fontWeight: "800", marginTop: 12 },
  email: { fontSize: 12 },

  /* MENU */
  menu: { marginTop: 10 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  menuText: { marginLeft: 14, fontSize: 16, fontWeight: "600" },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 20,
  },

  /* THEME */
  themeRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  themeLabel: { marginLeft: 10, fontSize: 15, fontWeight: "600" },
  switchOuter: {
    width: 40,
    height: 22,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginLeft: "auto",
    justifyContent: "center",
    padding: 2,
  },
  switchOuterActive: { backgroundColor: "#38bdf8" },
  switchKnob: {
    width: 18,
    height: 18,
    backgroundColor: "#fff",
    borderRadius: 9,
  },
  switchKnobActive: { transform: [{ translateX: 18 }] },

  /* FOOTER */
  footer: { marginTop: "auto", paddingBottom: 20 },
  logoutBtn: { flexDirection: "row", alignItems: "center" },
  logoutLabel: { color: "#ef4444", marginLeft: 10, fontSize: 15, fontWeight: "700" },
});
