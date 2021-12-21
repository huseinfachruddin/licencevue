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
          Data Rekening
        </v-toolbar-title>
        <v-spacer></v-spacer>
          <v-btn
            color="primary"
            small
            @click="dialog=true,edit={}"
          >
          <v-icon color="white"
          class="ma-1" 
          mdi-key>
            </v-icon>
              Tambah Baru
            </v-btn>
        
      </v-toolbar>
      <v-card-text>
      </v-card-text>
      <v-divider></v-divider>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Nama pemilik
                </th>
                <th class="text-left">
                  Nama bank
                </th>
                <th class="text-left">
                  Nomer rekening
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data"
                :key="index"
              >
                <td v-if="data">{{data.name}}</td>
                <td v-if="data">{{data.bank}}</td>
                <td v-if="data">{{data.num_account}}</td>
                <td>      
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog =true,edit=data">
                      mdi-pencil
                    </v-icon> 
                    <v-icon color="red"
                      class="ma-1" 
                      @click="deleteAccount(data)">
                      mdi-delete
                    </v-icon>
                </td>
              </tr>
            </tbody>
        </v-simple-table>
        <v-divider></v-divider>
    </v-card>
    </v-col>
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
        <v-text-field
          small
          outlined
          v-model="edit.name"
          label="Nama pemilik"
        ></v-text-field>
        <v-text-field
          small
          outlined
          v-model="edit.bank"
          label="Nama bank"
        ></v-text-field>
        <v-text-field
          small
          type="number"
          outlined
          v-model="edit.num_account"
          label="Nomer rekening"
        ></v-text-field>
      </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="error"
            small
            @click="dialog=false"
          >
            tutup
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="edit.id"
            color="primary"
            small
            @click="editAccount(edit)"
          >
            simpan data
          </v-btn>
          <v-btn
            v-if="!edit.id"
            color="primary"
            small
            @click="createAccount(edit)"
          >
            simpan data
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
      }
    },
    computed:{
      loading(){
        return this.$store.state.product.loading;
      },
    },
    methods: {
      async getAccount(){
            try{
                let response = await axios.get('/api/account')
                if (response.status == 200) {
                  this.data=response.data.account
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async editAccount(data){
        if (confirm('yakin akan mengubah data?')) {
          try{
              let response = await axios.put('/api/account/'+data.id,data)
              if (response.status == 200) {
                alert('data berhasil diubah')
                this.getAccount()
              }
          }catch(errors){
              this.errors = errors.response.data.errors       
          }
        }
      },
      async createAccount(data){
                  try{
                      let response = await axios.post('/api/account',data)
                      if (response.status == 200) {
                        alert('data berhasil ditambah')
                        this.getAccount()
                      }
                  }catch(errors){
                      this.errors = errors.response.data.errors       
                  }
      },
      async deleteAccount(data){
        if (confirm('yakin akan menghapus data?')) {
          try{
              let response = await axios.delete('/api/account/'+data.id,data)
              if (response.status == 200) {
                this.getAccount()
              }
          }catch(errors){
              this.errors = errors.response.data.errors       
          }
        }
      }
    },
    mounted() {
      this.getAccount()
    }
  }
</script>
