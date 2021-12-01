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
        <v-icon>mdi-card</v-icon>
        <v-toolbar-title class="font-weight-light">
          Data Lisensi
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
              Tambah Lisensi
            </v-btn>
        
      </v-toolbar>
      <v-card-text>
      </v-card-text>
      <v-divider></v-divider>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Pemilik
                </th>
                <th class="text-left">
                  Nama Product
                </th>
                <th class="text-left">
                  Lisensi
                </th>
                <th class="text-left">
                  Max domain
                </th>
                <th class="text-left">
                  Kadaluarsa
                </th>
                <th class="text-left">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data.data"
                :key="index"
              >
                <td v-if="data">{{data.user.name}}</td>
                <td v-if="data">{{data.product.name}}({{data.product.code}})</td>
                <td v-if="data">{{data.licence}}</td>
                <td v-if="data">{{data.max_domain}}</td>
                <td v-if="data">{{data.due}}</td>
                <td>      
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog =true,edit=data">
                      mdi-pencil
                    </v-icon> 
                    <v-icon color="red"
                      class="ma-1" 
                      @click="deleteLicence(data)">
                      mdi-delete
                    </v-icon> 
                </td>
              </tr>
            </tbody>
        </v-simple-table>
                    <v-divider></v-divider>
              <div >
                <v-pagination
                  v-model="data.current_page"
                  :length="data.last_page"
                  @input="getLicence(data)"
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
          dense
          outlined
          v-model="edit.name"
          label="Nama Product"
        ></v-text-field>
        <v-select
          small
          dense
          :items="user"
          item-text="name"
          item-value="id"
          label="Pilih user ..."
          v-model="edit.user_id"
          outlined
        ></v-select>

        <v-select
          small
          dense
          :items="product"
          item-text="name"
          item-value="id"
          label="Pilih product ..."
          v-model="edit.product_id"
          outlined
        ></v-select>
        <v-text-field
          small
          dense
          outlined
          v-model="edit.max_domain"
          label="maximal domain.."
        ></v-text-field>
        <v-text-field
          small
          dense
          outlined
          v-model="edit.due"
          label="Kadaluarsa.."
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
            @click="editLicence(edit)"
          >
            simpan produk
          </v-btn>
          <v-btn
            v-if="!edit.id"
            color="primary"
            small
            @click="createLicence(edit)"
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
        product:{},
        user:{}
      }
    },
    computed:{
      data(){
        return this.$store.state.licence.licence.data;        
      },
      errors(){
        return this.$store.state.licence.licence.error;
      },
      form(){
        return this.$store.state.licence.licence.form;
      },
      loading(){
        return this.$store.state.licence.loading;
      },
    },
    methods: {
      async getLicence(data){
        await this.$store.dispatch('licence',data.current_page);
      },
      async editLicence(data){
        await this.$store.dispatch('editLicence',data)
      },
      async createLicence(data){
        await this.$store.dispatch('createLicence',data)
        this.getLicence(1)
      },
      async deleteLicence(data){
        if (confirm("Yakin Akan menghapus lisensi")) {
          await this.$store.dispatch('deleteLicence',data)
          this.getLicence(1)
        }
      },
      async getProduct(){
            try{
                let response = await axios.get('/api/product')
                if (response.status == 200) {
                  this.product=response.data.product.data
                }
            }catch(errors){
                this.errors=errors.response.data.erorrs
            }
      },
      async getUser(){
            try{
                let response = await axios.get('/api/user',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.user=response.data.user.data
                }
            }catch(errors){
                this.errors=errors.response.data.erorrs
            }
      }
    },
    mounted() {
      this.getLicence(1)
      this.getProduct()
      this.getUser()
    }
  }
</script>
