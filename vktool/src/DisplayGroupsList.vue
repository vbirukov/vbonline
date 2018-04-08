<template>
    <div class="container group-list">
        <div v-if='data.items' class='frame' :key="item.id" v-for='item in data.items' @click='loadGroup(item   )'>
            <h5 v-if="item.name">{{item.name}}</h5>
            <img v-if='item.photo_100' :src=item.photo_100 alt="">
        </div>
        <div v-if='!data.items' class='frame' :key="item.id" v-for='item in data' @click='loadGroup(item)'>
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
        loadGroup(groupInfo) {
            console.log('group info: ' + groupInfo);
            eventBus.$emit('loadGroup', groupInfo);
        }
    },
}
</script>

<style scoped>
    .group-list .frame{
        width: 15%;
        padding: 0.35rem;
        transition: all 200ms ease-in-out;
    }

    .group-list .frame:hover {
        transform: translate(-2px, -2px);
        box-shadow: 1px 1px 2px 2px gainsboro;
    }
</style>
