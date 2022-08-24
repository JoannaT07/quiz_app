let questions;
let answers;
let correctAnswerIndex;

const prepareQuestion = async(category) => {
    const res = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple&category=${category}`);
    const json = await res.json();
    questions = json.results;
}

const getQuestion = questionIndex => {
    return questions[questionIndex].question;
}

const prepareAnswers = questionIndex => {
    answers = questions[questionIndex].incorrect_answers;
    correctAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(correctAnswerIndex, 0, questions[questionIndex].correct_answer);
}
