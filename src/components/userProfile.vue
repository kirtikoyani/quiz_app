<template>
<div class="container">
    <div class="center">
        <h3> {{user.name}}'s Profile</h3>
        <img class="circle profile-img" :src="`https://robohash.org/${user.name}.png?set=set2`" alt="pic" />
        <h5>{{user.name}}</h5>
        <h6>{{user.email}}</h6>
    </div>

</div>
<h3 class="center">My quiz</h3>
<div class="p-maindiv">
    <div class="product" v-for="q in userQuiz" :key="q" title="click on this card😉😃">
      <router-link :to="`/start-quiz/${q.id}`">
        <h3 style="margin-top: 20px;">
            Quiz topic :
            {{ q.quizTopic }}
        </h3>
        <div class="topics"><h6 v-for="t in q.selectedRelevantTopic" :key="t" class="topic_h2 center">{{ t }}</h6></div>
      </router-link>
    </div>

</div>
</template>

<script>
export default {
    name: 'userProfile',
    props: ['id'],
    data() {
        return {
            user: {},
            userQuiz: []
        }
    },
    mounted() {
        this.userInfo();
    },
    methods: {
        userInfo() {
            const usersdata = JSON.parse(localStorage.getItem('datas') || '[]');
            const quizdata = JSON.parse(localStorage.getItem('quizData') || '[]');
            const user = usersdata.find(user => user.id == this.id);
            this.user = user;
            const userQuiz = quizdata.filter(quiz => quiz.createdBy.name == user.name);
            this.userQuiz = userQuiz;
            console.log(this.userQuiz)
        }
    },
}
</script>
<style>
.container {
  text-align: center;
  margin-bottom: 20px;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.center h3 {
  margin: 20px 0;
  color: #2A265F;
}

.circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.profile-img {
  border: 4px solid #2A265F;
}

.p-maindiv {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.product {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  width: 30%;
  padding: 20px;
  text-align: center;
  border: 1px solid #aaa;
  margin: 10px;
}

.product h3 {
  margin-top: 0;
  font-size: 20px;
  color: #2A265F;
}

.product div {
  margin-bottom: 10px;
}

.product strong {
  font-weight: bold;
}

.product div:not(:last-child) {
  margin-bottom: 5px;
}

/* Add hover effect */
.product:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  transition: box-shadow 0.3s, transform 0.3s;
}
.topics{
  display: flex;
  column-gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 18px;
    flex-direction: column;
}
a{
  text-decoration: none;
}
</style>

