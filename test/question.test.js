// Importing Classses
const { Question, List } = require('../utils/questions');


// Testing Questions Classses
describe('Question Class Instantiation Test', () => {
    test('Should return an object containing the type, name, and message values', () => {
        const questionType = 'input';
        const questionName = 'username';
        const questionMessage = 'View all Employees';

        const question = new Question(questionType, questionName, questionMessage);

        // Verify that the properties are set correctly
        expect(question.type).toBe(questionType);
        expect(question.name).toBe(questionName);
        expect(question.message).toBe(questionMessage);
    });
});


// Testing List Class
describe('List Class Instantiation Test', () => {
    test('Should return an Array-object containing the type, name, message, and choices values', () => {
        const questionType = 'list';
        const questionName = 'Employee';
        const questionMessage = 'Which Employees role is changing?';
        const questionChoices = ['choices1', 'choices2'];

        const list = [ new List(questionType, questionName, questionMessage, questionChoices) ];

        // Verify that the properties are set correctly
        expect(list[0].type).toBe(questionType);
        expect(list[0].name).toBe(questionName);
        expect(list[0].message).toBe(questionMessage);
        expect(list[0].choices[0]).toBe(questionChoices[0]);
        expect(list[0].choices[1]).toBe(questionChoices[1]);
    })
})