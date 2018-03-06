<template>

    <div>
        <img src='user.avatar' alt="">
        <h3>NAme: {{user.name}}<span> User ID: {{user.id}}</span></h3>
    </div>
</template>

<script>
import { eventBus } from './main.js';

export default {
  props: ['user'],
  created() {

  }
}
</script>

<style scoped>

</style>
