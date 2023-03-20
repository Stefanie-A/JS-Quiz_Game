let s = document.querySelector('.start')
let startButton = document.querySelector('.start-btn')
let Q = document.querySelector('#box-container')
let time = document.querySelector('#time')
let nextButton = document.querySelector('#next_btn')
let questionElement = document.querySelector('.quizMessage')
let answerEl = document.querySelector('.option_list')
let cc = document.querySelector('#scs')
let tt = document.querySelector('.tl')
let t = document.querySelector('.total')
let ttl = document.querySelector('.ttl')
let result = document.querySelector('#result_box')
let overEL = document.querySelector('#over')
let overTX = document.querySelector('#text')
let xEl = document.querySelector('#x')
let currentEL = document.querySelector('.current')
let currentScore = 0;


let questions = [{
    question: "1. Largest country in the world?",
    choices: [{text: "Ireland",correct: false}, {text: "Germany", correct: false}, {text: "China",correct: true}, {text: "Russia",correct: false}],

}, 
{
    question: "2. Who is the President of America?",
    choices: [{text: "Joe Biden", correct: true}, {text: "John Biden", correct: false}, {text: "Ducan Bush",correct: false}, {text: "Donald Trump",correct: false}],
}, 
{
    question: "3. What is the capital of Argentina?",
    choices: [{text: "Dublin",correct: false}, {text: "Bueno Aires", correct: true}, {text: "Sydney",correct: false}, {text: "Ottawa",correct: false}],
    
}, 
{
    question: "4. Longest river in the world?",
    choices: [{text: "Nile",correct: true}, {text: "Mississippi",correct: false}, {text: "Niger", correct: false}, {text: "Limpopo",correct: false}],
}, {
    question: "5. What would following code return? console.log(typeof typeof 1);",
    choices: [{text:"string", correct: true}, {text: "number", correct: false}, {text:"Syntax error", correct: false}, {text:"undefined", correct: false}],
},{
	question: "6. Which software company developed JavaScript?",
    choices: [{text: "Mozilla",correct: false}, {text: "Netscape",correct: true}, {text: "Sun Microsystems",correct: false}, {text: "Oracle",correct: false}],
},{
	question: "7. What would be the result of 3+2+'7'?",
    choices: [{text: "327",correct: false}, {text: "12",correct: false}, {text: "14",correct: false}, {text: "57",correct: true}],
},{
	question: "8. What is the currency of Kenya?",
    choices: [{text: "Dollars",correct: false}, {text: "Cedis", correct: false}, {text: "Shillings",correct: true}, {text: "Pounds",correct: false}],

},{
	question: "9. Who invented the Light Bulb?",
    choices: [{text: "Tom Sower",correct: false}, {text: "Thomas Edison",correct: true}, {text: "karl Benz",correct: false}, {text: "None of these",correct: false}],
},{
	question: "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
    choices: [{text: "'32'", correct: false}, {text: "'122'", correct: true}, {text: "'13'", correct: false}, {text: "'14'",correct: false}],
}];

let shuffleQuestions, currentQuestionIndex;

tt.innerText = questions.length
t.innerText = questions.length
ttl.innerText = questions.length
currentEL.innerText = 1  
let timeleft = 26

const Timer = () => {
    timeleft--;    
    document.querySelector("#time").innerHTML = String(timeleft);
	if (timeleft >= 0){
		setTimeout(Timer, 1000)
	}
	if (timeleft == 0 ){
		Q.classList.add("hide")
		overEL.classList.remove("hide")
		overTX.innerText = "Quiz over"	
		xEl.innerText = currentScore
		startButton.classList.add("hide")
	}
}


const startQuiz = () =>{
	Quiz()
}

const Quiz = () => {
	startButton.classList.add("hide")
	shuffleQuestions = questions.sort()
	currentQuestionIndex = 0

	Q.classList.remove("hide")
	setNextQuestion()
	setTimeout(Timer, 1000);
}


startButton.addEventListener("click", startQuiz)

const setNextQuestion = ()=> {
	resetState();
	displayQuestion(shuffleQuestions[currentQuestionIndex])
}

nextButton.addEventListener("click", () =>{
	currentQuestionIndex++;
	currentEL.innerText = currentQuestionIndex + 1    			  
    setNextQuestion();
})
  
const displayQuestion = (question) => {
	questionElement.innerText = question.question
	question.choices.forEach((answer) => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add("option");		
		if (answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", chooseAnswer);
		answerEl.appendChild(button);
	});
};

function restart(){
	timeleft = 26;
	currentScore = 0
	currentEL.innerText = 1;
	shuffleQuestions = questions.sort();
	result.classList.add("hide");
	overEL.classList.add("hide");
	Quiz()	
}
const resetState = () => {
	clearStatusClass(document.body);
	nextButton.classList.add("hide")
	while (answerEl.firstChild) {
		answerEl.removeChild(answerEl.firstChild)
	}
}

const chooseAnswer = (e) => {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct === "true";
  
	setStatusClass(document.body, correct);
	Array.from(answerEl.children).forEach((button) => {
	  setStatusClass(button, button.dataset.correct === "true");
	});
  
	if (correct) {
	  currentScore++;
	}
  
	if (shuffleQuestions.length > currentQuestionIndex + 1){
				nextButton.classList.remove("hide")
		}else {
			Q.classList.add("hide")
			result.classList.remove("hide")
			tt.innerText = questions.length
			t.innerText = questions.length
			cc.innerText = currentScore		
			startButton.classList.add("hide")
			overEL.classList.add("hide")
			Q.classList.add("hide")
			timeleft = 0
		} 
	}
const setStatusClass = (element, correct) => {
	clearStatusClass(element)
	// if (correct) {
	// 	numCorrect++;
	// }
}
const clearStatusClass = (element) => {
	element.classList.remove("correct")
	element.classList.remove("wrong")
}

