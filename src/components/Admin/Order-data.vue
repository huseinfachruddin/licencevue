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
                  Nama
                </th>
                <th class="text-left">
                  No.Whatsapp
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
                :class="data.deleted_at?'red lighten-3':''"
              >
                <td v-if="data">{{data.id}}</td>          
                <td><span v-if="data.user.greeting">{{data.user.greeting}}</span> {{data.user.fullname}}</td>
                <td v-if="data">{{data.user.phone}}</td>
                <td v-if="data.suborder[0]">{{data.suborder[0].package.product.name}} {{data.suborder[0].package.name}}</td>
                <td v-if="data">
                <money-format :value="data.total" 
                  locale="id" 
                  currency-code="IDR" 
                  >
                </money-format>
                </td>
                <td v-if="data">{{data.status}}</td>
                <td v-if="data">
                    <router-link :to="'/order/'+data.id" style="text-decoration: none;">
                    <v-icon color="blue"
                      class="ma-1" 
                      >
                      mdi-format-list-bulleted-type
                    </v-icon> 
                    </router-link>
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog=true,edit=data">
                      mdi-pencil
                    </v-icon>
                    <v-icon color="red"
                      v-if="!data.deleted_at"
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
 <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 orange lighten-2">
          Product
        </v-card-title>
      <v-card-text class="pa-3">
        <v-alert
          type="error"
          v-for="[error] in errors" :key="error"
        >
        {{error}}
        </v-alert>
        <v-select
          small
          dense
          :items="status"
          label="Pilih status"
          v-model="edit.status"
          outlined
        ></v-select>
      </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="error"
            small
            @click="dialog=false,edit={}"
          >
            tutup
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="edit.id"
            color="primary"
            small
            @click="editOrder(edit)"
          >
            simpan data
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
        errors:[],
        dialog:false,
        status:['menunggu pembayaran','sudah dibayar','dibatalkan'],
      }
    },
    methods: {
      async getOrder(){
            try{
                let response = await axios.get('/api/order',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.data=response.data.order
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async editOrder(data){
            try{
              if (confirm('yakin merubah status pembayaran menjadi'+data.status),{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}) {
                let response = await axios.put('/api/order/'+data.id,data)
                if (response.status == 200) {
                  this.data=response.data.order
                  this.getOrder()
                }
              }
            }catch(errors){
                console.log(errors)            
            }
      },
      async deleteOrder(data){
            try{
              
              if (confirm('Yakin ingin menghapus data')) {
                
                let response = await axios.delete('/api/order/'+data.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
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
