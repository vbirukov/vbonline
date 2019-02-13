<template>
    <div> 
      <Profile :user='UserData.profile' v-if='session.active == "profile"'></Profile>
      <inventory v-if='session.active == "inventory"' :inventory='UserData.items'></inventory>
    </div>
</template>

<script>
import Profile from './Profile'
import inventory from './inventory'

export default {
  name: 'Mainboard',
  components: {
    Profile,
    inventory
  },
  props: ['UserData', 'session'],
  data () {
    return {

    }
  }
}
</script>
