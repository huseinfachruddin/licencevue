<template>
<div>
  <v-divider></v-divider>
  <v-container >
  <v-row class="d-flex justify-center">
  <v-card
    class="ma-1"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{data.code}}
        </div>
        <v-list-item-title class="text-h4 mb-1">
          {{data.name}}
        </v-list-item-title>
        <p overflow>{{data.desc}}</p>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="blue"
      >
      <v-icon
        icon="mdi-cart"
        color="white"
      >
        mdi-cart
      </v-icon>
      </v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
    </v-card-actions>
  <v-div class="d-flex justify-center">
    <h2>Paket menarik untuk anda</h2>
  </v-div>
  </v-card>
  <v-card
    class="ma-1"
    outlined
    v-for="data in data.package" :key="data.id"
    width="500"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 mb-1">
          {{data.name}}
        </v-list-item-title>
        <p>{{data.desc}}</p>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-spacer></v-spacer>
    <v-chip
      class="ma-2"
      outlined
      solo
      label
      color="blue"
    >
    <money-format :value="data.price" 
      locale="id" 
      currency-code="IDR" 
      >
    </money-format>
    </v-chip>
      <v-btn
        outlined
        solo
        color="blue"
        @click="createCart(data)"
      >
        beli
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-row>
  </v-container>
</div>
</template>
<script>
  import axios from 'axios'
  import MoneyFormat from 'vue-money-format'
  import router from '../router'

  export default {
    components:{
    'money-format': MoneyFormat
    },
    data () {
      return {
        success: false,
        dialog: false,
        edit: false,
        data:[]
      }
    },
    computed:{
      errors(){
        return this.$store.state.product.product.error;
      },
      form(){
        return this.$store.state.product.product.form;
      },
      loading(){
        return this.$store.state.product.loading;
      },
    },
    methods: {
      async getProduct(){
            try{
                let response = await axios.get('/api/product/'+this.$route.params.id)
                if (response.status == 200) {
                  this.data=response.data.product
                }
            }catch(errors){
                console.log(errors)            
            }
    },
    async createCart(data){
            try{
                let response = await axios.post('/api/cart?package_id='+data.id,data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    return router.push({ path: '/user/cart'});
                }
            }catch(errors){
                if (errors.response.status == 401) {
                    router.push('/login');
                }
                console.log(errors)            
            }
    },
    },
    mounted() {
      this.getProduct(1)
    }
  }
</script>
