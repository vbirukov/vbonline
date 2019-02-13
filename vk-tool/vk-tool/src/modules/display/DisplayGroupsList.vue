<template>
    <div>
        <button @click="filterGroupsList()" >filter by members count</button><input type='text' class='narrow' v-model='filterMax'><i>Maximum group members</i>                    
        <input type='text' class='narrow' v-model='filterMin'><i>Minimum group members</i>   
        <div class="container group-list flex-row">        
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
    </div>
</template>

<script>
import { eventBus } from '../../main.js'

export default {
    props: ['data'],
    methods: {
        loadGroup(groupInfo) {
            console.log('group info: ' + groupInfo);
            eventBus.$emit('loadGroup', groupInfo);
        },
        filterGroupsList() {
            let params = {};
            if (this.filterMax > 0) {
                params.max = this.filterMax;
            } else if (this.filterMin > 0) {
                params.min = this.filterMin;
            }
            params.data = this.data;
            params.filter = 'membersAmount';
            eventBus.$emit('filterGroupList', params);
        }
    },
    data() {
      return {
          filterMax: 0,
          filterMin: 0,
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

    .narrow {
        margin: 0.35rem;
    }
</style>
