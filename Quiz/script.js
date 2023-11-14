const data = JSON.parse(localStorage.getItem("data"));
let questions = data[1];
const time = data[0];

const submitButton = document.getElementById("submit-button");
const confirmButton = document.querySelectorAll(".confirm");
let answered = [];
let totalScore = questions.length;
let score = 0;
let index = 1;

const title = document.getElementById("title");
title.innerHTML = time.title;

for (let question of questions) {
  const quizQuestionsContainer = document.querySelector(".quiz-questions");

  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question-container");

  const questionTitle = document.createElement("h3");
  questionTitle.textContent = `Q.${index++} ${question.question}`;
  questionTitle.classList.add("question");

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options");

  for (let option of [question.a, question.b, question.c, question.d]) {
    const optionAlign = document.createElement("div");
    optionAlign.classList.add("option-align");

    const optionBlock = document.createElement("div");
    optionBlock.classList.add("option");

    const optionInput = document.createElement("input");
    optionInput.type = "radio";

    const optionLabel = document.createElement("label");
    optionLabel.textContent = `${option}`;

    optionBlock.appendChild(optionInput);
    optionBlock.appendChild(optionLabel);

    optionAlign.appendChild(optionBlock);
    optionsContainer.appendChild(optionAlign);

    questionContainer.appendChild(questionTitle);
    questionContainer.appendChild(optionsContainer);
    quizQuestionsContainer.appendChild(questionContainer);
  }

  const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');

  radioButtons.forEach(function (button) {
    button.addEventListener("change", function () {
      radioButtons.forEach(function (otherButton) {
        if (otherButton !== button) {
          otherButton.checked = false;
        }
      });
    });
  });

  confirmButton.forEach((button) => {
    button.addEventListener("click", () => {
      radioButtons.forEach((button, i) => {
        if (button.checked == true) {
          if (getOptionId(question.answer) === i + 1) {
            questionContainer.style.backgroundColor = "green";
            questionContainer.style.color = "white";
            score++;
          } else {
            questionContainer.style.backgroundColor = "red";
            questionContainer.style.color = "white";
          }
        } else button.disabled = true;
      });
      document.getElementById(
        "show-score"
      ).textContent = `Result: ${score}/${totalScore}`;
    });
  });
}

function checkAllChecked() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  answered = Array.from(radioButtons).filter((button) => button.checked);

  return questions.length == answered.length;
}

submitButton.addEventListener("click", () => {
  checkAllChecked()
    ? showConfirmDialog()
    : alert("All questions are mandatory!");
});

function getOptionId(option) {
  switch (option) {
    case "a":
      return 1;
    case "b":
      return 2;
    case "c":
      return 3;
    case "d":
      return 4;
  }
}

function showConfirmDialog() {
  var overlay = document.getElementById("overlay");
  var confirmDialog = document.getElementById("confirmDialog");

  overlay.style.display = "block";
  confirmDialog.style.display = "block";
}

function hideDialog(submit) {
  var overlay = document.getElementById("overlay");
  var confirmDialog = document.getElementById("confirmDialog");
  var submitting = document.getElementById("submitting");

  if (submit) {
    submitButton.innerHTML = "Quiz is Ended!";
    submitButton.disabled = true;
    document.getElementById("home").style.display = "block";
    clearInterval(countdownInterval);
  }

  overlay.style.display = "none";
  confirmDialog.style.display = "none";
  submitting.style.display = "none";
}

function showSubmittingDialogBox() {
  var overlay = document.getElementById("overlay");
  var confirmDialog = document.getElementById("submitting");

  overlay.style.display = "block";
  confirmDialog.style.display = "block";
}

var endTime = Date.now() + time.duration * 60000;
const timerSpan = document.getElementById("timer");

var countdownInterval = setInterval(function () {
  var currentTime = Date.now();
  var remainingTime = endTime - currentTime;

  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    showSubmittingDialogBox();
  } else {
    var minutes = Math.floor(remainingTime / 60000);
    var seconds = Math.floor((remainingTime % 60000) / 1000);

    timerSpan.textContent =
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds;
  }
}, 1000);
