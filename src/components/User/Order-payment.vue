<template>
<div>
  <v-container>
  <v-row>
    <v-col>
      <v-card
      class="overflow-hidden"
      v-if="data"
    >
      <v-toolbar
        flat
        color="yellow lighten-2"
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
                  Item
                </th>
                <th class="text-left">
                  Sub-total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="data,index in data.suborder"
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
              </tr>
              <tr>
                <td>Total + Code unik</td>
                <td>
                  <money-format :value="data.total" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
                </td>
              </tr>
              <tr class="yellow">
                <td>
                  Total pembayaran 
                </td>
                <td>
                <money-format :value="data.total" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
                </td>
              </tr>
              <tr class="">
                <td>
                  status : {{data.status}}
                </td>
                <td>
              <router-link :to="'/user/invoice/'+data.id" style="text-decoration: none;" >
                <v-btn
                  color="success"
                >
                    Menuju ke invoice
                </v-btn>
              </router-link>
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
        dialog: false,
        edit: false,
        data:[],
        channel:[],
        form:{},
        xendit:{},
        code:null,
        total:null,
        account:[]
      }
    },
    computed:{
    },
    methods: {
      async getOrder(){
            try{
                let response = await axios.get('/api/order/'+this.$route.params.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.data=response.data.order
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async getAccount(){
            try{
                let response = await axios.get('/api/account')
                if (response.status == 200) {
                  this.account=response.data.account
                }
            }catch(errors){
                console.log(errors)            
            }
      },
    },
    async mounted() {
      await this.getOrder()
      await this.getAccount()
      await this.getChannel()
      this.code = await Math.floor((Math.random() * 99)+1)
      this.total = this.data.total+this.code
    }
  }
</script>
