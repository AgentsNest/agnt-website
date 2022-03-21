<template>
    <v-card flat height="100vh" width="100%" class="transparent overflow-y-auto">
      <Navbar/>

      <v-container>
        <v-row>
            <v-col cols="12" md="8">
              <v-card class="rounded-lg alllead px-4 py-2" flat>
                  <v-card-actions>
                      <div class="title text-right">Total Leads</div>
                      <v-spacer></v-spacer>
                      <div class="font-weight-bold title">
                        <span>{{totalLead}}</span>
                      </div>
                  </v-card-actions>
              </v-card>
              <v-card class="my-6" flat>
                <v-row>
                  <v-col cols="6">
                    <v-card class="rounded-lg pa-2 pa-md-3 hotLead" flat>
                      <v-card-actions class="">
                        <v-icon size="42" color="red">mdi-fire-circle</v-icon>
                        <v-spacer></v-spacer>
                        <div>
                          <div class="text-right">Hot Lead</div>
                          <div class="font-weight-bold headline md-display-1">
                            <span v-if="totalLead > 0">{{hotLeadPercentage}}%</span>
                            <span v-else>0</span>
                          </div>
                        </div>
                      </v-card-actions>
                      <v-card-actions>
                        <v-progress-linear rounded v-model="hotLeadPercentage" color="red" striped height="8"></v-progress-linear>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card class="rounded-lg pa-2 pa-md-3 warmlead" flat>
                      <v-card-actions class="">
                        <v-icon size="42" color="orange">mdi-account-group-outline</v-icon>
                        <v-spacer></v-spacer>
                        <div>
                          <div class="text-right">Warm Lead</div>
                          <div class="font-weight-bold headline md-display-1">
                            <span v-if="totalLead > 0">{{warmLeadPercentage}}%</span>
                            <span v-else>0</span>
                          </div>
                        </div>
                      </v-card-actions>
                      <v-card-actions>
                        <v-progress-linear rounded v-model="warmLeadPercentage" color="orange" striped height="8"></v-progress-linear>
                      </v-card-actions>
                  </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card class="rounded-lg pa-2 pa-md-3 coldlead" flat>
                      <v-card-actions class="">
                        <v-icon size="42" color="blue">mdi-snowflake-alert</v-icon>
                        <v-spacer></v-spacer>
                        <div>
                          <div class="text-right">Cold Lead</div>
                          <div class="font-weight-bold headline md-display-1">
                            <span v-if="totalLead > 0">{{coldLeadPercentage}}%</span>
                            <span v-else>0</span>
                          </div>
                        </div>
                      </v-card-actions>
                      <v-card-actions>
                        <v-progress-linear rounded v-model="coldLeadPercentage" color="blue" striped height="8"></v-progress-linear>
                      </v-card-actions>
                  </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card class="rounded-lg pa-2 pa-md-3 deadlead" flat>
                      <v-card-actions class="">
                        <v-icon size="42" color="grey">mdi-emoticon-sad-outline</v-icon>
                        <v-spacer></v-spacer>
                        <div>
                          <div class="text-right">Dead Lead</div>
                          <div class="font-weight-bold headline md-display-1">
                            <span v-if="totalLead > 0">{{deadLeadPercentage}}%</span>
                            <span v-else>0</span>
                          </div>
                        </div>
                      </v-card-actions>
                      <v-card-actions>
                        <v-progress-linear rounded v-model="deadLeadPercentage" color="grey" striped height="8"></v-progress-linear>
                      </v-card-actions>
                  </v-card>
                  </v-col>
                </v-row>
              </v-card>
              <!-- Latest Projects -->
              <v-card>
                <v-toolbar flat class="font-weight-bold">
                  Latest Projects
                  <v-spacer></v-spacer>
                  <v-btn class="text-capitalize cyan darken-1" depressed dark>Explore</v-btn>
                </v-toolbar>
                <v-card-text class="py-0">
                  <v-row>
                    <v-col cols="6" md="4" v-for="website in websites" :key="website.id">
                      <v-img
                          aspect-ratio="1.4"
                          :src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                          :lazy-src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                          class="rounded-lg shadow-xl my-2 d-flex align-end"
                          gradient="to top right, rgba(0,0,0,.9), rgba(0,0,0,.5), rgba(0,0,0,.1)"
                      >
                        <div class="white--text font-weight-bold px-3 py-2">{{website.title}}</div>
                      </v-img>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="pa-2 mt-8">
                <v-card class="vcard-box d-flex px-4 py-8">
                  <div class="">Share your Profile with <br/> just a <span class="font-weight-bold">TAP!</span></div>
                  <img src="../../assets/img/vcard-icon.png"/>
                </v-card>
                <v-card flat class="px-4 py-5">
                  <div class="d-flex align-center">
                    <div class="caption pr-5">A new Gen Virtual Card to share your contact information with your clients.</div>
                    <v-btn class="text-capitalize amber accent-3" depressed small>Get Yours</v-btn>
                  </div>
                </v-card>
              </v-card>
              <!-- Latest Graphics -->
              <v-card class="mt-6" flat>
                <div class="mb-4 font-weight-bold d-flex align-center">
                  Latest Graphics
                  <v-spacer></v-spacer>
                  <v-btn small class="text-capitalize cyan darken-1" dark>Explore</v-btn>
                </div>
                <v-row class="">
                  <v-col cols="6" v-for="graphic in graphics" :key="graphic.id">
                    <v-img
                      :src="graphic.thumb"
                      :lazy-src="graphic.thumb"
                      aspect-ratio="1"
                      class="grey lighten-2 rounded-lg pointer"
                      @click="detailsSidebar(graphic.id)"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                  </v-img>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
        </v-row>
      </v-container>

    </v-card>
