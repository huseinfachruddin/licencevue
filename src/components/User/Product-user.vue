<template>
<div>
    <h1 class="white--text">Pilih Produk Untuk Mempermudah Anda</h1>
  <v-divider></v-divider>
  <v-container class="justify-center">
  <v-row >
  <v-card
    width="344"
    class="ma-1"
    outlined
    v-for="data,index in data.data" :key="index"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{data.code}}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{data.name}}
        </v-list-item-title>
        <v-list-item-subtitle>{{data.desc}}</v-list-item-subtitle>
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
    <router-link :to="'/user/product/'+data.id" style="text-decoration: none;" >
      <v-btn
        outlined
        solo
        text
        color="blue"
      >
        detail
      </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
  </v-row>
  </v-container>
  <div  class="justify-center">
                <v-pagination
                  v-model="data.current_page"
                  :length="data.last_page"
                  @input="getProduct(data)"
                ></v-pagination>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    data () {
      return {
        success: false,
        dialog: false,
        edit: false,
        data:{}
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
      async getProduct(data){
            try{
                let response = await axios.get('/api/product?page='+data)
                if (response.status == 200) {
                  this.data=response.data.product
                }
            }catch(errors){
                console.log(errors)            }
      },
    },
    mounted() {
      this.getProduct(1)
    }
  }
</script>
