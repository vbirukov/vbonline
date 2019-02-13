<template>
    <div>
        <v-container>
            <v-layout row justify-center align-center>
                <v-flex justify-center align-center xs6 layout>
                    <v-avatar size='150'>
                        <img
                        src="http://1.bp.blogspot.com/-FFpPrJLX_BE/VXlSG516pJI/AAAAAAAABKY/2fLYYD1qSHM/s1600/rishi-nitya-pragya.jpeg"
                        alt="Avatar"
                        >
                    </v-avatar>
                </v-flex>
            </v-layout>
            <v-layout row justify-center align-center>
                <v-flex xs12>
                    <span class='text-xs-center'>
                        <p display-4 class='text-xs-center headline'>
                            {{user.FullName}}
                            <v-icon v-if='!edit' @click='edit = true' class='pl-1'>edit</v-icon>
                        </p>           
                    </span>
                </v-flex>
            </v-layout>
            <v-layout row justify-center align-center v-if='edit'>
                <v-flex xs10>
                    <v-text-field
                        v-model="user.FullName"
                        label="Ваше Имя"
                    ></v-text-field>
                </v-flex>
                <v-flex xs2><v-btn class='success' @click="edit = false"><v-icon>check</v-icon></v-btn></v-flex>
            </v-layout>
            <v-layout row justify-center align-center>
                <v-flex xs6 text-xs-center>
                    <v-icon class='orange--text'>star</v-icon>
                    <v-icon class='orange--text'>star</v-icon>
                    <v-icon class='orange--text'>star</v-icon>
                    <v-icon class='golden'>star_border</v-icon>
                    <v-icon class='golden'>star_border</v-icon>
                </v-flex>
            </v-layout>
            <v-layout row class='mt-2' wrap>
                <v-flex xs9>
                <p>
                    <span class='body-2'>Мой баланс: </span> 
                    <span class='body-1'>{{user.balance}} coins</span>  

                </p>
                </v-flex>
                <v-flex xs3>
                    <a>пополнить</a>
                </v-flex>

                <v-flex xs9>
                    <p><span class='body-2'>Мой город: </span> <span class='body-1'>{{user.city}}</span></p>
                </v-flex>
                <v-flex xs3>
                    <a>сменить</a>
                </v-flex>

                <v-flex xs12>
                    <p><span class='body-2'>Зарегистрирован: </span> <span class='body-1'>{{user.regDate}}</span></p>
                </v-flex>
            </v-layout>
        </v-container>
        
    </div>
</template>

<script>
export default {
  name: 'Profile',
  components: {
    
  },
  props: ['user'],
  data () {
    return {
        edit: false,
    }
  }
}
</script>
