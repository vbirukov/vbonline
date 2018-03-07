<template>
    <div class='container'>
        <button @click='setViewAll'>View all docs</button> <button @click='setViewGif'>View gifs only</button>
        <div v-if='viewOptions.all' class="frame docs" v-for="item in data.items" :key='item.id'>
            <p>{{item.title}}</p>
            <a :href='item.url' target="blank">Open</a>
        </div>
        <div v-if='viewOptions.gif' class='frame' :key='item.id' v-for="item in data.items">
            <img v-if='item.ext == "gif"' :src="item.url" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            viewOptions: {
                all: true,
                gif: false,
            }
        }
    },
    methods: {
        setViewAll() {
            this.viewOptions.all = true;
            this.viewOptions.gif = false;
        },
        setViewGif() {
            this.viewOptions.all = false;
            this.viewOptions.gif = true;
        }
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        max-width: 1150px;
        flex-wrap: wrap;
    }

    .frame {
        max-width: 25%;
        display: flex;
    }

    img {
        width: 100%;
        object-fit: cover;
    }

    p {
        word-wrap: break-word;
        max-width: 100%;
    }
</style>
