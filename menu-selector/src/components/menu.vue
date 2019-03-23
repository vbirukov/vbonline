<template>
    <v-container fluid>
        <v-layout>
            <v-flex xs12>
                <v-card class='pa-3'>
                    <p class='mb-0'>Диаметр трубы, применение, тип изделия и ещё 2 параметра</p>
                    <v-layout row wrap justify-space-between>
                        <v-flex xs8 class='mr-3 d-flex selector-status pl-3 pt-2 pb-1'
                        @click="filters.selectorShow = !filters.selectorShow"
                        >
                            <p v-if='filters.selectedString.length > 0' class='mb-0'>{{filters.selectedString}}</p>
                            <p class='title mb-0' v-if="filters.selectedString.length == 0">Выберите нужные параметры</p>
                            <v-spacer></v-spacer>
                            <v-icon class='pb-1' v-if="!filters.selectorShow">fa-caret-down</v-icon>
                            <v-icon class='pb-1' v-if="filters.selectorShow">fa-caret-up</v-icon>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex>
                            <v-btn v-for='button in filters.buttons' :key='button.text' v-bind:class='{"button-active": button.active}' @click='button.active = !button.active' class='caption additional-filters'>{{button.text}}</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-if="filters.selectorShow">
            <v-flex xs6 white class='selectors-container'>
                <v-layout row>
                    <v-flex shrink>
                        <div v-for="selector in filters.selectors" :key='selector.label' v-bind:class="{'selector-active': selector.active}" class="selector py-2 p-0" @click='activate(selector)'>
                            <div class='triangle-right pr-1'></div>
                            <div>
                                <p class='title mb-0'>{{selector.label}}</p>
                            </div>
                        </div>
                    </v-flex>
                    <v-flex class='pl-3'>
                        <v-flex d-flex 
                        v-for='item in filters.displayed.options' 
                        :key='item.label' 
                        @click='applyTrigger(item)' 
                        v-bind:class='{selected: item.selected}'
                        class='option'>
                            <v-flex class='pt-1'>                            
                                <p class='mb-0 pl-2'>
                                    <v-icon class='pr-2 pb-1' v-if="item.selected">fa-check</v-icon>
                                    <v-icon class='pr-2 pb-1 fs14' v-if="!item.selected">fa-chevron-right</v-icon>
                                    {{item.label}}</p>
                            </v-flex>
                            <div class="triangle-right-small"></div>
                        </v-flex>
                        <v-flex v-if='filters.displayed.prefix == "Диаметр"' class='h-100'>
                            <v-layout d-flex class='flex-column h-100'>
                                <v-flex d-flex xs12 class="pt-5">
                                    <v-spacer></v-spacer>
                                    <img src="@/assets/diameterICO.png" width="70">
                                    <input type="text" v-model='filters.selectors.bySize.size'>
                                    <p>мм</p>
                                    <v-spacer></v-spacer>
                                </v-flex>
                                <v-flex d-flex xs12> <div class='line'></div> <p shrink class='text-xs-center mb-0'>Диапазон диаметра трубы</p> <div class='line'></div> </v-flex>
                                <v-flex xs12 justify-content-center>
                                    <p class='text-xs-center'>min. <span class='title mr-2'>{{filters.displayed.min}}мм</span> max. <span class='title mr-2'>{{filters.displayed.max}}мм</span></p>
                                </v-flex>
                            </v-layout>
                        </v-flex>                        
                    </v-flex>
                </v-layout> 
            </v-flex>
            
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            images: {
                sample: require('../assets/diameterICO.png')
            },
            filters: {
                displayed: {},
                selectorShow: false,
                selectedString: '',
                buttons: {
                    all: {
                        text: 'ВСЕ',
                        active: false
                    },
                    special: {
                        text: 'ОСОБЫЕ УСЛОВИЯ',
                        active: false
                    },
                    instock: {
                        text: 'В НАЛИЧИИ',
                        active: false
                    }
                },
                selectors: {
                    bySize: {
                        diameter: true,
                        selected: false,
                        min: '4',
                        max: '98',
                        size: 0,
                        label: 'Диаметр трубы',
                        prefix: 'Диаметр',
                        active: false,
                    },
                    byType: {
                        selected: false,
                        label: 'Тип изделия',
                        options: [
                            {
                                label: '20-25',
                                selected: false,
                            },
                            {
                                label: '36-50',
                                selected: false
                            },
                            {
                                label: '51-75',
                                selected: false,
                            },
                            {
                                label: '75-140',
                                selected: false,
                            }   
                            ],
                        active: false,
                    },
                    byUse: {
                        selected: false,
                        label: 'Применение',
                        options: [
                            {
                                label: 'Для стульев', 
                                selected: false
                            },
                            {
                                label: 'Заглушки для ДУ', 
                                selected: false
                            },
                            {
                                label: 'Заглушки для отверстий',
                                selected: false
                            },
                            {
                                label: 'Для шаровых кранов',
                                selected: false
                            },
                            {
                                label: 'Пробки',
                                selected: false
                            },
                            {
                                label: 'Эллипсоидные заглушки',
                                selected: false
                            },
                            {
                                label: 'Заглушки для столбов',
                                selected: false
                            }
                            ],
                        active: false
                        },
                    Other: {
                        selected: false,
                        label: 'Другое',
                        options: [
                            {
                                label: 'материалы',
                                selected: false
                            },
                            {
                                label: 'цвет',
                                selected: false
                            }
                        ],
                        active: false
                    },
                },
            }
        }
    },
    methods: {
        activate(selector) {
            for (var key in this.filters.selectors) {
                this.filters.selectors[key].active = false;
                for (var option in this.filters.selectors[key].options) {
                    if (this.filters.selectors[key].options[option].selected == true) {
                        this.filters.selectors[key].active = true;
                    }
                }
            }
            selector.active = true;
            this.filters.displayed = selector;
            console.log(JSON.stringify(this.filters.displayed))
        },
        applyTrigger(option) {
            if (option.selected) {
                option.selected = false;
            } else {
                option.selected = true;   
            }
            this.recombineStatusString();
        },
        recombineStatusString() {
            this.filters.selectedString = '';
            for (var selector in this.filters.selectors) {
                for (var option in this.filters.selectors[selector].options) {              
                    if (this.filters.selectors[selector].options[option].selected) {
                        this.filters.selectedString += (this.filters.selectedString.length == 0 ? '' : ', ' ) + (this.filters.selectors[selector].prefix ? this.filters.selectors[selector].prefix : '') + ' ' + this.filters.selectors[selector].options[option].label;
                    }
                }
            }
        }
    }
}
</script>

