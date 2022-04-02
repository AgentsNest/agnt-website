<template>

    <div class="flex-grow-1">
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Design saved successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <Navbar/>

        <v-card class="bg-gradient px-4 pt-2 pb-8 mt-n6 rounded-t-xl d-md-none d-flex" flat tile>
            <v-btn @click="$router.go(-1)" text class="text-capitalize" small>
                <v-icon color="white" left>mdi-keyboard-backspace</v-icon>
                <span class="white--text font-weight-bold">Back</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize dark" text dark>
                <v-icon class="mr-3" size="20">mdi-image-multiple</v-icon>
                Graphics
            </v-btn>
        </v-card>
        
        <v-card flat height="70vh" class=" rounded-t-xl mt-n7 d-flex align-center justify-center">
           
                <v-card ref="container" flat id="capture" class="transparent mainCanvas">
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
                                    fontFamily: 'Lato',
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
                                    fontFamily: 'Lato',
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
                                    fontFamily: 'Lato',
                                    fontSize: defaultSize,
                                    text: contact,
                                    fill: contactColor,
                                    fill: isDragging ? 'red' : contactColor
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
                                    fontFamily: 'Lato',
                                    fontSize: defaultSize,
                                    text: email,
                                    fill: emailColor,
                                    fill: isDragging ? 'red' : emailColor
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
                                    fontFamily: 'Lato',
                                    fontSize: defaultSize,
                                    text: website,
                                    fill: websiteColor,
                                    fill: isDragging ? 'red' : websiteColor
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
                    <!-- <div class="details-box">
                        <div class="flexbox">
                            <v-img src="../../assets/img/phone.png" width="15" class="mr-1"></v-img>
                            {{contact}}
                        </div>
                        <div class="flexbox">
                            <v-img src="../../assets/img/web.png" width="15" class="mr-1"></v-img>
                            {{website}}
                        </div>
                        <div class="flexbox">
                            <v-img src="../../assets/img/email.png" width="15" class="mr-1"></v-img>
                            {{email}}
                        </div>
                    </div>             -->
                </v-card>
                
                <!-- Company Control -->
                <v-bottom-sheet v-model="companyControls">
                    <div class="rera-controls">
                        <!-- Company Controls -->
                        <v-card tile flat>
                            <div class="font-weight-bold d-flex align-center px-5">
                                <v-switch dense color="teal darken-2" v-model="showCompany"></v-switch>
                                <span class="">Company Name</span>
                            </div>
                            <div class="d-flex align-center px-5 py-3 blue-grey lighten-5">
                                <span>Size</span>
                                <v-spacer></v-spacer>
                                <v-btn x-small fab tile elevation="1" class="white rounded" @click="brandFontSize -= 2">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <v-btn x-small fab tile elevation="1" class="white rounded" @click="brandFontSize += 2">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-menu :close-on-content-click="false">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-img src="../../assets/img/color.png" width="26" height="26" contain v-bind="attrs" v-on="on"></v-img>
                                    </template>
                                    <v-card flat>
                                        <v-color-picker
                                            v-model="brandTextColor"
                                            class=""
                                            hide-inputs
                                            canvas-height="80px"
                                        ></v-color-picker>
                                    </v-card>
                                </v-menu>     
                            </div>
                        </v-card>
                    </div>
                </v-bottom-sheet>
                <!-- Rera Control -->
                <v-bottom-sheet v-model="reraControls">
                    <div class="rera-controls">
                        <!-- Text Controls -->
                        <v-card flat tile>
                            <div class="font-weight-bold d-flex align-center px-5">
                                <v-switch dense color="teal darken-2" v-model="showRera"></v-switch>
                                <span class="">Rera Number</span>
                            </div>
                            <div class="d-flex align-center px-5 py-3 blue-grey lighten-5">
                                <span>Size</span>
                                <v-spacer></v-spacer>
                                <v-btn x-small fab tile elevation="1" class="white rounded" @click="reraFontSize -= 2">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <v-btn x-small fab tile elevation="1" class="white rounded" @click="reraFontSize += 2">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-menu :close-on-content-click="false">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-img src="../../assets/img/color.png" width="26" height="26" contain v-bind="attrs" v-on="on"></v-img>
                                    </template>
                                    <v-card flat>
                                        <v-color-picker
                                            v-model="reraTextColor"
                                            class=""
                                            hide-inputs
                                            canvas-height="80px"
                                        ></v-color-picker>
                                    </v-card>
                                </v-menu>  
                            </div>
                        </v-card>
                    </div>
                </v-bottom-sheet>
                <!-- Email / Website / Contact -->
                <v-bottom-sheet v-model="emailControls">
                    <div class="rera-controls">
                        <!-- Email -->
                        <v-card flat tile>
                            <div class="font-weight-bold d-flex align-center px-5">
                                <v-switch dense color="teal darken-2" v-model="showEmail"></v-switch>
                                <span class="">Email</span>
                                <v-spacer></v-spacer>
                                <v-menu :close-on-content-click="false">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-img src="../../assets/img/color.png" width="26" height="26" contain v-bind="attrs" v-on="on"></v-img>
                                    </template>
                                    <v-card flat>
                                        <v-color-picker
                                            v-model="emailColor"
                                            class=""
                                            hide-inputs
                                            canvas-height="80px"
                                        ></v-color-picker>
                                    </v-card>
                                </v-menu>   
                            </div>
                        </v-card>
                        <!-- Website -->
                        <v-card flat tile>
                            <div class="font-weight-bold d-flex align-center px-5">
                                <v-switch dense color="teal darken-2" v-model="showWebsite"></v-switch>
                                <span class="">Website</span>
                                <v-spacer></v-spacer>
                                <v-menu :close-on-content-click="false">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-img src="../../assets/img/color.png" width="26" height="26" contain v-bind="attrs" v-on="on"></v-img>
                                    </template>
                                    <v-card flat>
                                        <v-color-picker
                                            v-model="websiteColor"
                                            class=""
                                            hide-inputs
                                            canvas-height="80px"
                                        ></v-color-picker>
                                    </v-card>
                                </v-menu>   
                            </div>
                        </v-card>
                        <!-- Phone Number -->
                        <v-card flat tile>
                            <div class="font-weight-bold d-flex align-center px-5">
                                <v-switch dense color="teal darken-2" v-model="showPhone"></v-switch>
                                <span class="">Contact</span>
                                <v-spacer></v-spacer>
                                <v-menu :close-on-content-click="false">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-img src="../../assets/img/color.png" width="26" height="26" contain v-bind="attrs" v-on="on"></v-img>
                                    </template>
                                    <v-card flat>
                                        <v-color-picker
                                            v-model="contactColor"
                                            class=""
                                            hide-inputs
                                            canvas-height="80px"
                                        ></v-color-picker>
                                    </v-card>
                                </v-menu>   
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
                        <v-card class="px-4 py-5 text-center blue-grey lighten-5" tile>
                            <v-btn x-small fab tile elevation="1" class="white rounded-lg" @click="logoWidth -= 50">
                                    <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <span class="body-2 mx-6">Logo Size</span>
                            <v-btn x-small fab tile elevation="1" class="white rounded-lg" @click="logoWidth += 50">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-card>
                        <!-- <v-card class="pa-4 grey lighten-2 text-center" tile>
                            <label for="bgImage">
                                <v-icon>mdi-file-replace-outline</v-icon>
                                <span class="text-capitalize ml-2">Replace Background Image</span>
                                <input type="file" hidden id="bgImage" @change="onFileChange">
                            </label>
                        </v-card> -->
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

        <div class="bottomNav-ext d-flex justify-space-between" v-if="textControls">
            <v-btn large class="flex-grow-1 text-capitalize" @click="companyControls = !companyControls">Company</v-btn>
            <v-btn large class="flex-grow-1 text-capitalize" @click="reraControls = !reraControls">Rera</v-btn>
            <v-btn large class="flex-grow-1 text-capitalize" @click="emailControls = !emailControls">Email</v-btn>
        </div>

        <v-bottom-navigation class="bottomNav grey darken-4" grow dark tile height="58px">
            <v-btn value="recent" @click="imageControls = !imageControls">
                <span>Image</span>
                <v-icon size="18">mdi-image</v-icon>
            </v-btn>

            <v-btn value="favorites" @click="textControls = !textControls">
                <span>Text</span>
                <v-icon size="18">mdi-signature-text</v-icon>
            </v-btn>

            <v-btn value="nearby" @click="download">
                <span>Download</span>
                <v-icon size="18">mdi-download-circle</v-icon>
            </v-btn>
        </v-bottom-navigation>


    </div>

