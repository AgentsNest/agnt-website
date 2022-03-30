<template>
    <v-card
      class="shadow py-5 sidelink"
      color="#111828"
      permanent
      tile
      flat
      height="100vh"
      width="270"
    >

    <div class="white--text text-h5 text-center font-weight-bold">agnt.</div>

    <ul class="nav-links">
      <router-link :to="{name: item.link}" v-for="item in items" :key="item.title" 
        :disabled="whateverActivatesThisLink" 
        :event="whateverActivatesThisLink ? 'click' : ''"
      >
        <li>
          <v-icon color="grey lighten-3">{{item.icon}}</v-icon>
          <span class="ml-2">{{item.title}}</span>
        </li>
      </router-link>
    </ul>

    <v-divider class="" color="#444"></v-divider>
    <ul class="nav-links py-0">
      <router-link :to="{name: 'AgentAccount'}" >
        <li>
          <v-icon color="grey lighten-3">mdi-account-box-outline</v-icon>
          <span class="ml-2">Account</span>
        </li>
      </router-link>
    </ul>
    <!-- <v-divider class="" color="#444"></v-divider> -->

    <v-btn class="text-capitalize logout-btn" color="#111" block dark @click="logout">
      <v-icon color="amber accent-1" left>mdi-logout</v-icon>
      Logout
    </v-btn>

  </v-card>
</template>


<script>
import User from '../../Apis/User'
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-apps-box', link: 'Dashboard' },
          { title: 'Leads', icon: 'mdi-format-list-bulleted-square', link: 'Leads' },
          { title: 'Graphics', icon: 'mdi-image-size-select-large', link: 'Graphic' },
          // { title: 'Existing Clients', icon: 'mdi-account-multiple-outline', link: 'Client' },
          // { title: 'Social Ads', icon: 'mdi-advertisements', link: 'Smm' },
          { title: 'Projects', icon: 'mdi-home-city-outline', link: 'MyWebsite' },
          { title: 'Groups', icon: 'mdi-folder-open', link: 'Groups' },
          { title: 'Messages', icon: 'mdi-message-outline', link: 'Message' },
          { title: 'Teams', icon: 'mdi-account-group-outline', link: 'Team' },
        ],
        whateverActivatesThisLink: true,
        agent: ''
      }
    },
    created(){
      User.auth().then((response) => {
        // console.log(response.data.data)
        if (response.data.data.subscribed === 'YES') {
          this.whateverActivatesThisLink = true
        } else {
          this.whateverActivatesThisLink = false
        }
      })
    },
    methods:{
      logout(){
        localStorage.removeItem("token");
        User.logout().then(() => {
          localStorage.removeItem("token");
          this.isLoggedIn = false;
          this.$router.push({name: 'Login'});
        })
      }
    }
  }
</script>

<style scoped>
.sidelink{position: fixed;}
.logout-btn{position: absolute;bottom: 0;left: 0;right: 0;}
ul {
  padding: 1em;
  margin: 0;
  list-style-type: none;
}

ul li {
  margin: 2vh 0;
  padding: 0.8em;
  width: 100%;
  text-align: left;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

ul li {
  text-decoration: none;
  color: #dcdcdc;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}
a i{
  color: #dcdcdc;
}

ul li:hover {
  background-image: linear-gradient(to right, #283593, #3cabba);
  color: #fff;
}

.active li,
.exact-active li{
   background-image: linear-gradient(to right, #283593, #3cabba);
   color: #fff;
}
.active i{
  color: #fff;
}
</style>