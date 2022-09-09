import { Image, Pressable, StyleSheet, Text, View, ScrollView, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

const image2 = { uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png" };
const image = require('../assets/bgGradient4.png');

const HealthRecord = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            {/* <LinearGradient
                colors={["#a1e1fa", "#3b7197"]}
                style={{ flex: 1, minHeight: "100%" }}
            > */}
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.wrapper}>
                    <View style={{marginTop: 8}}>
                        <Text style={styles.heading}>Health Record</Text>
                        <Text style={styles.subtext}>Here is a summary of your details</Text>
                    </View>

                    <View style={[styles.rowFlex, { paddingHorizontal: 16 }]}>
                        <View style={{ width: "50%", alignItems: "center" }}>
                            <Text style={[styles.h2, { textAlign: "center" }]}>Average Heart Rate</Text>
                            <Image
                                style={styles.imageProp}
                                source={{ uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/20-love-heart-lineal.gif" }}
                            ></Image>
                            <Text style={[styles.heading, { textAlign: "center" }]}>75</Text>
                        </View>

                        <View style={styles.colFlex}>
                            <View>
                                <Text style={[styles.h2, { textAlign: "center", marginTop: 8 }]}>Resting</Text>
                                <Text style={[styles.heading, { textAlign: "center" }]}>72</Text>
                            </View>
                            <View>
                                <Text style={[styles.h2, { textAlign: "center", marginTop: 8 }]}>Max</Text>
                                <Text style={[styles.heading, { textAlign: "center" }]}>78</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.rowFlex}>
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

                    <View style={[styles.rowFlex, { paddingHorizontal: 24 }]}>
                        <View style={{ width: "50%", alignItems: "center" }}>
                            <Text style={[styles.h2, { textAlign: "center" }]}>Distance Covered</Text>
                            <Image
                                style={styles.imageProp}
                                source={{ uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/walk.png" }}
                            ></Image>
                            <Text style={[styles.heading, { textAlign: "center" }]}>95</Text>
                        </View>
                        <View style={{ width: "50%", paddingVertical: 48 }}>
                            <Text style={[styles.h2, { textAlign: "center" }]}>VO2 Max</Text>
                            <Text style={[styles.heading, { textAlign: "center" }]}>16</Text>
                        </View>
                    </View>

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
            </ImageBackground>
            {/* </LinearGradient> */}
        </ScrollView >
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
        minHeight:"100%",
    },
});
