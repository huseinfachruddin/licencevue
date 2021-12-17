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
          Data Role
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-alert
          type="error"
          v-for="[error] in errors" :key="error"
        >
        {{error}}
        </v-alert>
        <v-text-field
          small
          outlined
          v-model="form.name"
          label="Masukan role baru..."
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click="saveRole(form)"
            small
          >
            simpan Role
          </v-btn>
        </v-card-actions>
      <v-divider></v-divider>
        <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr
                v-for="role,index in data"
                :key="index"
              >
                <td v-if="role">{{role.name}}</td>
                <td>      
                    <v-icon color="blue"
                      class="ma-1" 
                      @click="dialog =true,edit=role">
                      mdi-pencil
                    </v-icon> 
                    <v-icon color="red"
                      class="ma-1" 
                      @click="deleteRole(role.id)">
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
          Edit Role "{{edit.name}}"
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
          label="Edit"
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
            color="primary"
            small
            @click="editRole(edit)"
          >
            simpan role
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
  export default {
    data () {
      return {
        success: false,
        model: null,
        dialog: false,
        edit: false
      }
    },
    computed:{
      data(){
        return this.$store.state.role.role.role;        
      },
      errors(){
        return this.$store.state.role.role.error;
      },
      form(){
        return this.$store.state.role.role.form;
      },
      loading(){
        return this.$store.state.role.loading;
      },
    },
    methods: {
      async saveRole(form) {
        await this.$store.dispatch('createRole',form)
        this.$store.dispatch('role')
      },
      async deleteRole(form) {
          if (confirm("Yakin Akan menghapus role")) {
            await this.$store.dispatch('deleteRole',form)
            this.$store.dispatch('role')
          }
      },
      async editRole(data) {
          await this.$store.dispatch('editRole',data)
          this.$store.dispatch('role')
      } 
    },
    mounted() {
      this.$store.dispatch('role')
    }
  }
</script>
