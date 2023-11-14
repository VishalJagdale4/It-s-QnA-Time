const data = [];

const submitButton = document.getElementById("submit-button");
submitButton.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
  const addQuestionButton = document.getElementById("addQuestion");
  const quizQuestionsContainer = document.querySelector(".quiz-questions");
  addQuestionButton.addEventListener("click", function () {
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("questionContainer");

    const question = document.createElement("div");
    question.classList.add("question");

    const questionLabel = document.createElement("p");
    questionLabel.className = "questionLabel";
    questionLabel.textContent = "Q. ";

    const questionInput = document.createElement("input");
    questionInput.type = "text";
    questionInput.placeholder = `Enter question`;
    questionInput.classList.add("questionInput");
    questionInput.setAttribute("name", "question");

    const removeQuestionButton = document.createElement("button");
    removeQuestionButton.classList.add("removeQuestionButton");
    removeQuestionButton.innerHTML = "X";

    question.appendChild(questionLabel);
    question.appendChild(questionInput);
    question.appendChild(removeQuestionButton);

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options");

    for (let optionLetter of ["a", "b", "c", "d"]) {
      const optionAlign = document.createElement("div");
      optionAlign.classList.add("option-align");

      const optionInput = document.createElement("input");
      optionInput.type = "text";
      optionInput.placeholder = `Option ${optionLetter.toUpperCase()}`;
      optionInput.classList.add("option-input");
      optionInput.setAttribute("name", optionLetter);

      const optionLabel = document.createElement("optionLabel");
      optionLabel.textContent = `${optionLetter.toUpperCase()})`;

      optionAlign.appendChild(optionLabel);
      optionAlign.appendChild(optionInput);
      optionsContainer.appendChild(optionAlign);
    }

    const answer = document.createElement("div");
    answer.classList = "answer";

    const answerLabel = document.createElement("label");
    answerLabel.textContent = "Answer";

    const answers = [
      { value: "null", label: "Select" },
      { value: "a", label: "a" },
      { value: "b", label: "b" },
      { value: "c", label: "c" },
      { value: "d", label: "d" },
    ];

    const answerDropdown = document.createElement("select");
    answers.forEach((answersData) => {
      const answerElement = document.createElement("option");
      answerElement.value = answersData.value;
      answerElement.textContent = answersData.label;
      answerDropdown.appendChild(answerElement);
    });
    answerDropdown.classList = "answersDropdownList";

    answer.appendChild(answerLabel);
    answer.appendChild(answerDropdown);

    questionContainer.appendChild(question);
    questionContainer.appendChild(optionsContainer);
    questionContainer.appendChild(answer);

    quizQuestionsContainer.appendChild(questionContainer);

    if (quizQuestionsContainer.childNodes.length) {
      submitButton.style.display = "block";
    }

    removeQuestionButton.addEventListener("click", () => {
      quizQuestionsContainer.removeChild(questionContainer);

      if (!quizQuestionsContainer.childNodes.length)
        submitButton.style.display = "none";
    });
  });
});

const duration = document.getElementById("duration");
const title = document.getElementById("title");

let emptyBoxes = (boxElement, input) => {
  if (input == "") {
    boxElement.style.borderColor = "red";
    return true;
  } else boxElement.style.borderColor = "black";
  return false;
};

submitButton.addEventListener("click", () => {
  let question = "";
  let a = "";
  let b = "";
  let c = "";
  let d = "";
  let ans = "";

  const questionData = document.querySelectorAll('input[name="question"]');

  const optionA = document.querySelectorAll('input[name="a"]');
  const optionB = document.querySelectorAll('input[name="b"]');
  const optionC = document.querySelectorAll('input[name="c"]');
  const optionD = document.querySelectorAll('input[name="d"]');

  const answer = document.querySelectorAll("select");

  const questionAndOptions = [];

  let incomplete = false;

  questionData.forEach((element, index) => {
    question = element.value;
    a = optionA[index].value;
    b = optionB[index].value;
    c = optionC[index].value;
    d = optionD[index].value;
    ans = answer[index].value;

    emptyBoxes(element, question) ? (incomplete = true) : null;
    emptyBoxes(optionA[index], a) ? (incomplete = true) : null;
    emptyBoxes(optionB[index], b) ? (incomplete = true) : null;
    emptyBoxes(optionC[index], c) ? (incomplete = true) : null;
    emptyBoxes(optionD[index], d) ? (incomplete = true) : null;

    if (ans == "null") {
      answer[index].style.background = "red";
      incomplete = true;
    } else answer[index].style.background = "white";

    if (!incomplete)
      questionAndOptions.push({
        question: question,
        a: a,
        b: b,
        c: c,
        d: d,
        answer: ans,
      });
  });

  if (!duration.value) duration.style.borderColor = "red";
  else duration.style.borderColor = "black";

  if (!title.value) title.style.borderColor = "red";
  else title.style.borderColor = "black";

  if (duration.value && title.value && !incomplete) {
    data.push({ duration: duration.value, title: title.value });
    data.push(questionAndOptions);
    localStorage.setItem("data", JSON.stringify(data));
    window.location.href = "../Quiz/index.html";
  }
});
