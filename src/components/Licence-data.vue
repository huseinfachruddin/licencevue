<template>
<div>
  <v-container>
  <v-row>
    <v-col cols="12" md="9">
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
        <v-simple-table dense>
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
                @click="domain=data.domain,domain.licence=data.licence"
              >
                <td v-if="data">{{data.user.name}}</td>
                <td v-if="data">{{data.product.name}}({{data.product.code}})</td>
                <td v-if="data">{{data.licence}}</td>
                <td v-if="data">{{data.max_domain}}</td>
                <td v-if="data">{{data.due}}</td>
                <td>      
                    <v-icon color="blue"
                      class="ma-1"
                      href="#domain">
                      mdi-web
                    </v-icon> 
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
        <v-col cols="12" md="3">
      <v-card
      class="overflow-hidden"
      v-if="domain"
      id="domain"
    >
      <v-toolbar
        flat
        color="orange lighten-2"
      >
        <v-icon>mdi-card</v-icon>
        <v-toolbar-title class="font-weight-light">
          Domain terhubung
        </v-toolbar-title>
        <v-spacer></v-spacer>  
      </v-toolbar>
      <v-card-text>
      </v-card-text>
      <v-divider></v-divider>
        <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left">
                  Domain
                </th>
                <th class="text-left">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in domain"
                :key="index"
              >
                <td v-if="data">{{data.domain}}</td>
                <td>      
                    <v-icon color="red"
                      class="ma-1" 
                      @click="deleteDomain(data)">
                      mdi-delete
                    </v-icon> 
                </td>
              </tr>
            </tbody>
        </v-simple-table>
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
          type="number"
          v-model="edit.max_domain"
          label="maximal domain.."
        ></v-text-field>
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
                v-model="edit.due"
                label="Kadaluarsa"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="edit.due"
            ></v-date-picker>
          </v-menu>
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
        user:{},
        domain:false
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
        this.getLicence(this.data.current_page)
      },
      async createLicence(data){
        await this.$store.dispatch('createLicence',data)
        this.getLicence(this.data.current_page)
      },
      async deleteLicence(data){
        if (confirm("Yakin Akan menghapus lisensi")) {
          await this.$store.dispatch('deleteLicence',data)
          this.getLicence(this.data.current_page)
        }
      },
      async getProduct(){
            try{
                let response = await axios.get('/api/product?all='+true)
                if (response.status == 200) {
                  this.product=response.data.product
                }
            }catch(errors){
                this.errors=errors.response.data.erorrs
            }
      },
      async getUser(){
            try{
                let response = await axios.get('/api/user?all='+true,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.user=response.data.user
                }
            }catch(errors){
                console.log(errors)
            }
      },
      async deleteDomain(data){
            try{
                if (confirm("Yakin Akan menghapus lisensi")) {
                  let response = await axios.delete('/api/domain/'+data.id)
                  let domain = await axios.get('/api/domain?licence_id='+data.licence_id)
                  if (response.status == 200) {
                    this.getLicence(this.data.current_page)
                    this.domain=domain.data.domain
                  }
                }

            }catch(errors){
                console.log(errors)
            }
      },
    },
    mounted() {
      this.getLicence(1)
      this.getProduct()
      this.getUser()
    }
  }
</script>
