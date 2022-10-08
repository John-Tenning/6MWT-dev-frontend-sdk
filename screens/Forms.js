import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomTextInput from "../components/CustomTextInput";
import CustomDropDown from "../components/CustomDropDown";
import { authentication, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import { ref, onValue, push, update, remove, set } from 'firebase/database';

const image2 = {
  uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png",
};
const image = require("../assets/bgGradient4.png");

const Forms = ({ navigation }) => {
  const [patientID, setPatientID] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [hadDiagnosis, setHadDiagnosis] = useState(null);
  const [diagOpt, setDiagOpt] = useState("");
  const [diagOptOptionValues, setDiagOptOptionValues] = useState([
    { label: "Choose an option", value: "" },
  ]);

  const [errorPID, setErrorPID] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorAge, setErrorAge] = useState(false);
  const [errorGender, setErrorGender] = useState(false);
  const [errorWeight, setErrorWeight] = useState(false);
  const [errorHeight, setErrorHeight] = useState(false);
  const [errorDiagnosis, setErrorDiagnosis] = useState(false);
  const [errorHadDiagnosis, setErrorHadDiagnosis] = useState(false);
  const [errorDiagOpt, setErrorDiagOpt] = useState(false);

  var detailsNotNull = true;
  var count = 0;

  useEffect(() => {
    hadDiagnosis === "yes"
      ? (setDiagOptOptionValues([
        { label: "Post CABG Patients and HF", value: "CABG" },
        { label: "NYHA Class II-III HF", value: "NYHA" },
        { label: "Advanced Symptomatic HF", value: "ADV" },
        { label: "Elderly and Clinical", value: "EC" },
      ]),
        setDiagOpt(""))
      : hadDiagnosis === "no"
        ? (setDiagOptOptionValues([
          { label: "Young to Middle Age", value: "YMA" },
          { label: "Middle age - Seniority", value: "MAS" },
          { label: "Elderly", value: "ELD" },
        ]),
          setDiagOpt(""))
        : setDiagOptOptionValues([{ label: "Medical Diagnosis", value: "" }]);
  }, [hadDiagnosis]);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const diagnosisOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const handleSignOut = () => {
    signOut(authentication)
      .then(() => {
        alert("Sign Out Successful");
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error);
      })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <ScrollView style={styles.container}>
          {/* <LinearGradient colors={["#ffffff", "#C1C1C1"]} style={{ flex: 1, minHeight: "100%" }}> */}
          <View style={styles.wrapper}>
            <Text style={styles.heading}>Patient Details</Text>
            <Text style={styles.subtext}>Enter the required details</Text>
            <CustomTextInput
              mode={1}
              valueState={[patientID, setPatientID]}
              errorState={[errorPID, setErrorPID]}
              placeholder="Patient ID"
            />
            <CustomTextInput
              mode={1}
              valueState={[name, setName]}
              errorState={[errorName, setErrorName]}
              placeholder="Name"
            />
            <View style={styles.align}>
              <CustomTextInput
                mode={1}
                valueState={[age, setAge]}
                errorState={[errorAge, setErrorAge]}
                placeholder="Age"
                isHalf
                number={true}
              />
              <CustomDropDown
                placeholder={"Gender"}
                options={genderOptions}
                valueState={[gender, setGender]}
                errorState={[errorGender, setErrorGender]}
                isHalf
                mode={1}
              />
            </View>
            <View style={styles.align}>
              <CustomTextInput
                mode={1}
                valueState={[weight, setWeight]}
                errorState={[errorWeight, setErrorWeight]}
                placeholder="Weight"
                isHalf
                number={true}
              />
              <CustomTextInput
                mode={1}
                valueState={[height, setHeight]}
                errorState={[errorHeight, setErrorHeight]}
                placeholder="Height"
                isHalf
                number={true}
              />
            </View>
            <View>
              <CustomTextInput
                mode={1}
                valueState={[diagnosis, setDiagnosis]}
                errorState={[errorDiagnosis, setErrorDiagnosis]}
                placeholder="Diagnosis"
              />
            </View>
            <CustomDropDown
              placeholder={"Had medical diagnosis ?"}
              options={diagnosisOptions}
              valueState={[hadDiagnosis, setHadDiagnosis]}
              errorState={[errorHadDiagnosis, setErrorHadDiagnosis]}
              mode={1}
            />
            <CustomDropDown
              placeholder={"Medical Diagnosis"}
              options={diagOptOptionValues}
              valueState={[diagOpt, setDiagOpt]}
              errorState={[errorDiagOpt, setErrorDiagOpt]}
              mode={1}
            />
            <Pressable
              style={styles.button}
              onPress={() => {
                count = 0;

                patientID.length <= 0
                  ? (setErrorPID(true), count++)
                  : setErrorPID(false);
                name.length <= 0
                  ? (setErrorName(true), count++)
                  : setErrorName(false);
                isNaN(+age) || age === null
                  ? (setErrorAge(true), count++)
                  : setErrorAge(false);
                gender === null
                  ? (setErrorGender(true), count++)
                  : setErrorGender(false);
                isNaN(+weight) || weight === null
                  ? (setErrorWeight(true), count++)
                  : setErrorWeight(false);
                isNaN(+height) || height === null
                  ? (setErrorHeight(true), count++)
                  : setErrorHeight(false);
                diagnosis.length <= 0
                  ? (setErrorDiagnosis(true), count++)
                  : setErrorDiagnosis(false);
                hadDiagnosis === null
                  ? (setErrorHadDiagnosis(true), count++)
                  : setErrorHadDiagnosis(false);
                diagOpt.length <= 0
                  ? (setErrorDiagOpt(true), count++)
                  : setErrorDiagOpt(false);

                if (count > 0) {
                  detailsNotNull = false;
                  Alert.alert("Enter Valid Details");
                } else {
                  detailsNotNull = true;
                }

                if (detailsNotNull) {
                  console.log("Patient ID: " + patientID);
                  console.log("Name: " + name);
                  console.log("Age: " + age);
                  console.log(`Gender: ${gender}`);
                  console.log("Weight: " + weight);
                  console.log("Height: " + height);
                  console.log("BMI: " + (weight / (height * height)) * 10000);
                  console.log("Diagnosis: " + diagnosis);
                  console.log(`Had Medical Diagnosis: ${hadDiagnosis}`);
                  console.log("Medical Diagnosis: " + diagOpt);
                  // ToastAndroid.show("Submit Successful", ToastAndroid.SHORT);

                  set(ref(db, '/Details/' + patientID), {
                    PatientID: patientID,
                    Name: name,
                    Age: age,
                    Gender: gender,
                    Weight: weight,
                    Height: height,
                    BMI: (weight / (height * height)) * 10000,
                    DiagnosisDescription: diagnosis,
                    HadDiagnosis: hadDiagnosis,
                    DiagnosisOption: diagOpt
                  })

                  update(ref(db, '/Device_Status/P01'), {
                    CPID: patientID,
                  })

                  navigation.replace("Timer");
                }
              }}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={handleSignOut}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </Pressable>

          </View>
          {/* </LinearGradient> */}
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Forms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    minHeight: "100%",
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
    color: "#2A2A2A",
    width: "100%",
  },
  subtext: {
    color: "#2A2A2A",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
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
