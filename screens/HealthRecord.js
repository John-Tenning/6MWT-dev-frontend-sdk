import { Image, Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

const HealthRecord = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={["#ffffff", "#C1C1C1"]} style={{ flex: 1, minHeight: "100%" }}>
                <View style={styles.wrapper}>
                    <View>
                        <Text style={styles.heading}>Health Record</Text>
                        <Text style={styles.subtext}>Here is a summary of your details</Text>
                    </View>
                    <View style={styles.heartRate}>
                        <View style={{ width: "30%", marginTop: 48, paddingRight: 20 }}>
                            <Text style={[styles.h2, { textAlign: "center" }]}>Resting</Text>
                            <Text style={[styles.heading, { textAlign: "center" }]}>72</Text>
                        </View>
                        <View style={{ width: "40%", alignItems: "center" }}>
                            <Text style={[styles.h2, { textAlign: "center" }]}>Average Heart Rate</Text>
                            <Image
                                style={styles.imageProp}
                                source={{ uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/20-love-heart-lineal.gif" }}
                            ></Image>
                            <Text style={[styles.heading, { textAlign: "center" }]}>75</Text>
                        </View>
                        <View style={{ width: "30%", marginTop: 48, paddingLeft: 20 }}>
                            <Text style={[styles.h2, { textAlign: "center" }]}>Max</Text>
                            <Text style={[styles.heading, { textAlign: "center" }]}>78</Text>
                        </View>
                    </View>
                    <View style={styles.heartRate}>
                        <View style={{ width: "33%", paddingRight: 20 }}>
                            <Text style={[styles.h2, { textAlign: "center" }]}>1 Minute</Text>
                            <Text style={[styles.heading, { textAlign: "center" }]}>60</Text>
                        </View>
                        <View style={{ width: "33%", alignItems: "center" }}>
                            <Text style={[styles.h2, { textAlign: "center" }]}>2 Minutes</Text>
                            <Text style={[styles.heading, { textAlign: "center" }]}>75</Text>
                        </View>
                        <View style={{ width: "33%", paddingLeft: 20 }}>
                            <Text style={[styles.h2, { textAlign: "center" }]}>3 Minutes</Text>
                            <Text style={[styles.heading, { textAlign: "center" }]}>80</Text>
                        </View>
                    </View>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            console.log("Report Generated");
                        }}
                    >
                        <Text style={styles.buttonText}>Generate Report</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

export default HealthRecord;

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
    h2: {
        fontSize: 20,
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
        width: 100,
        height: 100,
    },
    heartRate: {
        height: "35%",
        display: "flex",
        flexDirection: "row",
    },
});
