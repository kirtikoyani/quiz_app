<template>
<div>
    <div class="search-btn">
        <div class="routes" v-if="isAdmin()">
            <router-link class="nav_link" to="/">Home</router-link>
            <router-link class="nav_link" to="/admin">Users</router-link>
            <router-link class="nav_link" to="/quiz-table">Quiz</router-link>
        </div>
        <div class="search_div">
            <input type="text" placeholder="search" class="input" v-model="input" aria-label="Search" id="searchtextbox">
            <router-link class="btn-adduser" to="/quiz">Add New Quiz</router-link>
        </div>
    </div>

    <!-- <table class="table">
        <tr>
            <th>Id</th>
            <th>DifficultyLevel</th>
            <th>QuestionTitle</th>
            <th>createdBy</th>
            <th>Actions</th>
        </tr>
        <tr v-for="data of searchFun()" :key="data">
            <td>
                <router-link :to="`start-quiz/${data.id}`">{{ data.id }}</router-link>
            </td>
            <td>{{ data.difficultyLevel }}</td>
            <td>{{ data.quizTopic }}</td>
            <td>
                <router-link :to="`userprofle/${data.createdBy.id}`">{{ data.createdBy.name }}</router-link>
            </td>
            <td><button class="btn-delete" @click="deletedata(data)">Delete</button></td>
        </tr>
    </table> -->
    <div class="user_table">
        <div v-for="data of searchFun()" :key="data">
            <div class="user_detail">
                <button class="user-expand" @click="toggleInfo(data.id)">
                    <i :class="showInfo === data.id ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                </button>
                <h5>
                    <router-link :to="`start-quiz/${data.id}`">
                        <img :src="`https://robohash.org/${data.quizTopic}.png?set=set2`" alt="" class="avatar" />
                    </router-link>
                </h5>
                <p class="user_ele">{{ data.quizTopic }}</p>
                <p class="user_ele">{{ data.difficultyLevel }}</p>
                <p class="user_ele">{{ data.createdBy.name }}</p>
                <div class="user_ele">
                    <router-link class="btn-adduser" :to="`/editquiz/${data.id}`">Edit</router-link>

                </div>
                <div class="user_ele">
                    <button class="btn-delete" @click="deletedata(data)">Delete</button>
                </div>
            </div>
            <div v-if="showInfo === data.id" class="user-details">
                <div class="attend">
                    <h5 class="attend_ele">The Quiz Attented by :</h5>
                    <div v-for="user in userdatas" :key="user.id">
                        <div class="sub_ele" v-for="a in data.attendees" :key="a.id">
                            <div v-if="a.id==user.id">{{ user.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="item error" v-if="input&&!searchFun().length">
        <p>No results found!</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            datas: [],
            userdatas: [],
            input: '',
            showInfo: null
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
            const datas = JSON.parse(localStorage.getItem('quizData') || '[]');
            this.datas = datas;
            const userdatas = JSON.parse(localStorage.getItem('datas') || '[]');
            this.userdatas = userdatas;
        },
        toggleInfo(quizId) {
            this.showInfo = this.showInfo === quizId ? null : quizId;
        },
        // search functionality
        searchFun() {
            return this.datas.filter((data) =>
                data.difficultyLevel.toLowerCase().includes(this.input.toLowerCase()) || data.questionTitle.toLowerCase().includes(this.input.toLowerCase()));
        },
        // delete data from array
        deletedata(data) {
            if (confirm("Are you sure to delete the User") == true) {
                const index = this.datas.findIndex(i => i.id === data.id);
                this.datas.splice(index, 1);
                localStorage.setItem('quizData', JSON.stringify(this.datas));
            }
        },
    }
}
</script>
