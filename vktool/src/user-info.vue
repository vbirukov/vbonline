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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from './main.js';

export default {
  props: ['user'],
  created() {

  },
  methods: {
      friendGroups() {
        VK.Api.call('friends.get', {user_id: this.user.uid, v: '5.73'}, function(r, e) {
        this.user.friendList = r.response.items;
        }.bind(this));
        for (friend in this.user.friendList) {
            VK.Api.call('groups.get', {user_id: friend, v: '5.73'}, function(r) {});
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
