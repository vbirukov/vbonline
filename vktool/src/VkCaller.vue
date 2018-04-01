<template>
  
</template>

<script>
export default {
    props: ['properties'],
    methods: {
        call(props) {
            props.options.v = '5.73';
            Vk.api.call(props.method, props.options, properties.callback);
        }
    },
    // created: function() {
    //     console.log('VkCaller created');
    //     eventBus.$on('callVk', (props) => {
    //         console.log('got event, calling Vk');
    //         this.call(props);
    //     });
    // }
}
</script>

<style>

</style>
