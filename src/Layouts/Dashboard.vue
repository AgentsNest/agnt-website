<template>
  <div>
    <Sidelink class="d-none d-md-flex" />
    <v-row>
      <!-- <v-col md="2" class="d-none d-md-block">
        <Sidelink />
      </v-col> -->
      <v-col cols="12">

          <router-view/>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import Sidelink from '../components/Dashboard/Sidelink'

export default {
  components: {
    Sidelink
  },
  computed:{
    agent(){ return this.$store.state.auth; },
  },
  mounted(){
    this.$store.dispatch('getAuth');
  }
};
</script>


<style>
.main-card{
  /* background: #f3f6fd; */
  background: #ffffff;
  /* background: #f5f5f5; */
  /* height: 100vh; */
  width: 100vw;
}
</style>