<template>
    <v-container fluid fill-height class="align-start">
        <v-row class="fill-height">
            <v-col cols="3" fill-height>
              <menu-bar />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MenuBar from "./MenuBar"

  export default {
    name: 'ManagerDashboard',
    components: {
        MenuBar
    },
    data () {
      return {
        
      }
    },
  }
</script>