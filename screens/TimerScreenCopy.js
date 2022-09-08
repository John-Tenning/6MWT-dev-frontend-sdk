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
} from "react-native";
import React, { useState } from "react";
// Reference: https://openbase.com/js/react-native-countdown-circle-timer
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { LinearGradient } from "expo-linear-gradient";

const TimerScreenCopy = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#ffffff", "#C1C1C1"]} style={{ flex: 1, minHeight: "100%" }}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.heading}>Timer</Text>
            <Text style={styles.subtext}>Timer Screen</Text>
          </View>

          <View style={[{ marginVertical: 20 }]}>
            <CustomTimer dur={60} timerName={"First"} />
          </View>

          <View style={[{ marginVertical: 20 }]}>
            <CustomTimer dur={120} timerName={"Second"} />
          </View>

          <View style={[{ marginVertical: 20 }]}>
            <CustomTimer dur={180} timerName={"Third"} />
          </View>

          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("Timer");
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default TimerScreenCopy;

const CustomTimer = ({ dur, timerName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <View style={styles.timer}>
      <View>
        <Text style={styles.timerNameText}>{timerName} Timer</Text>
        <View style={styles.timerButtons}>
          <Pressable
            style={styles.smallButton}
            onPress={
              isPlaying === false
                ? () => setIsPlaying(true)
                : () => setIsPlaying(false)
            }
          >
            <Text style={styles.smallButtonText}>
              {isPlaying === false ? "Play" : "Pause"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.smallButton}
            onPress={() => {
              setKey((prevKey) => prevKey + 1);
              setIsPlaying(false);
              console.log("Reset");
            }}
          >
            <Text style={styles.smallButtonText}>Reset</Text>
          </Pressable>
        </View>
      </View>

      <CountdownCircleTimer
        size={128}
        isPlaying={isPlaying}
        key={key}
        duration={dur}
        colors={["#1FD655", "#D9FF4E", "#FF6C25", "#FF0017"]}
        colorsTime={[dur, dur * (2 / 3), dur * (1 / 3), 0]}
        onComplete={() => {
          setKey((prevKey) => prevKey + 1);
          setIsPlaying(false);
          console.log("Done");
          Alert.alert(timerName + " Timer Complete");
        }}
      >
        {({ remainingTime }) => (
          <View style={styles.timerText}>
            <Text style={{ fontSize: 32 }}>{remainingTime}</Text>
          </View>
        )}
      </CountdownCircleTimer>
    </View>
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
    fontWeight: "bold",
    color: "#3b7197",
    width: "100%",
  },
  subtext: {
    color: "#3b7197",
    fontSize: 14,
    marginTop: 8,
    marginBottom: 32,
    marginLeft: 8,
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
    marginTop: 32,
    shadowColor: "#3b7197",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.11,
  },
  smallButton: {
    width: "32%",
    backgroundColor: "#E6F5FC",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#3b7197",
    fontWeight: "600",
  },
  smallButtonText: {
    fontSize: 14,
    color: "#3b7197",
    fontWeight: "400",
  },
  timer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  timerButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  timerNameText: {
    color: "#3b7197",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 32,
    marginLeft: 8,
  },
  timerText: {
    alignItems: "center",
    color: "#000",
  },
});
