<template>
<div>
  <v-container>
    <v-row>
      <v-col>
          <Xendit v-if="data.method=='xendit'"/>
          <Transfer v-if="data.method=='transfer'"/>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import Xendit from '../../components/User/Xendit'
import Transfer from '../../components/User/Transfer'

import axios from 'axios'

export default{
  components:{
    Xendit,
    Transfer
  },
  data(){
    return{
      data:{}
    }
  },
  methods:{
    async getOrder(){
            try{
                let response = await axios.get('/api/order/'+this.$route.params.id)
                if (response.status == 200) {
                  this.data=response.data.order
                }
            }catch(errors){
                console.log(errors)            
            }
      },
  },
  mounted(){
    this.getOrder()
  }
}
</script>


