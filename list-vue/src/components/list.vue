<template>
  <v-list>
    <template v-for="(item, index) in items" class='maxwidth'>
      <v-container :key="item.id" class='border-bottom'>
        <v-layout>
          <v-flex xs10 grow>
              <v-layout @click="toggleShow(index)">
                <v-avatar xs1 size='25'>
                  <img :src="item.avatar">
                </v-avatar>
                <div xs11>
                  <p class='body-1 wrap-break'>{{item.title}}</p>
                  <p class='caption wrap-break'>{{item.subtitle}}</p>
                </div>
              </v-layout>

          </v-flex>
          <transition name='fade'>
            <v-flex class='delete-button red' v-if="show == index"
              @click.stop="confirmation = true">
              <v-icon color='white'>delete_outline</v-icon>
            </v-flex>
          </transition>  
        </v-layout>
      </v-container>
    </template>

    <v-layout row justify-center>
      <v-dialog v-model="confirmation" persistent max-width="290">
        <v-card class='text-xs-center'>
          <v-card-title class="title">Удалить из избранного?</v-card-title>
          <v-card-text class="body-1">Данный специалист {{show}} будет удален из ваших закладок</v-card-text>
          <v-card-actions>
            <v-btn color="green darken-1" flat @click="confirmation = false">Отмена</v-btn>
                        <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="deleteItem()">Удалить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-list>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            id: '01',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "I'll be in your neighborhood doing errands this weekend.",
            selected: false
          },
          {
            id: '02',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ',
            subtitle: "Wish I could come, but I'm out of town this weekend.",
            selected: false
          },
          {
            id: '03',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: "Do you have Paris recommendations? Have you ever been?",
            selected: false
          },
          {
            id: '04',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "I'll be in your neighborhood doing errands this weekend.",
            selected: false            
          },
          {
            id: '05',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ',
            subtitle: "Wish I could come, but I'm out of town this weekend.",
            selected: false            
          },
          {
            id: '06',
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: "Do you have Paris recommendations? Have you ever been?",
            selected: false            
          }          
        ],
        show: 'a',
        confirmation: false,
      }
    },
    methods: {
      deleteItem() {        
        this.confirmation = false;
        this.items.splice(this.show, 1);
        this.show = '';
      },
      toggleShow(index) {
        if (this.show != index) {
          this.show = index;
        } else {
          this.show = 'a';
        }
      }
    }
  }
</script>

<style>

p {
  margin-bottom: 7px; 
}

.container {
  padding: 0;
}

.wrap-break {
  word-wrap: break-word;
}

.delete-button {
  display: flex;
  justify-content: center;
  align-items: center;  
}

.fade-enter-active, .fade-leave-active {
  transition: all ease-in .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  transform: translateX(20px);
}
.v-avatar {
  justify-content: center;
  align-items: center;
  margin: 1em;
}

.border-bottom {
  border-bottom: 1px solid gray;
}

.v-list {
  padding-top: 0;
}

.maxwidth {
  max-width: 600px;
}
</style>
