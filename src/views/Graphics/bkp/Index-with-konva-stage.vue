<template>

    <v-card class="rounded-xl pa-5 shadow content-card" height="88vh" elevation="0">

      <v-row>
        <!-- Image gallery columns 4 -->
        <v-col md="3" class="all-images-card">
          <!-- <v-row>
            <v-col>
              <input type="text" placeholder="Search by category..." class="search-input" v-model="search">
            </v-col>
          </v-row> -->
          <v-row v-if="skelton">
            <v-col cols="6" v-for="n in 12" :key="n">
              <v-skeleton-loader
                class="mx-auto rounded-lg"
                height="140px"
                type="image"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="6" v-for="(graphic, index) in filterGraphic" :key="index">
                <v-img
                  :src="graphic.thumb"
                  :lazy-src="graphic.thumb"
                  aspect-ratio="1.4"
                  height="140px"
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
          <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
            <span slot="no-more"></span>
          </infinite-loading>
        </v-col>
        <!-- Canvas Column 6 -->
        <v-col md="6">
          <v-card max-width="28vw" class="mx-auto overflow-hidden d-flex align-center" height="80vh" ref="canvasCard" flat >
            <v-card ref="container" id="capture" class="mainCanvas" width="100%" flat>
              <v-stage ref="stage" :config="stageSize" id="theCanvas"> 
                <v-layer ref="layer">
                    <v-image
                      :config="{
                          image: image,
                          width: bgWidth,
                          height: bgHeight
                      }"
                    />
                    <v-text
                        v-if="showCompany"
                        @dragstart="handleDragStart"
                        @dragend="handleDragEnd"
                        ref="text"
                        :config="{
                            x: 120,
                            y: 20,
                            fontFamily: 'Calibri',
                            fontSize: brandFontSize,
                            text: brandText,
                            fill: brandTextColor,
                            draggable: true,
                            fill: isDragging ? 'red' : brandTextColor
                        }"
                    />
                    <v-text
                        v-if="showRera"
                        @dragstart="handleDragStart"
                        @dragend="handleDragEnd"
                        ref="text"
                        :config="{
                            x: 300,
                            y: 10,
                            fontFamily: 'Calibri',
                            fontSize: reraFontSize,
                            text: reraText,
                            fill: reraTextColor,
                            draggable: true,
                            fill: isDragging ? 'red' : reraTextColor
                        }"
                    />
                </v-layer>
                <!-- Phone Number -->
                <v-layer :config="{draggable: true,}" v-if="showPhone">
                    <v-image
                        :config="{
                            image: phoneIcon,
                            x: bgWidth/26,
                            y: bgHeight/1.35,
                            width: 16,
                            height: 16
                        }"
                    />
                    <v-text
                        ref="text"
                        :config="{
                            x: bgWidth/10,
                            y: bgHeight/1.34,
                            fontFamily: 'Calibri',
                            fontSize: defaultSize,
                            text: contact,
                            fill: defaultColor,
                            fill: isDragging ? 'red' : defaultColor
                        }"
                    />
                </v-layer>
                <!-- Email -->
                <v-layer :config="{draggable: true,}" v-if="showEmail">
                    <v-image
                        :config="{
                            image: emailIcon,
                            x: bgWidth/26,
                            y: bgHeight/1.24,
                            width: 16,
                            height: 16
                        }"
                    />
                    <v-text
                        ref="text"
                        :config="{
                            x: bgWidth/10,
                            y: bgHeight/1.23,
                            fontFamily: 'Calibri',
                            fontSize: defaultSize,
                            text: email,
                            fill: defaultColor,
                            fill: isDragging ? 'red' : defaultColor
                        }"
                    />
                </v-layer>
                <!-- Website -->
                <v-layer :config="{draggable: true,}" v-if="showWebsite">
                    <v-image
                        :config="{
                            image: websiteIcon,
                            x: bgWidth/26,
                            y: bgHeight/1.14,
                            width: 16,
                            height: 16
                        }"
                    />
                    <v-text
                        ref="text"
                        :config="{
                            x: bgWidth/10,
                            y: bgHeight/1.13,
                            fontFamily: 'Calibri',
                            fontSize: defaultSize,
                            text: website,
                            fill: defaultColor,
                            fill: isDragging ? 'red' : defaultColor
                        }"
                    />
                </v-layer>
                
                <!-- Brand logo -->
                <v-layer>
                    <v-image
                        v-if="showLogo"
                        @dragstart="handleDragStart"
                        @dragend="handleDragEnd"
                        :config="{
                            image: logo,
                            draggable: true,
                            width: logoWidth,
                            height: logoHeight
                        }"
                    />
                </v-layer>
              </v-stage>
            </v-card>
            
            <!-- Text Controls -->
            <v-bottom-sheet v-model="textControls">
                <div class="rera-controls">
                    <v-card class="px-4 pt-2 pb-4" flat tile>
                        <div class="font-weight-bold d-flex align-center">
                            <span class="mr-3">Rera Number</span>
                            <v-switch inset dense color="teal darken-2" v-model="showRera"></v-switch>
                        </div>
                        <div class="d-flex align-center">
                            <v-btn x-small fab tile elevation="1" class="white rounded-lg mr-2" @click="reraFontSize -= 2">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <span class="body-2 mr-2">Size</span>
                            <v-btn x-small fab tile elevation="1" class="white rounded-lg mr-4" @click="reraFontSize += 2">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>    
                            <v-color-picker
                                dot-size="25"
                                hide-canvas
                                hide-inputs
                                hide-mode-switch
                                hide-sliders
                                show-swatches
                                mode="hexa"
                                swatches-max-height="75"
                                width="70%"
                                v-model="reraTextColor"
                                class="ml-auto"
                            ></v-color-picker>
                        </div>
                    </v-card>
                    <v-card tile class="px-4 pt-2 pb-4">
                        <div class="font-weight-bold d-flex align-center">
                            <span class="mr-3">Company Name</span>
                            <v-switch inset dense color="teal darken-2" v-model="showCompany"></v-switch>
                        </div>
                        <div class="d-flex align-center">
                            <v-btn x-small fab elevation="1" class="white mr-2 rounded-lg" @click="brandFontSize -= 2">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <span class="body-2 mr-2">Size</span>
                            <v-btn x-small fab elevation="1" class="white mr-4 rounded-lg" @click="brandFontSize += 2">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <v-color-picker
                                dot-size="25"
                                hide-canvas
                                hide-inputs
                                hide-mode-switch
                                hide-sliders
                                show-swatches
                                mode="hexa"
                                swatches-max-height="75"
                                width="70%"
                                v-model="brandTextColor"
                                class="ml-auto"
                            ></v-color-picker>
                        </div>
                    </v-card>
                    <v-card tile class="px-4 py-2">
                        <div class="font-weight-bold d-flex align-center">
                            <span class="mr-3">Basic Details Color</span>
                        </div>
                        <div class="d-flex align-center">
                            <div>
                                <v-switch inset label="Email" dense color="teal darken-2" v-model="showEmail"></v-switch>
                                <v-switch inset label="Website" dense color="teal darken-2" v-model="showWebsite"></v-switch>
                                <v-switch inset label="Contact" dense color="teal darken-2" v-model="showPhone"></v-switch>
                            </div>
                            <v-color-picker
                                dot-size="25"
                                hide-canvas
                                hide-inputs
                                hide-mode-switch
                                hide-sliders
                                show-swatches
                                mode="hexa"
                                swatches-max-height="170"
                                width="70%"
                                v-model="defaultColor"
                                class="ml-auto"
                            ></v-color-picker>
                        </div>
                    </v-card>
                </div>
            </v-bottom-sheet>

            <!-- Image Controls -->
            <v-bottom-sheet v-model="imageControls">
                <div class="logo-controls">
                    <v-card class="px-4" flat tile>
                        <div class="font-weight-bold d-flex align-center">
                            <span class="mr-3">Company Logo</span>
                            <v-switch inset dense color="teal darken-2" v-model="showLogo"></v-switch>
                        </div>
                    </v-card>
                    <v-card class="px-4 py-5 text-center" tile>
                        <v-btn x-small fab tile elevation="1" class="white rounded-lg" @click="logoWidth -= 50">
                                <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="body-2 mx-6">Logo Size</span>
                        <v-btn x-small fab tile elevation="1" class="white rounded-lg" @click="logoWidth += 50">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-card>
                </div>
            </v-bottom-sheet>

            <div v-if="downloadProgress" class="loaderScreen">
              <div class="relative h-full">
                  <div class="logoText">Creating your design...</div>
                  <div class="loader">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  </div>
              </div>
            </div>

            <!-- saved dailog -->
            <v-dialog v-model="savedDialog" persistent max-width="290">
                <v-card class="text-center pa-4">
                    <v-btn x-large icon outlined color="green"><v-icon size="42px">mdi-check</v-icon></v-btn>
                    <div class="title">Downloaded!</div>
                    <v-card-subtitle>Graphic saved successfully</v-card-subtitle>
                    <v-btn color="green darken-1" depressed rounded-xl dark @click="savedDialog = false">OK</v-btn>
                </v-card>
            </v-dialog>
          </v-card>
        </v-col>

        <!-- Controls Right Sidebar Column 2 -->
        <v-col md="3">

          <v-btn block class="mb-4 gradient py-6 rounded-lg" dark @click="download">Download</v-btn>

          <!-- All Controls -->
          <div class="rera-controls">
            <v-card class="px-4 pt-2" flat tile>
                <div class="font-weight-bold d-flex align-center">
                    <span class="mr-3">Rera Number</span>
                    <v-switch inset dense color="teal darken-2" v-model="showRera"></v-switch>
                </div>
                <div class="d-flex align-center">
                    <v-btn x-small fab tile elevation="1" class="white rounded-lg mr-2" @click="reraFontSize -= 2">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span class="body-2 mr-2">Size</span>
                    <v-btn x-small fab tile elevation="1" class="white rounded-lg mr-4" @click="reraFontSize += 2">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn fab xsmall :color="reraTextColor" v-bind="attrs" elevation="1" v-on="on" width="26" height="26"></v-btn>
                      </template>
                      <v-card>
                        <v-color-picker
                          v-model="reraTextColor"
                          class="ma-2"
                          hide-inputs
                          canvas-height="80px"
                        ></v-color-picker>
                      </v-card>
                    </v-menu>
                </div>
            </v-card>
            <!-- Company Controls -->
            <v-card tile flat class="px-4 pt-2 pb-4">
                <div class="font-weight-bold d-flex align-center">
                    <span class="mr-3">Company Name</span>
                    <v-switch inset dense color="teal darken-2" v-model="showCompany"></v-switch>
                </div>
                <div class="d-flex align-center">
                    <v-btn x-small fab elevation="1" class="white mr-2 rounded-lg" @click="brandFontSize -= 2">
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span class="body-2 mr-2">Size</span>
                    <v-btn x-small fab elevation="1" class="white mr-4 rounded-lg" @click="brandFontSize += 2">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn fab xsmall :color="reraTextColor" v-bind="attrs" elevation="1" v-on="on" width="26" height="26"></v-btn>
                      </template>
                      <v-card>
                        <v-color-picker
                          v-model="brandTextColor"
                          class="ma-2"
                          hide-inputs
                          canvas-height="80px"
                        ></v-color-picker>
                      </v-card>
                    </v-menu>
                </div>
            </v-card>
            <!-- Basic Details -->
            <v-card tile flat class="px-4 py-2">
                <div class="font-weight-bold d-flex align-center">
                    <span class="mr-3">Basic Details Color</span>
                </div>
                <div class="d-flex align-center">
                    <div>
                        <v-switch inset label="Email" dense color="teal darken-2" v-model="showEmail"></v-switch>
                        <v-switch inset label="Website" dense color="teal darken-2" v-model="showWebsite"></v-switch>
                        <v-switch inset label="Contact" dense color="teal darken-2" v-model="showPhone"></v-switch>
                    </div>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn fab xsmall :color="reraTextColor" v-bind="attrs" elevation="1" v-on="on" width="26" height="26"></v-btn>
                      </template>
                      <v-card>
                        <v-color-picker
                          v-model="defaultColor"
                          class="ma-2"
                          hide-inputs
                          canvas-height="80px"
                        ></v-color-picker>
                      </v-card>
                    </v-menu>
                </div>
            </v-card>
            <!-- Logo -->
            <v-card class="px-4" flat tile>
                <div class="font-weight-bold d-flex align-center">
                    <span class="mr-3">Company Logo</span>
                    <v-switch inset dense color="teal darken-2" v-model="showLogo"></v-switch>
                </div>
            </v-card>
            <v-card class="px-4 py-5 text-center" flat tile>
                <v-btn x-small fab tile elevation="1" class="white rounded-lg" @click="logoWidth -= 50">
                        <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span class="body-2 mx-6">Logo Size</span>
                <v-btn x-small fab tile elevation="1" class="white rounded-lg" @click="logoWidth += 50">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-card>
        </div>

        </v-col>
      </v-row>
      
    </v-card>


