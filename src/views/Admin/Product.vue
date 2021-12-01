<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12">
      <Product/>   
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Product from '../../components/Product-data'

export default {
  components:{
    Product,
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
