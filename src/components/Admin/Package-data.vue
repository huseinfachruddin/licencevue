<template>
<div>
  <v-container>
    <v-card
      class="overflow-hidden pa-2 mb-3"
    >
      <h1>{{data.name}}</h1>
      <p>{{data.desc}}</p>
    </v-card>
      <v-card
      class="overflow-hidden"
      color=""
    >
      <v-toolbar
        flat
        color="orange lighten-2"
      >
        <v-icon>mdi-cash</v-icon>
        <v-toolbar-title class="font-weight-light">
          Paket dan Harga
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
              Tambah paket Baru
            </v-btn>
        
      </v-toolbar>
      <v-card-text>
      </v-card-text>
      <v-divider></v-divider>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Paket
                </th>
                <th class="text-left">
                  Deskripsi
                </th>
                <th class="text-left">
                  jml.lisensi
                </th>
                <th class="text-left">
                  jml.domain
                </th>
                <th class="text-left">
                  jml.waktu
                </th>
                <th class="text-left">
                  Harga
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data.package"
                :key="index"
              >
                <td v-if="data">{{data.name}}</td>
                <td v-if="data" class=" text-truncate" style="max-width: 200px;">{{data.desc}}</td>
                <td v-if="data">{{data.num_licence}}</td>
                <td v-if="data">{{data.num_domain}}</td>
                <td v-if="data">{{data.num_expired}}(/hari)</td>
                <td v-if="data">{{data.price}}</td>
                <td>      
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog =true,edit=data">
                      mdi-pencil
                    </v-icon> 
                    <v-icon color="red"
                      class="ma-1" 
                      @click="deletePackage(data)">
                      mdi-delete
                    </v-icon>
                </td>
              </tr>
            </tbody>
        </v-simple-table>
    </v-card>
  </v-container>
   <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <v-card>
        <v-alert
          type="error"
          v-for="[error] in errors" :key="error"
        >
        {{error}}
        </v-alert>
        <v-card-title class="text-h5 orange lighten-2">
          paket
        </v-card-title>
      <v-card-text class="pa-3">
        <v-text-field
          small
          outlined
          v-model="edit.name"
          label="Nama Paket..."
        ></v-text-field>
        <v-textarea
          small
          outlined
          v-model="edit.desc"
          label="Deskripsi..."
        ></v-textarea>
        <v-text-field
          small
          type="number"
          outlined
          v-model="edit.num_licence"
          label="Jumlah lisensi..."
        ></v-text-field>
        <v-text-field
          small
          type="number"
          outlined
          v-model="edit.num_domain"
          label="Jumlah maksimal domain..."
        ></v-text-field>
        <v-text-field
          small
          type="number"
          outlined
          v-model="edit.num_expired"
          label="Waktu kadaluarsa (Hari)..."
        ></v-text-field>
        <v-text-field
          small
          type="number"
          outlined
          v-model="edit.price"
          label="Harga..."
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
            @click="editPackage(edit)"
          >
            simpan data
          </v-btn>
          <v-btn
            v-if="!edit.id"
            color="primary"
            small
            @click="createPackage(edit)"
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
  // import MoneyFormat from 'vue-money-format'
  export default {
  components:{
    // 'money-format': MoneyFormat
    },
    data () {
      return {
        success: false,
        dialog: false,
        edit: false,
        data:[],
        package:[],
        errors:[]
      }
    },
    computed:{
      form(){
        return this.$store.state.product.product.form;
      },
      loading(){
        return this.$store.state.product.loading;
      },
    },
    methods: {
      async getProduct(){
            try{
                let response = await axios.get('/api/product/'+this.$route.params.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.data=response.data.product
                }
            }catch(errors){
                console.log(errors)            
            }
      },
      async getPackage(){
            try{
                let response = await axios.get('/api/package?product_id='+this.$route.params.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.price=response.data.package
                }
            }catch(errors){
                  this.errors=errors.response.data.errors
                  setTimeout(()=>{
                    this.errors=[]
                  },5000)
            }
      },
      async createPackage(data){
            try {
                let response = await axios.post('/api/package?product_id='+this.$route.params.id,data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                 this.getPackage()
                  this.getProduct()
                 alert('data berhasil disimpan')
                 this.errors=[]
                }
            }catch (errors) {
                  this.errors=errors.response.data.errors
                  setTimeout(()=>{
                    this.errors=[]
                  },5000)
            }
      },
      async editPackage(data){
            try {
                let response = await axios.put('/api/package/'+data.id,data,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                 this.getPackage()
                  alert('data berhasil disimpan')
                 this.errors=[]
                }
            }catch (errors) {
                  this.errors=errors.response.data.errors
                  setTimeout(()=>{
                    this.errors=[]
                  },5000)
            }
      },
      async deletePackage(data){
            try {
              if (confirm("Yakin Akan menghapus data")){
                let response = await axios.delete('/api/package/'+data.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                 this.getPackage()
                 this.errors=[]
                }
              }
            }catch (errors) {
              this.errors=errors.response.data.errors
            }
      }
    },
    mounted(){
      this.getProduct(1)
      this.getPackage()
    }
  }
</script>
