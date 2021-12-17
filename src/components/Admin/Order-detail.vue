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
          Data Pesanan {{data.user.name}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        {{data.user.email}} no.Telp : {{data.user.phone}}
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
              <tr class="yellow">
                <td>TOTAL</td>
                <td>
                  <money-format :value="data.total" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
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
        form:{}
      }
    },
    computed:{
    },
    methods: {
      async getOrder(){
            try{
                let response = await axios.get('/api/order/'+this.$route.params.id)
                if (response.status == 200) {
                  this.data=response.data.order
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async getChannel(){
            try{
                let response = await axios.get('/api/xendit/channel')
                if (response.status == 200) {
                  this.channel=response.data.xendit
                }
            }catch(errors){
                console.log(errors)
            }
      },
      async payment(form){
            let data = {
              id : this.data.id,
              channel : form.channel,
              total : this.data.total
            }
            try{
                let response = await axios.post('/api/xendit/payment',data)
                if (response.status == 200) {
                  this.getOrder()
                }
            }catch(errors){
                console.log(errors)            
            }
      }
    },
    mounted() {
      this.getOrder()
      this.getChannel()
    }
  }
</script>
