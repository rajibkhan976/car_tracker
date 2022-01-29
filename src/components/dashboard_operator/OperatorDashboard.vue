<template>
    <v-container fluid fill-height class="align-start">
        <v-row class="fill-height">
            <v-col cols="3" fill-height>
            <nav-bar />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import NavBar from "./NavBar"

  export default {
    name: 'OperatorDashboard',
    components: {
        NavBar
    },
    data () {
      return {
        
      }
    },
  }
</script>