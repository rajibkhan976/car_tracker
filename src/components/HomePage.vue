<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <v-card class="pa-16">
                <v-card-title class="mb-8">
                    Car Tracking System
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn
                    v-for="(user, i) in users"
                    :key="i"
                    class="subheading mb-5 mr-5"
                    @click="goToLoginPage(user.type)"
                >
                    {{ user.type }}
                </v-btn>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
   export default {
       name: 'HomePage',
       data() {
           return {
               users: [
                   { type: 'Manager' },
                   { type: 'Operator' }
                ]
           }
       },
       methods: {
           goToLoginPage(user) {
               if (user === "Manager") {
                   this.$router.push({
                       path: "/manager-login"
                   });
               }
               if (user === "Operator") {
                   this.$router.push({
                       path: "/operator-login"
                   });
               }
           }
       },
   }
</script>