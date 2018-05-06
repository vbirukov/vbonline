<template>
    <vkcaller></vkcaller>
</template>

<script>
import {eventBus} from '../../main.js';

export default {
    props: ['data'],
    methods: {
        filterGroupsList(params) {
            console.log('got Filter event, starting');
            console.log('params are: ' + JSON.stringify(params));
            console.log('max is: ' + params.max + ' min is: ' + params.min)
            let array = params.data.items;
            console.log('array: ' + JSON.stringify(array));
            array.forEach(function(element, index, array) {
                // console.log('item: ' + JSON.stringify(element));
                // console.log("element['members_count'] " + element['members_count']);
                if((element['members_count'] > params.max) || (element['members_count'] < params.min)) {
                    console.log('splicing');
                    array.splice(index, 1);
                }                
            });
        },
    },
    components: {
        vkcaller: 'VkCaller',
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
