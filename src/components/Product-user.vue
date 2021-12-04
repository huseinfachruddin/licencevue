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
      <v-btn
        outlined
        solo
        text
        color="blue"
      >
        detail
      </v-btn>
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
  export default {
    data () {
      return {
        success: false,
        model: null,
        dialog: false,
        edit: false
      }
    },
    computed:{
      data(){
        return this.$store.state.product.product.data;        
      },
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
        await this.$store.dispatch('product',data.current_page);
      },
    },
    mounted() {
      this.getProduct(1)
    }
  }
</script>
