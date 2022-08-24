const startArea = document.querySelector('.start-quiz-container');
const questionArea = document.querySelector('.question-container');
const questionTemp = document.querySelector('.temp-question');
const categoryList = document.querySelectorAll('.category-btn');
const categoryElement = document.querySelector('#selected-category');
const currentQuestion = document.querySelector('#current-question');
const resultArea = document.querySelector('.result-container');
const percentScore = document.querySelector('#percent');
const score = document.querySelector('#points');
const rankingBtn = document.querySelector('.ranking-btn');
const backBtn = document.querySelector('.back-btn');
const closeModalBtn = document.querySelector('.fa-xmark');
const modalShadow = document.querySelector('.modal-shadow');
const ranking = document.querySelector('.fa-ranking-star');
const historyList = document.querySelector('.history-list');
const resultMsgElement = document.querySelector('#result-msg');

let allAnswerButtons = [];
let points = 0;
let questionIndex = 0;
let questionNumber = 1;
let selectedCategory;
const RESULT_COOKIE_NAME = "result";

const initiate = () => {
    categoryList.forEach(e => {
        e.addEventListener('click', handleCategorySelect);
    })
}

const handleCategorySelect = async(event) => {
    let category = event.target.value;
    selectedCategory = event.target.id;
    startArea.classList.add('hide');
    questionArea.classList.remove('hide');
    await prepareQuestion(category);
    addQuestion();
}

const addQuestion = () => {
    categoryElement.textContent = selectedCategory;
    currentQuestion.textContent = questionNumber++;
    const newQuestion = questionTemp.content.cloneNode(true);
    newQuestion.querySelector('.question').innerHTML = getQuestion(questionIndex);
    prepareAnswers(questionIndex);

    let answerValue = 0;
    allAnswerButtons = newQuestion.querySelectorAll('.answer-btn');
    allAnswerButtons.forEach((e, answerIndex) => {
        e.innerHTML = answers[answerIndex++];
        e.value = answerValue++;
        e.addEventListener('click', handleAnswerSelect);
    })
    questionArea.appendChild(newQuestion);
}

const handleAnswerSelect = event => {
    const clickAnswerIndex = parseInt(event.target.value);
    if (clickAnswerIndex !== correctAnswerIndex)
        event.target.classList.add('wrong');
    else points++;
    allAnswerButtons[correctAnswerIndex].classList.add("right");
    allAnswerButtons.forEach(e => {
        e.removeEventListener('click', handleAnswerSelect);
        e.classList.remove('hover');
    });
    questionIndex++;
    showNextQuestion();
}

const showNextQuestion = () => {
    setTimeout(() => {
        if (questionIndex >= questions.length) {
            showScore();
        }else{
            addQuestion();
        }
        clearQuestionArea();
    }, 1000)
}

const showScore = () => {
    questionArea.classList.add('hide');
    resultArea.classList.remove('hide');
    const percent = points * 10;
    percentScore.textContent = `${percent}%`;
    score.textContent = `${points}/10`;
    const scoreObj = {
        percent,
        category: selectedCategory
    }
    updateCookie(RESULT_COOKIE_NAME, scoreObj)
}

const clearQuestionArea = () => {
    const toRemoveQuestion = document.querySelector('.question-area');
    questionArea.removeChild(toRemoveQuestion);
}

const handleResultsSelect = () => {
    if (modalShadow.style.display === 'flex') {
        modalShadow.style.display = 'none';
    } else {
        modalShadow.style.display = 'flex';
    };
    modalShadow.classList.toggle('modal-animation')
    historyList.textContent = '';
    
    let num = 1;
    const result = getCookie(RESULT_COOKIE_NAME);
    if (result) {
        result.forEach(score => {
            const newScore = document.createElement('li');
            newScore.innerHTML = `${num}. ${score.category} <span>${score.percent}%</span>`
            resultMsgElement.style.display = 'none';
            historyList.appendChild(newScore);
            num++;
        })
    }
}

const handleBackBtn = () => {
    resultArea.classList.add('hide');
    startArea.classList.remove('hide');
    questionNumber = 1;
    questionIndex = 0;
    allAnswerButtons = [];
    points = 0;
    initiate();
}

initiate();
rankingBtn.addEventListener('click', handleResultsSelect);
backBtn.addEventListener('click', handleBackBtn);
ranking.addEventListener('click', handleResultsSelect);
closeModalBtn.addEventListener('click', handleResultsSelect);
window.addEventListener('click', e => e.target === modalShadow ? handleResultsSelect() : false);