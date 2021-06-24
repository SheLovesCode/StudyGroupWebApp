const modalButton = document.querySelector('.meetingBtn');
const modalBackground = document.querySelector('.backgroundModal')

modalButton.addEventListener('click', function() {
    modalBackground.classList.add('popupActive');
});