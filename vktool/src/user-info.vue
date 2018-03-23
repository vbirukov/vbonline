<template>

    <div class='main-container'>
        <div class='avatar-container'>
            <img :src='user.avatarSrc' alt="">
        </div>
        <div class="info-container">
            <h2>{{user.name}}</h2>
            <div>
                <p>You have {{user.friends}} friends</p>
                <p>You are subscribed to {{user.groups}} groups</p>
                <div>
                    <button @click='friendGroups()'>most popular groups among your friends</button>
                    <div class="completed"> completed {{Math.floor(completedWidth)}}%</div>
                    <div>{{analyzed}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from './main.js';

export default {
  props: ['user'],
  data() {
      return {
          completedWidth: 0,
          analyzed: 'test',
      }
  },
  created() {

  },
  methods: {
      friendGroups() {
        this.user.friendList = [];
        this.user.friendsGroups = {};
        VK.Api.call('friends.get', {user_id: this.user.uid, v: '5.73'}, function(r, e) {
            console.log('vk response: ' + JSON.stringify(r.response.items));
            this.user.friendList = r.response.items;
            console.log('this.user... ' + JSON.stringify(this.user.friendList));
            this.user.friendList.reduce(function(previousValue, currentValue, index, array){

                let delay = index;
                setTimeout(() => {
                    this.completedWidth = index / ( array.length / 100 );  
                    if (index == arra.length) {
                        this.completedWidth = 100;
                        console.log('index: ' + index);
                        console.log('array.length: ' + array.length);
                    }             
                    VK.Api.call('groups.get', {user_id: currentValue, v: '5.73'}, function(r) 
                    {
                        if (r.response) {
                            r.response.items.forEach(function(item) {
                                this.user.friendsGroups[item] ? this.user.friendsGroups[item] += 1 : this.user.friendsGroups[item] = 1;    
                            }.bind(this));
                        }
                    }.bind(this))
                }, delay * 600);                      
            }.bind(this));
        }.bind(this));
        this.filterFriendsGroups();
      },
      filterFriendsGroups() {
          let max = 1;
          for (let group in this.user.friendsGroups) {
              max > group ? max = 1 : max = group;
          }
          for (let group in this.user.friendsGroups) {
              max == group ? this.analyzed[group] = group : false;
          }
      },
  }
}
</script>

<style scoped>
    .main-container {
        max-width: 1150px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    h2 {
        margin-top: 0;
    }

    img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        object-fit: cover;
    }

    .info-container {
        display: flex;
        flex-direction: column;
    }

    .info-container div {
        display: flex;
        flex-direction: column;
    }

    p {
        margin-top: 0;
    }

</style>