<style>

.v-icon {
    max-width: 50px;
}

.selector-status {
    border: 1px solid rgb(198,198,198);
    background-color: #f2f2f2;
    align-content: center;
    justify-content: center;
}

.selector {
    background-color: #f2f2f2;
    margin: 1px;
    display: flex;
    width: 210px;
    height: 66px;
    padding-left: 0;
}

.selector:hover {
    background-color: #4f4e4e;
    box-shadow: 0 0 1px 1px #d6d6d6;
    color: #ffffff;
}

.selector > div {
    justify-content: center;
    align-items: center;
    display: flex;
}

.selector-active, .selector-active:hover {
    background-color: #ffffff;
    color: #c54004;
}

.v-btn {
    background: linear-gradient(#e9e9e9, #d7d7d7);
    box-shadow: 0 0 0 1px #d7d7d7 !important;
    border: 1px solid #e5e5e5;
    margin: 0;
    min-width: 40px;
    border-radius: 0;
}

.v-btn__content {
    color: #c54004; 
}

.v-btn-toggle {
    border-radius: 0;
}

.button-active {
    background: linear-gradient(#545454, #363636) !important;
    border-bottom: 1px solid #545454 !important;
    border-top: 1px solid #696969 !important;
    box-shadow: -1px 0 0 1px #656565,
                1px 0 0 1px #252525 !important;
    border-left: none;
    border-right: none;

}

.button-active .v-btn__content {
    color: white;
}


.triangle-right {
	width: 0;
	height: 0;
	border-top: 25px solid transparent;
	/* border-left: 15px solid #f2f2f2; */
	border-bottom: 25px solid transparent;
}

.triangle-right-small {
    display: none;
    width: 0;
	height: 0;
    border-top: 15px solid transparent;
	border-left: 12px solid #c54004;
	border-bottom: 15px solid transparent;
}

.option:hover .triangle-right-small {
    display: block;
	border-left: 12px solid #4f4e4e;
}

.selected .triangle-right-small {
    display: block;    
}

.selector-active .triangle-right {
    border-left: 15px solid #c54004; 
}

.selector:hover .triangle-right {
    border-left: 15px solid #4f4e4e; 
}

.selectors-container {
    position: relative;
    bottom: 0;
    box-shadow: 0px 1px 3px 0 #dddddd;
    z-index: 999;
}

.selected .flex{
    background-color: #c54004;  
    color: white;
    width: 248px;
}

.selected .flex p {
    margin-left: -2px;
}

.option .flex{
    width: 250px;
    height: 30px;
}

.option:hover .flex {
    background-color: #4f4e4e;
}

.option .v-icon {
    font-size: 12px;
    color: white;
}

.flex-column {
    flex-direction: column;
}

.h-100 {
    height: 100%;
}

input {
    border: 1px solid #c6c6c6;
    background-color: #f2f2f2;
    height: 40px;
    max-width: 55px;
    padding-left: 1.3em;
}

.input input {
    padding: 0;
}

.v-input__slot {
    height: 45px;
}

.line {
    border-bottom: 1px solid #e8e8e8;
    height: 0;
    padding-top: 0.5em;
}

img {
    max-width: 90px;
    height: 50px;
    padding-right: 1em;
    margin-top: -0.5em;
}

input + p {
    margin-bottom: 0;
    padding-top: 0.5em;
    padding-left: 1em;
}

</style>
