<template>
    <v-layout row justify-center align-center wrap>
        <v-flex xs12 class='pa-2'>
            <v-card class='pa-1'>
                <v-layout row>
                    <v-flex xs3><v-icon large v-if='false'>keyboard_backspace</v-icon></v-flex>
                    <v-flex xs6><p class='mb-0 display-2 text-xs-center'>{{item.name}}</p></v-flex>
                    <v-flex xs3></v-flex>
                </v-layout>
                <v-img :src=item.img alt=item.keeper
                aspect-ratio="1">
                <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
                </v-img>
                <p class='mb-0 body-2'>{{item.price}} coins</p>
                <p><v-chip small class='mb-0 ml-0 body-2' color='blue white--text  body-2'>{{item.coowners}}</v-chip> совладельцев</p>
            </v-card>
        </v-flex>
    </v-layout>    
</template>

<script>
export default {
    props: ['item', 'vue'],
}
</script>

<style>

</style>
