<template>
  <v-card class="d-flex overflow-y-auto" flat tile height="100vh">
        <!-- <v-row>
          <v-col md="2" class="d-none d-md-block">
            <Sidelink />
          </v-col>
          <v-col md="10" cols="12" class="">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </v-col>
        </v-row> -->
    <Sidelink />

    <keep-alive>
      <router-view/>
    </keep-alive>
    
  </v-card>
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