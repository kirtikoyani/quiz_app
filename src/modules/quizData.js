const quizData = {
  state: {
    step: 1,
    currentQuestion: {
      id: 1,
      questionTitle: "",
      options: ["", ""],
      rightAnsindex: "",
    },
    quizData: {
      createdBy: {
        id: "",
        name: "",
      },
      quizTopic: "",
      selectedRelevantTopic: [""],
      difficultyLevel: "",
      questions: [],
      attendees:[]
    },
    quizDatas: [],
    isEdit: false,
  },
  getters: {
    currentStep: (state) => state.step,
    currentQuestion: (state) => state.currentQuestion,
    quizData: (state) => state.quizData,
    quizDatas: (state) => state.quizDatas,
    isEdit: (state) => state.isEdit,
  },
  mutations: {
    setStep(state, step) {
      state.step = step;
    },
    setCurrentQuestion(state, question) {
      state.currentQuestion = question;
    },
    setQuizData(state, quizData) {
      state.quizData = quizData;
    },
    setQuizDatas(state, quizDatas) {
      state.quizDatas = quizDatas;
    },
    setIsEdit(state, isEdit) {
      state.isEdit = isEdit;
    },
    addOption(state, question) {
      if (question.options.length < 4) {
        question.options.push("");
      }
    },
    addTopic(state, topic) {
      state.quizData.selectedRelevantTopic = topic;
    },
    addNewQuestion(state) {
      const newQuestionId = state.quizData.questions.length + 1;
      state.quizData.questions.push({
        id: newQuestionId,
        questionTitle: "",
        options: ["", ""],
        rightAnsindex: "",
      });
      state.currentQuestion = state.quizData.questions[newQuestionId - 1];
    },
    removeTopic(state, { topic, index }) {
      const selectedOptions = topic.selectedRelevantTopic.filter((option) => {
        return topic.selectedRelevantTopic.indexOf(option) !== index;
      });
      topic.selectedRelevantTopic = selectedOptions;
    },
    removeQuestion(state, { index }) {
      state.quizData.questions.splice(index, 1);
    },
    removeOption(state, { question, index }) {
      const selectedOptions = question.options.filter((option, i) => i !== index);
      question.options = selectedOptions;
    },
    setDefaultState(state){
      state.step = 1;
    state.currentQuestion = {
      id: 1,
      questionTitle: "",
      options: ["", ""],
      rightAnsindex: "",
    };
    state.quizData = {
      createdBy: {
        id: "",
        name: "",
      },
      quizTopic: "",
      selectedRelevantTopic: [""],
      difficultyLevel: "",
      questions: [],
    };
    state.quizDatas = [];
    state.isEdit = false;
    }
  },
  actions: {
    addOption({ commit }, question) {
      if (question.options.length < 4) {
        commit("addOption", question);
      }
    },
    addTopic({ commit, state }, topic) {
      const relevantTopics = state.quizData.selectedRelevantTopic.filter(
        (t) => t !== ""
      );
      const updatedTopics = [...relevantTopics, topic];
      commit("addTopic", updatedTopics);
    },
    removeTopic({ commit }, { topic, index }) {
      commit("removeTopic", { topic, index });
    },
    removeQuestion({ commit }, { index }) {
      commit("removeQuestion", { index });
    },
    removeOption({ commit }, { question, index }) {
      commit("removeOption", { question, index });
    },
    nextStep({ commit, state }) {
      if (state.step === 1 && state.quizData.quizTopic !== "") {
        commit("setStep", 2);
      } else if (
        state.step === 2 &&
        state.quizData.selectedRelevantTopic !== ""
      ) {
        commit("setStep", 3);
      } else if (state.step === 3 && state.quizData.difficultyLevel !== "") {
        commit("setStep", 4);
        if (!state.isEdit) {
          commit("addNewQuestion");
        }
      }
    },
    nextQuestion({ commit, state }) {
      // if (state.isEdit) {
      const currentQuestionIndex = state.quizData.questions.findIndex(
        (question) => question.id === state.currentQuestion.id
      );
      if (currentQuestionIndex < state.quizData.questions.length - 1) {
        const nextQuestion = state.quizData.questions[currentQuestionIndex + 1];
        commit("setCurrentQuestion", nextQuestion);
      } else {
        commit("addNewQuestion");
      }
      // }
      //  else {
      //   const currentQuestionIndex = state.quizData.questions.findIndex(
      //     (question) => question.id === state.currentQuestion.id
      //   );
      //   if (currentQuestionIndex < state.quizData.questions.length - 1) {
      //     const nextQuestion = state.quizData.questions[currentQuestionIndex + 1];
      //     commit('setCurrentQuestion', nextQuestion);
      //   } else {
      //     commit('addNewQuestion');
      //   }
      // }
    },
    submitForm({ state }) {
      const userdata = JSON.parse(localStorage.getItem("user"));
      state.quizData.createdBy = {
        id: userdata.id,
        name: userdata.name,
      };
      if (state.isEdit) {
        const editedQuizIndex = state.quizDatas.findIndex(
          (quiz) => quiz.id === state.quizData.id
        );
        if (editedQuizIndex !== -1) {
          state.quizDatas.splice(editedQuizIndex, 1, state.quizData);
          localStorage.setItem("quizData", JSON.stringify(state.quizDatas));
        }
      } else {
        const quizDataWithId = {
          id: Date.now(),
          ...state.quizData,
        };
        state.quizDatas.push(quizDataWithId);
        localStorage.setItem("quizData", JSON.stringify(state.quizDatas));
      }
      return true;
    },
    getDatasFromStorage({ commit }) {
      const datas = JSON.parse(localStorage.getItem("quizData") || "[]");
      commit("setQuizDatas", datas);
    },
    loadEditedUser({ state }, id) {
      for (let i = 0; i < state.quizDatas.length; i++) {
        if (state.quizDatas[i].id == id) {
          state.quizData = state.quizDatas[i];
          state.isEdit = true;
          return true;
        }
      }
    },
    resetState({ commit }) {
      commit("setDefaultState");
    },
  },
};
export default quizData;
