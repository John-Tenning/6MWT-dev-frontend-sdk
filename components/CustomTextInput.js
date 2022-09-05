import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const CustomTextInput = ({ valueState, placeholder }) => {
  const [value, setValue] = valueState;

  return (
    <TextInput
      value={value}
      onChangeText={(text) => setValue(text)}
      placeholderTextColor="grey"
      placeholder={placeholder}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f3f2f8",
    padding: 16,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    width: "100%",
    marginVertical: 8,
    fontSize: 16,
    fontFamily: "Poppins",
    color: "black",
  },
});

export default CustomTextInput;
