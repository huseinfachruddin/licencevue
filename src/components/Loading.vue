<template>
<div>
      <v-progress-linear
      v-if="loading"
      indeterminate
      color="cyan"
    ></v-progress-linear>
</div>

</template>
<style>
.partikel{
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 100;
}
</style>
<script>
export default {
    data(){
        return{
        }
    },
    mounted(){

    },
    computed:{
        loading(){
            return this.$store.state.auth.loading            
        },
    }

}
</script>