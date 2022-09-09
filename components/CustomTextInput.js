import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const CustomTextInput = ({
  valueState,
  placeholder,
  mode = 0,
  isHalf = false,
  isSecure = false,
}) => {
  const [value, setValue] = valueState;

  const styles = StyleSheet.create({
    input: {
      backgroundColor: mode == 0 ? "#f3f2f860" : "#3b7197",
      padding: 16,
      borderColor: mode == 0 ? "#f3f2f800" : "#f3f2f8",
      borderWidth: 1,
      borderRadius: 16,
      width: isHalf ? "48%" : "100%",
      marginVertical: 8,
      marginLeft: isHalf ? 8 : 0,
      fontSize: 16,
      color: mode == 0 ? "black" : "white",
    },
  });

  return (
    <TextInput
      value={value}
      onChangeText={(text) => setValue(text)}
      placeholderTextColor={mode == 0 ? "black" : "#f3f2f8"}
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={isSecure}
    />
  );
};

export default CustomTextInput;
