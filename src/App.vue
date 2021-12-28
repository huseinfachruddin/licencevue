<template>
  <v-app>
    <Loading/>
    <Navbar v-if="this.$router.currentRoute.path!=='/register' && this.$router.currentRoute.path!=='/login'"/>
    <v-container fluid class="bg">
        <router-view temporary/>  
    </v-container>
    <Footer/>
  </v-app>
</template>

<style>
.bg{
  -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover; 
  background: rgb(34,193,195);
  background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(19,15,130,1) 100%);
    margin:0;
    padding:0;
    height: 100%;
  }
router-link a{
    text-decoration: none ;
}
</style>

<script>
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import Footer from './components/Footer'

export default {
  components:{
    Navbar,
    Loading,
    Footer
  },
  mounted(){

  }
};
</script>
