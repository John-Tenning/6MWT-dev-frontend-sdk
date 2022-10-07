import React from 'react';
import { StatusBar, StyleSheet, View, Button } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const data = {
    name: 'Divyesh Barad',
    email: 'divyesh@gmail.com',
    address: 'Rajkot',
}

const Pdf = () => {
    const html = `
        <html>
            <body>
                <h2>Hi ${data.name}</h2>
                <h4>Email: ${data.email}</h4>
                <h4>Address: ${data.address}</h4>
            </body>
        </html>
    `;

    const generatePdf = async () => {
        const file = await printToFileAsync({
            html: html,
            base64: false,
        });
        await shareAsync(file.uri);
    }

    return (
        generatePdf
    );
}



export default Pdf;
