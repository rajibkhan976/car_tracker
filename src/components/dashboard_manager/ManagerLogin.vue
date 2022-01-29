<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <v-card class="pa-16">
                <v-card-title class="mb-8">
                    Login as a manager
                </v-card-title>
                <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                >
                    <form @submit.prevent="submit">
                    <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required|email"
                    >
                        <v-text-field
                        v-model="email"
                        class="mb-4"
                        :error-messages="errors"
                        label="E-mail"
                        required
                        ></v-text-field>
                    </validation-provider>
                    <v-spacer></v-spacer>
                    <validation-provider
                        v-slot="{ errors }"
                        name="Password"
                        rules="required|min:8"
                    >
                        <v-text-field
                        v-model="password"
                        class="mb-8"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :error-messages="errors"
                        :type="show ? 'text' : 'password'"
                        label="Normal with hint text"
                        hint="At least 8 characters"
                        counter
                        required
                        @click:append="show = !show"
                        ></v-text-field>
                    </validation-provider>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="mr-4"
                        type="submit"
                        :disabled="invalid"
                    >
                        submit
                    </v-btn>
                    <v-btn @click="clear">
                        clear
                    </v-btn>
                    </form>
                </validation-observer>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { required, email, min } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('min', {
    ...min,
    message: '{_field_} may not be less than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    name: 'ManagerLogin',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      email: '',
      password: '',
      show: false,
    }),
    computed: mapState({
      loggedInManagers: state => state.user.loggedInManagers
    }),
    methods: {
      ...mapActions('user', [
        'loginAsManager'
      ]),
      submit () {
        this.$refs.observer.validate()
        .then((res) => {
          if (res) {
            var credential = {
              email: this.email,
              password: this.password
            };
            this.$store.dispatch('user/loginAsManager', credential);
            if (this.loggedInManagers.includes(credential.email)) {
              sessionStorage.setItem('current_manager', credential.email);
              this.$router.push({
                name: "manager-dashboard"
              });
            }
          }
        });
      },
      clear () {
        this.email = '';
        this.password = '';
      },
    },
  }
</script>