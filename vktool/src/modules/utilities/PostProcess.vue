<template>
  
</template>

<script>
import {eventBus} from '../../main.js';

export default {
    props: ['data'],
    methods: {
        filterGroupsList(params) {
            let array = params.data.items;
            console.log('array: ' + JSON.stringify(array));
            array.forEach(function(element, index, array) {
                //get group memebers amount
                VK.Api.call('groups.getById', {group_id: element.id, fields: 'members_count', v: '5.73'}, function(r)
                {
                    if(r.responce[0].members_count > params.max && r.responce[0].members_count < params.min) {
                        array.splice(index, 1);
                    } 
                })
            });
        },
    },
    created() {
        eventBus.$on('filterGroupList', (params) => {
            console.log('got Filter event, starting');
            this.filterGroupsList(params);
        })    
    },

}
</script>

<style scoped>

</style>
