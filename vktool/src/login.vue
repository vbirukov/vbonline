<template>
  <div>
    <h3>First you need to</h3>
    <!-- 1518755 -->
    <button @click='login'>login</button>
  </div>
</template>

<script>
import { eventBus } from './main.js';

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
