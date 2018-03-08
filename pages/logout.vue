<template>
    <div>Logout</div>
</template>

<script>
export default {

    layout: 'auth',

    mounted(){
        this.Logout();
    },

    methods: {
        async Logout(){
            await this.$auth.logout();
        }
    }

}
</script>

