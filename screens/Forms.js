import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  Picker,
  ScrollView,
} from "react-native";
import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";

const Forms = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.heading}>Forms</Text>
          <Text style={styles.subtext}>Login to use the app.</Text>
          <TextInput placeholder="Patient Id" style={styles.input} />
          <TextInput placeholder="Name" style={styles.input} />
          <View style={styles.align}>
            <TextInput placeholder="Age" style={styles.input} />
            <Picker style={[styles.picker, styles.right]}>
              <Picker.Item
                label="Select"
                value="Select"
                style={styles.pikitem}
              />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          <View style={styles.align}>
            <TextInput placeholder="Weight" style={styles.input} />
            <TextInput
              placeholder="Height"
              style={[styles.input, styles.right]}
            />
          </View>
          <View>
            <TextInput placeholder="BMI" style={styles.input} />
            <TextInput placeholder="Diagnosis" style={styles.input} />
          </View>
          <Picker style={styles.picker}>
            <Picker.Item label="Medical Diagnosis" value="Medical Diagnosis" style={styles.pikitem} />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log("sdfgiusdhki");
            // ToastAndroid.show("Submit Successful", ToastAndroid.SHORT);
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Forms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    overflow: "hidden",
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
    marginTop : 20,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Poppins",
    color: "#2A2A2A",
    fontWeight: "bold",
  },
  picker: {
    marginVertical: 16,
    width: 360,
    height: 64,
    padding: 12,
    borderWidth: 1,
    borderColor: "white",
    color: "#fff",
    borderRadius: 16,
    backgroundColor: "#2A2A2A",

    fontSize: 20,
    fontFamily: "Poppins",
  },
  align: {
    display: "flex",
    flexDirection: "row",
    // marginLeft: 16,
  },
  right: {

    marginLeft: 16,
  },
});
