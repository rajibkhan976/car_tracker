<template>
    <v-container fluid fill-height class="align-start">
        <v-row class="fill-height">
            <v-col cols="12" fill-height>
              <car-list />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CarList from "../dashboard_manager/modules/car/CarList"

  export default {
    name: 'ManagerDashboard',
    components: {
        CarList
    },
    data () {
      return {
        
      }
    },
  }
</script>