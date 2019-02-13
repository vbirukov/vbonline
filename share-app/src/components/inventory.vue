<template>
    <div>
        <v-container class='pa-0'>
            <v-flex xs12 v-if='view == "single"' @click='view = "all"'><v-icon large>keyboard_backspace</v-icon></v-flex>
            <v-layout row justify-center align-center wrap v-if='view == "all"'>
                <v-flex xs6 class='pa-2'>
                    <v-card class='pa-1'>
                            <p class='mb-0 headline text-xs-center'>Купить</p>
                            <v-img src='https://banner2.kisspng.com/20180514/usq/kisspng-computer-icons-plus-sign-clip-art-5af97b2328bf59.1562244915262994271669.jpg' alt="значок плюс"
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
                    </v-card>
                </v-flex>                
                <v-flex xs6 v-for='item in inventory' :key="item.code" class='pa-2' v-on:click='viewItemCard(item)'>
                    <v-card class='pa-1'>
                            <p class='mb-0 headline text-xs-center'>{{item.name}}</p>
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

            <itemcard :item='itemView' v-if='view == "single"'> </itemcard>
        </v-container>
    </div>
</template>

<script>
import itemcard from './itemCard.vue'

export default {
    data () {
        return {
            view: 'all',
            itemView: {},
            inventory: [
                {
                    code: 1, 
                    name: 'дрель', 
                    img: 'data:image/webp;base64,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', 
                    coowners: 6,
                    price: 100,
                    keeper: 'Вася Пупкин'
                },
                {
                    code: 2, 
                    name: 'лыжи', 
                    img: 'https://www.kant.ru/upload/resize_cache/iblock/4b5/555_455_1/4b53026f74df33437db36a91accc0b46.jpg', 
                    coowners: 6,
                    price: 100,
                    keeper: 'Вася Пупкин'
                },
                {
                    code: 4, 
                    name: 'болгарка', 
                    img: 'https://avatars.mds.yandex.net/get-mpic/199079/cms_resources-navigation-pages-42526-1nemjb9mba1ag4f3m9bllbhhha_320x320@x1.jpeg/optimize', 
                    coowners: 6,
                    price: 100,
                    keeper: 'Вася Пупкин'
                },
                {
                    code: 5, 
                    name: 'мяч', 
                    img: 'https://www.sportvokrug.ru/f/1/statyi_o_sporte/foot-ball/football3.png', 
                    coowners: 6,
                    price: 100,
                    keeper: 'Вася Пупкин'
                },
                {
                    code: 6, 
                    name: 'палатка', 
                    img: 'https://www.championnet.ru/spree/products/31225/original/%D0%9F%D0%B0%D0%BB%D0%B0%D1%82%D0%BA%D0%B0_3-%D1%85_%D0%BC%D0%B5%D1%81%D1%82%D0%BD%D0%B0%D1%8F_Larsen_A3_%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9%D0%B3%D0%BE%D0%BB%D1%83%D0%B1%D0%BE%D0%B9_NS_(772)_(1).jpg?1433752747', 
                    coowners: 6,
                    price: 100,
                    keeper: 'Вася Пупкин'
                }
            ]
        }
    },
    methods: {
        viewItemCard(item) {
            this.itemView = item;
            this.view = 'single'
            console.log(item);
        }
    },
    components: {
        itemcard,
    }
}
</script>

<style>
    img {
        object-fit: cover;
    }
</style>
