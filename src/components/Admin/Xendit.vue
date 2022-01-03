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
        color="green lighten-2"
      >
        <v-icon>mdi-card</v-icon>
        <v-toolbar-title class="font-weight-light">
          Tagihan untuk {{data.user.name}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        {{data.user.email}}
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
              <tr class="green">
                <td>TOTAL</td>
                <td>
                  <money-format :value="data.total" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
                </td>
              </tr>
              <tr>
                <td>Bayar melalui</td>
                <td>
                 {{invoice.retail_outlet_name}}
                </td>
              </tr>
              <tr>
                <td>Code pembayaran</td>
                <td>
                  <strong>
                 {{invoice.payment_code}}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                 {{invoice.status}}
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
        data:{},
        invoice:{}
      }
    },
    computed:{
    },
    methods: {
      async getInvoice(){
            try{
                let response = await axios.post('/api/xendit/invoice?id='+this.$route.params.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    this.invoice=response.data.xendit
                }
            }catch(errors){
                console.log(errors)            
            }
      },
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
    },
    mounted() {
      this.getOrder()
      this.getInvoice()
    }
  }
</script>
