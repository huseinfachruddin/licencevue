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
        <v-icon>mdi-cart-plus</v-icon>
        <v-toolbar-title class="font-weight-light">
          Data Pesanan Anda
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
                  id
                </th>
                <th class="text-left">
                  Item
                </th>
                <th class="text-left">
                  jumlah
                </th>
                <th class="text-left">
                  Status
                </th>
                <th class="text-left">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="data,index in data"
                :key="index"
              >
                <td v-if="data">{{data.id}}</td>
                <td v-if="data">{{data.suborder[0].package.product.name}} {{data.suborder[0].package.name}}</td>
                <td v-if="data">
                <money-format :value="data.total" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
                </td>
                <td v-if="data">{{data.status}}</td>
                <td v-if="data">
                    <router-link :to="'/user/order/'+data.id" style="text-decoration: none;">
                    <v-icon color="blue"
                      class="ma-1" 
                      >
                      mdi-format-list-bulleted-type
                    </v-icon> 
                    </router-link>
                    <v-icon color="red"
                      v-if="data.status!='sudah dibayar'"
                      class="ma-1" 
                      @click="deleteOrder(data)">
                      mdi-delete
                    </v-icon>
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
  export default {
        components:{
          'money-format': MoneyFormat,
        },
    data () {
      return {
        success: false,
        model: null,
        edit: false,
        data:[],
      }
    },
    methods: {
      async getOrder(){
            try{
                let response = await axios.get('/api/order')
                if (response.status == 200) {
                  this.data=response.data.order
                }
            }catch(errors){
                console.log(errors)           
            }
      },
      async deleteOrder(data){
            try{
              if (confirm('yakin akan membatalkan pesanan')) {
                let response = await axios.put('/api/order/'+data.id,{status:'dibatalkan'})
                if (response.status == 200) {
                  this.getOrder()
                }
              }
            }catch(errors){
                console.log(errors)            
            }
      },
    },
    mounted() {
      this.getOrder()
    }
  }
</script>
