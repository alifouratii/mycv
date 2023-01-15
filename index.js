//
// lib/lib.js
//
var Question = function (questionObj) {
    this.value = {
      text: "Question",
      answers: []
    };
  
    this.selectedAnswer = null;
    this.html = null;
    this.questionText = null;
    this.questionAnswers = null;
    this.questionFeedback = null;
  
    this.value = Object.assign(this.value, questionObj);
  
    this.onQuestionAnswered = ({ detail }) => {
      this.selectedAnswer = {
        value: detail.answer,
        html: detail.answerHtml
      };
      this.update();
  
      document.dispatchEvent(
        new CustomEvent("question-answered", {
          detail: {
            question: this,
            answer: detail.answer
          }
        })
      );
    };
  
    this.create = function () {
      this.html = document.createElement("div");
      this.html.classList.add("question");
  
      this.questionText = document.createElement("h2");
      this.questionText.textContent = this.value.text;
  
      this.questionAnswers = document.createElement("div");
      this.questionAnswers.classList.add("answers");
  
      for (let i = 0; i < this.value.answers.length; i++) {
        const ansObj = this.value.answers[i];
        let answer = createAnswer(ansObj);
  
        answer.onclick = (ev) => {
          if (this.selectedAnswer !== null) {
            this.selectedAnswer.html.classList.remove("selected");
          }
  
          answer.classList.add("selected");
  
          this.html.dispatchEvent(
            new CustomEvent("question-answered", {
              detail: {
                answer: ansObj,
                answerHtml: answer
              }
            })
          );
        };
  
        this.questionAnswers.appendChild(answer);
      }
  
      this.questionFeedback = document.createElement("div");
      this.questionFeedback.classList.add("question-feedback");
  
      this.html.appendChild(this.questionText);
      this.html.appendChild(this.questionAnswers);
      this.html.appendChild(this.questionFeedback);
  
      this.html.addEventListener("question-answered", this.onQuestionAnswered);
  
      return this.html;
    };
  
    this.disable = function () {
      this.html.classList.add("disabled");
      this.html.onclick = (ev) => {
        ev.stopPropagation();
      };
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      let answers = this.html.querySelectorAll(".answer");
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        answer.onclick = null;
      }
    };
  
    this.remove = function () {
      let children = this.html.querySelectorAll("*");
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        this.html.removeChild(child);
      }
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      this.html.parentNode.removeChild(this.html);
      this.html = null;
    };
  
    this.update = function () {
      let correctFeedback, incorrectFeedback;
      this.html = this.html || document.createElement("div");
  
      correctFeedback = "Nice! You got it right.";
      incorrectFeedback = "Oh! Not the correct answer.";
  
      if (this.selectedAnswer !== null) {
        if (this.selectedAnswer.value.isCorrect) {
          this.html.classList.add("correct");
          this.html.classList.remove("incorrect");
          this.questionFeedback.innerHTML = correctFeedback;
        } else {
          this.html.classList.add("incorrect");
          this.html.classList.remove("correct");
          this.questionFeedback.innerHTML = incorrectFeedback;
        }
      }
    };
  
    function createAnswer(obj) {
      this.value = {
        text: "Answer",
        isCorrect: false
      };
  
      this.value = Object.assign(this.value, obj);
  
      this.html = document.createElement("button");
      this.html.classList.add("answer");
  
      this.html.textContent = this.value.text;
  
      return this.html;
    }
  };
  
  //
  // main.js
  //
  
  let questionsData = [
    {
      text: "What is the WWW",
      answers: [
        {
          text: "Web Wide World",
          isCorrect: false
        },
        {
          text: "World Wide Web",
          isCorrect: true
        },
        {
          text: "World Web Wide ",
          isCorrect: false
        }
      ]
    },
    {
      text: "Merchant sites",
      answers: [
        {
          text: " developer allowing to sell products to Internet users and possibly to pay online ",
          isCorrect: true
        },
        {
          text: "are made by individuals for leisure, or in a professional setting",
          isCorrect: false
        },
        {
          text: "are accessible from within a company or organization",
          isCorrect: false
        },
      
      ]
    },
    {
      text: "Which organization defines web standards",
      answers: [
        {
          text: "IBM Corporation",
          isCorrect: false
        },
        {
          text: 'Microsoft Corporation"',
          isCorrect: false
        },
        {
          text: "World Wide Web Consortium",
          isCorrect: true
        }
      ]
    },
    {
      text: "HTML is considered to be",
      answers: [
        {
          text: "Markup language",
          isCorrect: true
        },
        {
          text: "Programming language",
          isCorrect: false
        },
        {
          text: "High-level language",
          isCorrect: false
        },
        {
          text: "POO Language",
          isCorrect: false
        }
      ]
    },
    {
      text: "HTML was first proposed this year",
      answers: [
        {
          text: "1990",
          isCorrect: true
        },
        {
          text: "1980",
          isCorrect: false
        },
        {
          text: "1995",
          isCorrect: true
        },
        {
          text: "2000",
          isCorrect: false
        }
      ]
    },
    {
        text: "Which of the following is not an example of a browser",
        answers: [
          {
            text: "Netscape",
            isCorrect: false
          },
          {
            text: "Microsoft Bing",
            isCorrect: true
          },
          {
            text: " Opéra ",
            isCorrect: false
          }
        ]
      },
      {
        text: " Who is the main author of HTML",
        answers: [
          {
            text: "Brendan Eich",
            isCorrect: false
          },
          {
            text: "Tim Berners-Lee",
            isCorrect: true
          },
          {
            text: "Google Inc ",
            isCorrect: false
          }
        ]
      },
      {
        text: "If we want to set the style of a single element, which css selector will we use",
        answers: [
          {
            text: "class",
            isCorrect: false
          },
          {
            text: "id",
            isCorrect: true
          },
          {
            text: "text ",
            isCorrect: false
          }
        ]
      },
      {
        text: "A stricter HTML document type is known as",
        answers: [
          {
            text: "DHTML",
            isCorrect: false
          },
          {
            text: "XHTML",
            isCorrect: true
          },
          {
            text: "XML",
            isCorrect: false
          }
        ]
      },
      {
        text: "The HTML standard that does not require double quotes around the values of an attribute is said to",
        answers: [
          {
            text: "HTML 3",
            isCorrect: false
          },
          {
            text: "HTML 5",
            isCorrect: true
          },
          {
            text: "HTML 1 ",
            isCorrect: false
          }
        ]
      },
    
  ];
  
  // variables initialization
  let questions = [];
  let score = 0,
    answeredQuestions = 0;
  let appContainer = document.getElementById("questions-container");
  let scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;
  
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} arr items An array containing the items.
   */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  shuffle(questionsData);
  
  // creating questions
  for (var i = 0; i < questionsData.length; i++) {
    let question = new Question({
      text: questionsData[i].text,
      answers: questionsData[i].answers
    });
  
    appContainer.appendChild(question.create());
    questions.push(question);
  }
  
  document.addEventListener("question-answered", ({ detail }) => {
    if (detail.answer.isCorrect) {
      score++;
    }
  
    answeredQuestions++;
    scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
    detail.question.disable();
  
    if (answeredQuestions == questions.length) {
      setTimeout(function () {
        alert(`Quiz completed! \nFinal score: ${score}/${questions.length}`);
      }, 100);
    }
  });
  
  console.log(questions, questionsData);
  