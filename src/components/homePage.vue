<template>
<!-- <HeaderPage/> -->
<div>
    <div class="search-btn">
        <div class="routes" v-if="isAdmin()">
            <router-link class="nav_link" to="/">Home</router-link>
            <router-link class="nav_link" to="/admin">Users</router-link>
            <router-link class="nav_link" to="/quiz-table">Quiz</router-link>
        </div>
        <div>
            <div class="input-box underline">
                <select name="levels" id="levels" v-model="selectedLevel" required>
                    <option value="" selected>All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <div class="underline"></div>
            </div>
        </div>
        <div class="search_div">
            <input type="text" placeholder="search" class="input" v-model="input" aria-label="Search" id="searchtextbox">
            <router-link class="btn-adduser" to="/quiz">Add Quiz</router-link>
        </div>

        <ul>
            <li class="user_profile">
                <router-link to="/profile"><img class="profile-img2" :src="`https://robohash.org/${user.name}.png?set=set2`" alt="pic" /></router-link>

                <ul class="nav_profile">
                    <li class="sub-li-tags">
                        <router-link to="/profile">Profile</router-link>
                    </li>
                    <li class="sub-li-tags" @click="logout">Logout</li>
                </ul>
            </li>
        </ul>
    </div>

    <div class="Card2 ph1" v-for="data of searchFun()" :key="data.id">

        <div class="courses-container">
            <div class="course">
                <!-- <span class="difficultyLevel">{{ data.difficultyLevel }}</span> -->

                <div class="course-preview">
                    <h6>Course</h6>
                    <h2>{{ data.quizTopic }}</h2>
                    <div class="icons">
                        <router-link :to="`userprofile/${data.createdBy.id}`"><i class="fas fa-user-circle"></i></router-link>
                        <div class="action_btn" v-if="(data.createdBy.name==user.name) || (user.name=='admin')">
                            <router-link :to="`/editquiz/${data.id}`"><i class="fas fa-edit"></i></router-link>
                            <button @click="deletedata(data)" class="delete_btn"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
                <div class="course-info">
                    <div class="progress-container">
                        <!-- <div class="progress"></div> -->
                        <progress class="progress" id="file" :value="`${data.attendees.length}`" max="10">{{ data.attendees.length }}</progress>
                        <span class="progress-text">
                            attendees {{ data.attendees.length }}
                        </span>
                    </div>
                    <h6>Questions {{ data.questions.length }}</h6>
                    <div class="topic">
                        <h5 v-for="topic in data.selectedRelevantTopic" :key="topic" class="topic_h2">{{ topic }}</h5>
                    </div>
                    <div class="card_btn">
                        <router-link class="btn" :to="`/start-quiz/${data.id}`">Continue</router-link>
                    </div>
                    <!-- <button class="btn">Continue</button> -->
                </div>
            </div>
        </div>
    </div>
</div>

<div class="item error" v-if="(input&&!searchFun().length)||(selectedLevel&&!searchFun().length)">
    <p>No results found!</p>
</div>
</template>

<script>
import HeaderPage from './common-component/HeaderPage.vue';
export default {
    name: 'HelloWorld',
    component: HeaderPage,
    data() {
        return {
            datas: [],
            input: '',
            user: {},
            selectedLevel: '',
        }
    },
    mounted() {
        this.getdatasFromStorage();
    },
    watch: {
        $route() {
            this.updateNavbar();
        }
    },
    created() {
        this.$store.commit('updateNavbar');
    },
    methods: {
        isAdmin() {
            return this.$store.getters.isAdmin;
        },
        getdatasFromStorage() {
            this.datas = JSON.parse(localStorage.getItem('quizData') || '[]');
            this.user = JSON.parse(localStorage.getItem('user'));
        },
        updateNavbar() {
            const requiresAdmin = JSON.parse(localStorage.getItem('isAdmin'));
            this.showAdminLink = requiresAdmin;
        },
        searchFun() {
            return this.datas.filter((data) => {
                const levelFilter = this.selectedLevel.toLowerCase();
                const difficultyLevel = data.difficultyLevel.toLowerCase();
                if (levelFilter && difficultyLevel !== levelFilter) {
                    return;
                }
                return (
                    difficultyLevel.includes(this.input.toLowerCase()) ||
                    data.createdBy.name.toLowerCase().includes(this.input.toLowerCase()) ||
                    data.quizTopic.toLowerCase().includes(this.input.toLowerCase())
                );
            });
        },
        deletedata(data) {
            if (confirm("Are you sure to delete the Quiz") == true) {
                const index = this.datas.findIndex(i => i.id === data.id);
                this.datas.splice(index, 1);
                console.log(this.datas);
                localStorage.setItem('quizData', JSON.stringify(this.datas));
                this.getdatasFromStorage();
            }
        },
        logout() {
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('user');
            this.$router.push('/login');
        },
    }
}
</script>

