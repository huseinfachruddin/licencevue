<template>
  <v-container fill-height>
    <v-layout row wrap align-center justify-center>
      <v-flex md6 sm8 >
        <div class="pa-5" >
          <h2 class="text-center ma-5 white--text">Register</h2>
          
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
              v-model="form.phone"
              label="Nomor telpon/WA"
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
    }
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