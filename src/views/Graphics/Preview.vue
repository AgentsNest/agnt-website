<template>

    <v-card flat height="100%" class="transparent" tile>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Design saved successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <!-- <v-toolbar flat class="transparent">
            <v-btn fab small elevation="1" class="white"><v-icon>mdi-cog</v-icon></v-btn>
            <v-btn fab small elevation="1" class="white mx-3" @click="download"><v-icon>mdi-tray-arrow-down</v-icon></v-btn>
        </v-toolbar> -->


        <v-card class="d-flex align-center mx-auto transparent" height="75vh" width="100%" ref="canvasCard" flat>
            <v-card ref="container" id="capture" class="mainCanvas" width="100%">
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

        <v-bottom-navigation class="bottomNav" grow dark tile height="56px">
            <v-btn value="recent" @click="imageControls = !imageControls">
                <span>Image</span>
                <v-icon>mdi-image</v-icon>
            </v-btn>

            <v-btn value="favorites" @click="textControls = !textControls">
                <span>Text</span>
                <v-icon>mdi-signature-text</v-icon>
            </v-btn>

            <v-btn value="nearby" @click="download">
                <span>Download</span>
                <v-icon>mdi-download-circle</v-icon>
            </v-btn>
        </v-bottom-navigation>


    </v-card>

</template>

<script>
import Graphic from "../../Apis/Graphic";
import User from "../../Apis/User";
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';

// const width = window.innerWidth;
// const height = window.innerHeight;

// var canvas = document.getElementById("theCanvas");
// var parent = document.getElementById("parent");

const width = window.innerWidth - 22;
const height = window.innerHeight;



export default {
    data() {
        return {
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
            // console.log(this.$refs.stage.getNode().toDataURL({ pixelRatio: 3 }));

            var dataURL = this.$refs.stage.getNode().toDataURL({ pixelRatio: 2 });

            var head = document.getElementsByTagName('head')[0];

            var a = document.createElement('a');
            // a.href = dataURL;
            // a.target = '_self'
            // a.download = 'agnt.jpg'
            // head.appendChild(a);
            // a.click();
            // head.removeChild(a);

            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) { //iOS = Iphone, Ipad, etc.
                // var img = new Image();
                // img.crossOrigin = "Anonymous";
                // img.src = dataURL;
                // document.body.appendChild(img);

                // a.href = img.src;
                // a.download = 'agnt.png';
                // a.click();
                // document.body.removeChild(img);
                // this.snackbar = true;
                // console.log("safari")
                var FileSaver = require('file-saver');
                FileSaver.saveAs(dataURL, "image.jpg");
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

            // console.log(this.$refs.stage.getNode().toDataURL({devicePixelRatio: 2}));
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