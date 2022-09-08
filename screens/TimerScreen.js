import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  Button,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
// Reference: https://openbase.com/js/react-native-countdown-circle-timer
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

const image2 = { uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png" };
const image = require('../assets/bgGradient4.png');

const TimerScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* <LinearGradient
        colors={["#a1e1fa", "#3b7197"]}
        style={{ flex: 1, minHeight: "100%" }}
      > */}
        <View style={styles.wrapper}>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.heading}>Timer</Text>
            <Text style={styles.subtext}>Timer Screen</Text>
          </View>

          <View>
            <CustomTimer dur={60} timerName={"First"} />
          </View>

          <View>
            <CustomTimer dur={120} timerName={"Second"} />
          </View>

          <View>
            <CustomTimer dur={180} timerName={"Third"} />
          </View>

          <Pressable
            style={styles.nextButton}
            onPress={() => {
              navigation.navigate("Health");
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </View>
        {/* </LinearGradient> */}
      </ImageBackground>
    </ScrollView>
  );
};

export default TimerScreen;

const CustomTimer = ({ dur, timerName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <View style={styles.timerContainer}>
      <View
        // colors={["#a1e1fa", "#3b7197"]}
        style={styles.timerRowFlex}
      >
        <CountdownCircleTimer
          size={96}
          isPlaying={isPlaying}
          key={key}
          duration={dur}
          colors={["#2A2A2A", "#2A2A2A", "#2A2A2A", "#2A2A2A"]}
          colorsTime={[dur, dur * (2 / 3), dur * (1 / 3), 0]}
          strokeWidth={6}
          onComplete={() => {
            // return { shouldRepeat: true, delay: 1.5 }
            setKey((prevKey) => prevKey + 1);
            setIsPlaying(false);
            console.log("Done");
            Alert.alert(timerName + " Timer Complete");
          }}
        >
          {({ remainingTime, color }) => (
            <View>
              <Text style={{ color, fontSize: 28, fontWeight: "600" }}>{remainingTime}</Text>
            </View>
          )}
        </CountdownCircleTimer>
        <View style={styles.textControl}>
          <Text style={styles.timerNameText}>{timerName} Timer</Text>
          <View style={styles.timerButtons}>
            <Pressable
              style={styles.iconButton}
              onPress={
                isPlaying === false
                  ? () => setIsPlaying(true)
                  : () => setIsPlaying(false)
              }
            >
              {isPlaying === false ? (
                <Entypo name="controller-play" size={36} color={"#2A2A2A"} />
              ) : (
                <Entypo name="controller-paus" size={32} color={"#2A2A2A"} />
              )}
            </Pressable>
            <Pressable
              style={styles.iconButton}
              onPress={() => {
                setKey((prevKey) => prevKey + 1);
                setIsPlaying(false);
                console.log("Reset");
              }}
            >
              <Entypo name="cw" size={32} color={"#2A2A2A"} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%"
  },
  image: {
    flex: 1,
    justifyContent: "center",
    minHeight: "100%",
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 48,
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
    marginBottom: 16,
    marginLeft: 4,
  },
  nextButton: {
    width: "100%",
    height: 64,
    backgroundColor: "#a1e1fa",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 8,
    borderRadius: 20,
    elevation: 5,
    marginTop: 36,
    shadowColor: "#3b7197",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.11,
  },
  nextButtonText: {
    fontSize: 20,
    color: "#3b7197",
    fontWeight: "600",
  },
  timerButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -16,
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 10,
  },
  timerContainer: {
    borderRadius: 16,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowColor: "rgba(255, 255, 255, 0.1)",
    shadowOpacity: 0.25,
    elevation: 3,
  },
  textControl: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  timerRowFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "rgba(240, 240, 240, 0.38)",
    borderRadius: 16,
  },
  timerNameText: {
    fontWeight: "600",
    color: "#2A2A2A",
    fontSize: 24,
    marginBottom: 4,
  },
});
