<template>
<div>
  <v-container>
  <v-row>
    <v-col>
      <v-card
      class="overflow-hidden"
      color=""
    >
      <v-toolbar
        flat
        color="orange lighten-2"
      >
        <v-icon>mdi-cart</v-icon>
        <v-toolbar-title class="font-weight-light">
          Keranjang Anda
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
      </v-card-text>
      <v-divider></v-divider>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Item
                </th>
                <th class="text-left">
                  Sub total
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data.subcart"
                :key="index"
              >
                <td v-if="data">"<strong>{{data.package.product.name}}"</strong> {{data.package.name}}</td>
                <td v-if="data">
                <money-format :value="data.total" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
                </td>
                <td>
                    <v-icon color="red"
                      class="ma-1" 
                      @click="deleteOrder(data)">
                      mdi-delete
                    </v-icon>
                </td>
              </tr>
              <tr>
                <td>TOTAL</td>
                <td>
                  <money-format :value="total" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
                </td>
                <td>
          <v-btn
            v-if="data.id"
            color="primary"
            @click="createOrder(data)"
          >
            Pesan sekarang
          </v-btn>
                </td>
              </tr>
            </tbody>
        </v-simple-table>
        <v-divider></v-divider>
    </v-card>
    </v-col>
  </v-row>
  </v-container>
</div>
</template>
<script>
import axios from 'axios'
  import MoneyFormat from 'vue-money-format'
  import router from '../../router'
  export default {
  components:{
    'money-format': MoneyFormat,
  },
    data () {
      return {
        success: false,
        model: null,
        dialog: false,
        edit: false,
        data:[],
        total:null,
        form:{}
      }
    },
    computed:{
      loading(){
        return this.$store.state.product.loading;
      },
    },
    methods: {
      async getCart(){
            try{
                let response = await axios.get('/api/cart',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.data=response.data.cart
                  let total = 0;
                  this.data.subcart.forEach(e => {
                    total = total + e.total*e.amount
                });
                  this.total = total;
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async deleteOrder(data){
            try{
                let response = await axios.delete('/api/cart/subcart/'+data.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.data=response.data.product
                  this.getCart()
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async createOrder(data){
            try{
                let response = await axios.post('/api/order',data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  router.push('/user/order/'+response.data.order.id);
                  this.getCart()
                }
            }catch(errors){
                console.log(errors.response) 
            }
      },
    },
    mounted() {
      this.getCart()
    }
  }
</script>
