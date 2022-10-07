import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";

const image2 = {
  uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png",
};
const image = require("../assets/bgGradient4.png");

const TestScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.wrapper}>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.heading}>Health Record</Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                console.log("Report Generated");
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.buttonText}>Generate Report</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default TestScreen;

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
    color: "#2A2A2A",
    width: "100%",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2A2A2A",
    width: "100%",
  },
  subtext: {
    color: "#2A2A2A",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 16,
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
  imageProp: {
    width: 60,
    height: 60,
    marginVertical: 8,
  },
  rowFlex: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 12,
    backgroundColor: "rgba(240, 240, 240, 0.38)",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowColor: "rgba(255, 255, 255, 0.1)",
    shadowOpacity: 0.25,
    elevation: 3,

    // backdrop-filter: blur(25px);
  },
  colFlex: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 48,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    minHeight: "100%",
  },
});