</template>

<script>
import Lead from '../../Apis/Lead'
import Client from '../../Apis/Client'
import Navbar from '../../components/Dashboard/Navbar.vue'
import Website from '../../Apis/Website'
import Graphic from '../../Apis/Graphic'

export default {
  components:{
    Navbar
  },
  data: () => ({
    websites:[],
    graphics: [],
    deadLead: '',
    coldLead: '',
    hotLead: '',
    warmLead: '',
    totalLead: '',
    newLead: '',
    headers: [
      { text: 'Lead Name', align: 'start', sortable: false, value: 'lead.name',},
      { text: 'Remarks', value: 'remarks', sortable: false, },
      { text: 'Date', value: 'date_string' }
    ],
    activities: [],
    clients: '',
    events: [],
    agent: ''
  }),
  methods:{
    fetchData(){
      Lead.leadsAnalytics()
      .then((res) => {
        this.deadLead = res.data.deadLeads
        this.coldLead = res.data.coldLeads
        this.hotLead = res.data.hotLeads
        this.warmLead = res.data.warmLeads
        this.newLead = res.data.newLeads
        this.totalLead = res.data.allLeads
      })
    },
    fetchProjects(){
      Website.all().then(response => {
          this.websites = response.data.data;
      });
    },
    fetchGraphics() {
      Graphic.all(this.page).then((response) => {
        this.graphics = response.data.data;
      });
    },
    fetchActivity(){
      Lead.allActivityByUser()
      .then((res) => {
        this.activities = res.data.data;
        // console.log(res.data.data)
      })
    },
    fetchClients(){
      Client.countMyClient()
      .then((res) => {
        this.clients = res.data;
        // console.log(res);
      })
    },
    fetchFollowups(){
      Lead.getFollowups().then(response => {
        this.events = response.data.events.data;
        // console.log(response.data)
      });
    }
  },
  computed:{
    hotLeadPercentage(){
      return (this.hotLead / this.totalLead * 100).toFixed(2)
    },
    coldLeadPercentage(){
      return (this.coldLead / this.totalLead * 100).toFixed(2)
    },
    warmLeadPercentage(){
      return (this.warmLead / this.totalLead * 100).toFixed(2)
    },
    deadLeadPercentage(){
      return (this.deadLead / this.totalLead * 100).toFixed(2)
    },
    newLeadPercentage(){
      return (this.newLead / this.totalLead * 100).toFixed(2)
    },
  },
  mounted(){
    this.fetchData();
    this.fetchActivity();
    this.fetchClients();
    this.fetchFollowups();
    this.fetchProjects();
    this.fetchGraphics();
  }
}
</script>

<style scoped>
.hotLead{
  background: rgb(254,249,249);
background: linear-gradient(90deg, rgba(254,249,249,1) 0%, rgba(252,225,225,1) 100%);
}
.warmlead{
  background: rgb(255,253,248);
background: linear-gradient(90deg, rgba(255,253,248,1) 0%, rgba(252,246,225,1) 100%);
}
.coldlead{
  background: rgb(249,251,254);
background: linear-gradient(90deg, rgba(249,251,254,1) 0%, rgba(225,228,252,1) 100%);
}
.deadlead{
  background: rgb(251,251,251);
background: linear-gradient(90deg, rgba(251,251,251,1) 0%, rgba(224,224,224,1) 100%);
}
.alllead{
background: rgb(255,252,245);
background: linear-gradient(90deg, rgba(255,252,245,1) 0%, rgba(254,255,237,1) 100%);
}
.vcard-box{
  background: rgb(129,189,242);
  background: linear-gradient(90deg, rgba(129,189,242,1) 0%, rgba(201,233,255,1) 100%);
  position: relative;
}
.vcard-box img{
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>