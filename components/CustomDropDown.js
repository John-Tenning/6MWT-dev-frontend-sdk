import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const CustomDropDown = ({
  valueState = [],
  options = [],
  placeholder = [],
  isHalf = false,
  mode = 0,
}) => {
  const [value, setValue] = valueState;
  const [isFocus, setIsFocus] = useState(false);

  const styles = StyleSheet.create({
    input: {
      backgroundColor: mode == 0 ? "#f3f2f8" : "#3b7197",
      padding: 16,
      borderColor: "#fff",
      borderWidth: 1,
      borderRadius: 16,
      width: isHalf ? "48%" : "100%",
      marginVertical: 8,
      marginLeft: isHalf ? 8 : 0,
      fontSize: 16,
      color: mode == 0 ? "black" : "white",
    },
    dropdown: {
      borderColor: "#fff",
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 16,
      width: isHalf ? "49%" : "100%",
      marginLeft: 6,
      marginVertical: 16,
    },
    dropdownItems: {
      borderColor: "#fff",
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: 16,
      width: isHalf ? "46%" : "92%",
      marginVertical: 3,
      backgroundColor: "#fff",
    },
    placeholderStyle: {
      color: mode == 0 ? "grey" : "#f3f2f8",
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: mode == 0 ? "grey" : "#f3f2f8",
    },
  });

  return (
    <Dropdown
      style={styles.input}
      containerStyle={styles.dropdownItems}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={options}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder : "..."}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
    />
    // <View>
    //   <Text>Hey</Text>
    // </View>
  );
};

export default CustomDropDown;
