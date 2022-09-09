import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
// Reference: https://openbase.com/js/react-native-countdown-circle-timer
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

const TimerScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={["#a1e1fa", "#3b7197"]}
        style={{ flex: 1, minHeight: "100%" }}
      >
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.heading}>Timer</Text>
            <Text style={styles.subtext}>Timer Screen</Text>
          </View>

          <View style={[{ marginVertical: 10 }]}>
            <CustomTimer dur={60} timerName={"First"} />
          </View>

          <View style={[{ marginVertical: 10 }]}>
            <CustomTimer dur={120} timerName={"Second"} />
          </View>

          <View style={[{ marginVertical: 10 }]}>
            <CustomTimer dur={180} timerName={"Third"} />
          </View>

          <Pressable
            style={styles.button}
            onPress={() => {
              console.log("Timer Screen");
              //   navigation.navigate("Forms");
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </LinearGradient>
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
        style={styles.timer}
      >
        <CountdownCircleTimer
          size={96}
          isPlaying={isPlaying}
          key={key}
          duration={dur}
          colors={["#3b7197", "#3b7197"]}
          colorsTime={[dur, dur * (2 / 3), dur * (1 / 3), 0]}
          strokeWidth={8}
          onComplete={() => {
            // return { shouldRepeat: true, delay: 1.5 }
            setKey((prevKey) => prevKey + 1);
            setIsPlaying(false);
            console.log("Done");
            Alert.alert(timerName + " Timer Complete");
          }}
        >
          {({ remainingTime, color }) => (
            <View style={styles.timerText}>
              <Text style={{ color, fontSize: 28 }}>{remainingTime}</Text>
            </View>
          )}
        </CountdownCircleTimer>
        <View style={styles.textControl}>
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
              {isPlaying === false ? (
                <Entypo name="controller-play" size={36} color={"#3b7197"} />
              ) : (
                <Entypo name="controller-paus" size={36} color={"#3b7197"} />
              )}
            </Pressable>
            <Pressable
              style={styles.smallButton}
              onPress={() => {
                setKey((prevKey) => prevKey + 1);
                setIsPlaying(false);
                console.log("Reset");
              }}
            >
              <Entypo name="cw" size={36} color={"#3b7197"} />
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
    color: "#326789",
    width: "100%",
  },
  subtext: {
    fontSize: 14,
    color: "#326789",
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
  },
  smallButton: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: 10,
    borderRadius: 20,
    // elevation: 5,
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#3b7197",
    fontWeight: "600",
  },
  smallButtonText: {
    fontSize: 14,
    color: "#2A2A2A",
  },
  timerContainer: {
    borderRadius: 16,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowColor: "#eeeeee",
    shadowOpacity: 0.35,
    elevation: 3,
  },
  textControl: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  timer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
    backgroundColor: "#a1e1fa",
    borderRadius: 16,
  },
  timerButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -10,
  },
  timerNameText: {
    color: "#3b7197",
    fontSize: 20,
    marginBottom: 4,
  },
  timerText: {
    alignItems: "center",
  },
});
