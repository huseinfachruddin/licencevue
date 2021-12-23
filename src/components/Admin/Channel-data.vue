<template>
<div>
  <v-container>
  <v-row>
    <v-col>
      <v-card
      class="overflow-hidden"
      v-if="data"
      small
    >
      <v-toolbar
        flat
        color="green lighten-2"
      >
        <v-icon>mdi-card</v-icon>
        <v-toolbar-title class="font-weight-light">
          Data metode pembayaran
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>            
        <draggable v-model="data">
          <transition-group>
            <v-card
                outlined
                small
                v-for="data,index in data"
                :key="index"
              >
                <v-list-item three-line>
                  <v-list-item-avatar
                    tile
                    size="50"
                  >
                  <v-img
                  contain
                  :src="data.img"
                  >
                  </v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div class="text-overline ">
                      [{{data.id}}]-{{data.code}}
                    </div>
                    <v-list-item-title class="text-h6">
                      {{data.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-btn
                  small
                  color="success"
                  v-if="data.active==1"
                  @click="editActive(data)"
                  >
                    active
                  </v-btn>
                  <v-btn
                  small
                  color="error"
                  v-if="data.active==0"
                  @click="editActive(data)"
                  >
                    non active
                  </v-btn>
                </v-list-item>
              </v-card>
          </transition-group>

        </draggable>  
      <v-divider></v-divider>
    </v-card>
    </v-col>
  </v-row>
  </v-container>
  
</div>
</template>
<script>
import axios from 'axios'
import draggable from 'vuedraggable'

  export default {
    components:{
      draggable,
    },
    data () {
      return {
        data:[]
      }
    },
    computed:{
    },
    methods: {
      async getChannel(){
            try{
                let response = await axios.get('/api/channel')
                if (response.status == 200) {
                  this.data=response.data.channel
                }
            }catch(errors){
                console.log(errors)
            }
      },
      async editActive(form){
        form.active=!form.active
        try{
          let response = await axios.put('/api/channel/'+form.id+'?active='+form.active)
                if (response.status == 200) {
                  this.getChannel()
                }
            }catch(errors){
                console.log(errors)
            }
      },
      async queue(data){
        console.log(data)
      }
    },
    mounted() {
      this.getChannel(1)
    },
      watch: {
        data: async function (val){
            try{
                let response = await axios.put('/api/channel/queue',{channel : val})
                if (response.status == 200) {
                  console.log(response.data.channel)
                }
            }catch(errors){
                console.log(errors)
            }
        },
    },
  }
</script>
