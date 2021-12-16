<template>
<div>
  <v-container>
    <v-row>
      <v-col>
          <Order v-if="data.status==null"/>
          <Invoice v-if="data.status!=null"/>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import Order from '../../components/Order-detail'
import Invoice from '../../components/Invoice'
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


