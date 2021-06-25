const { TestWatcher } = require('jest');
const createChatMessage = require('../src/chatMessages');

test('Create Chat Message', () => {
    text = "Hi there. It's Diana here.";
    message = createChatMessage(text);
    expect(message).toBe(text);
});