import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomTextInput from "../components/CustomTextInput";
import CustomDropDown from "../components/CustomDropDown";

const Forms = ({ navigation }) => {
  const [diagnosis, setDiagnosis] = useState(null);
  const [gender, setGender] = useState(null);
  const [patientID, setPatientID] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [diag, setDiag] = useState("");
  const [diagOpt, setDiagOpt] = useState("");
  const [diagOptOptionValues, setDiagOptOptionValues] = useState([
    { label: "Yes", value: "yes" },
  ]);

  useEffect(() => {
    diagnosis === "yes"
      ? setDiagOptOptionValues([
        { label: "Post CABG Patients and HF", value: "Post" },
        { label: "NYHA Class II-III HF", value: "NYHA"},
        { label: "Advanced Symptomatic HF", value: "Adv"},
        { label: "Elderly and Clinical", value: "EnC"}
      ])
      : diagnosis === "no"
      ? setDiagOptOptionValues([
          { label: "Young to Middle Age", value: "YMA" },
          { label: "Middle age - Seniority", value: "MAS" },
          { label: "Elderly", value: "Eld" },
        ])
      : setDiagOptOptionValues([]);
  }, [diagnosis]);

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
      <LinearGradient colors={["#ffffff", "#C1C1C1"]} style={{flex: 1, minHeight: "100%"}}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.heading}>Patient Details</Text>
            <Text style={styles.subtext}>Enter the required details</Text>
            <CustomTextInput
              mode={1}
              valueState={[patientID, setPatientID]}
              placeholder="Patient ID"
            />
            <View style={styles.align}>
              <CustomTextInput
                mode={1}
                valueState={[age, setAge]}
                placeholder="Age"
                isHalf
              />
              <CustomDropDown
                placeholder={"Gender"}
                options={genderOptions}
                valueState={[gender, setGender]}
                isHalf
                mode={1}
              />
            </View>
            <View style={styles.align}>
              <CustomTextInput
                mode={1}
                valueState={[weight, setWeight]}
                placeholder="Weight"
                isHalf
              />
              <CustomTextInput
                mode={1}
                valueState={[height, setHeight]}
                placeholder="Height"
                isHalf
              />
            </View>
            <View>
              <CustomTextInput
                mode={1}
                valueState={[bmi, setBmi]}
                placeholder="BMI"
              />
              <CustomTextInput
                mode={1}
                valueState={[diag, setDiag]}
                placeholder="Diagnosis"
              />
            </View>
            <CustomDropDown
              placeholder={"Had medical diagnosis ?"}
              options={diagnosisOptions}
              valueState={[diagnosis, setDiagnosis]}
              mode={1}
            />
            <CustomDropDown
              placeholder={"Medical Diagnosis"}
              options={diagOptOptionValues}
              valueState={[diagOpt, setDiagOpt]}
              mode={1}
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
              console.log(`Medical Diagnosis: ${diagnosis}`);
              console.log("Diagnosis: " + diagOpt);
              // ToastAndroid.show("Submit Successful", ToastAndroid.SHORT);
              navigation.navigate("Timer");
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Forms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: "space-between",
    display: "flex",
    height: "100%",
  },
  heading: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3b7197",
    width: "100%",
  },
  subtext: {
    color: "#3b7197",
    fontSize: 16,
    marginTop: 4,
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

    color: "#fff",
  },
  button: {
    width: "100%",
    height: 64,
    backgroundColor: "#a1e1fa",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 8,
    borderRadius: 20,
    elevation: 5,
    marginTop: 20,
    shadowColor: "#3b7197",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.11,
  },
  buttonText: {
    fontSize: 20,
    color: "#3b7197",
    fontWeight: "600",
  },
  align: {
    display: "flex",
    flexDirection: "row",
    marginLeft: -8,
  },
  right: {
    marginLeft: 8,
  },
});
