<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Sharing economy</h3>
            <div>Welcome to the world of possibilities</div>
          </div>
        </v-card-title>

         <v-form v-model="valid">
            <v-container>
              <v-layout>

                <v-flex
                  xs12
                  md12

                >
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-flex>
                
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="password"
                    :rules="nameRules"
                    :counter="10"
                    label="Password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex>
                      <v-btn color="success" @click='user.login = true'>Login</v-btn>
                      <v-btn flat color="info">Signup</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    components: {
    },
    props: ['user'],
    data () {
      return {
        valid: false,
      firstname: '',
      password: '',
      nameRules: [
        v => !!v || 'Password is required',
        v => v.length > 5 || 'Password must be more than 5 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
      }
    }
  }
</script>