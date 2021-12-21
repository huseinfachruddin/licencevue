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
                <td>Total</td>
                <td>
                  <money-format :value="data.total" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
                </td>
              </tr>
              <tr>
                <td>
                  Kode unik : 
                </td>
                <td>
                <money-format :value="code" 
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
                <money-format :value="transfer" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
                </td>
              </tr>
              <tr>
                <h3 class="ma-3">Pilih Metode Pembayaran</h3>
              </tr>
              <tr>
                <h4 class="ma-3">Melalui Transfer</h4>
              </tr>
              <tr>
                <th>
                  Nama pemilik
                </th>
                <th>
                  No Rekening
                </th>
              </tr>
              <tr v-for="data,index in account" :key="index">
                <th>
                  {{data.name}}
                </th>
                <th>
                  {{data.bank}}-{{data.num_account}}
                </th>
              </tr>
              <tr class="yellow">
                <th>
                  Selesaikan pembayaran
                </th>
                <th>
                  <v-btn
                  @click="payByTransfer()"
                  color="success"
                  >
                    Bayar melalui transfer
                  </v-btn>
                </th>
              </tr>
              <tr>
                <h4 class="ma-3">Melalui Xendit</h4>
              </tr>
              <tr>
              <td></td>
              <td>
              <v-radio-group
                v-model="form.channel"
                class="ma-3 justify-center"
              >
                <v-radio
                  v-for="data,index in channel" :key="index"
                  :label="data.name"
                  :value="data.channel_code"
                ></v-radio>
              </v-radio-group>
              </td>
              </tr>
              
              <tr  class="yellow">
                <td>Selesaikan Pembayaran</td>
                <td>
                <v-btn
                  color="success"
                  @click="payByTransfer(form)"
                >
                  Bayar melalui xendit
                </v-btn>
                <v-btn
                v-if="xendit==false"
                  color="success"
                  @click="createTransfer(form)"
                >
                  Selesaikan transfer
                </v-btn>
                </td>
              </tr>
              <tr>
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
                let response = await axios.get('/api/order/'+this.$route.params.id)
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
      async payByTransfer(){
            let data = {
              id : this.data.id,
              status : 'menunggu pembayaran',
              method : 'transfer',
              total :this.total
            }
            try{
                let response = await axios.put('/api/order/'+data.id,data)
                if (response.status == 200) {
                  this.$router.go()
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async payByXendit(form){
            let data = {
              id : this.data.id,
              status : 'menunggu pembayaran',
              method : 'xendit',
              channel : form.channel,
              total : this.total
            }
            try{
                let order = await axios.put('/api/order/'+data.id,data)
                let response = await axios.post('/api/xendit/payment',data)
                if (response.status == 200 || order.status == 200) {
                  this.$route.go()
                }
            }catch(errors){
                console.log(errors)            
            }
      }
    },
    async mounted() {
      await this.getOrder()
      await this.getAccount()
      await this.getChannel()
      this.code = await Math.floor((Math.random() * 99)+1)
      this.total = await this.data.total+this.code
    }
  }
</script>
