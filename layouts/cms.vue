<template :class="SetSideNav">
    <v-app>
        <admin
            title="manablox-cms"
            :full-width-topbar="true"
            :sidebar-open="true"
            :sidebar-mini="false"
            :footer-fixed="true"
            :quick-edit-open="false"
        >
            <template slot="topbar-content">
                <v-btn outline icon small color="error" v-on:click="Logout">
                    <v-icon small>power_settings_new</v-icon>
                </v-btn>
            </template>

            <template slot="navigation-content">
                <sidenav :items="$store.getters['sidenav/ITEMS']" v-on:link-click="OnLinkClick"/>
            </template>

            <template slot="quickedit-content">
                QUICKNAV
            </template>

            <template slot="footer-content">
                FOOTER
            </template>

            <template slot="content">
                <nuxt/>
            </template>
        </admin>
    </v-app>

</template>

<script>

export default {
    middleware: 'auth',

    methods: {

        OnLinkClick(item){
            this.$router.push(item.url);
            
        },

        async Logout(){
            await this.$auth.logout();
            location.reload();
        }
    }

}
</script>
