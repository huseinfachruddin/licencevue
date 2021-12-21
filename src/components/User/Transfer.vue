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
              <tr>
                <h4 class="ma-3">Silahkan transfer ke salah satu  rekening dibawah ini untuk pembayaran.</h4>
              </tr>
              <tr>
                <th>Nama Pemilik</th>
                <th>Nomor Rekening</th>
              </tr>
              <tr v-for="data,index in account" :key="index">
                <td>{{data.name}}</td>
                <td>{{data.bank}}-{{data.num_account}}</td>
              </tr>
              <tr>
                <h4 class="ma-3">Jika telah melakukan transfer rekening silahkan mengisi konfirmasi pembayaran di bawah ini.</h4>
              </tr>
              <tr>
                <td>Rekening yang dituju</td>
                <td>
                  <v-select
                    class="mt-3"
                    small
                    dense
                    :items="account"
                    :item-text="item=>item.bank+'-'+item.num_account+'-'+item.name"
                    item-value="id"
                    label="Pilih rekening..."
                    v-model="form.account_id"
                    outlined
                  ></v-select>
                </td>
              </tr>
              <tr>
                <td>Nominal dibayarkan</td>
                <td>
                    <v-text-field
                      class="mt-3"
                      type="number"
                      small
                      dense
                      outlined
                      v-model="form.paid"
                      label="Masukan Nominal..."
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <v-btn
                    color="success"
                    small
                    @click="createConfirm(form)"
                  >
                    Konfirmasi
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

  export default {
  components:{
    'money-format': MoneyFormat,
  },
    data () {
      return {
        data:{},
        account:{},
        form:{}
      }
    },
    computed:{
    },
    methods: {
      async createConfirm(form){
        let data={
          order_id:this.data.id,
          account_id:form.account_id,
          paid:form.paid
        }
            try{
                let response = await axios.post('/api/transfer',data)
                if (response.status == 200) {
                    alert('Anda telah melakukan konfirmasi pembayaran,Tunggu konfirmasi dari admin')
                }
            }catch(errors){
                console.log(errors)            
            }
      },
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
                let response = await axios.get('/api/account/')
                if (response.status == 200) {
                  this.account=response.data.account
                }
            }catch(errors){
                console.log(errors)            
            }
      },
    },
    mounted() {
      this.getOrder()
      this.getAccount()
    }
  }
</script>
