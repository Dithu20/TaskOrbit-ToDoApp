import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  /* entry animations */
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const cardSlide = useRef(new Animated.Value(40)).current;
  const cardFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(cardSlide, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(cardFade, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getPasswordStrength = () => {
    if (pass.length < 6) return "Weak";
    if (/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(pass)) return "Strong";
    return "Medium";
  };

  const doRegister = async () => {
    if (!name.trim()) return Alert.alert("Validation", "Please enter your full name.");
    if (!email.trim()) return Alert.alert("Validation", "Please enter your email.");
    if (!pass.trim()) return Alert.alert("Validation", "Please enter your password.");
    if (pass !== confirmPass) return Alert.alert("Validation", "Passwords do not match.");

    try {
      setLoading(true);
      await register(email.trim(), pass);
    } catch (e: any) {
      Alert.alert("Register failed", e?.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Social Icon URLs */
  const socialIcons = [
    "https://cdn-icons-png.flaticon.com/512/300/300221.png", // Google
    "https://cdn-icons-png.flaticon.com/512/731/731985.png", // Apple
    "https://static.vecteezy.com/system/resources/previews/021/495/960/original/facebook-logo-icon-free-png.png", // Facebook
  ];

  // animated scale values for each social icon
  const scaleAnims = useRef(socialIcons.map(() => new Animated.Value(1))).current;
  const handlePressIn = (i: number) => {
    Animated.spring(scaleAnims[i], { toValue: 0.92, useNativeDriver: true, friction: 7, tension: 80 }).start();
  };
  const handlePressOut = (i: number) => {
    Animated.spring(scaleAnims[i], { toValue: 1, useNativeDriver: true, friction: 7, tension: 80 }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#06121a" }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
          <View style={styles.headerBand} />

          <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Logo */}
            <Animated.View style={[styles.brandWrap, { transform: [{ scale: logoScale }] }]}>
              <View style={styles.logoBevel}>
                <Image source={require("../assets/logo.png")} style={styles.logoImage} />
                <View style={styles.logoGloss} />
              </View>

              <Text style={styles.brand}>TaskOrbit</Text>
              <Text style={styles.brandSub}>Create your new workspace account</Text>
            </Animated.View>

            {/* Card */}
            <Animated.View style={[styles.card, { opacity: cardFade, transform: [{ translateY: cardSlide }] }]}>
              <Text style={styles.cardTitle}>Create Account</Text>
              <Text style={styles.cardSubtitle}>Join the TaskOrbit community</Text>

              {/* Full Name */}
              <Text style={styles.fieldLabel}>Full Name</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.icon}>👤</Text>
                <TextInput placeholder="John Doe" placeholderTextColor="rgba(255,255,255,0.5)" style={styles.input} value={name} onChangeText={setName} />
              </View>

              {/* Email */}
              <Text style={styles.fieldLabel}>Email</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.icon}>✉︎</Text>
                <TextInput
                  placeholder="name@company.com"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.icon}>🔒</Text>
                <TextInput
                  placeholder="Create a password"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  secureTextEntry={!showPass}
                  style={styles.input}
                  value={pass}
                  onChangeText={setPass}
                />
                <TouchableOpacity onPress={() => setShowPass((s) => !s)} activeOpacity={0.7}>
                  <Text style={styles.showHideText}>{showPass ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>

              {/* Password Strength */}
              {pass.length > 0 && (
                <Text style={[styles.strengthText, { color: getPasswordStrength() === "Weak" ? "#ff4d4d" : getPasswordStrength() === "Medium" ? "#ffb84d" : "#4dff7a" }]}>
                  Strength: {getPasswordStrength()}
                </Text>
              )}

              {/* Confirm Password */}
              <Text style={styles.fieldLabel}>Confirm Password</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.icon}>🔒</Text>
                <TextInput
                  placeholder="Re-enter your password"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  secureTextEntry={!showConfirmPass}
                  style={styles.input}
                  value={confirmPass}
                  onChangeText={setConfirmPass}
                />
                <TouchableOpacity onPress={() => setShowConfirmPass((s) => !s)} activeOpacity={0.7}>
                  <Text style={styles.showHideText}>{showConfirmPass ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>

              {/* Register Button (glow + shadow) */}
              <View style={styles.buttonWrap}>
              
              
                <TouchableOpacity activeOpacity={0.9} onPress={doRegister} style={[styles.primaryButton, loading && { opacity: 0.7 }]}>
                  {loading ? <ActivityIndicator size="small" color="#02262a" /> : <Text style={styles.primaryButtonText}>Register</Text>}
                </TouchableOpacity>
              </View>

              {/* Already Have Account */}
              <View style={styles.rowCenter}>
                <Text style={styles.smallText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.link}> Login</Text>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social icons */}
              <View style={styles.socialRow}>
                {socialIcons.map((url, i) => (
                  <Animated.View key={i} style={[{ transform: [{ scale: scaleAnims[i] }] }]}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPressIn={() => handlePressIn(i)}
                      onPressOut={() => handlePressOut(i)}
                      onPress={() => console.log("social register", i)}
                      style={styles.socialCircle}
                    >
                      <Image source={{ uri: url }} style={styles.socialCircleIcon} />
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </Animated.View>

            <Text style={styles.footNote}>By creating an account you agree to our Terms & Privacy</Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  headerBand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 210,
    backgroundColor: "#072033",
    transform: [{ skewY: "-3deg" }],
    opacity: 0.9,
  },

  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 48,
  },

  brandWrap: { alignItems: "center", marginBottom: 20 },

  logoBevel: {
    width: 135,
    height: 135,
    borderRadius: 16,
    backgroundColor: "#08131a",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  logoImage: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    borderRadius: 12,
  },

  logoGloss: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 50,
    height: 20,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.08)",
    transform: [{ rotate: "-12deg" }],
  },

  brand: { color: "#fff", fontSize: 22, fontWeight: "800" },
  brandSub: { color: "rgba(255,255,255,0.7)", marginTop: 4, fontSize: 13 },

  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: 18,
    borderRadius: 14,
  },

  cardTitle: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  cardSubtitle: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    marginBottom: 12,
  },

  fieldLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 6,
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)", // brighter
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
    height: 48,
  },

  icon: {
    color: "rgba(255,255,255,0.85)",
    marginRight: 8,
    fontSize: 16,
    width: 22,
    textAlign: "center",
  },

  input: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },

  showHideText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    paddingHorizontal: 8,
  },

  strengthText: {
    fontSize: 12,
    marginBottom: 8,
  },

  primaryButton: {
    zIndex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    width: "86%",
    alignItems: "center",
    backgroundColor: "#06b6d4",
    shadowColor: "#06b6d4",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonWrap: {
    marginTop: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

 

  primaryButtonText: {
    color: "#02262a",
    fontWeight: "800",
    fontSize: 16,
  },

  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
  },

  smallText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
  },

  link: {
    color: "#06b6d4",
    fontSize: 13,
    fontWeight: "600",
  },

  dividerRow: { flexDirection: "row", alignItems: "center", marginTop: 16 },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  dividerText: {
    color: "rgba(255,255,255,0.5)",
    marginHorizontal: 10,
    fontSize: 12,
  },

  socialRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },

  socialCircle: {
    width: 52,
    height: 52,
    borderRadius: 52,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },

  socialCircleIcon: { width: 42, height: 42, resizeMode: "contain" },

  footNote: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 14, textAlign: "center" },
});
