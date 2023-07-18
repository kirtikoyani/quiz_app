<template>
<div class="main_div">
    <div class="container">
        <form action="#" @submit.prevent="login">
            <div class="title">{{ $route.name }}</div>
            <div class="input-box underline">
                <input type="text" id="email" name="email" placeholder="Enter Your Email" v-model="Newdata.email" required>
                <div class="underline"></div>
            </div>
            <div class="input-box">
                <input type="password" id="password" name="password" placeholder="Enter Your Password" v-model="Newdata.password" required>
                <div class="underline"></div>
            </div>
            <div class="input-box button">
                <input type="submit" name="" value="Continue">
            </div>
            <div class="text">
                <h6>Create an account? <router-link to="/signup">signup now</router-link>
                </h6>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'LoginPage',
    computed: {
        ...mapGetters({
            datas:'login/datas',
            Newdata:'login/Newdata',
        }),
      },
      mounted() {
    this.$store.dispatch('login/getDatasFromStorage');
  },
  methods: {
    login() {
      this.$store.dispatch('login/login')
        .then(user => {
          if (user) {
            if (user.isAdmin) {
              this.$router.push('/');
            } else {
              alert('You are logged in successfully');
              this.$router.push({ path: '/' });
            }
          } else {
            alert('Incorrect email or password');
          }
        })
        .catch(error => {
          alert('Incorrect email or password');
          console.error(error);
        });
    },
  },
  beforeUnmount(){
    this.$store.dispatch("login/resetData");
}
};
</script>
