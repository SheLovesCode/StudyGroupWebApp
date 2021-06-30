document.getElementById("sendFaceInviteBtn").onclick = function() {
    document.querySelector(".modal").style.display = "flex";
}

let meetingInformation = document.getElementsByClassName("faceMeeting");

document.getElementById("faceMeetingBtn").onclick = function() {

    // Creating meeting div
    let mainContainer = document.getElementById('mainContainer');
    let newMeeting = document.createElement('div');
    newMeeting.id = "faceToFaceDiv";
    newMeeting.className = "meetingDivs"; // Will be used to style div
    newMeeting.innerText = "Date: " + meetingInformation[0].value + " at " + meetingInformation[1].value + "\n";
    mainContainer.appendChild(newMeeting);

    // Add paragraph to the div
    let instructions = document.createElement('p');
    instructions.innerHTML = "Please complete the COVID-19 form to Accept/Decline this meeting invite."
    newMeeting.appendChild(instructions);

    // Add a button to that div so users can be taken to the Covid Form
    let covidFormBtn = document.createElement('button');
    covidFormBtn.id = "getCovidForm";
    covidFormBtn.innerHTML = "Complete COVID-19 Screening Form";
    newMeeting.appendChild(covidFormBtn);
}