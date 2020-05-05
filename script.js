
let questionIndex = 0
let selected = false
let correctAnswerCount = 0
let correctAnswerId = null

function init () {
  const nextButton = document.getElementById('quiz-next')
  nextButton.addEventListener('click', nextButtonFn(nextButton))
}

function nextButtonFn (nextButton) {
  return () => {
    if (questionIndex === allQuestions.length) {
      theEnd()
      return
    }
    removeSelected()
    const total = document.getElementById('index')
    total.innerHTML = questionIndex + 1
    const currentQuestion = allQuestions[questionIndex]
    appendQuestion(currentQuestion)
    questionIndex++
  }
}

function theEnd () {
  const questionDisplay = document.getElementById('quiz-question')
  questionDisplay.style.color = 'black'
  questionDisplay.innerHTML = '... & that is the End, Refresh to start all over'
  const quizEnd = document.getElementById('quiz-end')
  const finalCorrect = document.getElementById('correct-index')
  quizEnd.innerHTML = `Out of 5 questions, you scored ${finalCorrect.innerText}`
  const quizOptions = document.getElementById('quiz-options')
  quizOptions.style.display = 'none'
  const quizNext = document.getElementById('quiz-next')
  quizNext.style.display = 'none'
}

function removeSelected() {
  const questionAr = ['first-option', 'second-option', 'third-option']
  for (let index = 0; index < questionAr.length; index++) {
    const element = questionAr[index];
    const option = document.getElementById(element)
    if (option.classList.contains('correctAnswer')) {
      option.classList.remove('correctAnswer')
      option.removeEventListener('click', correctAnswer)
    } else {
      option.classList.remove('wrongAnswer')
      option.removeEventListener('click', wrongAnswer)
    } 
  }
  selected = false
  correctAnswerId = null
}

function appendQuestion(question) {
  const questionDisplay = document.getElementById('quiz-question')
  questionDisplay.innerHTML = question.question
  const questionAr = ['first-option', 'second-option', 'third-option']
  const rand = Math.floor(Math.random() * 3) + 1
  correctAnswerId = questionAr[rand - 1]
  const correctOption = document.getElementById(questionAr[rand - 1])
  correctOption.innerHTML = question.rightOption
  correctOption.addEventListener('click', correctAnswer)
  console.log('Coorect answer', correctAnswerId)
  questionAr.splice(rand - 1, 1)
  console.log(questionAr)
  for (let index = 0; index < questionAr.length; index++) {
    const element = questionAr[index]
    const wrongOption = document.getElementById(element)
    wrongOption.innerHTML = question.wrongOptions[index]
    wrongOption.addEventListener('click', wrongAnswer)
  }
}

function correctAnswer(e) {
  if (selected) return
  const correctAnswerIndex =  document.getElementById('correct-index')
  correctAnswerCount++
  correctAnswerIndex.innerHTML = correctAnswerCount
  e.srcElement.classList.add('correctAnswer')
  selected = true
}

function wrongAnswer(e) {
  if (selected) return
  e.srcElement.classList.add('wrongAnswer')
  const firstOption = document.getElementById(correctAnswerId)
  firstOption.classList.add('correctAnswer')
  selected = true
}

init()