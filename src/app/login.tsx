import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "@/components/button/Button";
import SocialButton from "@/components/button/SocialButton";
import Input from "@/components/input/Input";
import PasswordInput from "@/components/input/PasswordInput";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/theme/color";

import LogoImage from "@/assets/images/android-icon-foreground.png";
import { LoginFormData, loginSchema } from "@/validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitting(true);
    const result = await login(data.email, data.password, rememberMe);
    setSubmitting(false);

    if (result.success) {
      router.replace("/(tabs)/dashboard");
    } else {
      Alert.alert("Login Failed", result.error ?? "Something went wrong.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoBox}>
          <Image source={LogoImage} style={styles.logoImage} />
        </View>

        <Text style={styles.appName}>X Dashboard</Text>
        <Text style={styles.subtitle}>
          Welcome back! Please login{"\n"}to continue
        </Text>

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              placeholder="Enter your email"
              leftIcon="mail-outline"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              leftIcon="lock-closed-outline"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setRememberMe((p) => !p)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && (
                <Ionicons name="checkmark" size={12} color={Colors.white} />
              )}
            </View>
            <Text style={styles.rememberText}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Alert.alert("Forgot Password", "Reset link sent!")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          loading={submitting}
          style={styles.loginBtn}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <SocialButton
            title="Google"
            onPress={() => Alert.alert("Google Sign-In", "Coming soon")}
            icon={<Text style={styles.googleG}>G</Text>}
            style={{ marginRight: 8 }}
          />
          <SocialButton
            title="Apple"
            onPress={() => Alert.alert("Apple Sign-In", "Coming soon")}
            icon={
              <Ionicons
                name="logo-apple"
                size={20}
                color={Colors.textPrimary}
              />
            }
          />
        </View>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don&apos;t have an account? </Text>
          <TouchableOpacity
            onPress={() => Alert.alert("Sign Up", "coming soon")}
          >
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rememberText: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  forgotText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  loginBtn: {
    marginBottom: 20,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 13,
    color: Colors.textMuted,
  },
  socialRow: {
    flexDirection: "row",
    marginBottom: 32,
  },
  googleG: {
    fontSize: 17,
    fontWeight: "700",
    color: "#4285F4",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  signupLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
});
