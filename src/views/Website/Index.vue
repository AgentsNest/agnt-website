<template>
    <v-card flat tile class="transparent pr-4" width="100vw">
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <Navbar/>

        <v-card class="rounded-xl shadow" elevation="0">
            <v-toolbar flat>
                <v-btn width="50%" class="rounded-l-xl text-capitalize grey--text" depressed :to="{name: 'MyWebsite'}">My Projects</v-btn>
                <v-spacer></v-spacer>
                <v-btn width="50%" class="rounded-r-xl text-capitalize dark" dark depressed>All Projects</v-btn>
            </v-toolbar>
        </v-card>

        <v-card class="mt-4 py-2 rounded-xl white" elevation="0"> 
          
          <div class="d-flex align-center ma-3">
            <v-btn fab small elevation="0" class="grey rounded-lg" dark @click.prevent="clearSearch()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <input type="text" v-model="search" placeholder="Search Projects..." class="search-input mx-2">
            <v-btn fab small elevation="1" class="white rounded-lg" @click.prevent="searchWebsite()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>

          <v-divider></v-divider>

          <v-card flat class="py-5 px-3 overflow-y-auto" height="100%">
            <!-- Search Results Website -->
            <div v-if="showsearch">
              <v-row class="">
                  <v-col md="4" v-for="website in results" :key="website.id">
                      <v-card class="transparent" flat>
                      <div class="title">{{website.title}}</div>
                      <v-img
                          aspect-ratio="1.8"
                          :src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                          :lazy-src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                          class="rounded-lg shadow-xl my-2"
                      ></v-img>

                      <div class="d-flex">
                          <!-- Website Preview -->
                          <v-dialog v-model="preview[website.id]" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" dark color="#111828" class="text-capitalize flex-grow-1 rounded-lg">Preview</v-btn>
                            </template>
                            <v-card tile>
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title v-if="website">{{website.title}}</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon dark @click="preview[website.id] = false"><v-icon>mdi-close</v-icon></v-btn>
                                </v-toolbar>

                                <v-row class="">
                                    <v-col md="8" offset-md="2">
                                        <v-card class="mx-auto" tile>
                                            <v-card-title>{{website.title}}</v-card-title>
                                            <v-card-subtitle>{{website.about}}</v-card-subtitle>

                                            <v-row class="" v-if="website.website_images">
                                                <v-col v-for="image in website.website_images" :key="image.id" class="d-flex child-flex px-1" cols="12">
                                                    <v-img
                                                        :src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${image.url}`"
                                                        :lazy-src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${image.url}`"
                                                        contain
                                                        class="white rounded-lg"
                                                        
                                                    >
                                                        <template v-slot:placeholder>
                                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                            </v-row>
                                                        </template>
                                                    </v-img>
                                                </v-col>
                                            </v-row>

                                            <v-card class="d-flex align-center pa-4 mt-5 justify-space-around">
                                                <div class="font-weight-bold">PREPARED BY:</div>
                                                <v-spacer></v-spacer>
                                                <div>
                                                    <div>@AGENTNAME</div>
                                                    <div>@AGENTCONTACT</div>
                                                </div>
                                            </v-card>

                                            <v-card-text>
                                                <div class="text-h6">Map</div>
                                                <iframe :src="website.map" style="width: 100%; height: 350px; border:0" allowfullscreen="" loading="lazy"></iframe>
                                            </v-card-text>
                                            <v-card-text class="text-center">
                                                <div class="text-h6">Walkthrough</div>
                                                <LazyYoutube :src="website.walkthrough" />
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-card>
                                    <v-card-text class="text-center">
                                        <h5>SHARED BY</h5>
                                        <h3>@COMPANYNAME</h3>
                                        <h4>@AGENTNAME</h4>
                                        <div class="caption">@AGENTCONTACT</div>
                                    </v-card-text>
                                    <v-card-actions class="justify-center">
                                        <v-btn outlined class="text-capitalize" color="blue darken-3">
                                            <v-icon left>mdi-phone</v-icon>
                                            <span>Call</span>
                                        </v-btn>
                                        <v-btn outlined class="text-capitalize" color="grey darken-1">
                                            <v-icon left>mdi-message-processing-outline</v-icon>
                                            <span>SMS</span>
                                        </v-btn>
                                        <v-btn outlined class="text-capitalize" color="teal darken-3">
                                            <v-icon left>mdi-whatsapp</v-icon>
                                            <span>Whatsapp</span>
                                        </v-btn>
                                    </v-card-actions>
                                    <v-card-text class="text-center">
                                        <v-icon color="orange">mdi-lightning-bolt</v-icon>
                                        Powered By AgentsNest
                                    </v-card-text>
                                </v-card>

                            </v-card>
                          </v-dialog>
                          <!-- Website preview ends -->

                          <v-btn  class="ml-2 amber accent-3 text-capitalize rounded-lg" dark @click="cloneWebsite(website.id)">
                            <v-icon size="18" color="#111828">mdi-bookmark-outline</v-icon>
                          </v-btn>
                      </div>
                    </v-card>
                  </v-col>
              </v-row>
            </div>
            <!-- Default Websites -->
            <div v-else>
              <v-row class="">
                <v-col md="4" v-for="(website, index) in websites" :key="index">
                    <v-card class="transparent" flat>
                      <div class="title">{{website.title}}</div>
                      <v-img
                          aspect-ratio="1.8"
                          :src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                          :lazy-src="website.website_images[0] ? `https://d1o3gwiog9g3w3.cloudfront.net/website/${website.website_images[0].url}` : 'https://d1o3gwiog9g3w3.cloudfront.net/Default/property.jpg'"
                          class="rounded-lg shadow-xl my-2"
                      ></v-img>

                      <div class="d-flex">
                          <!-- Website Preview -->
                          <v-dialog v-model="preview[website.id]" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" dark color="#111828" class="text-capitalize flex-grow-1 rounded-lg">Preview</v-btn>
                            </template>
                            <v-card tile>
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title v-if="website">{{website.title}}</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon dark @click="preview[website.id] = false"><v-icon>mdi-close</v-icon></v-btn>
                                </v-toolbar>

                                <v-row class="">
                                    <v-col md="8" offset-md="2">
                                        <v-card class="mx-auto" tile>
                                            <v-card-title>{{website.title}}</v-card-title>
                                            <v-card-subtitle>{{website.about}}</v-card-subtitle>

                                            <v-row class="" v-if="website.website_images">
                                                <v-col v-for="image in website.website_images" :key="image.id" class="d-flex child-flex px-1" cols="12">
                                                    <v-img
                                                        :src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${image.url}`"
                                                        :lazy-src="`https://d1o3gwiog9g3w3.cloudfront.net/website/${image.url}`"
                                                        contain
                                                        class="white rounded-lg"
                                                        
                                                    >
                                                        <template v-slot:placeholder>
                                                            <v-row class="fill-height ma-0" align="center" justify="center">
                                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                            </v-row>
                                                        </template>
                                                    </v-img>
                                                </v-col>
                                            </v-row>

                                            <v-card class="d-flex align-center pa-4 mt-5 justify-space-around">
                                                <div class="font-weight-bold">PREPARED BY:</div>
                                                <v-spacer></v-spacer>
                                                <div>
                                                    <div>@AGENTNAME</div>
                                                    <div>@AGENTCONTACT</div>
                                                </div>
                                            </v-card>

                                            <v-card-text>
                                                <div class="text-h6">Map</div>
                                                <iframe :src="website.map" style="width: 100%; height: 350px; border:0" allowfullscreen="" loading="lazy"></iframe>
                                            </v-card-text>
                                            <v-card-text class="text-center">
                                                <div class="text-h6">Walkthrough</div>
                                                <LazyYoutube :src="website.walkthrough" />
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-card>
                                    <v-card-text class="text-center">
                                        <h5>SHARED BY</h5>
                                        <h3>@COMPANYNAME</h3>
                                        <h4>@AGENTNAME</h4>
                                        <div class="caption">@AGENTCONTACT</div>
                                    </v-card-text>
                                    <v-card-actions class="justify-center">
                                        <v-btn outlined class="text-capitalize" color="blue darken-3">
                                            <v-icon left>mdi-phone</v-icon>
                                            <span>Call</span>
                                        </v-btn>
                                        <v-btn outlined class="text-capitalize" color="grey darken-1">
                                            <v-icon left>mdi-message-processing-outline</v-icon>
                                            <span>SMS</span>
                                        </v-btn>
                                        <v-btn outlined class="text-capitalize" color="teal darken-3">
                                            <v-icon left>mdi-whatsapp</v-icon>
                                            <span>Whatsapp</span>
                                        </v-btn>
                                    </v-card-actions>
                                    <v-card-text class="text-center">
                                        <v-icon color="orange">mdi-lightning-bolt</v-icon>
                                        Powered By AgentsNest
                                    </v-card-text>
                                </v-card>

                            </v-card>
                          </v-dialog>
                          <!-- Website preview ends -->

                          <v-btn  class="ml-2 amber accent-3 text-capitalize rounded-lg" dark @click="cloneWebsite(website.id)">
                            <v-icon size="18" color="#111828">mdi-bookmark-outline</v-icon>
                          </v-btn>
                      </div>
                    </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card>

          
        </v-card>

    </v-card>