<style>
.search-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin: 1em; */
    padding: 20px;
    background: #2A265F;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    /* border: 1px solid darkslateblue; */
    /* border-radius: 20px; */
}

.nav_link {
    color: white;
}

.search_div {
    display: flex;
    align-items: center;
}

.input {
    width: 300px;
    padding: 0.5em;
    /* margin-right: 1em; */
    border: 1px solid #ccc;
    border-radius: 4px;
}

.input-box {
    display: flex;
    align-items: center;
    /* margin-top: 1em; */
    justify-content: space-between;
}

.input-box select {
    width: 125px;
    padding: 0.5em 1em;
    border: none;
    border-bottom: 1px solid #ccc;
    appearance: none;
    background-color: #fff;
    font-size: 16px;
    color: #555;
}

.user_profile {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    /* border-radius: 50%; */
    /* background: red; */
    width: 50px;
    list-style: none;
    height: 50px;
}

.profile-img2 {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: 2px solid #fff;
}

.nav_profile {
    display: none;
    position: absolute;
    top: 4.5em;
    right: 60px;
    padding: 0.5em 0;
    background-color: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    list-style-type: none;
    border-radius: 4px;
    z-index: 10;
}

.user_profile:hover .nav_profile {
    display: block;
}

.sub-li-tags {
    padding: 0.5em;
    color: #2A265F
}

.sub-li-tags:hover {
    background-color: #f0f0f0;
}

.Card2 {
    position: relative;
}

.Card2 .quiz_card_userInfo {
    padding: 1em;
}

.quiz_card_userInfo h2 {
    margin: 0.5em 0;
    font-size: 1.2em;
}

.quiz_card_userInfo p {
    margin: 0.5em 0;
    font-size: 0.9em;
    color: #777;
}

.topic {
    display: flex;
    column-gap: 20px;
    flex-wrap: wrap;
    width: 65%;
    margin-top: 18px;
}

.sub_topics {
    margin-right: 0.5em;
    padding: 0.2em 0.5em;
    background-color: #f0f0f0;
    font-size: 0.8em;
    color: #555;
}

.link {
    display: inline-block;
    padding: 0.5em 1em;
    border: none;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.link:hover {
    background-color: #0056b3;
}

.error {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
    padding: 0.5em;
    background-color: #f8d7da;
    color: #721c24;
    border-radius: 4px;
}

@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
    box-sizing: border-box;
}

body {
    /* background-image: linear-gradient(45deg, #7175da, #9790F2); */
    background: floralwhite;
    font-family: 'Muli', sans-serif;
    margin: 0;
}

/* .courses-container {

} */

.course {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    max-width: 100%;
    /* margin: 20px; */
    overflow: hidden;
    width: 700px;
    margin: 50px auto;
}

