const { TestWatcher } = require('jest');
const createLocationMessage = require('../src/locationMessages');

test('Generate Location Message', () => {
    lat = 15,
        lng = 56
    url = `https://www.google.com/maps?q=${lat}, ${lng}`,
        message = createLocationMessage(lat, lng);

    expect(message).toBe(url);
})