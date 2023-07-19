<template>
<div>
    <div class="search-btn">
        <div class="routes" v-if="isAdmin()">
            <router-link class="nav_link" to="/">Home</router-link>
            <router-link class="nav_link" to="/admin">Users</router-link>
            <router-link class="nav_link" to="/quiz-table">Quiz</router-link>
        </div>
        <div class="search_div">
            <input type="text" placeholder="Search" class="input" v-model="input" aria-label="Search" id="searchtextbox" />
            <router-link class="btn-adduser" to="/signup">Add New User</router-link>
        </div>
    </div>
    <div class="user_table">
        <div v-for="data of searchFun()" :key="data">
            <div class="user_detail">
                <button class="user-expand" @click="toggleInfo(data.id)">
                    <i :class="showInfo === data.id ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                </button>
                <h5 class="user_ele">
                    <router-link :to="`userprofile/${data.id}`">
                        <img :src="`https://robohash.org/${data.name}.png?set=set2`" alt="" class="avatar" />
                    </router-link>
                </h5>
                <p class="user_ele">{{ data.name }}</p>
                <p class="user_ele email">{{ data.email }}</p>
                <p class="user_ele">{{ data.password }}</p>
                <div class="user_ele">
                    <button class="btn-delete" @click="deletedata(data)">Delete</button>
                </div>
            </div>
            <div v-if="showInfo === data.id" class="user-details">
                <div class="create">
                    <h5 class="create_ele">My created Quiz</h5>
                    <div class="create_ele" v-for="q in userQuiz" :key="q.id">
                        <div class="sub_ele" v-if="q.createdBy.id==data.id">
                            {{q.quizTopic}}
                        </div>
                    </div>
                </div>
                <div class="attend">
                    <h5 class="attend_ele">My attented Quiz</h5>
                    <div class="attend_ele" v-for="q in userQuiz" :key="q.id">
                        <div class="sub_ele" v-for="s in data.quizzes" :key="s.id">
                            <div v-if="q.id==s.id">{{ q.quizTopic}} score: {{ s.score }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="item error" v-if="input && !searchFun().length">
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
            input: '',
            user: [],
            userQuiz: [],
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
            const datas = JSON.parse(localStorage.getItem('datas') || '[]');
            this.datas = datas;
            const quizdata = JSON.parse(localStorage.getItem('quizData') || '[]');
            this.userQuiz = quizdata;
        },
        // search functionality
        searchFun() {
            return this.datas.filter(
                (data) =>
                data.name.toLowerCase().includes(this.input.toLowerCase()) ||
                data.email.toLowerCase().includes(this.input.toLowerCase())
            );
        },
        // delete data from array
        deletedata(data) {
            if (confirm('Are you sure to delete the User') == true) {
                const index = this.datas.findIndex((i) => i.id === data.id);
                this.datas.splice(index, 1);
                localStorage.setItem('datas', JSON.stringify(this.datas));
            }
        },
        toggleInfo(userId) {
            this.showInfo = this.showInfo === userId ? null : userId;
        }
    },
}
</script>

<style>
.search-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.input {
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-adduser {
    background-color: #2980b9;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.btn-adduser:hover {
    background-color: #1a5276;
}

.user_table {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 700px;
    margin: 0 auto;
}

.user_detail {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
}

.user_detail:hover {
    background-color: #e5e5e5;
}

.user-expand {
    display: flex;
    align-items: center;
    margin: 10px;
    color: #555555;
    cursor: pointer;
    border: 0;
    transition: transform 0.3s ease;
}

.email {
    flex: 2 !important;
}

.user-detail:hover .user-expand {
    transform: rotate(180deg);
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.user_ele {
    flex: 1;
    overflow-wrap: anywhere;
}

.btn-delete {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.item.error {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #f5c6cb;
    margin-bottom: 20px;
}

/* .user-details {
    margin-top: 10px;
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  } */

.user-details h5 {
    margin-bottom: 10px;
}

.user-details {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.user-details h3 {
    margin-bottom: 10px;
    color: #333333;
}

.create,
.attend {
    display: flex;
}
.sub_ele{
flex:1;
}

.attend_ele,
.create_ele {
    flex: 1;
}
</style>
