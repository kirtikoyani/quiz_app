<template>
<div class="main_div">
    <div class="container">
        <form action="#" @submit.prevent="adddata">
            <div class="title">{{ $route.name }}</div>
            <div class="input-box underline">
                <input type="text" id="name" name="name" placeholder="Enter your name" v-model="Newdata.name" required>
                <div class="underline"></div>
            </div>
            <div class="input-box underline">
                <input type="text" id="email" name="email" placeholder="Enter Your Email" v-model="Newdata.email" required>
                <div class="underline"></div>
            </div>
            <div class="input-box">
                <input type="password" id="password" name="password" placeholder="Enter Your Password" v-model="Newdata.password" required>
                <div class="underline"></div>
            </div>
            <div class="policy">
                <input type="checkbox" name="checkbox" id="checkbox">
                <label class="term_cond" for="checkbox">I accept all terms & condition</label>
            </div>
            <div class="input-box button">
                <input type="submit" value="Register Now">
            </div>
            <div class="text">
                <h6>Already have an account? <router-link to="/login">Login now</router-link>
                </h6>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    name: 'CreateUser',
    computed: {
        ...mapGetters({
            datas: 'userData/datas',
            Newdata: 'userData/Newdata',
        }),
    },
    created() {
        this.$store.dispatch('userData/getDatasFromStorage');
    },

    methods: {
        adddata() {
            this.$store.dispatch('userData/addData')
                .then((res) => {
                    if (res) {
                        alert('You successfully signup!!! Now Login..');
                        this.$router.push('/login');
                    } else {
                        alert('Email address already taken')
                    }
                }).catch(err => console.log(err))
        },
    },
    beforeUnmount() {
        this.$store.dispatch("userData/resetData");
    }
}
</script>
