// Get meetings that are already in the database
const mainContainer = document.getElementById('mainContainer');
var storedMeetingDetails = [];
var responseContainer = [];
var userEmail = "munyaradzi.diana@gmail.com";
let currentGroupName = "TRASH";


getfromDB().then(response => {
    responseContainer = response;
    displayStoredMeetings(responseContainer);
})

function displayStoredMeetings(responseContainer) {
    responseContainer.forEach(element => {
        const obj = {
            groupName: element.groupname,
            date: element.datetime,
            time: element.time,
            covidFormUrl: element.url
        }

        if (currentGroupName === element.groupname) {

            const storedDate = element.datetime;
            const storedTime = element.time;
            const storedUrl = element.url;

            // Creating meeting div
            let newMeeting = document.createElement('div');
            newMeeting.id = "faceToFaceDiv";
            newMeeting.className = "meetingDivs"; // Will be used to style div
            newMeeting.innerText = "Date: " + storedDate + " at " + storedTime + "\n";
            mainContainer.appendChild(newMeeting);

            var covidFormLink = document.createElement('a');
            var covidFormLinkText = document.createTextNode("Complete COVID-19 Screening Form");
            covidFormLink.appendChild(covidFormLinkText);
            covidFormLink.title = "COVID Screening Form";
            covidFormLink.href = storedUrl;
            newMeeting.appendChild(covidFormLink);
        }

    })
}

// When the button is clicked, display the modal
document.getElementById('sendFaceInviteBtn').onclick = function() {
    document.querySelector('.modal').style.display = 'flex'
}

// Extract the div that contains the main_container so we can append to that instead of the body
const meetingDate = document.getElementById("meetingDate");
const meetingTime = document.getElementById("meetingTime");

document.getElementById("faceMeetingBtn").onclick = function() {
    // Close the modal when the student submits the invitation details
    document.querySelector(".modal").style.display = "none";

    // Creating meeting div
    let newMeeting = document.createElement('div');
    newMeeting.id = "faceToFaceDiv";
    newMeeting.className = "meetingDivs"; // Will be used to style div
    newMeeting.innerText = "Date: " + meetingDate.value + " at " + meetingTime.value + "\n";
    mainContainer.appendChild(newMeeting);

    async function storingInDB(userEmail, group, formUrl, meetingDate, meetingTime) {
        const text = {
            member: userEmail,
            groupName: group,
            url: formUrl,
            dateTime: meetingDate,
            time: meetingTime,
            status: "Update"
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(text)
        }
        const response = await fetch('/meetingDetails', options)
        console.log(response);
    }

    // Add paragraph to the div
    let instructions = document.createElement('p');
    instructions.innerHTML = "Please complete the COVID-19 form to Accept/Decline this meeting invite."
    newMeeting.appendChild(instructions);

    var covidFormLink = document.createElement('a');
    var covidFormLinkText = document.createTextNode("Complete COVID-19 Screening Form");
    covidFormLink.appendChild(covidFormLinkText);
    covidFormLink.title = "COVID Screening Form";
    covidFormLink.href = '../CovidScreening';
    newMeeting.appendChild(covidFormLink);

    console.log(covidFormLink.href);
    storingInDB("Diana@gmail.com", "WITS2020", covidFormLink.href, meetingDate.value, meetingTime.value);
    getfromDB();
}

// Close the modal if the close button is clicked
document.getElementById("faceMeetingModalBtn").onclick = function() {
    document.querySelector(".modal").style.display = "none";
}

async function getfromDB() {
    const text = {
        status: "Read"
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(text)
    }
    const response = await fetch('/meetingDetails', options)
    return response.json();
}