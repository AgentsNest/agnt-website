<template>
  <section class="main-card">
    <!-- <v-container fluid> -->
        <v-row>
          <v-col md="2" class="d-none d-md-block" cols="12">
            <Sidelink />
          </v-col>
          <v-col md="10" cols="12" class="fill-height">
            <!-- <slot /> -->
            <router-view/>
          </v-col>
        </v-row>
    <!-- </v-container> -->
  </section>
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
  height: 100vh;
  /* width: 100vw; */
  overflow: hidden;
}
</style>