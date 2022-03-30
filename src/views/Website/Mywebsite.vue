<template>
    <v-card flat height="100vh">

        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>
        
        <Navbar/>

        <v-card class="bg-gradient px-4 pt-1 pb-8 mt-n6 mt-md-0 d-md-none rounded-t-xl d-flex align-center" flat>
            <v-btn class="text-capitalize dark body-2" text dark>
              <v-icon left class="mr-2">mdi-office-building-outline</v-icon>
              My Projects
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="rounded-xl text-capitalize" small outlined dark :to="{name: 'Website'}">All Projects</v-btn>
        </v-card>

        <v-card class="mt-8 mb-5 d-none d-md-flex" elevation="0">
            <div class="mr-5">
              <v-btn class="rounded-l-lg mr-1" color="#111828" large dark tile><v-icon>mdi-view-dashboard</v-icon></v-btn>
              <v-btn dark tile color="#111828" class="rounded-r-lg text-capitalize" large>My Projects</v-btn>
            </div>
            <div class="shadow rounded-lg">
              <v-btn dark large color="#111828"><v-icon>mdi-tablet-dashboard</v-icon></v-btn>
              <v-btn class="text-capitalize" text :to="{name: 'Website'}" link>All Projects</v-btn>
            </div>
        </v-card>

        <v-card flat width="100%" class="white rounded-t-xl pt-4 overflow-y-auto mt-n7 mt-md-0">
          
          <div class="d-flex align-center w-full mx-2 mb-3">
            <v-btn icon elevation="0" class="" @click.prevent="clearSearch()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <input type="text" v-model="search" placeholder="Search Projects..." class="search-input mx-2">
            <v-btn icon class="white rounded-lg" @click.prevent="searchWebsite()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>

          <v-divider></v-divider>

          <v-card flat class="py-2 px-3 overflow-y-auto" height="100%">
            <!-- Search Results Website -->
            <div v-if="showsearch">
              <v-row class="pb-12">
                  <v-col md="4" v-for="website in results" :key="website.id">
                    <v-card class="transparent" flat>
                      <router-link :to="{name: 'WebsiteDetails', params:{id: website.slug}}">
                        <v-img
                            aspect-ratio="2"
                            :src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                            :lazy-src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                            class="rounded-lg shadow-xl my-2"
                        ></v-img>
                      </router-link>
                      <div class="d-flex align-center">
                        <div class="text-h6 grey--text text--darken-3">{{website.title}}</div>
                        <v-spacer></v-spacer>
                        <v-btn fab small elevation="1" dark class="dark mr-2" @click="deleteWebsite(website.id)"><v-icon size="20">mdi-trash-can</v-icon></v-btn>
                        <v-btn fab small elevation="1" class="text-capitalize dark" dark @click="shareSidebarOpen(website)">
                          <v-icon size="18">mdi-share-variant</v-icon>
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
              </v-row>
            </div>
            <!-- Default Websites -->
            <div v-else>
              <v-row>
                <v-col md="4" cols="12" v-for="(website, index) in websites" :key="index">
                    <v-card class="transparent" flat>
                      <router-link :to="{name: 'WebsiteDetails', params:{id: website.slug}}">
                        <v-img
                            aspect-ratio="2"
                            :src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                            :lazy-src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                            class="rounded-lg shadow-xl my-2"
                        ></v-img>
                      </router-link>
                      <div class="d-flex align-center">
                        <div class="text-h6 grey--text text--darken-3">{{website.title}}</div>
                        <v-spacer></v-spacer>
                        <v-btn fab small elevation="1" dark class="dark mr-2" @click="deleteWebsite(website.id)"><v-icon size="20">mdi-trash-can</v-icon></v-btn>
                        <v-btn fab small elevation="1" class="text-capitalize dark" dark @click="shareSidebarOpen(website)">
                          <v-icon size="18">mdi-share-variant</v-icon>
                        </v-btn>
                      </div>
                    </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-card>
      
        <!-- All Leads Dialog -->
        <v-navigation-drawer v-model="allLeadSidebar" tile absolute temporary right width="75vw">
          <v-card flat tile>
            <v-list>
              
              <v-list-item v-for="lead in leads" :key="lead.id">
                <v-list-item-content>
                  <v-list-item-title v-text="lead.name"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <!-- <v-btn block class="text-capitalize blue darken-2" dark 
                    v-if="website"
                    @click="shareNow(lead)"
                    :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a Here is the details for ${website.title} %0a http://localhost:3000/w/${tracker_id}/${website.id}`"
                  >
                    Share
                  </v-btn> -->
                  <!-- <v-btn @click="showSelectedWebsiteMessage(lead)">Share</v-btn> -->
                </v-list-item-action>

                <!-- Default website share message window -->
                <v-dialog v-model="editWebsiteWindow[lead.id]" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on">Share</v-btn>
                  </template>

                  <v-card class="pt-5 rounded-lg">
                      <v-card-text>
                          <span class="caption grey--text">Hi, {clientName},</span> <br>
                          <div>{{selectedWebsiteMsg}}</div>
                          <!-- <span class="caption grey--text">https://agentsnest.com/wt/{{website.share.url}}</span> <br> -->
                          <span class="caption grey--text">Regards,</span> <br/>
                          <span class="caption grey--text">{yourName}</span>
                      </v-card-text>

                      <v-textarea outlined label="Default Message" v-model="selectedWebsiteMsg" height="100" class="mt-6"></v-textarea>

                      <v-divider></v-divider>
                      <v-card-actions v-if="website">
                          <span class="grey--text text--darken-2">Share Via:</span>
                          <v-spacer></v-spacer>
                          <v-btn 
                            @click="shareNowViaWhatsapp(lead, website)"
                            fab x-small elevation="1" class="green" dark
                            id="shareToWebsite"
                          ><v-icon>mdi-whatsapp</v-icon></v-btn>
                          <v-btn 
                            @click="shareNowViaMsg(lead, website)"
                            fab x-small elevation="1" class="blue" dark
                          ><v-icon>mdi-message-text-outline</v-icon></v-btn>
                          <!-- <v-btn 
                              fab x-small elevation="1" class="green" dark
                              :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a ${selectedWebsiteMsg} %0a Regards: ${agent.name}`"
                              target="_blank"
                              @click="addActivityWhatsapp"
                          ><v-icon>mdi-whatsapp</v-icon></v-btn> -->
                          <!-- <v-btn 
                              fab x-small elevation="1" class="blue lighten-1" dark
                              :href="`sms:${lead.contact}&body=Hi ${lead.name} %0a ${selectedWebsiteMsg} %0a Regards, %0a ${agent.name}`"
                              target="_blank"
                              @click="addActivityMessage"
                          ><v-icon>mdi-message-text-outline</v-icon></v-btn> -->
                      </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-list-item>
      
            </v-list>

          </v-card>
        </v-navigation-drawer>


    </v-card>
</template>

<script>
import Website from '../../Apis/Website'
import Lead from '../../Apis/Lead'
import Tracker from '../../Apis/Tracker'
import User from '../../Apis/User'
import Navbar from '../../components/Dashboard/Navbar.vue'

export default {
    components: { Navbar },
    data () {
      return {
        loading: false,
        items: [],
        search: '',
        showsearch: false,
        results: [],
        select: null,
        states: [
          'Alabama',
          'Alaska',
          'American Samoa',
        ],
        websites:[],
        website: null,
        shareData:{
            website_id: null,
            lead_id: null,
            agent_id: null,
            opened: false,
            total_views: 0
        },
        tracker_id : null,
        clientList: false,
        user_id: null,
        submitted: false,
        opened: [],
        unopened: [],
        selectedLeads: [],
        dialog: false,
        previewImage: [],
        images: [],
        allLeadSidebar: false,
        selectedWebsiteMsg: 'Here is the details for',
        editWebsiteWindow: {},
        whatsappShare: false,
        snackbarText: '',
        snackbar: false
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
      fetchData(){
        Website.auth().then(response => {
            this.websites = response.data.data;
        });
      },
      // fetchLeadsDetails(){
      //   Lead.auth().then(response => {
      //     this.leads = response.data.data;
      //   });
      // },
      shareSidebarOpen(website){
        this.allLeadSidebar = true
        this.website = website
        // console.log(website)
      },
      updateImageList(){
          var selectedFiles = this.$refs.files.files;
          // for preview
          for (let i = 0; i < selectedFiles.length; i++) {
              let img = {
                  src: URL.createObjectURL(selectedFiles[i]),
                  file: selectedFiles[i]
              }
              this.previewImage.push(img);
          }
          // for post data to server
          for (let index = 0; index < selectedFiles.length; index++) {
              this.images.push(selectedFiles[index]);
          }
      },
      setFeatured(preview){
          var previews = this.previewImage;
          previews.unshift(preview);
          previews.pop(preview);
      },
      clearImage(index){
        this.previewImage.splice(index);
      },
      /* ------------------------------------------
          ====  Website Share functions ====
      ------------------------------------------  */ 
      showSelectedWebsiteMessage(lead, website){
          this.selectedWebsiteMsg = 'Here is the details for';
          this.editWebsiteWindow = true;
      },
      addActivityWhatsapp(){
          let data = new FormData();
          data.append('lead_id', this.lead.id)
          data.append('whatsapp', 'Whatsapp Message')

          Lead.addActivityWhatsapp(data)
          .then(() => {
              // this.fetchData();
          })
      },
      addActivityMessage(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('message', 'Send Text Message')

            Lead.addActivityMessage(data)
            .then(() => {
                // this.fetchData();
            })
      },
      // Share Website via whatsapp
      shareNowViaWhatsapp(lead, website){
          this.websiteName = website;

          let form = new FormData();
          form.append('website_id', website.id)
          form.append('website_name', website.title)
          form.append('lead_id', lead.id)
          form.append('lead_name', lead.name)
          form.append('agent_id', this.agent.id)
          form.append('type', 'whatsapp')
          form.append('opened', false)
          form.append('total_views', 0)
          form.append('share_id', website.share.id)

          // for (var pair of form.entries()){
          //     console.log(pair[0]+ ', '+ pair[1]); 
          // }

          Tracker.new(form)
          .then(response => {
              // this.tracker_id = response.data.url
              this.tracker_id = response.data.id
              
              // window.location.href(`https://wa.me/${lead.contact}?text=Hi ${lead.name} ${this.selectedWebsiteMsg} ${website.title} %0a https://agentsnest.com/wt/${response.data.id}/${website.share.url}`, '_blank');

              // console.log(response.data)

              if (response.data.message == 'Already Sent') {
                  this.snackbarText = 'Already Sent!'
                  this.snackbar = true

                  var tracker = response.data.tracker[0].id
                  
                  window.open(`https://wa.me/${lead.contact}?text=Hi ${lead.name} ${this.selectedWebsiteMsg} ${website.title} %0a https://agentsnest.com/wt/${tracker}/${website.share.url}`)
              } else {
                  // this.sendWhatsapp();
                  window.open(`https://wa.me/${lead.contact}?text=Hi ${lead.name} ${this.selectedWebsiteMsg} ${website.title} %0a https://agentsnest.com/wt/${response.data.id}/${website.share.url}`, '_blank');
              }
              // this.websiteShareConfirmation = true
          })
          .catch(error => {
              console.log(error);
          })
      },
      /* ===================================
      -- -- Share website via message --- --
      =====================================*/
      shareNowViaMsg(lead, website){
          this.websiteName = website;

          let form = new FormData();
          form.append('website_id', website.id)
          form.append('website_name', website.title)
          form.append('lead_id', lead.id)
          form.append('lead_name', lead.name)
          form.append('agent_id', this.agent.id)
          form.append('type', 'message')
          form.append('opened', false)
          form.append('total_views', 0)
          form.append('share_id', website.share.id)

          Tracker.new(form)
          .then(response => {
              this.tracker_id = response.data.id

              // window.location.assign(`sms:${lead.contact}&body=Hi ${lead.name} %0a ${this.selectedWebsiteMsg} %0a ${website.title} %0a https://agentsnest.com/wt/${this.tracker_id}/${website.share.url}`);
              
              if (response.data.message == 'Already Sent') {
                  this.snackbarText = 'Already Sent!'
                  this.snackbar = true

                  var tracker = response.data.tracker[0].id
                  
                  window.open(`sms:${lead.contact}?&body=Hi ${lead.name} %0a ${this.selectedWebsiteMsg} %0a ${website.title} %0a https://agentsnest.com/wt/${tracker}/${website.share.url}`)
              } else {
                  window.open(`sms:${lead.contact}?&body=Hi ${lead.name} %0a ${this.selectedWebsiteMsg} %0a ${website.title} %0a https://agentsnest.com/wt/${this.tracker_id}/${website.share.url}`);
              }
          })
          .catch(error => {
              console.log(error);
          })
      },
      searchWebsite(){
        Website.search(this.search)
        .then((res) => {
          // console.log(res.data)
          this.showsearch = true
          this.results = res.data;
        }).catch((err) => {
          console.log(err)
        })
      },
      clearSearch(){
        this.results = ''
        this.search = ''
        this.showsearch = false
      },
      deleteWebsite(id){
        Website.deleteMyWebsite(id)
        .then(() => {
          this.fetchData();    
        });
      }
    },
    computed:{
      selectAll:{
          get : function (){
              return this.leads ? this.selectedLeads.length == this.leads.length : false;
          },
          set: function(value) {
              var selectedLeads = [];

              if(value) {
                  this.leads.forEach(function (lead) {
                      selectedLeads.push(lead.id);
                  });
              }
              this.selectedLeads = selectedLeads;
          }
      },
      filterWebsite: function(){
          return this.websites.filter((website) => {
              return website.title.toLowerCase().match(this.search.toLowerCase());
          })
      },
      leads(){  
        return this.$store.state.leads; 
      },
      agent(){ return this.$store.state.auth; },
    },
    mounted(){
      this.fetchData();
      // this.fetchLeadsDetails();
      User.auth().then(response => {
          this.shareData.agent_id = response.data.data.id;
      });
      this.$store.dispatch('getLeads');
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.bg-gradient{
  background-image: linear-gradient(to right, #283593, #3cabba);
}
.search-input{
  border-radius: 12px;
  padding: 0.6em 0.8em;
  width: 100%; 
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.shadow{
  background-color: #fff;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.4),0 24px 20px -24px rgba(71,82,107,.2);
}
</style>