</template>

<script>
import Graphic from '../../Apis/Graphic'
import InfiniteLoading from 'vue-infinite-loading';
import User from '../../Apis/User'

const width = 500;
const height = '';

export default {
  components: { InfiniteLoading },
  data() {
    return {
      graphics: [],
      graphic: '',
      loadMoreBtn: true,
      page: 1,
      last_page : null,
      skelton: false,
      search: '',
      agent:'',

      stageSize: {
        width: width,
        height: height
      },
      defaultColor: "#000000",
      defaultSize: 12,
      phoneIcon: null,
      websiteIcon: null,
      emailIcon: null,
      isDragging: false,
      bgWidth: '',
      bgHeight: '',
      image: null,
      logo: null,
      logoWidth: 80,
      logoHeight: 40,
      brandText: "",
      brandTextColor: "#000000",
      brandFontSize: 20,
      textControls: false,
      reraText: '',
      reraTextColor: "#000000",
      reraFontSize: 9,
      imageControls: false,
      email: "",
      website: "",
      contact: "",
      loading: false,
      downloadProgress: false,
      customize: true,
      savedDialog: false,
      showEmail: true,
      showPhone: true,
      showWebsite: true,
      showLogo: true,
      showRera: true,
      showCompany: true,
      snackbar: false
    };
  },
  methods: {
    fetchData() {
      this.skelton = true
      Graphic.all(this.page).then((response) => {
        this.skelton = false
        this.graphics = response.data.data;
        this.last_page = response.data.last_page;
        // console.log(response.data.data)
      });
    },
    async fetchUser() {
        await User.auth().then((response) => {
          this.brandText = response.data.data.brand_text;
          this.email = response.data.data.email;
          this.website = response.data.data.website;
          this.contact = response.data.data.contact;

          const image = new window.Image();
          image.src = response.data.data.brand_logo;
          image.onload = () => {
              this.logo = image;
          };
          // console.log(response.data.data)
        });
    },
    handleDragStart() {
        this.isDragging = true;
    },
    handleDragEnd() {
        this.isDragging = false;
    },
    download(){
      var dataURL = this.$refs.stage.getNode().toDataURL({ pixelRatio: 2 });
      var head = document.getElementsByTagName('head')[0];
      var a = document.createElement('a');

      if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) { //iOS = Iphone, Ipad, etc.
          var img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = dataURL;
          document.body.appendChild(img);

          a.href = img.src;

          const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
          let date = new Date();

          a.download = 'agnt' + '-' + weekday[date.getDay()] + '.png';
          a.click();
          document.body.removeChild(img);
          this.snackbar = true;
          console.log("safari")
      } else {
          a.target = "_blank";
          a.href = dataURL.replace(/^data[:]image\/png[;]/i, "data:application/download;");
          a.download = 'agnt.png'
          head.appendChild(a);
          a.click();
          head.removeChild(a);
          this.snackbar = true;
          console.log("chrome")
      }
    },
    infiniteHandler($state){
      if (this.page === this.last_page) {
        $state.complete();
      } else {
        this.page = this.page + 1;
        Graphic.all(this.page).then((response) => {
          // console.log(response.data.data)
          response.data.data.forEach(data => {
            this.graphics.push(data);
          });
          $state.loaded();
        });
      }
    },
    async detailsSidebar(id){
      await Graphic.details(id).then((response) => {
        const image = new window.Image();
        image.src = response.data.image;
        image.onload = () => {
          this.image = image;
          var ratio = image.height / image.width;
          this.stageSize.height = this.stageSize.width * ratio;

          this.bgWidth = this.stageSize.width;
          this.bgHeight = this.stageSize.height;
        };
      });
    },
    loadIcon(){
        const phone = new window.Image();
        phone.src = require('@/assets/img/phone.png');
        phone.onload = () => {
            this.phoneIcon = phone;
        }
        // email
        const email = new window.Image();
        email.src = require('@/assets/img/email.png');
        email.onload = () => {
            this.emailIcon = email;
        }
        // website
        const website = new window.Image();
        website.src = require('@/assets/img/web.png');
        website.onload = () => {
            this.websiteIcon = website;
        }
    }
  },
  mounted(){
    this.fetchData();
    this.fetchUser();
    this.loadIcon();
  },
  computed:{
    filterGraphic: function(){
        return this.graphics.filter((graphic) => {
            return graphic.title.toLowerCase().match(this.search.toLowerCase());
        })
    },
  },
}
</script>

<style scoped lang="scss">
.all-images-card{
  height: 82vh;
  overflow-y: scroll;
}
.pointer{
  cursor: pointer;
}
#theCanvas{
  box-shadow: 0 0 0 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.search-input{
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 1em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.mainCanvas{
    position: relative;
}
// .details-box{
//     position: absolute;
//     bottom: 10px;
//     width: 90%;
//     left: 5%;
//     border-radius: 5px;
//     display: flex;
//     font-size: 0.5rem;
//     justify-content: space-between;
//     padding: 5px 8px;
//     background: #ffffff;
// }
.icon-bg{
    background: #343434;
    padding: 2px 4px;
    border-radius: 50%;
    margin-right: 3px;
}
.flexbox{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>