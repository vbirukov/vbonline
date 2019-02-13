<template>
  
</template>

<script>
export default {
    props: ['properties'],
    methods: {
                call(callProps) {
            return new Promise((resolve, reject) => {
                callProps.options.v = '5.73';
                console.log('Beep... runnning an api call with following props: ' + JSON.stringify(callProps));
                console.log('call options listing: ' + JSON.stringify(callProps.options) );
                VK.Api.call(callProps.method, callProps.options, function(r) {
                    if(r['error']) {
                        console.log('errior while running request');
                        console.log(r.error);
                        resject('error' + r.error); 
                    }                
                    if (callProps.raw) {
                        if(r.response) {
                            console.log('respose received: ' + JSON.stringify(r.response));
                            r.response.type = callProps.name;
                            resolve('dataReceived', r.response);
                        } else {
                            console.log('unhandled responce: ' + r);
                            reject('uhnandled response: ' + JSON.stringify(r));
                        }
                    } else if (!callProps.raw) {
                        if(r.response) {
                            console.log('this should  run corret ' + r);
                            resolve(r.response);
                        } else {
                            console.log('unhandled responce: ' + r);
                            reject(r);
                        }                        
                    }
                });                
            });
            
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
