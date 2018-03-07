<template>
  <div>
      <img :key='item.id' v-for='item in data.items' :src='extractSrc(item.attachments)' alt="">

  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
      extractSrc(item) {
          console.log('extracting src from : ' + JSON.stringify(item));
          console.log('photoData should be: ' + item[0].photo);
          let photoData = item[0].photo;
          if(photoData.photo_2560) {
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
  }
}
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        max-width: 1150px;
        flex-wrap: wrap;
    }

    img {
        width: 25%;
        object-fit: cover;
    }
</style>
