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
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">
          Data User
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/role" style="text-decoration: none;" >
                  <v-btn
                    color="primary"
                    small
                  >
                    <v-icon color="white"
                      class="ma-1" 
                      mdi-key>
                    </v-icon>
                    Data Role
                  </v-btn>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Nama
                </th>
                <th class="text-left">
                  Email
                </th>
                <th class="text-left">
                  No.Telpon
                </th>
                <th class="text-left">
                  Role
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="data,index in data.data"
                :key="index"
              >
                <td><span v-if="data.greeting">{{data.greeting}}</span> {{data.name}}</td>
                <td>{{data.email}}</td>
                <td>{{data.phone}}</td>
                <td>                
                  <span v-for="role,index in data.roles" :key="index">
                    <span>
                        {{role.name}}
                    </span>
                  </span>
                </td>


                <td>      
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog =true,edit=data"
                      >
                      mdi-pencil
                    </v-icon> 
                    <v-icon color="red"
                      class="ma-1" 
                      @input="deleteUser(data)"
                      >
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
                  @input="getUser(data)"
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
          Edit User "{{edit.name}}"
        </v-card-title>

      <v-card-text class="pa-3">
        <v-alert
          type="error"
          v-for="[error] in errors" :key="error"
        >
        {{error}}
        </v-alert>
        <v-radio-group row v-model="data.greeting" >
          <v-radio
          label="Kak"
          value="Kak"
          ></v-radio>
          <v-radio
          label="Pak"
          value="Pak"
          ></v-radio>
          <v-radio
          label="Bu"
          value="Bu"
          ></v-radio>
        </v-radio-group>
        <v-text-field
          small
          outlined
          v-model="edit.fullname"
          label="Nma Lengkap"
        ></v-text-field>
        <v-text-field
          small
          outlined
          v-model="edit.name"
          label="Username"
        ></v-text-field>
        <v-text-field
          small
          outlined
          v-model="edit.email"
          label="Email"
        ></v-text-field>
        <v-text-field
          small
          outlined
          v-model="edit.phone"
          label="No.Telpon"
        ></v-text-field>
        <v-select
          small
          :items="roles"
          item-text="name"
          item-value="id"
          label="Pilih role ..."
          v-model="edit.role"
          outlined
        ></v-select>
        
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
            color="primary"
            small
            @click="editUser(edit)"
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
        roles:{}
      }
    },
    computed:{
      data(){
        return this.$store.state.user.user.data;        
      },
      errors(){
        return this.$store.state.user.user.error;
      },
      form(){
        return this.$store.state.user.user.form;
      },
      loading(){
        return this.$store.state.user.loading;
      },
    },
    methods: {
      async getUser(data){
        await this.$store.dispatch('user',data.current_page);
      },
      async getRole(){
            try{
                let response = await axios.get('/api/role',{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                    this.roles = response.data.role
                }
            }catch(errors){
              console.log(errors)
            }
      },
      async editUser(data){
        await this.$store.dispatch('editUser',data);
        await this.getUser(this.data.current_page)
      }
    },
    mounted() {
      this.getUser(1)
      this.getRole()

    }
  }
</script>
