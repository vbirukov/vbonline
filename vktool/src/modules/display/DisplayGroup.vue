<template>
    <div>
        <h3>{{data.title}}</h3>

        <div class='container'>
            <div class="frame" v-for="(item, index) in data.items" :key='item.id'>
                <i @click='deleteItem(index)'>X</i>
                <img :key='attachment.id' v-for='attachment in item.attachments' :src='extractSrc(attachment)' alt="">   
            </div>
            <button @click='loadMore()'>Load More</button>
        </div>
    </div>
</template>

<script>
import {eventBus} from '../../main.js'

export default {
  props: ['data'],

  methods: {
      extractSrc(item) {
          if (item.photo) {
          let photoData = item.photo;
          
            if(photoData.photo_2560) 
            {
                return photoData.photo_2560
            } else if (photoData.photo_1280)
            {
                return photoData.photo_1280
            } else if (photoData.photo_807) 
            {
                return photoData.photo_807
            } else if (photoData.photo_604) 
            {
                return photoData.photo_604
            } else if (photoData.photo_130)
            {
                return photoData.photo_130
            } else if (photoData.photo_75) 
            {
                return photoData.photo_75
            }
          }
      },
      deleteItem(item) {
          this.data.items.splice(item, 1);
      },
      loadMore() {
        // eventBus.$emit('loadMoreGroupPosts', 'hello');
        VK.Api.call('wall.get', {owner_id: -this.data.groupId, count: 100, v: '5.73', offset: this.data.offset}, (r) => 
        {
            this.data.offset += 100;
            this.data.items = this.data.items.concat(r.response.items);
        });
      },
  }
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        max-width: 1150px;
        flex-wrap: wrap;
    }

    .frame {
        max-width: 25%;
        display: flex;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    i {
        position: absolute;
        margin-left: 18%;
        margin-top: 4px;
        color: white;
        border-radius: 50%;
        padding: 2px 5px;
        background-color: rgba(155, 155, 155, 0.5);
    }
</style>
