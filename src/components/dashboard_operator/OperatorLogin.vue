<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <v-card class="pa-16">
                <v-card-title class="mb-8">
                    Login as a operator
                </v-card-title>
                <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                >
                    <form @submit.prevent="submit">
                    <validation-provider
                        v-slot="{ errors }"
                        name="Code"
                        rules="required|min:6"
                    >
                        <v-text-field
                        v-model="code"
                        class="mb-8"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :error-messages="errors"
                        :type="show ? 'text' : 'password'"
                        label="Normal with hint text"
                        hint="At least 6 characters"
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
  import { required, min } from 'vee-validate/dist/rules'
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

  export default {
    name: 'OperatorLogin',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      code: '',
      show: false,
    }),
    computed: mapState({
      loggedInOperators: state => state.user.loggedInOperators
    }),
    methods: {
      ...mapActions('user', [
        'loginAsOperator'
      ]),
      submit () {
        this.$refs.observer.validate()
        .then((res) => {
          if (res) {
            this.$store.dispatch('user/loginAsOperator', this.code);
            if (this.loggedInOperators.includes(this.code)) {
              sessionStorage.setItem('current_operator', this.code);
              this.$router.push({
                name: "operator-dashboard",
                params: { code: this.code }
              });
            }
          }
        });
      },
      clear () {
        this.code = '';
      },
    },
  }
</script>