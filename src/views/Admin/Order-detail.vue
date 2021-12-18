<template>
<div>
  <v-container>
    <v-row>
      <v-col>
          <Order/>
          <Invoice v-if="data.status"/>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import Order from '../../components/Admin/Order-detail'
import Invoice from '../../components/Admin/Invoice'
import axios from 'axios'

export default{
  components:{
    Order,
    Invoice
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


