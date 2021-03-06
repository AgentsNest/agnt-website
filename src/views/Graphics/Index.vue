<template>
  <div class="flex-grow-1"> 

    <v-card class="d-none d-md-flex mb-5 pa-5" elevation="0">
        <div class="shadow rounded-lg">
          <v-btn large color="#111828" dark><v-icon>mdi-image-multiple</v-icon></v-btn>
          <v-btn class="text-capitalize" text>Graphics</v-btn>
        </div>
    </v-card>
    
    <v-card flat class="white rounded-t-xl">
      <v-container>
        <v-row>
          <v-col cols="3" v-for="(graphic, index) in filterGraphic" :key="index">
            <router-link :to="{name: 'previewGraphic', params: {id: graphic.id} }">
              <v-img
                  :src="graphic.thumb"
                  lazy-src="../../assets/img/bg-grey.svg"
                  aspect-ratio="1.4"
                  max-width="250px"
                  class="grey lighten-2 rounded-lg pointer"
                  @click="detailsSidebar(graphic.id)"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
              </v-img>
            </router-link>
          </v-col>
        </v-row>
      </v-container>

      <v-btn block text x-large @click="infiniteHandler" v-if="loadMoreBtn"><v-icon>mdi-arrow-down</v-icon></v-btn>
        
      
    </v-card>

  </div>
</template>

<script>
import Graphic from '../../Apis/Graphic'
import InfiniteLoading from 'vue-infinite-loading';
import User from '../../Apis/User'
import Navbar from '../../components/Dashboard/Navbar.vue'

const width = 500;
const height = '';

export default {
  components: {  },
  data() {
    return {
      graphics: [],
      graphic: '',
      loadMoreBtn: false,
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
      Graphic.all(this.page).then((response) => {
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
        this.loadMoreBtn = false
        // $state.complete();
      } else {
        this.loadMoreBtn = true
        this.page = this.page + 1;
        Graphic.all(this.page).then((response) => {
          // console.log(response.data.data)
          response.data.data.forEach(data => {
            this.graphics.push(data);
          });
          // $state.loaded();
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
// .all-images-card{
//   height: 82vh;
//   overflow-y: scroll;
// }
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