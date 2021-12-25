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
                  Nama API
                </th>
                <th class="text-left">
                  Token
                </th>
                <th class="text-left">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data"
                :key="index"
              >
                <td v-if="data">{{data.name}}</td>
                <td v-if="data">{{data.token}}</td>
                <td>      
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog =true,edit=data">
                      mdi-pencil
                    </v-icon> 
                    <!-- <v-icon color="red"
                      class="ma-1" 
                      @click="deleteApi(data)">
                      mdi-delete
                    </v-icon> -->
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
          Data API
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
          :items="['xendit','whatsapp']"
          label="Pilih API..."
          v-model="edit.name"
          outlined
        ></v-select>
        <v-text-field
          small
          outlined
          v-model="edit.token"
          label="Token..."
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
            @click="editApi(edit)"
          >
            simpan data
          </v-btn>
          <v-btn
            v-if="!edit.id"
            color="primary"
            small
            @click="createApi(edit)"
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
      async getApi(){
            try{
                let response = await axios.get('/api/token')
                if (response.status == 200) {
                  this.data=response.data.api
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async editApi(data){
        if (confirm('yakin akan mengubah data?')) {
          try{
              let response = await axios.put('/api/token/'+data.id,data)
              if (response.status == 200) {
                alert('data berhasil diubah')
                this.getApi()
              }
          }catch(errors){
              this.errors = errors.response.data.errors       
          }
        }
      },
      async createApi(data){
                  try{
                      let response = await axios.post('/api/token',data)
                      if (response.status == 200) {
                        alert('data berhasil ditambah')
                        this.getApi()
                      }
                  }catch(errors){
                      this.errors = errors.response.data.errors       
                  }
      },
      async deleteApi(data){
        if (confirm('yakin akan menghapus data?')) {
          try{
              let response = await axios.delete('/api/token/'+data.id,data)
              if (response.status == 200) {
                this.getApi()
              }
          }catch(errors){
              this.errors = errors.response.data.errors       
          }
        }
      }
    },
    mounted() {
      this.getApi()
    }
  }
</script>
