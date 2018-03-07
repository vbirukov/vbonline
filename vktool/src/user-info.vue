<template>

    <div>
        <img :src='user.avatarSrc' alt="">
        <h2>{{user.name}}</h2>
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
    div {
        max-width: 1150px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    h2 {
        margin-top: 0;
    }

    img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        object-fit: cover;
    }
</style>
