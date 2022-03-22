<template>
    <div class="">
      <!-- <v-toolbar class="transparent d-none d-md-block mt-3" flat tile>

        <v-spacer></v-spacer>

        <Notification />

        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="150"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="pr-1 rounded-xl text-capitalize ml-4 white" elevation="1">
                <span class="caption mr-2">Vimal Bharti</span>
                <v-avatar size="32"><v-img :src="agent.image"></v-img></v-avatar>
              </v-btn>
          </template>

          <v-card class="rounded-lg">
            <v-list dense>
              <v-list-item>
                <v-list-item-avatar color="red" size="32">
                  <span class="white--text body-2" v-if="agent.name">{{agent.name[0]}}</span>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{agent.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{agent.email}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item link :to="{name: 'AgentAccount'}">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>My Account</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

          </v-card>
        </v-menu>

      </v-toolbar> -->

      <!-- Mobile Navbar -->

      <div class="d-md-none">
        <div dark class="d-flex navbg align-center pt-3 px-4 pb-8">
          <div class="text-lowercase font-weight-bold title white--text">agnt.</div>
          <v-spacer></v-spacer>
          <Notification />
          <v-btn icon @click.stop="mSidebar = !mSidebar"><v-icon color="white">mdi-align-horizontal-right</v-icon></v-btn>
        </div>
        <v-card class="cyan darken-1 px-4 pt-5 pb-10 mt-n6 rounded-t-xl" flat>
          <v-icon color="amber accent-3" left>mdi-view-dashboard</v-icon>
          <span class="white--text font-weight-bold">Dashboard</span>
        </v-card>
        
        <v-navigation-drawer v-model="mSidebar" absolute>
            <v-img :src="agent.brand_logo" max-width="35vw" class="mx-auto mt-8 mb-3"></v-img>
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title>
                  {{agent.name}}
                  <v-btn icon small depressed :to="{name: 'AgentAccount'}"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
                </v-list-item-title>
                <v-list-item-subtitle>{{agent.email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                class="py-1"
                :to="{name: item.link}"
                :disabled="whateverActivatesThisLink" 
              >
                <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <template v-slot:append>
              <div class="pa-2">
                <v-btn block @click="logout">Logout</v-btn>
              </div>
            </template>
        </v-navigation-drawer>
      </div>
    </div>
</template>

<script>
import Notification from '../Notification.vue'
import User from '../../Apis/User'

export default {
  components:{ Notification },
  data () {
    return {
      isLoggedIn: false,
      menu: false,
      mSidebar: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: 'Dashboard' },
        { title: 'Leads', icon: 'mdi-format-list-bulleted-square', link: 'mLeads' },
        // { title: 'Followups', icon: 'mdi-calendar-clock-outline', link: 'Followups' },
        { title: 'Graphics', icon: 'mdi-image-size-select-large', link: 'mGraphic' },
        // { title: 'Existing Clients', icon: 'mdi-account-multiple-outline', link: 'Client' },
        // { title: 'Social Ads', icon: 'mdi-advertisements', link: 'Smm' },
        { title: 'Projects', icon: 'mdi-office-building-marker', link: 'MyWebsite' },
        // { title: 'Groups', icon: 'mdi-group', link: 'Groups' },
        { title: 'Messages', icon: 'mdi-message-outline', link: 'Message' },
        { title: 'Teams', icon: 'mdi-account-multiple', link: 'Team' },
      ],
      whateverActivatesThisLink: false,
    }
  },
  computed:{
    agent(){ return this.$store.state.auth; },
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
.navbg{
  background: #111828;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  margin-left: 2em;
  padding: 8px 1em;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>