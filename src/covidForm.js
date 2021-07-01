function generateAcceptDeclineBtns(allowedToMeet) {

    console.log("Accepting or declining");
}

function covidScreening() {

    let allowedToMeet = " ";

    const A1 = document.covidForm.symptoms.value;
    const A2 = document.covidForm.seriousSymptoms.value;
    const B1 = document.covidForm.tested.value;
    const B2 = document.covidForm.exposed.value;
    const C1 = document.covidForm.medical.value;
    const C2 = document.covidForm.age.value;

    // Still need to account for when no radio input is selected
    // Ensuring that every question has been answered
    if (C1 == "NO" && C2 == "NO" && A1 == "NO" && A2 == "NO" && B1 == "NO" && B2 == "NO") {
        allowedToMeet = "YES";
    } else if ((C1 == "YES" || C2 == "YES") && (A1 == "NO" && A2 == "NO" && B1 == "NO" && B2 == "NO")) {
        allowedToMeet = "MAYBE";
    } else {
        allowedToMeet = "YES";
    }

    // Create accept/decline functions
    generateAcceptDeclineBtns(allowedToMeet);
}

// Adding checkBox for them to attest that the information provided is true
// function checkBox(checkCheckBox) {
//     if (checkCheckBox.agree.checked == false) {
//         alert('Please check the box to continue.');
//         return false;
//     } else return true;
// }