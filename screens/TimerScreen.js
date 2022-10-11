import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import { db } from "../firebase-config.js";
import { ref, onValue, push, update, remove } from "firebase/database";
// Reference: https://openbase.com/js/react-native-countdown-circle-timer
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { PatientContext } from "../App.js";
import Toast from "react-native-root-toast";

const image2 = {
  uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png",
};
const image = require("../assets/bgGradient4.png");

const TimerScreen = ({ navigation }) => {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView edges={["right", "left", "top"]} style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.wrapper}>
            <View style={{ marginTop: 8 }}>
              <Text style={styles.heading}>Timer</Text>
              <Text style={styles.subtext}>Timer Screen</Text>
            </View>

            <CustomTimer dur={3} timerName={"Resting"} cmd={"B"} />
            <CustomTimer dur={360} timerName={"Walking"} cmd={"W"} />
            <CustomTimer dur={180} timerName={"Recovery"} cmd={"R"} />

            <Pressable
              style={styles.nextButton}
              onPress={() => {
                // setIsPlaying(false);
                navigation.replace("Health");
              }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
          </View>
          {/* </LinearGradient> */}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TimerScreen;

const CustomTimer = ({ dur, timerName, cmd }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const { pID, setPID } = useContext(PatientContext);

  return (
    <View style={styles.timerContainer}>
      <View
        // colors={["#a1e1fa", "#3b7197"]}
        style={styles.timerRowFlex}
      >
        <CountdownCircleTimer
          size={104}
          isPlaying={isPlaying}
          key={key}
          duration={dur}
          colors={["#01695C", "#01695C", "#01695C", "#01695C"]}
          colorsTime={[dur, dur * (2 / 3), dur * (1 / 3), 0]}
          strokeWidth={6}
          onComplete={() => {
            // return { shouldRepeat: true, delay: 1.5 }
            setKey((prevKey) => prevKey + 1);
            setIsPlaying(false);
            console.log(timerName + " Timer Complete");

            let toast = null;
            onValue(ref(db, `/Reports/${pID}`), (querySnapShot) => {
              let data = querySnapShot.val() || {};
              console.log("Patient Data", data);
              if (Object.keys(data).length === 0) {
                toast = Toast.show("Patient Reports not found", {
                  duration: 3000,
                  backgroundColor: "#ffffff",
                  textColor: "#ff0000",
                });
              }
            });

            setTimeout(
              () => {
                if (cmd === "B") {
                  onValue(ref(db, `/Reports/${pID}/PM`), (querySnapShot) => {
                    let data = querySnapShot.val() || {};
                    if (
                      Object.keys(data).length === 0 ||
                      !Object.keys(data).includes("BP")
                    )
                      Toast.show("Reports for Resting phase not found.", {
                        duration: 3000,
                        backgroundColor: "#ffffff",
                        textColor: "#ff0000",
                      });
                    else
                      Toast.show("Resting Phase successfull.", {
                        duration: 3000,
                        backgroundColor: "#ffffff",
                        textColor: "#0000ff",
                      });
                  });
                } else if (cmd === "W") {
                  onValue(ref(db, `/Reports/${pID}/GM`), (querySnapShot) => {
                    let data = querySnapShot.val() || {};
                    if (Object.keys(data).length === 0)
                      Toast.show("Reports for Walking phase not found.", {
                        duration: 3000,
                        backgroundColor: "#ffffff",
                        textColor: "#ff0000",
                      });
                    else
                      Toast.show("Walking Phase successfull.", {
                        duration: 3000,
                        backgroundColor: "#ffffff",
                        textColor: "#0000ff",
                      });
                  });
                } else if (cmd === "R") {
                  onValue(ref(db, `/Reports/${pID}/PM`), (querySnapShot) => {
                    let data = querySnapShot.val() || {};
                    if (!Object.keys(data).includes("WP"))
                      Toast.show("Reports for Recovery phase not found.", {
                        duration: 3000,
                        backgroundColor: "#ffffff",
                        textColor: "#ff0000",
                      });
                    else
                      Toast.show("Recovery Phase successfull.", {
                        duration: 3000,
                        backgroundColor: "#ffffff",
                        textColor: "#0000ff",
                      });
                  });
                }
              },
              toast === null ? 0 : 3000
            );
          }}
        >
          {({ remainingTime, color }) => (
            <View>
              <Text
                style={{ color: "#04454C", fontSize: 28, fontWeight: "600" }}
              >
                {remainingTime}
              </Text>
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
                  ? () => {
                    Toast.show(`${timerName} timer will start in 5 seconds`, {
                      duration: 5000,
                      backgroundColor: "#ffffff",
                      textColor: "#ff0000",
                    });
                    update(ref(db, "/Device_Status/P01"), {
                      CMD: cmd,
                    });
                    if (cmd === "W") {
                      update(ref(db, "/Device_Status/S01"), {
                        CMD: cmd,
                      });
                    }
                    setTimeout(() => {
                      setIsPlaying(true);
                    }, 5000);
                  }
                  : () => setIsPlaying(false)
              }
            >
              {isPlaying === false ? (
                <Entypo name="controller-play" size={36} color={"#303030"} />
              ) : (
                <Entypo name="controller-paus" size={36} color={"#303030"} />
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
              <Entypo name="cw" size={32} color={"#303030"} />
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
  },
  image: {
    flex: 1,
    justifyContent: "center",
    minHeight: "100%",
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 48,
    display: "flex",
    justifyContent: "flex-start",
    minHeight: "100%",
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
    marginTop: 20,
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
    marginVertical: 16,
  },
  timerNameText: {
    fontWeight: "500",
    color: "#303030",
    fontSize: 22,
    marginBottom: 4,
  },
});
