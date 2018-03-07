<template>
    <div class="container">
        <div class='frame' :key="item.id" v-for='item in data.items' @click='loadGroup(item.id)'>
            <h5 v-if="item.screen_name">{{item.screen_name}}</h5>
            <img v-if='item.photo_100' :src=item.photo_100 alt="">
        </div>
    </div>
</template>

<script>
import { eventBus } from './main.js'

export default {
    props: ['data'],
    methods: {
        loadGroup(id) {
            eventBus.$emit('loadGroup', id);
        }
    },
}
</script>

<style scoped>

</style>