</template>

<script>
import Website from '../../Apis/Website'
import { LazyYoutube } from "vue-lazytube";
import Navbar from '../../components/Dashboard/Navbar.vue'

export default {
    components: { LazyYoutube, Navbar },
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
        drawer: false,
        snackbar: false,
        snackbarText: '',
        website: '',
        projectGallery: 0,
        preview: {},
        page: 1,
      }
    },
    watch: {
      // search (val) {
      //   val && val !== this.select && this.querySelections(val)
      // },
    },
    computed:{
      filterWebsite: function(){
          return this.websites.filter((website) => {
              return website.title.toLowerCase().match(this.search.toLowerCase());
          })
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
        Website.all().then(response => {
            this.websites = response.data.data;
            // console.log(response.data)
        });
      },
      cloneWebsite(website){
        Website.clone(website)
        .then(response => {
          if (response.data === 'Already Cloned') {
            this.snackbarText = 'Already Cloned'
            this.snackbar = true
            // console.log(response)
          } else {
            this.snackbarText = 'Website Cloned Successfully'
            this.snackbar = true
            // console.log(response)
          }
        })
        .catch();
      },
      previeWebsite(website) {
        this.preview = true;
        Website.websiteById(website).then((response) => {
            this.website = response.data.website
        });
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
      }
    },
    mounted(){
      this.fetchData();
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.6em 0.8em;
  width: 100%; 
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>