// Get meetings that are already in the database
const faceMeetings = document.getElementById('faceMeetings');
const onlineMeetings = document.getElementById('onlineMeetings');
var storedMeetingDetails = [];
var responseContainer = [];
var userEmail = "munyaradzi.diana@gmail.com";
let currentGroupName = "WITS2020";

// Extract the entered dates and times
const onlineMeetingDate = document.getElementById("onlineMeetingDate");
const onlineMeetingTime = document.getElementById("onlineMeetingTime");
const onlineMeetingUrl = document.getElementById("onlineLink");

getfromDB().then(response => {
    responseContainer = response;
    displayStoredMeetings(responseContainer);
})

// Get meetings when the page is loaded
getfromDB();

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
            console.log(element);
            // Display Face to Face Meetings
            if (storedUrl.includes("Covid")) {
                // Creating meeting div
                let newMeeting = document.createElement('div');
                newMeeting.id = "faceToFaceDiv";
                newMeeting.className = "meetingDivs"; // Will be used to style div
                newMeeting.innerText = "Date: " + storedDate + " at " + storedTime + "\n";
                faceMeetings.appendChild(newMeeting);

                var covidFormLink = document.createElement('a');
                var covidFormLinkText = document.createTextNode("Complete COVID-19 Screening Form");
                covidFormLink.appendChild(covidFormLinkText);
                covidFormLink.title = "COVID Screening Form";
                covidFormLink.href = storedUrl;
                newMeeting.appendChild(covidFormLink);
            }
            // Display online meetings 
            else {
                // Creating meeting div
                let newOnlineMeeting = document.createElement('div');
                newOnlineMeeting.id = "onlineDiv";
                newOnlineMeeting.className = "meetingDivs"; // Will be used to style div
                newOnlineMeeting.innerText = "Date: " + storedDate + " at " + storedTime + "\n Meeting Link: ";
                onlineMeetings.append(newOnlineMeeting);
                console.log(storedUrl);

                var onlineLink = document.createElement('a');
                var onlineLinkText = document.createTextNode("Online Meeting Link");
                onlineLink.appendChild(onlineLinkText);
                onlineLink.href = storedUrl;
                newOnlineMeeting.appendChild(onlineLink);
            }
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

// When the invitation has been created:
// 1: Append the details to the current meetings
// 2: Store them in the data based
document.getElementById("faceMeetingBtn").onclick = function() {
    // Close the modal when the student submits the invitation details
    document.querySelector(".modal").style.display = "none";

    // Creating meeting div
    let newMeeting = document.createElement('div');
    newMeeting.id = "faceToFaceDiv";
    newMeeting.className = "meetingDivs"; // Will be used to style div
    newMeeting.innerText = "Date: " + meetingDate.value + " at " + meetingTime.value + "\n";
    faceMeetings.appendChild(newMeeting);

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
}

// Close the modal if the close button is clicked
document.getElementById("closeFaceModalBtn").onclick = function() {
    document.querySelector("#faceModal").style.display = "none";
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

// -- ONLINE MEETING -- //
// Display the modal when the button is clicked
document.getElementById('sendOnlineInviteBtn').onclick = function() {
    document.querySelector('#onlineModal').style.display = 'flex'
}

// When the invitation has been created:
// 1: Append the details to the current meetings
// 2: Store them in the data based
document.getElementById("onlineMeetingBtn").onclick = function() {
    // Close the modal when the student submits the invitation details
    document.querySelector(".modal").style.display = "none";

    // Creating meeting div
    let newOnlineMeeting = document.createElement('div');
    newOnlineMeeting.id = "onlineDiv";
    newOnlineMeeting.className = "meetingDivs"; // Will be used to style div
    newOnlineMeeting.innerText = "Date: " + onlineMeetingDate.value + " at " + onlineMeetingTime.value + " on the following link: \n";
    onlineMeetings.append(newOnlineMeeting);

    var onlineLink = document.createElement('a');
    var onlineLinkText = document.createTextNode("Online Meeting Link");
    onlineLink.appendChild(onlineLinkText);

    // Delete relative path:
    var currentURL = window.location.href;
    newOnlineMeeting.appendChild(onlineLink);
    var newCurrentURL = currentURL.replace("notes", "");
    finalURL = onlineMeetingUrl.value.replace(newCurrentURL, "");
    onlineLink.href = "http://" + finalURL;
    onlineMeetings.append(onlineLink.href);

    async function storingInDB(userEmail, group, meetingUrl, meetingDate, meetingTime) {
        const text = {
            member: userEmail,
            groupName: group,
            url: meetingUrl,
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

    storingInDB("Diana@gmail.com", "WITS2020", onlineLink.href, onlineMeetingDate.value, onlineMeetingTime.value);
    getfromDB();

    // Close the modal when the student submits the invitation details
    document.querySelector("#onlineModal").style.display = "none";
}

// Close the modal if the close button is clicked
document.getElementById("closeOnlineModalBtn").onclick = function() {
    document.querySelector("#onlineModal").style.display = "none";
}