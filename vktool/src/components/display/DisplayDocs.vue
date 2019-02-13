<template>
<div>
    <button @click='setView("all")'>View all items</button> <button @click="setView('doc')">View docs only</button> <button @click='setView("gif")'>View gifs only</button>
    <div class='container'>
        
        <div v-if='viewOptions.all' class="frame docs" v-for="item in data.items" :key='item.id'>
            <p>{{item.title}}</p>
            <img v-if='item.preview' :src="getBiggestPreview(item)" alt="">
            <p><a :href='item.url' target="blank">Open</a></p>
        </div>
        <div v-if='viewOptions.gif' class='frame' :key='item.id' v-for="item in data.items">
            <img v-if='item.ext == "gif"' :src="item.url" alt="">
        </div>
        <div v-if='filterView(item)' class='frame' :key='item.id' v-for="item in data.items">
            <p>{{item.title}}</p>
            <p><a :href='item.url' target="blank">Open</a></p>
        </div>
        
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
                doc: false,
            }
        }
    },
    methods: {
        setView(type) {
            console.log('setting ' + type + ' type view');
            for (let item in this.viewOptions) {
                this.viewOptions[item] = false;
            }
            this.viewOptions[type] = true;
            console.log('viewOptions: ' + JSON.stringify(this.viewOptions));
        },
        filterView(item) {
            console.log('filtering...');
            if ( this.viewOptions.doc && ( item.ext=="doc" || item.ext=="djvu" || item.ext=="pdf" || item.ext=="fb2" || item.ext=="txt" || item.ext=="epub" || item.ext=="rtf" || item.ext=="rar"|| item.ext=="zip" || item.ext=="mobi") ) {
                return true
            } else {
                return false
            }
        },
        getBiggestPreview(item) {
           return item.preview.photo.sizes[item.preview.photo.sizes.length-1].src
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
    }

    img {
        width: 100%;
        object-fit: cover;
    }

    p {
        word-wrap: break-word;
        max-width: 100%;
        font-size: 1rem;
    }
</style>
