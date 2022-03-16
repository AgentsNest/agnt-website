<template>
  <section class="main-card">
    <v-container fluid>
        <v-row>
          <v-col md="2" class="d-none d-md-block" cols="12">
            <Sidelink />
          </v-col>
          <v-col md="10" cols="12">
            <!-- <slot /> -->
            <router-view/>
          </v-col>
        </v-row>
    </v-container>
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
  background: #f5f5f5;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.shadow{
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>