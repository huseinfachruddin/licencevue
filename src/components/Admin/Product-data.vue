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
        <v-icon>mdi-key</v-icon>
        <v-toolbar-title class="font-weight-light">
          Data Product
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
              Tambah Produk Baru
            </v-btn>
        
      </v-toolbar>
      <v-card-text>
      </v-card-text>
      <v-divider></v-divider>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Product
                </th>
                <th class="text-left">
                  Code
                </th>
                <th class="text-left">
                  Deskripsi
                </th>
                <th class="text-left">
                  Deskripsi
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data.data"
                :key="index"
              >
                <td v-if="data">{{data.name}}</td>
                <td v-if="data">{{data.code}}</td>
                <td v-if="data">
                  <a :href="data.link">Download</a>
                </td>
                <td v-if="data" class="text-truncate" style="max-width: 500px;">{{data.desc}}</td>
                <td>      
                    <router-link :to="'/product/'+data.id" style="text-decoration: none;">
                    <v-icon color="warning"
                      class="ma-1" 
                      >
                      mdi-cash
                    </v-icon> 
                    </router-link>
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog =true,edit=data">
                      mdi-pencil
                    </v-icon> 
                    <v-icon color="red"
                      class="ma-1" 
                      v-if="!data.deleted_at"
                      @click="deleteProduct(data)">
                      mdi-delete
                    </v-icon>
                    <v-icon color="red"
                      v-if="data.deleted_at"
                      class="ma-1" 
                      @click="deleteProduct(data)">
                      mdi-backup-restore
                    </v-icon>
                </td>
              </tr>
            </tbody>
        </v-simple-table>
        <v-divider></v-divider>
              <div>
                <v-pagination
                  v-model="data.current_page"
                  :length="data.last_page"
                  @input="getProduct(data)"
                ></v-pagination>
              </div>
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
          label="Nama Product"
        ></v-text-field>
        <v-text-field
          small
          outlined
          v-model="edit.code"
          label="Kode Product"
        ></v-text-field>
        <v-textarea
          small
          outlined
          v-model="edit.desc"
          label="Deskripsi"
        ></v-textarea>
        <v-text-field
          small
          outlined
          v-model="edit.link"
          label="Link"
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
            @click="editProduct(edit)"
          >
            simpan produk
          </v-btn>
          <v-btn
            v-if="!edit.id"
            color="primary"
            small
            @click="createProduct(edit)"
          >
            simpan produk
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
        data:[]
      }
    },
    computed:{
      errors(){
        return this.$store.state.product.product.error;
      },
      form(){
        return this.$store.state.product.product.form;
      },
      loading(){
        return this.$store.state.product.loading;
      },
    },
    methods: {
      async getProduct(data){
            try{
                let response = await axios.get('/api/product?page='+data+'&admin='+true,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    this.data = response.data.product
                }
            }catch(errors){
               console.log(errors)
            }      },
      async editProduct(data){
        await this.$store.dispatch('editProduct',data)
        this.getProduct(this.data.current_page)
      },
      async createProduct(data){
        await this.$store.dispatch('createProduct',data)
        this.getProduct(this.data.current_page)
      },
      async deleteProduct(data){
        var msg = null;
        if(data.deleted_at==null){
          msg = 'Yakin Akan menghapus produk'
        }else{
          msg = 'Yakin Akan restore produk'
        }
        if (confirm(msg)) {
          await this.$store.dispatch('deleteProduct',data)
          this.getProduct(this.data.current_page)
        }
      }
    },
    mounted() {
      this.getProduct(1)
    }
  }
</script>
