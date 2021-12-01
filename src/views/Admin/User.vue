<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12">
      <User/>   

      <!-- <Role/> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import Role from '../components/Role'
import User from '../../components/User-data'

export default {
  components:{
    // Role,
    User,
  },
  data(){
    return{

    }
  },
  computed:{
      loading(){
        return this.$store.state.auth.profile.loading            
        },
      errors(){
        return this.$store.state.auth.profile.error;
      },
      form(){
        return this.$store.state.auth.profile.form;
      },
  },
  methods:{
    async register(form){
      this.$store.dispatch('register',form)
    }
  }
}
</script>
