<template>
<quizPage :isEdit="isEdit" :quiz_Data="quizData" />
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';

import quizPage from './quizPage.vue';
export default {
    name: 'HelloWorld',
    components: {
        quizPage
    },
    props: ['id'],
    created() {
        this.$store.dispatch('getDatasFromStorage');
        this.$store.commit('setIsEdit', this.isEdit = true);
    },
    mounted() {
        this.$store.dispatch('loadEditedUser', this.id);
    },
    watch: {
        id(newId) {
            this.$store.dispatch('loadEditedUser', newId);
        },
    },
    computed: {
        ...mapGetters({
            quizData: 'quizData',
        }),
    },
    methods: {
        ...mapActions(['loadEditedUser', 'getDatasFromStorage']),
    }
    // data() {
    //   return {
    //     // datas: [],
    //     // quizData: {},
    //     isEdit: true
    //   }
    // },
    // created() {
    // this.getdatasFromStorage();
    // this.loadEditedUser(this.id);
    // this.$store.dispatch('loadEditedUser',this.id);
    // },
    // watch: {
    // id(newId) {
    // this.loadEditedUser(newId);
    // },
    // },

    // methods: {
    // loadEditedUser(id) {
    //   for (let i = 0; i <this.datas.length; i++) {
    //     if (this.datas[i].id == id) {
    //       this.quizData = this.datas[i];
    //       this.isEdit = true;
    //       return true;
    //     }
    //   }
    // },
    // getdatasFromStorage() {
    //   const datas = JSON.parse(localStorage.getItem('quizData') || '[]');
    //   this.datas = datas;
    // },
    // }
}
</script>
