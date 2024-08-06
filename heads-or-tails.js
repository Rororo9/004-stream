import fs from 'node:fs/promises';
import inquirer from 'inquirer';

const choices = ['Орёл', 'Решка'];
const QUESTION_NAME = 'question';

const getRandomIndex = () => Math.floor(Math.random() * choices.length);

const getRandomAnswer = () => choices[getRandomIndex()];

const logToFile = async (answer) => {
    try {
        await fs.appendFile('log.txt', `${JSON.stringify(answer)}\n`);
    } catch (error) {
        console.error('An error occurred while writing to log.txt:', error);
    }
};

const promptUser = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                name: QUESTION_NAME,
                message: 'Орёл или решка?',
                type: 'list',
                choices,
            }
        ]);

        const rightAnswer = getRandomAnswer();
        const userAnswer = answers[QUESTION_NAME];
        let isWin = rightAnswer === userAnswer;

        await logToFile({
            condition: isWin ? 'win' : 'lose',
            userAnswer,
            rightAnswer,
        });

        if (isWin) {
            console.log('Угадал!');
        } else {
            console.log('Не угадал');
        }
    } catch (error) {
        console.error('An error occurred during the prompt:', error);
    }
};

promptUser();