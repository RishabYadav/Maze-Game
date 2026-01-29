import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({
  title,
  onPress,
  disabled = false,
  style,
  variant = "primary",
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondary;
      case "success":
        return styles.success;
      case "danger":
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primary: {
    backgroundColor: "#2196F3",
  },
  secondary: {
    backgroundColor: "#757575",
  },
  success: {
    backgroundColor: "#4CAF50",
  },
  danger: {
    backgroundColor: "#f44336",
  },
  disabled: {
    backgroundColor: "#cccccc",
    elevation: 0,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledText: {
    color: "#999999",
  },
});

export default Button;
