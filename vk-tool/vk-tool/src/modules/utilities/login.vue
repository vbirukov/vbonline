<template>
  <v-layout justify-center align-center>
    <v-flex xs6 align-center>
      <p class='text-xs-center headline'>First you need to</p>
      <!-- 1518755 -->
      <p class='text-xs-center'><v-btn info @click='login' class="text-xs-center info">login</v-btn></p>
      <p class='text-xs-center body-2'>to Vk.com don't worry we don't keep any of your data</p> 
    </v-flex>
  </v-layout>
</template>

<script>
import { eventBus } from '../../main.js';

export default {
  methods: {
    login()  { 
      VK.Auth.login(function(response) {
        if (response.session) {
          console.log('Пользователь успешно авторизовался' + JSON.stringify(response));
          eventBus.$emit('userLoggedIn', response.session.user);
          if (response.settings) {
            console.log('Выбранные настройки доступа пользователя, если они были запрошены');
          }
        } else {
          console.log('Пользователь нажал кнопку Отмена в окне авторизации');
        }
      }, 396318);
    }
  }
}
</script>


<style lang="sass" scoped>

</style>
