<template>
<div class="main_div">
    <!-- Step 1: Select Topic -->
    <div class="container" v-if="step === 1">
        <form action="#" class="mcqForm">
            <div class="title">Select Topic</div>
            <div class="input-box underline">
                <input type="text" name="language" placeholder="Add Quiz Topic" id="language" v-model="quizData.quizTopic" required />
                <div class="underline"></div>
            </div>
        </form>
        <div class="input-box button">
            <button type="button" class="next-button" @click="nextStep">Next</button>
        </div>
    </div>

    <!-- Step 2: Select Relevant Topic -->
    <div class="container" v-else-if="step === 2">
        <form action="#" class="mcqForm">
            <div class="title">Select Relevant Topic</div>
            <div class="input-box underline" v-for="(topic, index) in quizData.selectedRelevantTopic" :key="index">
                <input type="text" name="relaventTopic" :placeholder="`Enter relaventTopic ${index + 1}`" v-model="quizData.selectedRelevantTopic[index]" required />
                <div class="underline"></div>
                <button type="button" class="remove-option-button" @click="removeTopic({ topic: quizData, index })">&#x2716;</button>
            </div>
            <button type="button" class="add-btn" @click="addTopic(quizData.selectedRelevantTopic[index])">Add Topic</button>
        </form>
        <div class="input-box button">
            <button type="button" v-if='step>1' class="previous-button" @click="previousStep">Previous</button>
            <button type="button" class="next-button" @click="nextStep">Next</button>
        </div>
    </div>

    <!-- Step 3: Select Difficulty Level -->
    <div class="container" v-else-if="step === 3">
        <form action="#" id="mcqForm">
            <div class="title">Select difficulty level</div>
            <div class="input-box underline">
                <select name="levels" id="levels" v-model="quizData.difficultyLevel" required>
                    <option value="" selected disabled hidden>Choose difficulty level</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <div class="underline"></div>
            </div>
        </form>
        <div class="input-box button">
            <button type="button" class="previous-button" v-if='step>1' @click="previousStep">Previous</button>
            <button type="button" class="next-button" @click="nextStep">Next</button>
        </div>
    </div>

    <!-- Step 4: Add Questions and Options -->
    <div class="container" v-else-if="step === 4">
        <form @submit.prevent="submitForm" class="mcqForm">
            <div v-for="(currentQuestion,index) in quizData.questions" :key="currentQuestion.id">
                <div class="title">Question {{ currentQuestion.id }}</div>
                <div class="input-box underline">
                    <input type="text" :id="'questionTitle-' + currentQuestion.id" :placeholder="'Enter Quiz Title for Question ' + currentQuestion.id" v-model="currentQuestion.questionTitle" required />
                    <div class="underline"></div>
                </div>
                <div class="input-box" v-for="(option, index) in currentQuestion.options" :key="index">
                    <input type="text" :id="'option-' + currentQuestion.id + '-' + (index + 1)" class="option-input" :placeholder="`Enter Option ${index + 1}`" v-model="currentQuestion.options[index]" required />
                    <div class="underline"></div>
                    <button type="button" class="remove-option-button" @click="removeOption({ question: currentQuestion, index })">
                    &#x2716;
                    </button>
                </div>
                <div class="input-box" v-if="currentQuestion.options.length < 4">
                    <button type="button" class="next-button" @click="addOption(currentQuestion)">Add Option</button>
                </div>
                <div class="input-box underline">
                    <input type="text" :id="'rightAnsindex-' + currentQuestion.id" :placeholder="'Enter right option index' + currentQuestion.id" v-model="currentQuestion.rightAnsindex" required />
                    <div class="underline"></div>
                </div>
                <button type="submit" class="remove-option-button" @click.prevent="removeQuestion({ quizData, index })">Remove</button>
            </div>
            <div class="input-box">
                <button type="submit" class="next-button" @click.prevent="nextQuestion">Next</button>
            </div>
            <div class="input-box button">
                <button type="button" class="previous-button" v-if='step>1' @click="previousStep">Previous</button>
                <button type="submit" class="next-button">{{isEdit ? 'Update Quiz':'Create Quiz'}}</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";

export default {
    name: "quizPage",
    mounted() {
        this.$store.dispatch("getDatasFromStorage");
    },
    beforeUnmount() {
        this.$store.dispatch("resetState");
    },
    methods: {
        ...mapActions(["nextStep", "addOption", "addTopic", "nextQuestion","removeOption","removeTopic","removeQuestion"]),
        previousStep() {
            this.$store.commit('setStep', this.step - 1);
        },
        submitForm() {
            this.$store.dispatch("submitForm")
                .then((res) => {
                    console.log(res)
                    if (res) {
                        this.$router.push('/');
                    }
                })
        }
    },
    computed: {
        ...mapGetters({
            step: "currentStep",
            quizData: "quizData",
            currentQuestion: "currentQuestion",
            quizDatas: "quizDatas",
            isEdit: "isEdit",
        }),

    },
};
</script>

<style scoped>
.main_div {
    margin-top: 15px;
}

.previous-button,
.add-btn,
.next-button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 14px;
    color: white;
    background-color: #2A265F;
    border: none;
    border-radius: 4px;
    margin: 12px 0 20px 0;
}

.remove-option-button {
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    font-size: 12px;
    color: white;
    background-color: red;
    border: none;
    border-radius: 4px;
    margin-top: 0.3rem;
}
.mcqForm{
    text-align: left;
}
</style>