</template>

<script>
import Graphic from "../../Apis/Graphic";
import User from "../../Apis/User";
import html2canvas from "html2canvas";
import { saveAs, FileSaver } from 'file-saver';
import Navbar from "../../components/Dashboard/Navbar.vue";

// const width = window.innerWidth;
// const height = window.innerHeight;

// var canvas = document.getElementById("theCanvas");
// var parent = document.getElementById("parent");

const width = window.innerWidth - 22;
const height = window.innerHeight;



export default {
    components:{ Navbar },
    data() {
        return {
            stageSize: {
                width: width,
                height: height
            },
            emailColor: "#000000",
            websiteColor: "#000000",
            contactColor: "#000000",
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
            showEmail: false,
            showPhone: false,
            showWebsite: false,
            showLogo: true,
            showRera: false,
            showCompany: false,
            snackbar: false,
            companyControls: false,
            emailControls: false,
            reraControls: false,
        };
    },
    created() {},
    methods:{
        async fetchData() {
            var design = this.$route.params.id;
            await Graphic.details(design).then((response) => {
                const image = new window.Image();
                image.src = response.data.image;
                image.onload = () => {
                    this.image = image;
                    // calculation
                    var ratio = image.height / image.width;
                    this.stageSize.height = this.stageSize.width * ratio;

                    this.bgWidth = this.stageSize.width;
                    this.bgHeight = this.stageSize.height;
                };
                // console.log(this.stageSize.height)
            });
        },
        async fetchUser() {
            await User.auth().then((response) => {
                this.brandText = response.data.data.brand_text;
                this.email = response.data.data.email;
                this.website = response.data.data.website;
                this.contact = response.data.data.contact;
                this.reraText = response.data.data.rera;

                const image = new window.Image();
                image.src = response.data.data.brand_logo;
                image.onload = () => {
                    this.logo = image;
                };
                // console.log(response.data.data)
            });
        },
        writeMessage(message) {
            this.text = message;
        },
        handleDragStart() {
            this.isDragging = true;
        },
        handleDragEnd() {
            this.isDragging = false;
        },
        downloadURI(uri, name) {
            let a = document.createElement("a");
            a.download = name;
            a.href = uri;
            a.click();
            a.remove();
        },
        download(){
            var dataURL = this.$refs.stage.getNode().toDataURL({ pixelRatio: 2 });

            var head = document.getElementsByTagName('head')[0];

            var a = document.createElement('a');

            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) { //iOS = Iphone, Ipad, etc.
                // var img = new Image();
                // img.crossOrigin = "Anonymous";
                // img.src = dataURL;
                // document.body.appendChild(img);

                // a.href = img.src;

                // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                // let date = new Date();

                // a.download = 'agnt' + '-' + weekday[date.getDay()] + '.png';
                // a.click();
                // document.body.removeChild(img);

                html2canvas(document.getElementById("theCanvas"), {
                    useCORS : true,
                    allowTaint : true,
                    scale : 1,
                    dpi : 500,
                }).then(function (canvas) {
                    var image = canvas.toDataURL("image/jpeg");
                    let date = new Date(),
                    time = date.getTime(),
                    fileName = time + ".jpeg";
                    // console.log(image, fileName)

                    let a = document.createElement("a");
                    a.href = canvas.toDataURL("image/jpeg");
                    a.download = fileName;
                    a.click();
                    a.remove();

                });
                this.snackbar = true;

                console.log("safari")
            } else {
                a.href = dataURL.replace(/^data[:]image\/png[;]/i, "data:application/download;");
                a.download = 'agnt.png'
                head.appendChild(a);
                a.click();
                head.removeChild(a);
                this.snackbar = true;
                console.log("chrome")
            }
        },
        multiple(){
            this.downloadProgress = true;
            setTimeout(this.saveCanvas, 1800);
        },
        saveCanvas() {
            console.log('downloading started...')
            html2canvas(document.getElementById("capture"), {
                scale: 2,
            }).then(function (canvas) {
                var image = canvas.toDataURL("image/jpeg");
                let date = new Date(),
                time = date.getTime(),
                fileName = time + ".jpeg";
                console.log(image, fileName)

            });
            this.downloadProgress = false;
            this.savedDialog = true
        },
        loadingScreen () {
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        },
        onFileChange(e){
            var vm = this;
            const file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                vm.image = e.target.result
            };
            reader.readAsDataURL(file);   
        },
        loadIcon(){
            const phone = new window.Image();
            phone.src = require('@/assets/img/phone.svg');
            phone.onload = () => {
                this.phoneIcon = phone;
            }
            // email
            const email = new window.Image();
            email.src = require('@/assets/img/email.svg');
            email.onload = () => {
                this.emailIcon = email;
            }
            // website
            const website = new window.Image();
            website.src = require('@/assets/img/web.svg');
            website.onload = () => {
                this.websiteIcon = website;
            }
        }
    },
    mounted() {
        this.fetchData();
        this.fetchUser();
        this.loadIcon();
    },
    watch:{
        logoWidth:function(val){
            // console.log(val * (40 / 80) );
            this.logoHeight = val * (40 / 80);
            // this.logoHeight = val * ratio
        }
    }
}
</script>

