<template>
    <v-container fluid fill-height class="align-start">
        <v-row class="fill-height">
            <v-col cols="12" fill-height>
            <track-me />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TrackMe from "./TrackMe"

  export default {
    name: 'OperatorDashboard',
    components: {
        TrackMe
    },
    data () {
      return {
        
      }
    },
  }
</script>