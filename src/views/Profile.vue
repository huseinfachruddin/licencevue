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
        color="blue"
      >
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light">
          Profil Anda
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-1"
          color="orange"
          small
          @click="isPassword = !isPassword"
        >
          <v-icon v-if="isPassword">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-pencil
          </v-icon> 
          ganti password
        </v-btn>
      </v-toolbar>
      <v-card-text v-if="!isPassword">
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
          outlined
          v-model="data.fullname"
          label="Fullname"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="data.name"
          label="Username"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="data.phone"
          label="Phone"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="data.email"
          label="Email"
        ></v-text-field>
      </v-card-text>
      <v-card-text v-if="isPassword">
        <v-alert
          type="error"
          v-for="[error] in errors" :key="error"
        >
        {{error}}
        </v-alert>
        <v-text-field
          outlined
          v-model="form.oldPassword"
          label="Password lama"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="form.newPassword"
          label="Password baru"
        ></v-text-field>
        <v-text-field
          outlined
          v-model="form.rePassword"
          label="Ulangi password baru"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="isPassword"
          color="success"
          @click="savePassword(form)"
        >
          ganti password
        </v-btn>
        <v-btn
          v-if="!isPassword"
          color="success"
          @click="saveProfile(data)"
        >
          simpan data
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-col>
  </v-row>
  </v-container>
</div>
</template>

<script>
  export default {
    data () {
      return {
        success: false,
        isPassword: null,
        model: null,
      }
    },
    computed:{
      data(){
        return this.$store.state.auth.profile.data            
        },
      errors(){
        return this.$store.state.auth.profile.error;
      },
      form(){
        return this.$store.state.auth.profile.form;
      },
    },
    methods: {
      async saveProfile(form) {
        await this.$store.dispatch('editProfile',form)
      },
      async savePassword(form) {
        await this.$store.dispatch('editPassword',form)
      }  
    },
    mounted() {
      this.$store.dispatch('profile')
    }
  }
</script>
