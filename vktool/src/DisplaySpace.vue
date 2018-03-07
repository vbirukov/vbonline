<template>


  <div class="container">
      <display-group v-if='data.type == "group"' :data='data'></display-group>
      Data.type = {{data.type}}
      <div class='frame' v-if='data.type != "group"' :key="item.id" v-for='item in data.items' @click='loadGroup(item.id)'>
          <h5 v-if="item.screen_name">{{item.screen_name}}</h5>
          <img v-if='item.photo_100' :src=item.photo_100 alt="">
          
          <p>some info might be here</p>
      </div>
  </div>
</template>

<script>
import { eventBus } from './main';
import DisplayGroup from './DisplayGroup.vue'

export default {
    props: ['data'],
    data() {
        return {

        }
    },
    methods: {
        loadGroup(id) {
            eventBus.$emit('loadGroup', id);
        }
    },
    components: {
        'display-group': DisplayGroup,
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        max-width: 1050px;
        margin-left: auto;
        margin-right: auto;
    }

    .frame {
        padding: 5px;
    }

    p {
        word-wrap: break-word;
    }
</style>
