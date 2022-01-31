<template>
  <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Manager
          </v-list-item-title>
          <v-list-item-subtitle>
            Dashboard
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ currentUser }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="item.route" class="d-block" tag="span" style="cursor: pointer">{{ item.title }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout()">
            Logout
          </v-btn>
        </div>
      </template>
  </v-navigation-drawer>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'MenuBar',
    data () {
      return {
        items: [
            { title: 'Car', route: 'car-list', icon: 'mdi-car-traction-control' },
            { title: 'Users', route: 'user-list', icon: 'mdi-account-group-outline' },
            { title: 'City', route: 'city-list', icon: 'mdi-home-city' },
            { title: 'Report', route: 'report', icon: 'mdi-finance' },
            { title: 'Tracking', route: 'tracking', icon: 'mdi-radar' },
        ],
        right: null,
        currentUser: sessionStorage.getItem('current_manager') ? sessionStorage.getItem('current_manager') : ''
      }
    },
    methods: {
      ...mapActions('user', [
        'logOut'
      ]),
      logout() {
        this.$store.dispatch('user/logOut');
        this.$router.push({ path: "/" })
      }
    },
  }
</script>