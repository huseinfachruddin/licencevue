<template>
<div>
  <v-container>
    <v-row>
      <v-col>
          <Order v-if="data.method==null"/>
          <Xendit v-if="data.method=='xendit'"/>
          <Transfer v-if="data.method=='transfer'"/>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import Order from '../../components/Admin/Order-detail'
import Xendit from '../../components/Admin/Xendit'
import Transfer from '../../components/Admin/Transfer'
import axios from 'axios'

export default{
  components:{
    Order,
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
                let response = await axios.get('/api/order/'+this.$route.params.id,{headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}})
                if (response.status == 200) {
                  this.data=response.data
                  console.log(this.data)
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


