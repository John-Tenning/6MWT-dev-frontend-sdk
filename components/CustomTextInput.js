import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const CustomTextInput = ({
  valueState,
  errorState,
  placeholder,
  mode = 0,
  isHalf = false,
  isSecure = false,
  capitalize = true,
  number = false,
  passw = false,
}) => {
  const [value, setValue] = valueState;
  const [error, setError] = errorState;

  const styles = StyleSheet.create({
    input: {
      backgroundColor: mode == 0 ? "#f3f2f860" : "#f3f2f860",
      padding: 16,
      borderColor: error ? "#FA0000" : "#f3f2f800",
      borderWidth: 1,
      borderRadius: 16,
      width: passw ? "80%" : isHalf ? "48%" : "100%",
      marginVertical: 8,
      marginLeft: isHalf ? 8 : 0,
      fontSize: mode == 0 ? 16 : 18,
      color: mode == 0 ? "black" : "black",
      minHeight: mode == 0 ? 48 : 64,
    },
  });

  return (
    <TextInput
      value={value}
      onChangeText={(text) => {
        setError(false);
        setValue(text);
      }}
      placeholderTextColor={mode == 0 ? "#2A2A2A" : "#2A2A2A"}
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={isSecure}
      autoCapitalize={capitalize ? "sentences" : "none"}
      keyboardType={number ? "numeric" : "default"}
    />
  );
};

export default CustomTextInput;
