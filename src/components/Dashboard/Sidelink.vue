<template>
    <v-card
      class="shadow py-5"
      color="#111828"
      permanent
      tile
      flat
      height="100vh"
    >

    <v-img src="../../assets/img/agnt.png" width="120" class="mx-auto"></v-img>

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

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
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
          { title: 'Groups', icon: 'mdi-group', link: 'Groups' },
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
  }
</script>

<style scoped>
ul {
  padding: 1em;
  margin: 0;
  list-style-type: none;
}

ul li {
  margin: 1.2rem 0;
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