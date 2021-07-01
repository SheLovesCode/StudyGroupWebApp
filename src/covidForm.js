// Function redirects to the given url
function redirect(url) {
    window.location.href = url;
}

function generateAcceptDeclineBtns(allowedToMeet) {
    // People who are allowed to meet in person who aren't high risk
    if (allowedToMeet == "YES") {
        document.querySelector("#allowedModal").style.display = "flex";
    }

    // High risk persons
    else if (allowedToMeet == "MAYBE") {
        let covidModalContent = document.getElementById('allowedModalContent');
        let warningText = document.createElement('p');
        warningText.id = "warningText";
        warningText.innerHTML = "Although you're allowed to meet your group members in person, you're an at risk person. Do not forget to be extra cautious."
        covidModalContent.appendChild(warningText);
        document.querySelector("#allowedModal").style.display = "flex";
    }
    // Not allowed to meet
    else if (allowedToMeet == "NO") {
        document.querySelector("#notAllowedModal").style.display = "flex";
    }

    // Accept and Decline button listeners
    document.getElementById("acceptBtn").onclick = function() {
        var acceptOrDecline = true;
        document.getElementById("allowedModal").style.display = "none";
        redirect('../group');
    }

    // Accept and Decline button listeners
    document.getElementById("acceptBtn").onclick = function() {
        var acceptOrDecline = false;
        document.getElementById("allowedModal").style.display = "none";
        redirect('../group');
    }

    // Accept and Decline button listeners
    document.getElementById("declineBtn").onclick = function() {
        var acceptOrDecline = true;
        document.getElementById("allowedModal").style.display = "none";
        redirect('../group');
    }

    // Close the modal if the close button is clicked
    document.getElementById("allowedCloseBtn").onclick = function() {
        document.getElementById("allowedModal").style.display = "none";
        redirect('../group');
    }

    // Close the modal if the close button is clicked
    document.getElementById("notAllowedCloseBtn").onclick = function() {
        document.getElementById("notAllowedModal").style.display = "none";
        redirect('../group');
    }
}

function checkRadioButtons() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    let checkedRadioBtns = 0;
    for (const radioBtn of radioButtons) {
        if (radioBtn.checked) {
            checkedRadioBtns++;
        }
    }
    return checkedRadioBtns;
}

function covidScreening() {

    let allowedToMeet = " ";
    const A1 = document.covidForm.symptoms.value;
    const A2 = document.covidForm.seriousSymptoms.value;
    const B1 = document.covidForm.tested.value;
    const B2 = document.covidForm.exposed.value;
    const C1 = document.covidForm.medical.value;
    const C2 = document.covidForm.age.value;

    if (checkRadioButtons() === 6) {
        // Ensuring that every question has been answered
        if (C1 == "NO" && C2 == "NO" && A1 == "NO" && A2 == "NO" && B1 == "NO" && B2 == "NO") {
            allowedToMeet = "YES";
        } else if ((C1 == "YES" || C2 == "YES") && (A1 == "NO" && A2 == "NO" && B1 == "NO" && B2 == "NO")) {
            allowedToMeet = "MAYBE";
        } else {
            allowedToMeet = "NO";
        }
    } else if (checkRadioButtons() < 6) {
        alert('Please answer all questions');
    }

    // Create accept/decline functions
    generateAcceptDeclineBtns(allowedToMeet);
}