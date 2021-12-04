<template>
  <v-app>
      <canvas class="background"></canvas>
    <Loading/>
    <Navbar v-if="this.$router.currentRoute.path!=='/register' && this.$router.currentRoute.path!=='/login'"/>
    <v-container fluid class="bg" >
        <router-view temporary/>  
    </v-container>
  </v-app>
</template>

<style>
.bg{
    background: url('https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg') no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%;

  }
.background{
    position: absolute;
    display: block;
    z-index: 0;
}
router-link a{
    text-decoration: none ;
}
</style>

<script>
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import Particles from 'particlesjs';

export default {
  components:{
    Navbar,
    Loading,
  },
  mounted(){
      Particles.init({
        selector: '.background',
        maxParticles: 50,
        connectParticles:true,
        color:'#ffffff'
      });
  }
};
</script>
