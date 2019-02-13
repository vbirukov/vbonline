<template>


  <div class="container"> 
      <display-group v-if='data.type == "group"' :data='data'></display-group>
      <display-docs class='display-docs' v-if='data.type == "Docs"' :data='data'></display-docs>
      <display-groups-list v-if='data.type == "Groups"' :data='data'></display-groups-list>
      <display-friends v-if='data.type == "Friends"' :data='data'></display-friends>
  </div>
</template>

<script>
import { eventBus } from '../../main.js';
import DisplayGroup from './DisplayGroup.vue';
import DisplayDocs from './DisplayDocs.vue';
import DisplayGroupsList from './DisplayGroupsList.vue';
import DisplayFriends from './DisplayFriends.vue';

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
        'display-docs': DisplayDocs,
        'display-groups-list': DisplayGroupsList,
        'display-friends': DisplayFriends,
    }
}
</script>

<style>

</style>
