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
        <v-list-item-content >
          <v-list-item-title class="text-h6">
            {{profile.data.name}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{profile.data.email}}
          </v-list-item-subtitle>
        </v-list-item-content>
        </router-link>
      </v-list-item>

      <v-divider></v-divider>
          <router-link to="/" style="text-decoration: none;" >
              <v-list-item>
                <v-list-item-title >Home</v-list-item-title>
              </v-list-item> 
          </router-link>
          <div v-if="role=='admin'">
            <router-link to="/admin" style="text-decoration: none;" >
                <v-list-item>
                  <v-list-item-title >Admin</v-list-item-title>
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
          <v-btn
              @click="logout()"
              color="error"
              small
              >
                logout
          </v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style >

</style>


<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      role:''
    }),
    computed:{
      profile(){
        return this.$store.state.auth.profile.data       
      },
    },
    methods:{
      logout(){
        return this.$store.dispatch('logout')
      }
    },
    async mounted() {
        await this.$store.dispatch('profile')
        this.$store.state.auth.profile.data.roles.filter(role=>{
        this.role =role.name
        })
    },
  }
</script>