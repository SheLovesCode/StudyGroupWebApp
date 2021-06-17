const { TestWatcher } = require('jest');
const createChatMessage = require('../src/chatMessages');

// describe('Create Chat Message', () => {
//     it("should generate correct message object", () => {
//         let from = "WDJ",
//             text = "Some random text"
//         message = generateMessage(from, text);

//         expect(typeof message.createdAt).toBe('number');
//         expect(message).toMatchObject({ from, text });
//     });
// });

test('Create Chat Message', () => {
    text = "Hi there. It's Diana here.";
    message = createChatMessage(text);
    expect(message).toBe(text);
})