.course h6 {
    opacity: 0.6;
    margin: 0;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.course h2 {
    overflow-wrap: break-word;
    letter-spacing: 1px;
    margin: 10px 0;
    width: 158px;
}

.course-preview {
    background-color: #2A265F;
    color: #fff;
    padding: 30px;
    max-width: 250px;
    overflow: hidden;
    width: 300px;
}

.course-preview a {
    color: #fff;
    display: inline-block;
    font-size: 12px;
    opacity: 0.6;
    margin-top: 30px;
    text-decoration: none;
}

.course-info {
    padding: 30px;
    position: relative;
    width: 100%;
}

.progress-container {
    position: absolute;
    top: 15px;
    right: 30px;
    text-align: right;
    width: 150px;
}

progress[value]::-webkit-progress-bar {
    background-color: #ddd;

}

progress[value]::-webkit-progress-value {
    background-color: #2A265F;
    border-radius: 3px;
    height: 5px;
    width: 100%;
}

.progress {
    background-color: #ddd;
    border-radius: 3px;
    height: 5px;
    width: 100%;
}

.progress-text {
    font-size: 10px;
    opacity: 0.6;
    letter-spacing: 1px;
}

.btn {
    background-color: #2A265F;
    border: 0;
    border-radius: 50px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 16px;
    padding: 12px 25px;
    text-decoration: none;
    /* position: absolute; */
    margin-left: auto;
    letter-spacing: 1px;
    width: 135px;
}

.floating-btn {
    border-radius: 26.5px;
    background-color: #001F61;
    border: 1px solid #001F61;
    box-shadow: 0 16px 22px -17px #03153B;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    line-height: 20px;
    padding: 12px 20px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
}

.floating-btn:hover {
    background-color: #ffffff;
    color: #001F61;
}

.floating-btn:focus {
    outline: none;
}

.floating-text {
    background-color: #001F61;
    border-radius: 10px 10px 0 0;
    color: #fff;
    font-family: 'Muli';
    padding: 7px 15px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 998;
}

.floating-text a {
    color: #FF7500;
    text-decoration: none;
}

@media screen and (max-width: 480px) {

    .social-panel-container.visible {
        transform: translateX(0px);
    }

    .floating-btn {
        right: 10px;
    }
}

.card_btn {
    display: flex;
    justify-content: space-between;
}

.icons {
    display: flex;
    justify-content: space-evenly;
    align-items: self-end;
    margin-top: 21px;
}

.delete_btn {
    margin-left: 22px;
    background: transparent;
    border: 0;
    color: darkgray;
}

.fa,
.fas {
    font-size: 18px;
}

.topic_h2 {
    letter-spacing: 1px;
    padding: 10px;
    margin: 10px 0px;
    border: 0;
    border-radius: 10px;
    background: #2A265F;
    color: #fff;
}

.action_btn {
    display: flex;
    align-items: flex-end;
}

.nav-profile {
    display: none;
    position: absolute;
    top: 2.5em;
    right: 0;
    padding: 0.5em 0;
    background-color: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    list-style-type: none;
    border-radius: 4px;
    z-index: 10;
}

.user-profile:hover .nav-profile {
    display: block;
}

.difficultyLevel {
    background: red;
    color: white;
    padding: 10px;
    position: absolute;
    top: -20px;
    right: 410px;
    /* margin: 0 auto; */
    z-index: 2;
    border-radius: 4px;
}

/* Responsive styles */
@media screen and (max-width: 1440px) {
    .difficultyLevel {
        top: -10px;
        right: 330px;
        font-size: 12px;
        padding: 8px;
    }
}

@media screen and (max-width: 1024px) {
    .difficultyLevel {
        top: -30px;
        right: 122px;
        font-size: 12px;
        padding: 8px;
    }
}

@media screen and (max-width: 768px) {
    .difficultyLevel {
        top: -30px;
        right: 10px;
        font-size: 12px;
        padding: 8px;
    }
}

.btn-adduser {
    display: inline-block;
    padding: 0.5em 1em;
    border: none;
    background-color: #2A265F;
    /* Updated color */
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    border: 1px solid;

}

.btn-adduser:hover {
    background-color: #fff;
    color: #2A265F;
    /* Updated color */
}
</style>