<style scoped>
.mainCanvas{
    position: relative;
}
.bottomNav{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
.bottomNav-ext{
    position: fixed;
    bottom: 58px;
    left: 0;
    right: 0;
}
.saveBtn{
    position: fixed;
    bottom: 0;
    width: 60%;
    margin: 0 auto;
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
.color-pallete{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
}
.rera-controls{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
}
.logo-controls{
    position: fixed;
    bottom: 0;
    right: 0; 
    left: 0;
}
.brandText-controls{
    position: fixed;
    bottom: 0;
    right: 0; 
    left: 0;
}
.bgImage-controls{
    position: fixed;
    bottom: 0;
    right: 0; 
    left: 0;
}
.border-frame{
    border: 2px solid #ffffff;
    position: absolute;
    top: 3%;
    left: 3%;
    width: 94%;
    height: 94%;
}
/*Loader*/
.loaderScreen{
    background: #111827;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.logoText{
    font-size: 1.5em;
    margin-top: 5em;
    color: #fff;
}
.loader {
  position: absolute;
  top: 50%;
  left: 40%;
  margin-left: 10%;
  transform: translate3d(-50%, -50%, 0);
}
.dot {
  width: 24px;
  height: 24px;
  background: #3ac;
  border-radius: 100%;
  display: inline-block;
  animation: slide 1s infinite;
}
.dot:nth-child(1) {
  animation-delay: 0.1s;
  background: #32aacc;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
  background: #64aacc;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
  background: #96aacc;
}
.dot:nth-child(4) {
  animation-delay: 0.4s;
  background: #c8aacc;
}
.dot:nth-child(5) {
  animation-delay: 0.5s;
  background: #faaacc;
}
@-moz-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>