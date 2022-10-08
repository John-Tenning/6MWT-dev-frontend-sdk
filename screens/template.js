export const template = ({ PatientName, Age, PatientID, Gender, DiagnosisOption, RHR, MHR, AHR, RR1, RR2, RR3, DC, VO2 }) => {
    return `
    <body style="width: 21cm; height: 29.7cm;  display: block; font-family: Inter, sans-serif;">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <table style="width: 100%; background: #eeeeee; padding: 10px;">
        <tr>
            <td style="text-align: left; padding: 10px;">
                <h1 style="line-height: 1rem;">Report</h1>
                <h2 style="line-height: 1rem; font-weight: 500;">6MWT</h2>
            </td>
            <td style="width: 120; text-align: right;">
                <img width="80"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/PSG_Institute_of_Medical_Sciences_%26_Research_Logo.svg/1200px-PSG_Institute_of_Medical_Sciences_%26_Research_Logo.svg.png" />
            </td>
            <td style="width: 120; text-align: right;">
                <img width="80"
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png" />
            </td>
        </tr>
    </table>
    <table style="width: 100%; background: #ffffff; padding: 10px;">
        <tr style="margin: 0">
            <td style="width: 25%; padding: 10px;">
                <b>Patient Name</b>
            </td>
            <td style="width: 25%; padding: 10px; ">

                <p class="">${PatientName}</p>
            </td>
            <td style="width: 25%; padding: 10px;">

                <b class="">Age</b>
            </td>
            <td style="width: 25%;padding: 10px;">
                <p class="">${Age}</p>
            </td>
        </tr>
        <tr style="margin: 0">
            <td style="width: 25%; padding: 10px;">
                <b>Patient ID</b>
            </td>
            <td style="width: 25%; padding: 10px; ">

                <p class="">${PatientID}</p>
            </td>
            <td style="width: 25%; padding: 10px;">

                <b class="">Gender</b>
            </td>
            <td style="width: 25%;padding: 10px;">
                <p class="">${Gender}</p>
            </td>
        </tr>
        <tr>
            <td style="width: 25%; padding: 10px;">
                <b>Diagnosis</b>
            </td>
            <td style="width: 25%; padding: 10px;">

                <p class="">${DiagnosisOption}</p>
            </td>
        </tr>
    </table>
    <table style="padding: 10">
        <tr>
            <td style="font-size: 2rem; font-weight: 700;">
                <p style="margin: 0; padding: 0;">
                    Cardio Endurance Report
                </p>
                <div style="width: 80%; height: 6px; background: #eeeeee; margin: 0;"></div>
            </td>
        </tr>
    </table>
    <table style="width: 100%; padding: 10;">
        <tr style="width: 100%; padding: 20;">
            <td style="width: 50%; padding:10;">
                <b>Resting Heart Rate (bpm)</b>
            </td>
            <td style="width: 50%;  padding:10;">
                <p>${RHR}</p>
            </td>
        </tr>
        <tr style="width: 100%">
            <td style="width: 50%;  padding:10;">
                <b>Maximum Heart Rate (bpm)</b>
            </td>
            <td style="width: 50%;  padding:10;">
                <p>${MHR}</p>
            </td>
        </tr>
        <tr style="width: 100%">
            <td style="width: 50%;  padding:10;">
                <b>Average Heart Rate (bpm)</b>
            </td>
            <td style="width: 50%;  padding:10;">
                <p>${AHR}</p>
            </td>
        </tr>
        <tr style="width: 100%">
            <td style="width: 50%;  padding:10;">
                <b>Recovery Rate (bpm)</b>
            </td>
            <td style="width: 50%;  padding:10;">

            </td>
        </tr>
        <tr style="width: 100%">
            <td style=" padding:10;padding-left: 40px; width: 50%; ">
                <b>1 minute (bpm)</b>
            </td>
            <td style="width: 50%;  padding:10;">
                <p class="">${RR1}</p>
            </td>
        </tr>
        <tr style="width: 100%">
            <td style=" padding:10;padding-left: 40px; width: 50%; ">
                <b>2 minutes (bpm)</b>
            </td>
            <td style="width: 50%;  padding:10;">
                <p class="">${RR2}</p>
            </td>
        </tr>
        <tr style="width: 100%">
            <td style=" padding:10;padding-left: 40px; width: 50%; ">
                <b>3 minutes (bpm)</b>
            </td>
            <td style="width: 50%;  padding:10;">
                <p class="">${RR3}</p>
            </td>
        </tr>
        <tr style="width: 100%">
            <td style="width: 50%;  padding:10;">
                <b>Distance Covered (m)</b>
            </td>
            <td style="width: 50%;  padding:10;">
                ${DC}
            </td>
        </tr>
        <tr style="width: 100%">
            <td style="width: 50%;  padding:10;">
                <b>VO2 Max (ml/Kg/min)</b>
            </td>
            <td style="width: 50%;  padding:10;">
                ${VO2}
            </td>
        </tr>
    </table>
</body>
    `
}