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
        <v-icon>mdi-bank</v-icon>
        <v-toolbar-title class="font-weight-light">
          Data konfirmasi pembayaran
        </v-toolbar-title>
        <v-spacer></v-spacer>
        
      </v-toolbar>
      <v-card-text>
      </v-card-text>
      <v-divider></v-divider>
        <v-simple-table>
            <tbody v-if="!loading">
              <tr>
                <h4 class="ma-3">Jika telah melakukan transfer rekening silahkan mengisi konfirmasi pembayaran di bawah ini.</h4>
              </tr>
              <v-alert
                type="error"
                v-for="[error] in errors" :key="error"
              >
              {{error}}
              </v-alert>
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
                      small
                      dense
                      outlined
                      v-model="form.paid"
                      label="Masukan Nominal..."
                    ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>Tanggal transfer</td>
                <td>
                  <v-menu
                    ref="menu"
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        small
                        dense
                        outlined
                        v-model="form.date"
                        label="Tanggal transfer"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.date"
                    ></v-date-picker>
                  </v-menu>
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

export default{
  components:{
  },
  data(){
    return{
      data:{},
      account:{},
      form:{},
      errors:{}
    }
  },
  methods:{
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
    async createConfirm(form){
        let data={
          order_id:this.$route.params.id,
          account_id:form.account_id,
          paid:form.paid,
          date:form.date
        }
            try{
                let response = await axios.post('/api/transfer',data)
                if (response.status == 200) {
                    alert('Anda telah melakukan konfirmasi pembayaran,Tunggu konfirmasi dari admin')
                this.form={}
                }
            }catch(errors){
                this.errors=errors.response.data.errors           
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
  mounted(){
    this.getOrder()
    this.getAccount()
  }
}
</script>


