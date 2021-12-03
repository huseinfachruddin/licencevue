<template>
<div id="navbar">
    <v-toolbar 
    color="yellow accent-4">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="d-flex justify-center">
      <h3 class="ma-1 black--text">LISENSI</h3>
      </v-toolbar-title>
      <v-spacer></v-spacer>
          <v-btn
              v-if="login"
              @click="logout()"
              color="error"
              small
              >
                logout
          </v-btn>
          <router-link to="/login" style="text-decoration: none;" >
          <v-btn
              v-if="!login"
              color="info"
              small
              >
                Login
          </v-btn>
          </router-link>
    </v-toolbar>
      <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-yellow--text text--accent-4"
        >
      <v-list-item class="yellow">
        <router-link to="/profile" style="text-decoration: none;" >
        <v-list-item-content v-if="profile.name">
          <v-list-item-title class="text-h6">
            {{profile.name}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{profile.email}}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content v-if="!profile.name">
          <v-list-item-title class="text-h6">
            Menu
          </v-list-item-title>
        </v-list-item-content>
        </router-link>
      </v-list-item>

      <v-divider></v-divider>
          <div v-if="role!='admin'">
          <router-link to="/" style="text-decoration: none;" >
              <v-list-item>
                <v-list-item-title >Home</v-list-item-title>
              </v-list-item>
          </router-link>
          <router-link to="/user/produk" style="text-decoration: none;" >
              <v-list-item>
                <v-list-item-title >Produk kami</v-list-item-title>
              </v-list-item>
          </router-link>
          <router-link to="/user/licence" style="text-decoration: none;" >
              <v-list-item>
                <v-list-item-title >Lisensi Anda</v-list-item-title>
              </v-list-item>
          </router-link>
          </div>
          <div v-if="role=='admin'">
            <router-link to="/admin" style="text-decoration: none;" >
                <v-list-item>
                  <v-list-item-title >Dasboard</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link to="/user" style="text-decoration: none;" >
                <v-list-item>
                  <v-list-item-title >Users</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link to="/role" style="text-decoration: none;" >
                <v-list-item>
                  <v-list-item-title >Role</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link to="/product" style="text-decoration: none;" >
                <v-list-item>
                  <v-list-item-title >Produk</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link to="/licence" style="text-decoration: none;" >
                <v-list-item>
                  <v-list-item-title >Lisensi</v-list-item-title>
                </v-list-item>
            </router-link>
          </div>
        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style >

</style>


<script>
import axios from 'axios'

  export default {
    data: () => ({
      drawer: false,
      group: null,
      role:null,
      profile:{},
      login:false
    }),
    computed:{

    },
    methods:{
      logout(){
        return this.$store.dispatch('logout')
      },
      async getProfile(){
            try{
                let response = await axios.get('/api/profile',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.profile=response.data.profile
                  this.login=true
                  this.role=response.data.profile.roles.map(role=>{return role.name})
                }
            }catch(errors){
              console.log(errors)
              this.login=false
            }
      }
    },
    mounted() {
        this.getProfile()
    },
  }
</script>