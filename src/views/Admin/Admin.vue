<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12">
      <User/>   

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import User from '../../components/Admin/User-data'

export default {
  components:{
    User,
  },
  data(){
    return{

    }
  },
  computed:{
  },
  methods:{

  }
}
</script>
