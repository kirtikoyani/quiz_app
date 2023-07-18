<template>
      <div class="routes">
        <router-link class="nav_link" to="/">Home</router-link>
        <router-link class="nav_link" to="/admin">Users</router-link>
        <router-link class="nav_link" to="/quiz-table">Quiz</router-link>
    </div>
    <p>jdhjdfhjfh</p>
</template>

<script>
export default {
    watch: {
        $route() {
            this.updateNavbar();
        }
    },
    data() {
        return {
            showAdminLink: false,
        };
    },
    methods: {
        updateNavbar() {
            const requiresAdmin = JSON.parse(localStorage.getItem('isAdmin'));
            this.showAdminLink = requiresAdmin;
        },
    },

    created() {
        this.updateNavbar();
    }
};
</script>

<style>

</style>
