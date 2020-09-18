<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" validation>
                  <v-text-field
                    label="Your email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                    required

                    :error-messages="emailErrors"
                    @blur="$v.email.$touch()"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Your password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    required

                    :error-messages="passwordErrors"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onSubmit" :loading="loading" :disabled="$v.$error || loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

    validations: {
      password: { required, minLength: minLength(6) },
      email: { required, email },
    },

  data() {
    return {
      email: '',
      password: '',
      submitStatus: null,
    };
  },

  computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },

      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('password must be more 6 chars')
        !this.$v.password.required && errors.push('password is required')
        return errors
      },

      loading() {
        return this.$store.getters.loading
      }
  },

  methods: {
    onSubmit() {
      this.$v.$touch()
      if(this.$v.$invalid) {
      } else {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('loginUser', user)
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {})
      }
    }
  },

  created() {
    if (this.$route.query['loginError']) {
      this.$store.dispatch('setError', 'Please log in to acces this page')
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>