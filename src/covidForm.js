function covidScreening() {

    let allowedToMeet = "NO";
    const A1 = document.covidForm.symptoms.value;
    const A2 = document.covidForm.seriousSymptoms.value;
    const B1 = document.covidForm.tested.value;
    const B2 = document.covidForm.exposed.value;
    const C1 = document.covidForm.medical.value;
    const C2 = document.covidForm.age.value;

    if (A1 == "YES" || A2 == "YES" || B1 == "YES" || B2 == "YES") {
        allowedToMeet = "NO";
    } else if (C1 == "YES" || C2 == "YES") {
        allowedToMeet = "MAYBE";
    } else {
        allowedToMeet = "YES";
    }

    document.write(allowedToMeet);
}