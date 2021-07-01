function generateAcceptDeclineBtns(allowedToMeet) {
    // Extracting meeting div
    let meetingDiv = document.getElementById("faceToFaceDiv");

    // Add an accept button to the meeting div
    let acceptBtn = document.createElement('button');
    acceptBtn.id = "acceptBtn";
    acceptBtn.innerHTML = "Accept Invitation";
    meetingDiv.appendChild(acceptBtn);

    // Add a decline button to the meeting div
    let declineBtn = document.createElement('button');
    declineBtn.id = "declineBtn";
    declineBtn.innerHTML = "Decline Invitation";
    meetingDiv.appendChild(declineBtn);

    // Display warning about co-morbidities etc
    console.log("Accepting or declining");
}

export { generateAcceptDeclineBtns };