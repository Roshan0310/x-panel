import { Colors } from "@/theme/color";
import React from "react";
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface SocialButtonProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function SocialButton({
  title,
  icon,
  onPress,
  style,
}: SocialButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.social, style]}
    >
      {icon}

      <Text style={styles.textSocial}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  primary: {
    backgroundColor: Colors.primary,
  },

  outline: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },

  social: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  disabled: {
    opacity: 0.55,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },

  textPrimary: {
    color: Colors.white,
  },

  textOutline: {
    color: Colors.textPrimary,
  },

  textSocial: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});
