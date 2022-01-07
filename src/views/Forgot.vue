<template>
  <v-container fill-height>
    <v-row>
      <v-col>
    <v-layout row wrap align-center justify-center>
      <v-flex md6 sm8 >

        <div class="pa-5" @keyup.enter="forgot(form)">
        <h2 class="text-center ma-5 white--text">Lupa password</h2>
          <div>
            <v-alert
            dense
            type="error"
            v-if="errors.auth"
            >
            {{errors.auth}}
            </v-alert>
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
            <div class="d-flex"> 
            <v-spacer></v-spacer>
            <v-btn
            type="submit"
            @click="forgot(form)"
            @keyup.enter="forgot(form)"
            color="success"
            small
            >
            Konfirmasi
            </v-btn>
            </div>
        </div>
      </v-flex>
    </v-layout>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from 'axios'

export default {
    data() {
      return {

        }
    },
    computed:{
      loading(){
        return this.$store.state.auth.loading            
        },
      errors(){
        return this.$store.state.auth.profile.error;
      },
      form(){
        return this.$store.state.auth.profile.form;
      },
    },
    methods: {
      forgot(form){
        return this.$store.dispatch('forgot',form)
      },
    },
    mounted() {
      this.$store.commit('setErrors',{})
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