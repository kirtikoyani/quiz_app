<template>
<div class="quiz-container">
    <div v-if="currentQuestion">
        <div class="question-info">
            <span class="question-index">{{ currentQuestionIndex + 1 }}</span>
            <span class="question-total">/{{ questions.length }}</span>
        </div>
        <div class="question-header">
            <span class="question-number">{{ currentQuestionIndex + 1 }}.</span>
            <span class="question-title">{{ currentQuestion.questionTitle }}</span>
        </div>
        <ul class="choices">
            <li v-for="(choice, index) in currentQuestion.options" :key="index">
                <label>
                    <input type="radio" :name="currentQuestionIndex" :value="index" v-model="userAnswers[currentQuestionIndex]" />
                    <span class="choice-text">{{ choice }}</span>
                </label>
            </li>
        </ul>
    </div>
    <!-- <div class="navigation-buttons">
        <button v-if="currentQuestionIndex > 0" class="previous-button" @click="previousQuestion">Previous</button>
        <button v-if="currentQuestionIndex < questions.length - 1" class="next-button" @click="nextQuestion">Next</button>
        <button v-if="currentQuestionIndex === questions.length - 1" class="view-results" @click="showResults">View Results</button>
    </div> -->
    <div class="navigation-buttons">
      <button v-if="currentQuestionIndex > 0" class='previous-button' @click="previousQuestion">Previous</button>
      <button v-if="currentQuestionIndex < questions.length - 1" :class="{ 'disabled-button': !hasUserAnswer ,'next-button':hasUserAnswer}" @click="nextQuestion">Next</button>
      <button v-if="currentQuestionIndex === questions.length - 1" :class="{ 'disabled-button': !hasUserAnswer ,'view-results':hasUserAnswer}" @click="showResults">View Results</button>
    </div>
    <div v-if="showResultsPopup" class="results-popup">
      <div class="popup-content">
        <h3>Your Quiz Results</h3>
        <p class="result-message">{{ resultMessage }}</p>
      <img src="https://i.pinimg.com/originals/df/fa/5a/dffa5a927a84cbbb1020e885c018bbf2.gif" alt="Celebration Animation" />
        <button class="close-button" @click="closeResultsPopup">Close</button>
      </div>
    </div>
    <span v-if="currentQuestionIndex === questions.length - 1" class="my-results">{{ resultMessage }}</span>
</div>
</template>


<script>
export default {
    data() {
        return {
            questions: [],
            userAnswers: [],
            currentQuestionIndex: 0,
            resultMessage: "My results will appear here",
            showResultsPopup: false,
        };
    },
    props: ['id'],
    mounted() {
        this.getQuestionsFromStorage();
    },
    methods: {
        getQuestionsFromStorage() {
            const quizData = JSON.parse(localStorage.getItem("quizData") || "[]");
            const userQuizs = JSON.parse(localStorage.getItem("user") || "{}");
            const quiz = quizData.find(d => d.id == this.id);

            if (quiz) {
                this.questions = quiz.questions;
            }

            if (userQuizs[this.id]) {
                this.resultMessage = `Your score is ${userQuizs[this.id]}/${this.questions.length}`;
            }
        },
        previousQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
            }
        },
        nextQuestion() {
            if (this.currentQuestionIndex < this.questions.length - 1 && this.hasUserAnswer) {
                this.currentQuestionIndex++;
            }
        },
        showResults() {
          if(this.hasUserAnswer){
            const score = this.calculateScore();
            const userInfo = JSON.parse(localStorage.getItem('datas') || '[]');
            const quizInfo = JSON.parse(localStorage.getItem('quizData') || '[]');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const userIndex = userInfo.findIndex(info => info.id === user.id);
            const quizIndex1 = quizInfo.findIndex(q => q.id == this.id);
            //console.log(quizInfo, quizIndex1)
            if (quizIndex1 !== -1) {
                if (!quizInfo[quizIndex1].attendees) {
                    quizInfo[quizIndex1].attendees = [];
                } else {
                    // Remove previous attendee with the same id
                    quizInfo[quizIndex1].attendees = quizInfo[quizIndex1].attendees.filter(
                        attendee => attendee.id !== user.id
                    );
                }

                quizInfo[quizIndex1].attendees.push({
                    id: user.id,
                });

                localStorage.setItem('quizData', JSON.stringify(quizInfo));
            }

            if (userIndex !== -1) {
                if (!userInfo[userIndex].quizzes) {
                    userInfo[userIndex].quizzes = [];
                }
                const quizIndex = userInfo[userIndex].quizzes.findIndex(q => q.id === this.id);

                if (quizIndex !== -1) {
                    userInfo[userIndex].quizzes[quizIndex].score = score;
                } else {
                    userInfo[userIndex].quizzes.push({
                        id: this.id,
                        score,
                    });
                }
            }
            localStorage.setItem('datas', JSON.stringify(userInfo));
            this.resultMessage = `Your score is ${score}/${this.questions.length}`;
            this.showResultsPopup = true;
          }
        },
    //     showResultPopup() {
    //   if (this.hasUserAnswer) {
    //     this.showResultsPopup = true; // Show the results popup
    //   }
    // },

    closeResultsPopup() {
      this.showResultsPopup = false; // Close the results popup
    },
        calculateScore() {
            let score = 0;
            for (let i = 0; i < this.questions.length; i++) {
                if (this.userAnswers[i] == this.questions[i].rightAnsindex) {
                    score++;
                }
            }
            return score;
        },
    },
    computed: {
        currentQuestion() {
            return this.questions[this.currentQuestionIndex] || null;
        },
        hasUserAnswer() {
      return typeof this.userAnswers[this.currentQuestionIndex] !== 'undefined';
    }
    },
};
</script>


<style>

.disabled-button {
  padding: 10px 20px;
    background-color: #888;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
    cursor: not-allowed;
}
.quiz-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.question-info {
    text-align: right;
    font-size: 14px;
    color: #888;
}

.question-total {
    font-weight: bold;
}

.question-header {
    margin-top: 20px;
}

.question-number {
    font-weight: bold;
    margin-right: 5px;
}

.question-title {
    font-size: 18px;
    font-weight: bold;
}

.choices {
    margin-top: 20px;
    list-style-type: none;
    padding: 0;
}

.choices li {
    margin-bottom: 10px;
}

.choices label {
    display: flex;
    align-items: center;
}

.choices input[type="radio"] {
    margin-right: 10px;
}

.navigation-buttons {
    margin-top: 20px;
    text-align: center;
}

.previous-button,
.next-button,
.view-results {
    padding: 10px 20px;
    background-color: #2A265F;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
}

.my-results {
    display: block;
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
}

.results-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  background-image: url('https://cliply.co/wp-content/uploads/2019/08/371908020_CONFETTI_400px.gif');

  max-width: 400px;
  text-align: center;
  /* animation: fade-in 0.3s; */
  opacity: 0;
  transform: translateY(-10px);
  animation: fade-in 0.5s forwards;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.close-button {
  padding: 10px 20px;
  background-color: #2A265F;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}
.celebration-animation {
  text-align: center;
  margin-top: 20px;
}

.celebration-animation img {
  max-width: 100%;
  height: auto;
}
.result-message {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2A265F;
  text-align: center;
}
</style>
