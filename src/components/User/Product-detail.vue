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
        <div v-html="data.desc"></div>
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
  </v-div>
  </v-card>
  <v-card class="pa-3 justify-center">

    <h2>Paket menarik untuk anda</h2>
 <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Paket
                </th>
                <th class="text-left">
                  harga
                </th>
                <th class="text-left">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data.package"
                :key="index"
              >
                <td v-if="data">{{data.name}}</td>
                <td v-if="data">
                <money-format :value="data.price" 
                  locale="id" 
                  currency-code="IDR"
                  >
                </money-format>
                </td>
                <td>      
                    <v-btn
                    v-if="active==true"
                      @click="active=true,createCart(data)"
                    >
                    <v-icon color="warning"
                      class="ma-1" 
                    >
                      mdi-cart
                    </v-icon> 
                    </v-btn>
                    <v-btn
                    disabled
                    v-if="active==false"
                    >
                    <v-icon color="warning"
                      class="ma-1" 
                    >
                      mdi-cart
                    </v-icon> 
                    </v-btn>
                </td>
              </tr>
            </tbody>
        </v-simple-table>
    </v-card>
  </v-row>
  </v-container>
      <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Anda Belum Login 
        </v-card-title>

        <v-card-text>
Untuk melakukan pembelian anda harus login terlebih dahulu, atau daftar sebagai pengguna baru.        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        <router-link :to="'/login'" style="text-decoration: none;">
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Login
          </v-btn>
        </router-link>
        <router-link :to="'/register'" style="text-decoration: none;">
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Daftar
          </v-btn>
        </router-link >
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>
<script>
  import axios from 'axios'
  import MoneyFormat from 'vue-money-format'
  import router from '../../router'

  export default {
    components:{
    'money-format': MoneyFormat
    },
    data () {
      return {
        success: false,
        dialog: false,
        edit: false,
        active: true,
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
                    this.dialog=true
                }
                console.log(errors)            
            }
    },
    },
    mounted() {
      this.getProduct()
    }
  }
</script>
