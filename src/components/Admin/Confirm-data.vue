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
          <v-text-field
            small
            outlined
            v-model="search"
            dense
            @keyup.enter="getTransfer()"
            label="Pencarian pesanan..."
            placeholder="Nama pengirim"
            append-icon="mdi-magnify"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Nama
                </th>
                <th class="text-left">
                  Pesanan
                </th>
                <th class="text-left">
                  Rekening tujuan
                </th>
                <th class="text-left">
                  Jumlah transfer
                </th>
                <th class="text-left">
                  Tanggal transfer
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data"
                :key="index"
              >
                <td v-if="data">{{data.name}}</td>
                <td v-if="data">{{data.order?data.order.suborder[0].package.name:'kosong'}}</td>
                <td v-if="data">{{data.account.name}}-{{data.account.num_account}}-{{data.account.bank}}</td>
                <td v-if="data">{{data.paid}}</td>
                <td v-if="data">{{data.date}}</td>
                <td>      
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog =true,edit=data">
                      mdi-pencil
                    </v-icon> 
                    <v-icon color="red"
                      class="ma-1" 
                      @click="deleteTransfer(data)">
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

  export default {
    data () {
      return {
        success: false,
        model: null,
        dialog: false,
        edit: false,
        data:[],
        errors:[],
        search:''
      }
    },
    computed:{
      loading(){
        return this.$store.state.product.loading;
      },
    },
    methods: {
      async getTransfer(){
            try{
                let response = await axios.get('/api/transfer?'+'&search='+this.search)
                if (response.status == 200) {
                  this.data=response.data.transfer
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async deleteTransfer(data){
        if (confirm('yakin akan menghapus data?')) {
          try{
              let response = await axios.delete('/api/transfer/'+data.id)
              if (response.status == 200) {
                this.getTransfer()
              }
          }catch(errors){
              this.errors = errors.response.data.errors       
          }
        }
      }
    },
    mounted() {
      this.getTransfer()
    }
  }
</script>
