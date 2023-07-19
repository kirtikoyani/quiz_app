<template>
<div class="container">
    <div class="center">
        <h3> {{info.name}}'s Profile</h3>
        <img class="circle profile-img" :src="`https://robohash.org/${info.name}.png?set=set2`" alt="pic" />
        <h5>{{info.name}}</h5>
        <h6>{{info.email}}</h6>
        <h6>{{info.password}}</h6>
    </div>

</div>
<h3 class="center">My quiz</h3>
<div class="p-maindiv">
    <div class="product" v-for="q in userQuiz" :key="q" title="click on this card😉😃">
        <router-link :to="`/start-quiz/${q.id}`">
            <h3 style="margin-top: 20px;">
                {{ q.quizTopic }}
            </h3>
            <div class="topics">
                <h6 v-for="t in q.selectedRelevantTopic" :key="t" class="topic_h2 center">{{ t }}</h6>
            </div>
        </router-link>
        <div>
            <router-link class="btn-adduser" :to="`/editquiz/${q.id}`">Edit</router-link>
            <button @click="deletedata(q)" class="delete_btn">Delete</button>
        </div>
    </div>
</div>
<h3 class="center">My attendQuizes</h3>
<div>
    <div v-for="q in attendQuiz" :key="q">
        <div v-for="s in score" :key="s.id">
            <div class="p-maindiv" v-if="q.id==s.id">
                <div class="product">
                    <h3>
                        {{ q.quizTopic }}
                    </h3>
                    <h4>score : {{ s.score }}/{{ q.questions.length }}</h4>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'UsersPage',
    props: ['userdata'],
    data() {
        return {
            info: [],
            userQuiz: [],
            attendQuiz: [],
            score: []
        }
    },
    mounted() {
        this.user();
    },
    methods: {
        user() {
            const datas = JSON.parse(localStorage.getItem('user'));
            this.info = datas;
            const usersdata = JSON.parse(localStorage.getItem('datas') || '[]');
            const quizdata = JSON.parse(localStorage.getItem('quizData') || '[]');
            const user = usersdata.find(u => u.id == datas.id);
            const userQuiz = quizdata.filter(q => q.createdBy.id == datas.id);
            const attendees = quizdata.filter(q => q.attendees).filter(u => {
                u.id == datas.id;
                return u
            })
            this.userQuiz = userQuiz;
            this.attendQuiz = attendees;
            const score = user.quizzes.filter(s => {
                s.id == attendees.id;
                return s
            });
            this.score = score;
            return [this.info, this.userQuiz, this.attendQuiz];
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

    },
}
</script>
