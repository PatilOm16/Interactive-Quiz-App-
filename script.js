// Quiz Questions Database
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        correct: 0,
        explanation: "HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages."
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "text-style"
        ],
        correct: 2,
        explanation: "The 'color' property in CSS is used to change the text color of an element."
    },
    {
        question: "What is the correct syntax for referring to an external JavaScript file?",
        options: [
            "<script href='script.js'>",
            "<script name='script.js'>",
            "<script src='script.js'>",
            "<script file='script.js'>"
        ],
        correct: 2,
        explanation: "The correct syntax is <script src='script.js'>. The 'src' attribute specifies the URL of the external script file."
    },
    {
        question: "Which company developed JavaScript?",
        options: [
            "Microsoft",
            "Netscape",
            "Google",
            "Apple"
        ],
        correct: 1,
        explanation: "JavaScript was developed by Netscape Communications Corporation. It was created by Brendan Eich in 1995."
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1,
        explanation: "CSS stands for Cascading Style Sheets. It is used to style and layout web pages."
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: [
            "<css>",
            "<script>",
            "<style>",
            "<styles>"
        ],
        correct: 2,
        explanation: "The <style> tag is used to define internal CSS styles within an HTML document."
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = 'red', 'green', 'blue'",
            "var colors = ['red', 'green', 'blue']",
            "var colors = {1:'red', 2:'green', 3:'blue'}"
        ],
        correct: 2,
        explanation: "In JavaScript, arrays are written with square brackets and values separated by commas: ['red', 'green', 'blue']"
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: [
            "bgcolor",
            "background-color",
            "color-background",
            "bg-color"
        ],
        correct: 1,
        explanation: "The 'background-color' property is used to set the background color of an element in CSS."
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "function = myFunction()",
            "function:myFunction()",
            "function myFunction()",
            "create myFunction()"
        ],
        correct: 2,
        explanation: "Functions in JavaScript are declared using the 'function' keyword followed by the function name and parentheses: function myFunction()"
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: [
            "class",
            "style",
            "styles",
            "font"
        ],
        correct: 1,
        explanation: "The 'style' attribute is used to add inline CSS styles directly to HTML elements."
    }
];

// State Management
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedbackText');
const questionCounter = document.getElementById('questionCounter');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progressBar');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update question text
    questionText.textContent = question.question;
    
    // Update progress
    updateProgress();
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Hide feedback and next button
    feedback.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    // Create options
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        
        const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
        
        optionDiv.innerHTML = `
            <span class="option-letter">${optionLetter}</span>
            <span>${option}</span>
        `;
        
        optionDiv.addEventListener('click', () => selectOption(index, optionDiv));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update question counter
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Select Option
function selectOption(selectedIndex, selectedElement) {
    const question = quizQuestions[currentQuestionIndex];
    const allOptions = document.querySelectorAll('.option');
    
    // Disable all options
    allOptions.forEach(option => {
        option.classList.add('disabled');
    });
    
    // Check if answer is correct
    const isCorrect = selectedIndex === question.correct;
    
    // Store user answer
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedIndex: selectedIndex,
        isCorrect: isCorrect
    });
    
    // Update score if correct
    if (isCorrect) {
        score++;
        selectedElement.classList.add('correct');
        showFeedback(true, question.explanation);
    } else {
        selectedElement.classList.add('incorrect');
        // Show the correct answer
        allOptions[question.correct].classList.add('correct');
        showFeedback(false, question.explanation);
    }
    
    // Update score display
    scoreDisplay.textContent = `Score: ${score}`;
    
    // Show next button
    nextBtn.classList.remove('hidden');
}

// Show Feedback
function showFeedback(isCorrect, explanation) {
    feedback.classList.remove('hidden');
    
    if (isCorrect) {
        feedback.classList.remove('incorrect');
        feedback.classList.add('correct');
        feedbackText.innerHTML = `<strong>✓ Correct!</strong><br>${explanation}`;
    } else {
        feedback.classList.remove('correct');
        feedback.classList.add('incorrect');
        feedbackText.innerHTML = `<strong>✗ Incorrect!</strong><br>${explanation}`;
    }
}

// Load Next Question
function loadNextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Update Progress
function updateProgress() {
    const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Show Results
function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    const totalQuestions = quizQuestions.length;
    const correctAnswers = score;
    const incorrectAnswers = totalQuestions - score;
    const accuracy = Math.round((score / totalQuestions) * 100);
    
    // Update results
    document.getElementById('finalScore').textContent = score;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('incorrectAnswers').textContent = incorrectAnswers;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    // Animate score circle
    const circumference = 2 * Math.PI * 90; // radius = 90
    const scoreCircle = document.getElementById('scoreCircle');
    const offset = circumference - (accuracy / 100) * circumference;
    
    setTimeout(() => {
        scoreCircle.style.strokeDashoffset = offset;
    }, 100);
    
    // Set performance message
    const performanceMessage = document.getElementById('performanceMessage');
    if (accuracy >= 90) {
        performanceMessage.textContent = "🌟 Outstanding! You're a quiz master!";
        performanceMessage.style.color = '#4CAF50';
    } else if (accuracy >= 70) {
        performanceMessage.textContent = "👏 Great job! Keep up the good work!";
        performanceMessage.style.color = '#667eea';
    } else if (accuracy >= 50) {
        performanceMessage.textContent = "👍 Good effort! Room for improvement!";
        performanceMessage.style.color = '#FF9800';
    } else {
        performanceMessage.textContent = "📚 Keep learning! You'll do better next time!";
        performanceMessage.style.color = '#f44336';
    }
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    
    resultsScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    
    // Reset progress bar
    progressBar.style.width = '0%';
    
    // Reset score circle
    const scoreCircle = document.getElementById('scoreCircle');
    scoreCircle.style.strokeDashoffset = '565.48';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Quiz Application Loaded Successfully!');
});
