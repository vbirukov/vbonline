<template>


  <div class="container">
      <h3>data type {{data.type}}</h3>
      <display-group v-if='data.type == "group"' :data='data'></display-group>
      <display-docs class='display-docs' v-if='data.type == "Docs"' :data='data'></display-docs>
      <display-groups-list v-if='data.type == "Groups"' :data='data'></display-groups-list>
  </div>
</template>

<script>
import { eventBus } from './main';
import DisplayGroup from './DisplayGroup.vue';
import DisplayDocs from './DisplayDocs.vue';
import DisplayGroupsList from './DisplayGroupsLIst.vue'

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
