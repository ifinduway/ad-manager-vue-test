<template>
  <v-app>
      <v-container>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <h1 class="text--secondary mb-10">Create new ad</h1>
            <v-form ref="form" validation>
              <v-text-field
                label="Ad title*"
                name="title"
                type="text"
                v-model="title"
                required

                :error-messages="titleErrors"
                @blur="$v.title.$touch()"
              ></v-text-field>

              <v-textarea
                id="description"
                label="Ad description*"
                name="description"
                type="text"
                v-model="description"
                required
                multi-line

                :error-messages="descriptionErrors"
                @blur="$v.description.$touch()"
              ></v-textarea>
            </v-form>
            <v-layout>
              <v-flex>
                <v-btn color="primary" @click="uploadImage">Upload image</v-btn>
                <input type="file" ref="imageRef" accept="image/*" @change="onFileChange" style="display: none;">
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex>
                <img :src="imageSrc" v-if="image" alt="" height="100" class='mt-15'>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex>
                <v-switch
                  v-model="promo"
                  :label="'promo this?'"
                ></v-switch>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-flex>
                <v-btn color="primary" class="mt-15" @click="onSubmit" :loading="loading" :disabled="$v.$error || !image || loading">Create AD</v-btn>
              </v-flex>
            </v-layout>
            
            
          </v-flex>
        </v-layout>
      </v-container>
  </v-app>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email } from 'vuelidate/lib/validators'

export default {

    validations: {
      title: { required, minLength: minLength(2) },
      description: { required, minLength: minLength(15) },
    },

    data() {
      return {
        title: '',
        description: '',
        promo: false,
        image: null,
        imageSrc: '',
      }
    },

    methods: {
      onSubmit() {
        this.$v.$touch()
        if(this.$v.$invalid || !this.image) {
        } else {
          const data = {
            title: this.title,
            description: this.description,
            promo: this.promo,
            image: this.image
          }

          this.$store.dispatch('createAd', data)
            .then(() => {
              this.$router.push('/list')
            })
            .catch(() => {})
        }
      },

      uploadImage() {
        this.$refs.imageRef.click()
      },

      onFileChange(event) {
        const file = event.target.files[0]

        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageSrc = reader.result
        } 
        reader.readAsDataURL(file)

        this.image = file
      }
    },

    computed: {
      titleErrors() {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.minLength && errors.push('Must be valid title')
        !this.$v.title.required && errors.push('Title is required')
        return errors
      },
      descriptionErrors() {
        const errors = []
        if (!this.$v.description.$dirty) return errors
        !this.$v.description.minLength && errors.push('Must be valid description')
        !this.$v.description.required && errors.push('Description is required')
        return errors
      },

      loading() {
        return this.$store.getters.loading
      }
    }

};
</script>

<style>

</style>
