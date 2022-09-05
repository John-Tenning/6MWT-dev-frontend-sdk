import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dropdown } from "react-native-element-dropdown";
import { useFonts } from "expo-font";
import CustomTextInput from "../components/CustomTextInput";

const Forms = ({ navigation }) => {
  const [diagnosis, setDiagnosis] = useState(null);
  const [gender, setGender] = useState(null);
  const [patientID, setPatientID] = useState("");
  const [name, setname] = useState("");
  const [age, setage] = useState(null);
  const [weight, setweight] = useState(null);
  const [height, setheight] = useState(null);
  const [bmi, setbmi] = useState(null);
  const [diag, setdiag] = useState("");

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const diagnosisOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.heading}>Forms</Text>
          <Text style={styles.subtext}>Login to use the app.</Text>
          <CustomTextInput valueState={[patientID, setPatientID]} placeholder="Patient ID"/>
          <View style={styles.align}>
            <TextInput
              value={age}
              onChangeText={(text) => setage(text)}
              placeholderTextColor="grey"
              placeholder="Age"
              style={[styles.input, { width: "49%", marginRight: 3 }]}
            />
            <CustomDropdown
              placeholder={"Gender"}
              options={genderOptions}
              valueState={[gender, setGender]}
            />
          </View>
          <View style={styles.align}>
            <TextInput
              value={weight}
              onChangeText={(text) => setweight(text)}
              placeholderTextColor="grey"
              placeholder="Weight"
              style={[styles.input, { width: "49%", marginRight: 8 }]}
            />
            <TextInput
              value={height}
              onChangeText={(text) => setheight(text)}
              placeholderTextColor="grey"
              placeholder="Height"
              style={[styles.input, { width: "49%" }]}
            />
          </View>
          <View>
            <TextInput
              value={bmi}
              onChangeText={(text) => setbmi(text)}
              placeholderTextColor="grey"
              placeholder="BMI"
              style={styles.input}
            />
            <TextInput
              value={diag}
              onChangeText={(text) => setdiag(text)}
              placeholderTextColor="grey"
              placeholder="Diagnosis"
              style={styles.input}
            />
          </View>
          <CustomDropdown
            isBig
            placeholder={"Medical Diagnosis"}
            options={diagnosisOptions}
            valueState={[diagnosis, setDiagnosis]}
          />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log("Patient ID: " + patientID);
            console.log("Name: " + name);
            console.log("Age: " + age);
            console.log(`Gender: ${gender}`);
            console.log("Weight: " + weight);
            console.log("Height: " + height);
            console.log("BMI: " + bmi);
            console.log("Diagnosis: " + diag);
            console.log(`Medical Diagnosis: ${diagnosis}`);
            // ToastAndroid.show("Submit Successful", ToastAndroid.SHORT);
            navigation.navigate("Timer");
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Forms;

const CustomDropdown = ({
  valueState = [],
  options,
  placeholder,
  isBig = false,
}) => {
  const [value, setValue] = valueState;
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={isBig ? styles.dropdownBig : styles.dropdown}
      containerStyle={isBig ? styles.dropdownItemsBig : styles.dropdownItems}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 64,
    justifyContent: "space-between",
    display: "flex",
    height: "100%",
  },
  heading: {
    fontSize: 48,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#fff",
    width: "100%",
  },
  subtext: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins",
    marginTop: 8,
    marginBottom: 32,
  },
  input: {
    padding: 16,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    width: "100%",
    marginVertical: 16,
    fontSize: 20,
    fontFamily: "Poppins",
    color: "#fff",
  },
  button: {
    width: "100%",
    height: 64,
    backgroundColor: "#E6F5FC",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 8,
    borderRadius: 20,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Poppins",
    color: "#2A2A2A",
    fontWeight: "bold",
  },
  align: {
    display: "flex",
    flexDirection: "row",
    // marginLeft: 16,
  },
  right: {
    marginLeft: 8,
  },

  dropdown: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    width: "49%",
    marginLeft: 6,
    marginVertical: 16,
  },
  dropdownItems: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    width: "46%",
    marginVertical: 3,
    backgroundColor: "#fff",
  },
  dropdownBig: {
    height: 60,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    width: "100%",
    marginVertical: 16,
  },
  dropdownItemsBig: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    width: "100%",
    marginVertical: 3,
    backgroundColor: "#fff",
  },
  placeholderStyle: {
    color: "grey",
    fontSize: 20,
  },
  selectedTextStyle: {
    fontSize: 20,
    color: "#fff",
  },
});
