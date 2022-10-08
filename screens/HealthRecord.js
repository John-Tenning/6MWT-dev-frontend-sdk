import { Image, Pressable, StyleSheet, Text, View, ScrollView, ImageBackground, StatusBar, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { db } from '../firebase-config.js';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { template } from './template';
import * as FileSystem from 'expo-file-system'

const image2 = { uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/bgGradient4.png" };
const image = require('../assets/bgGradient4.png');
const diagnosisDict = {
    'CABG': 'Post CABG Patients and HF',
    'NYHA': 'NYHA Class II-III HF',
    'ADV': 'Advanced Symptomatic HF',
    'EC': 'Elderly and Clinical',
    'YMA': 'Young to Middle Age',
    'MAS': 'Middle age - Seniority',
    'ELD': 'Elderly'
};

const HealthRecord = ({ navigation }) => {

    const [report, setReport] = useState(null)
    const [CPID, setCPID] = useState(null)
    const [details, setDetails] = useState(null)
    const [vo2, setvo2] = useState(null)

    const min = 6 // CABG
    // Elderly - No formula
    const mwt = 5 // MAS & YMA


    useEffect(() => {
        onValue(ref(db, '/Device_Status/P01/CPID'), querySnapShot => {
            let data = querySnapShot.val() || {};
            setCPID(data);
        })
    }, [])

    useEffect(() => {
        onValue(ref(db, '/Reports/AsgTest01/'), querySnapShot => {
            let data = querySnapShot.val() || {};
            setReport(data);
        })

        if (CPID !== null) {
            onValue(ref(db, `/Details/${CPID}/`), querySnapShot => {
                let data = querySnapShot.val() || {};
                setDetails(data);
            })
        }
    }, [CPID])

    useEffect(() => {
        if (details !== null) {
            if (details.DiagnosisOption === 'EC') {
                let sex = details.Gender === 'male' ? 1 : 2;
                let calc = 61.1 - 11.1 * sex - 0.4 * details.Age - 0.2 * details.Weight - 0.2 * (report.GM.DC.DC_Total * 0.1);
                setvo2(calc.toFixed(2));
            }

            if (details.DiagnosisOption === 'ADV') {
                let calc = 0.03 * report.GM.DC.DC_Total + 3.98;
                setvo2(calc.toFixed(2));
            }

            if (details.DiagnosisOption === 'NYHA') {
                let calc = 0.0105 * report.GM.DC.DC_Total + 0.0238 * details.Age + 0.03085 * details.Weight + 5.598;
                setvo2(calc.toFixed(2));
            }

            if (details.DiagnosisOption === 'CABG') {
                let calc = 3.5 + (report.GM.DC.DC_Total / min * 0.1);
                setvo2(calc.toFixed(2));
            }

            if (details.DiagnosisOption === 'MAS' || details.DiagnosisOption === 'YMA') {
                let sex = details.Gender === 'male' ? 0 : 1;
                let calc = 70.161 + (0.023 * mwt) - (0.276 * details.Weight) - (6.79 * sex) - (0.193 * report.PM.BP.BP_Avg) - (0.191 * details.Age);
                setvo2(calc.toFixed(2));
            }

        }
    }, [details])

    const generatePdf = async () => {
        const file = await printToFileAsync({
            html: template({
                PatientName: details.Name,
                Age: details.Age,
                PatientID: details.PatientID,
                Gender: details.Gender,
                DiagnosisOption: diagnosisDict[details.DiagnosisOption],
                RHR: report.PM.BP.BP_Avg,
                MHR: report.PM.WP.WP_Peak,
                AHR: report.PM.WP.WP_Avg,
                RR1: report.PM.RP.RP_3,
                RR2: report.PM.RP.RP_6,
                RR3: report.PM.RP.RP_9,
                DC: report.GM.DC.DC_Total,
                VO2: vo2
            }),
            base64: false,
        })

        const pdfName = `${file.uri.slice(0,file.uri.lastIndexOf('/') + 1)}${details.PatientID}_Report.pdf`
        await FileSystem.moveAsync({
            from: file.uri,
            to: pdfName,
        })
        await shareAsync(pdfName)
    }

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <ScrollView style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={{ marginTop: 8, flex: 1, height: "100%" }}>
                        <Text style={styles.heading}>Health Record</Text>
                        <Text style={styles.subtext}>Here is a summary of your details</Text>
                        {!report && <Text style={styles.h2}>Loading...</Text>}
                    </View>
                    {
                        report &&
                        <View>

                            <View style={[styles.rowFlex, { paddingHorizontal: 16 }]}>
                                <View style={{ width: "50%", alignItems: "center" }}>
                                    <Text style={[styles.h2, { textAlign: "center", width: "70%" }]}>Average Heart Rate</Text>
                                    <Image
                                        style={styles.imageProp}
                                        source={{ uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/20-love-heart-lineal.gif" }}
                                    ></Image>
                                    <Text style={[styles.heading, { textAlign: "center" }]}>{report.PM.WP.WP_Avg}</Text>
                                </View>

                                <View style={styles.colFlex}>
                                    <View>
                                        <Text style={[styles.h2, { textAlign: "center", marginTop: 8 }]}>Resting</Text>
                                        <Text style={[styles.heading, { textAlign: "center" }]}>{report.PM.BP.BP_Avg}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.h2, { textAlign: "center", marginTop: 8 }]}>Maximum</Text>
                                        <Text style={[styles.heading, { textAlign: "center" }]}>{report.PM.WP.WP_Peak}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.rowFlex, { flexDirection: "column" }]}>
                                <Text style={[styles.h2, { textAlign: "center" }]}>Recovery Phase</Text>

                                <View style={[styles.rowFlex, { backgroundColor: "rgba(0, 0, 0, 0)", paddingHorizontal: 0, paddingVertical: 0 }]}>
                                    <View style={{ width: "33%" }}>
                                        <Text style={[styles.h2, { textAlign: "center" }]}>1 Min</Text>
                                        <Text style={[styles.heading, { textAlign: "center" }]}>{report.PM.RP.RP_3}</Text>
                                        <Text style={[styles.h2, { textAlign: "center" }]}>BPS</Text>
                                    </View>
                                    <View style={{ width: "33%" }}>
                                        <Text style={[styles.h2, { textAlign: "center" }]}>2 Mins</Text>
                                        <Text style={[styles.heading, { textAlign: "center" }]}>{report.PM.RP.RP_6}</Text>
                                        <Text style={[styles.h2, { textAlign: "center" }]}>BPS</Text>
                                    </View>
                                    <View style={{ width: "33%" }}>
                                        <Text style={[styles.h2, { textAlign: "center" }]}>3 Mins</Text>
                                        <Text style={[styles.heading, { textAlign: "center" }]}>{report.PM.RP.RP_9}</Text>
                                        <Text style={[styles.h2, { textAlign: "center" }]}>BPS</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.rowFlex, { paddingHorizontal: 24 }]}>
                                <View style={{ width: "50%", alignItems: "center" }}>
                                    <Text style={[styles.h2, { textAlign: "center" }]}>Distance Covered</Text>
                                    <Image
                                        style={styles.imageProp}
                                        source={{ uri: "https://raw.githubusercontent.com/John-Tenning/6MWT-dev-frontend-sdk/main/assets/walk.png" }}
                                    ></Image>
                                    <Text style={[styles.heading, { textAlign: "center", fontSize: 36 }]}>{report.GM.DC.DC_Total}</Text>
                                    <Text style={[styles.h2, { textAlign: "center" }]}>Meters</Text>
                                </View>
                                <View style={{ width: "50%", paddingVertical: 48 }}>
                                    <Text style={[styles.h2, { textAlign: "center" }]}>VO2 Max</Text>
                                    <Text style={[styles.heading, { textAlign: "center", fontSize: 36 }]}>{vo2}</Text>
                                </View>
                            </View>

                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    console.log("Report Generated");
                                    // navigation.navigate("Forms");
                                    generatePdf();
                                }}
                            >
                                <Text style={styles.buttonText}>Generate Report</Text>
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    // console.log("Report Generated");
                                    navigation.navigate("Forms");
                                    // generatePdf();
                                }}
                            >
                                <Text style={styles.buttonText}>Sign Out</Text>
                            </Pressable>

                        </View>
                    }
                </View>
            </ScrollView >
        </ImageBackground>
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
