<template>
    <div class='container'>
      <div class="frame docs" v-for="item in data.items" :key='item.id'>
          {{item.title}}
      </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    mounted: function() {
        console.log('docs view mounted ' + data);
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
        object-fit: cover;
    }
</style>
