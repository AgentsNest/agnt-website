<template>

    <div class="flex-grow-1">
      <Navbar />

      <v-card class="bg-gradient px-4 pt-2 pb-8 mt-n6 rounded-t-xl d-md-none d-flex" flat>
          <v-btn class="text-capitalize dark" text dark>
            <v-icon class="mr-3" size="20">mdi-image-multiple</v-icon>
            Graphics
          </v-btn>
          <v-spacer></v-spacer>
      </v-card>

      <v-card flat class="white rounded-t-xl mt-n7 pa-3">
          <v-row>
            <v-col 
              cols="6" class="d-flex child-flex" 
              v-for="(graphic, index) in graphics" :key="index"
            >
                <router-link :to="{name: 'previewMgraphic', params: {id: graphic.id} }">
                    <v-img
                        :src="graphic.thumb"
                        lazy-src="../../assets/img/bg-grey.svg"
                        aspect-ratio="1.4"
                        max-width="250px"
                        class="grey lighten-2 rounded-lg pointer"
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

          <v-btn block text x-large @click="infiniteHandler" v-if="loadMoreBtn"><v-icon>mdi-arrow-down</v-icon></v-btn>
          <!-- <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
            <span slot="no-more"></span>
          </infinite-loading> -->
      </v-card>
      
    </div>


</template>

<script>
import Graphic from '../../Apis/Graphic'
import InfiniteLoading from 'vue-infinite-loading';
import User from '../../Apis/User'
import html2canvas from "html2canvas";
import Navbar from '../../components/Dashboard/Navbar.vue'

export default {
  components: { Navbar },
  data() {
    return {
      graphics: [],
      graphic: '',
      loadMoreBtn: false,
      page: 1,
      last_page : null,
      skelton: false,
      search: '',
      image: null,
      agent:'',
      frameOne: false,
      frameTwo: false
    };
  },
  methods: {
    async fetchData() {
      await Graphic.all(this.page).then((response) => {
        this.graphics = response.data.data;
        this.last_page = response.data.last_page;
        // console.log(response.data.data)
      });
    },
    async fetchUser() {
        await User.auth().then((response) => {
            this.agent = response.data.data
            // console.log(response.data.data)
        });
    },
    download(){
        html2canvas(document.getElementById("capture"),{
            dpi: 300,
            scale: 2
        })
        .then(function (canvas) {
            let a = document.createElement("a");
            a.href = canvas.toDataURL("image/jpeg");
            a.download = "graphic.jpg";
            a.click();
            a.remove();
        });

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
    detailsSidebar(id){
      Graphic.details(id).then(response => {
          this.graphic = response.data.image;
          // console.log(response.data);
      });
    },
    selectFrameOne(){
      this.frameOne = true
      this.frameTwo = false
    },
    selectFrameTwo(){
      this.frameOne = false
      this.frameTwo = true
    },
  },
  mounted(){
    this.fetchData();
    // this.fetchUser();
  },
  computed:{
    // filterGraphic: function(){
    //     return this.graphics.filter((graphic) => {
    //         return graphic.title.toLowerCase().match(this.search.toLowerCase());
    //     })
    // },
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
.details-box{
    position: absolute;
    bottom: 10px;
    width: 90%;
    left: 5%;
    border-radius: 5px;
    display: flex;
    font-size: 0.5rem;
    justify-content: space-between;
    padding: 5px 8px;
    background: #ffffff;
}
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
.layout-one{
    .brand-text{
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .logo{
        position: absolute;
        left: 8vw;
        bottom: 9vh;
    }
    .rera-text{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 0.8rem;
    }
}
.layout-two{
    .brand-text{
        position: absolute;
        top: 10px;
        left: 10px;
        font-weight: bold;
        font-size: 1.2em;
        color: red;
    }
    .logo{
        position: absolute;
        right: 0;
        top: 2em;
    }
    .rera-text{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 0.7rem;
        color: white;
        background: #333;
        padding: 3px 8px;
        font-weight: bold;
    }
}

</style>