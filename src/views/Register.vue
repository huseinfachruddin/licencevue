<template>
  <v-container fill-height>
    <v-layout row wrap align-center justify-center>
      <v-flex md6 sm8 @keyup.enter="register(form)">
        <div class="pa-5 white">
          <h2 class="text-center ma-5 black--text">Register</h2>
          <div >
                <v-radio-group  row v-model="form.greeting" label="Sapaan :">
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
                <v-alert
                dense
                type="error"
                v-for="error in errors.greeting" 
                :key="error">
                {{error}}
                </v-alert>
            </div>
          <div>
            <v-text-field
              dense
              outlined
              solo
              v-model="form.fullname"
              label="Nama lengkap"
              >
              </v-text-field>
                <v-alert
                dense
                type="error"
                v-for="error in errors.fullname" 
                :key="error">
                {{error}}
                </v-alert>
            </div>
          <div>
            <v-text-field
              dense
              outlined
              solo
              v-model="form.name"
              label="Username"
              >
              </v-text-field>
                <v-alert
                dense
                type="error"
                v-for="error in errors.name" 
                :key="error">
                {{error}}
                </v-alert>
            </div>
            <div>
              <v-text-field
              dense
              outlined
              solo
              v-model="form.phone"
              label="Phone..."
              >
              </v-text-field>
                <v-alert
                dense
                type="error"
                v-for="error in errors.phone" 
                :key="error">
                {{error}}
                </v-alert>
            </div>
            <div>
            <v-text-field
              dense
              outlined
              solo
              v-model="form.email"
              label="Email"
              >
              </v-text-field>
                <v-alert
                dense
                type="error"
                v-for="error in errors.email" 
                :key="error">
                {{error}}
                </v-alert>
            </div>
            <div>
            <v-text-field
              dense
              outlined
              solo
              type="password"
              v-model="form.password"
              label="Password"
              >
              </v-text-field>
                <v-alert
                dense
                type="error"
                v-for="error in errors.password" 
                :key="error">
                {{error}}
                </v-alert>
            </div>
            <div>
            <v-text-field
              dense
              outlined
              type="password"
              solo
              v-model="form.rePassword"
              label="Ulangi Password"
              >
              </v-text-field>
                <v-alert
                dense
                type="error"
                v-for="error in errors.rePassword" 
                :key="error">
                {{error}}
                </v-alert>
            </div>
            <div class="d-flex justify-end">              
            <v-btn
            v-if="!loading"
            @click="register(form)"
            color="success"
            small
            >
            Register
            </v-btn>
            <v-btn
            v-if="loading"
            disabled
            color="success"
            small
            >
            Register
            </v-btn>
            </div>
        </div>
      </v-flex>
        
    </v-layout>
  </v-container>
</template>

<script>
export default {

  data(){
    return{
    }
  },
  computed:{
      loading(){
        return this.$store.state.auth.profile.loading            
        },
      errors(){
        return this.$store.state.auth.profile.error;
      },
      form(){
        return this.$store.state.auth.profile.form;
      },
  },
  methods:{
    async register(form){
      this.$store.dispatch('register',form)
    },
  },
  mounted(){
  }
}
</script>


<style scoped>
.relative{
  position: relative;
}
.custom-shape-divider-top-1614916722 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.custom-shape-divider-top-1614916722 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 141px;
}

.custom-shape-divider-top-1614916722 .shape-fill {
    fill: #009688;
}
.custom-shape-divider-bottom-1614917258 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-bottom-1614917258 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 141px;
}

.custom-shape-divider-bottom-1614917258 .shape-fill {
    fill: #009688;
}

</style>