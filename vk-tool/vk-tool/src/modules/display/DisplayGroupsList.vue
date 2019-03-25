<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="filtersWindow" persistent max-width="390">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Filters</v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="headline">Filter viewed groups</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field label="Maximum group members" v-model='filters.filterMax'></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field label="Minimum group members" v-model='filters.filterMin'></v-text-field>
                            </v-flex>                            
                        </v-layout>
                    </v-container>
                </v-card-text>                       
                <v-card-actions>
                <br><v-btn @click="filterGroupsList()">Apply filter</v-btn>   
                <br><v-btn @click="filterGroupsList()">Reset filter</v-btn>                   
                <v-spacer></v-spacer>                
                <v-btn color="green darken-1" flat @click="filtersWindow = false">Close</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-layout>

        <v-layout v-if='filtered.length == 0' row align-center wrap justify-center fill-height>        
            <v-flex xs12 md2 :key="item.id" v-for='item in data.items' @click='loadGroup(item)' mb-5>
                <h5 v-if="item.name">{{item.name}}</h5>
                <img v-if='item.photo_100' :src=item.photo_100 alt="">
            </v-flex>
        </v-layout>
        <v-layout v-if='filtered.length > 0' row align-center wrap justify-center fill-height>
            <v-flex xs12 md2 :key="item.id" v-for='item in filtered' @click='loadGroup(item)'>
                <h5 v-if="item.name">{{item.name}}</h5>
                <img v-if='item.photo_100' :src=item.photo_100 alt="">
                <p v-if='item.info'>{{info}}</p>
                <a target="blank" v-bind:href="'https://vk.com/' + item.id">открыть в вк</a>
            </v-flex>  
        </v-layout>
    </div>
</template>

<script>
import { eventBus } from '../../main.js'

export default {
    props: ['data'],
    methods: {
        loadGroup(groupInfo) {
            console.log('group info: ' + groupInfo);
            eventBus.$emit('loadGroup', groupInfo);
        },
        filterGroupsList() {
            console.log('check')
            let params = {};
            if (this.filterMax > 0) {
                params.max = this.filters.filterMax;
            } else if (this.filterMin > 0) {
                params.min = this.filters.filterMin;
            }
            params.data = this.data;
            params.filter = 'membersAmount';
            this.filtered = this.data.items.filter(this.filterSub);
            // eventBus.$emit('filterGroupList', params);
        },
        filterSub(element) {
            if (this.filters.filterMax && this.filters.filterMin) {

                if (this.filters.filterMax > element.members_count && element.members_count > this.filters.filterMin) {
                    return true
                } else {                  
                    return false
                }
            } // else if (this.filters.filterMax) {
            //     if (this.filters.filterMax > element.members_count) {
            //         return true
            //     } else {
            //         return false
            //     }
            // } else if (this.filters.filterMin) {
            //     if (this.filters.filterMin < element.members_count) {
            //         return true
            //     } else {
            //         return false
            //     }                
            // }
        }
    },
    data() {
        return {
            filters: {
                filterMax: '',
                filterMin: '',
            },
            filtered: [],
            filtersWindow: false,
        }
  },
}
</script>

<style scoped>
    .group-list .frame{
        width: 15%;
        padding: 0.35rem;
        transition: all 200ms ease-in-out;
    }

    .group-list .frame:hover {
        transform: translate(-2px, -2px);
        box-shadow: 1px 1px 2px 2px gainsboro;
    }

    .narrow {
        margin: 0.35rem;
        max-width: 100px;
    }

    .v-flex:hover {
        background-color: rgb(196, 217, 255);
        box-shadow: 0 0 1px 1px rgb(145, 165, 173);
    }
</style>
