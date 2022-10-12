import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { authentication, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import { ref, onValue, push, update, remove } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";
import { PatientContext } from "../App.js";
import Toast from "react-native-root-toast";
import CustomTextInput from "../components/CustomTextInput";

const image2 = {
    uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png",
};

const image = require("../assets/bgGradient4.png");

const PatientRecord = ({ navigation }) => {

    const handleSignOut = () => {
        signOut(authentication)
            .then(() => {
                // alert("Sign Out Successful");
                Toast.show("Sign Out successful", {
                    duration: 3000,
                    backgroundColor: "#ffffff",
                    textColor: "#4BB543",
                });
                navigation.replace("Login");
            })
            .catch((error) => {
                alert(error);
            });
    };

    const { pID, setPID } = useContext(PatientContext);
    const [patientID, setPatientID] = useState("");
    const [errorPID, setErrorPID] = useState(false);

    const [search, setSearch] = useState(false);
    const [notFound, setnotFound] = useState(false);

    const retrieve = () => {
        setSearch(true);
        setnotFound(false);

        onValue(ref(db, `/Reports/${patientID}`), (querySnapShot) => {
            let data = querySnapShot.val() || {};
            if (
                Object.keys(data).length !== 0 &&
                data?.PM &&
                data?.PM?.BP &&
                data?.PM?.WP &&
                data?.GM
            ) {
                setPID(patientID);
                setSearch(false);
                navigation.replace("Health");
            } else {
                setSearch(false);
                setnotFound(true);
                setErrorPID(true);
            }
        });
    };

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <SafeAreaView edges={["right", "left", "top"]} style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
                    <View style={styles.wrapper}>
                        <View style={{ marginTop: 8, flex: 1, height: "100%" }}>
                            <Text style={styles.heading}>Patient Record</Text>
                            <Text style={[styles.subtext, { paddingBottom: 16 }]}>
                                Existing / New Patient Record
                            </Text>
                        </View>
                        <View>
                            <View style={[styles.rowFlex, { flexDirection: "column", alignItems: "center" }]}>
                                <Text style={[styles.h2, { textAlign: "center", paddingBottom: 10 }]}>
                                    Retrieve Patient Record
                                </Text>

                                <CustomTextInput
                                    mode={1}
                                    valueState={[patientID, setPatientID]}
                                    errorState={[errorPID, setErrorPID]}
                                    placeholder="Patient ID"
                                    rec
                                />

                                <Pressable
                                    style={[styles.button, { width: "80%" }]}
                                    onPress={() => {
                                        retrieve();
                                    }}
                                >
                                    <Text style={styles.buttonText}>View Record</Text>
                                </Pressable>

                                {(search) && (
                                    <Text style={[styles.h2, { textAlign: "center", paddingTop: 10 }]}>
                                        Searching...
                                    </Text>
                                )}

                                {(notFound) && (
                                    <Text style={[styles.h2, { textAlign: "center", paddingTop: 10 }]}>
                                        Data not found
                                    </Text>
                                )}

                            </View>

                            <View style={[styles.rowFlex, { flexDirection: "column", alignItems: "center" }]}>
                                <Text style={[styles.h2, { textAlign: "center", paddingBottom: 10 }]}>
                                    New Patient Record
                                </Text>

                                <Pressable
                                    style={[styles.button, { width: "80%" }]}
                                    onPress={() => {
                                        navigation.navigate("Forms");
                                    }}
                                >
                                    <Text style={styles.buttonText}>New Patient</Text>
                                </Pressable>
                            </View>
                        </View>

                        <Pressable style={styles.button} onPress={handleSignOut}>
                            <Text style={styles.buttonText}>Sign Out</Text>
                        </Pressable>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default PatientRecord;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        paddingHorizontal: 16,
        // paddingTop: 48,
        paddingBottom: 32,
        justifyContent: "space-between",
        display: "flex",
        height: "100%",
        flex: 1,
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
        marginVertical: 18,
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
