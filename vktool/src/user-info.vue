<template>
    <div>
        <img src='user.avatar' alt="">
        <h3>{{user.name}}</h3>
    </div>
</template>

<script>
export default {
  props: ['user'],
}
</script>

<style scoped>

</style>
