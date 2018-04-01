<template>
    <div class="container">
        <div v-if='data.items' class='frame' :key="item.id" v-for='item in data.items' @click='loadGroup(item.id)'>
            <h5 v-if="item.name">{{item.name}}</h5>
            <img v-if='item.photo_100' :src=item.photo_100 alt="">
        </div>
        <div v-if='!data.items' class='frame' :key="item.id" v-for='item in data' @click='loadGroup(item.id)'>
            <h5 v-if="item.name">{{item.name}}</h5>
            <img v-if='item.photo_100' :src=item.photo_100 alt="">
            <p v-if='item.info'>{{info}}</p>
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
