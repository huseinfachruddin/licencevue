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
          Data Lisensi Anda
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/user/product" style="text-decoration: none;" >
                  <v-btn
                    color="info"
                    small
                  >
                    <v-icon color="white"
                      class="ma-1" >
                      mdi-cart
                    </v-icon>
                    Beli Lisensi
                  </v-btn>
        </router-link>
      </v-toolbar>
      <v-card-text>
      </v-card-text>
      <v-divider></v-divider>
        <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-left">
                  Nama Produk
                </th>
                <th class="text-left">
                  Kode produk
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
                  Link
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
                <td v-if="data">{{data.product.name}}</td>
                <td v-if="data">{{data.product.code}}</td>
                <td v-if="data">{{data.licence}}</td>
                <td v-if="data">{{data.max_domain}}</td>
                <td v-if="data">{{data.due}}</td>
                <td v-if="data">
                  <a :href="data.product.link">Download</a>
                </td>
                <td>
                    <v-icon color="blue"
                      class="ma-1"
                      href="#domain">
                      mdi-web
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
      async deleteLicence(data){
        if (confirm("Yakin Akan menghapus lisensi")) {
          await this.$store.dispatch('deleteLicence',data)
          this.getLicence(this.data.current_page)
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
    }
  }
</script>
