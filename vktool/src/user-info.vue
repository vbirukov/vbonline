<template>

    <div>
        <img src='user.avatar' alt="">
        <h3>{{user.name}}<span> User ID: {{user.id}}</span></h3>
    </div>
</template>

<script>
import { eventBus } from './main';
export default {
  props: ['user'],
  created() {
      eventBus.on('userLoggedIn', (user) => {
          this.user.uid = user.uid;
          this.user.name = user.first_name + ' ' + iser.last_name;
      });
  }
}
</script>

<style scoped>

</style>
