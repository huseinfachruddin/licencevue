<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12">

      <Role/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Role from '../../components/Role-data'

export default {
  components:{
    Role,
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
