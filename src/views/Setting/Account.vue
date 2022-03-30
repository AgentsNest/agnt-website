<template>
    <v-card flat tile>
        <Navbar/>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Profile Updated
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-card flat width="100%" class="white rounded-t-xl overflow-y-auto mt-n7 mt-md-0">

                        <v-card class="rounded-xl mb-5 px-2 py-1">
                            <v-card-actions>
                                <div class="caption grey--text font-weight-bold">https://agentsnest.com/me/<span class="teal--text">{{agent.uid}}</span> </div>
                                <v-spacer></v-spacer>

                                <v-dialog
                                    v-model="dialog"
                                    fullscreen
                                    hide-overlay
                                    transition="dialog-bottom-transition"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn v-bind="attrs" v-on="on" class="mr-2 white" x-small fab elevation="1">
                                            <v-icon>mdi-eye</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-card tile>
                                        <v-toolbar dark class="dark" dense tile> 
                                            <div>Preview</div>
                                            <v-spacer></v-spacer>
                                            <v-toolbar-items>
                                                <v-btn dark icon @click="dialog = false">
                                                    <v-icon>mdi-close</v-icon>
                                                </v-btn>
                                            </v-toolbar-items>
                                        </v-toolbar>

                                        <v-container>
                                        <v-row>
                                            <v-col cols="12" md="4" class="mx-auto">
                                                <v-card flat tile class="overflow-y-auto">
                                                    <v-img
                                                        :src="agent.image"
                                                        :lazy-src="agent.image"
                                                        class=""
                                                        aspect-ratio="1"
                                                        width="100%"
                                                        max-height="400"
                                                    ></v-img>

                                                    <v-card class="rounded-t-xl mt-n6" flat>
                                                        <v-card-actions>
                                                            <div class="pa-4">
                                                                <div class="title">{{agent.name}}</div>
                                                                <div class="caption">RERA: {{agent.rera}}</div>
                                                            </div>
                                                            <v-spacer></v-spacer>
                                                            <v-img max-width="100" :src="agent.brand_logo"></v-img>
                                                        </v-card-actions>

                                                        <v-divider></v-divider>
                                                        <!-- <div class="px-6 my-2 grey--text">Business Details</div>
                                                        <v-divider></v-divider> -->

                                                        <div class="py-3 px-6">
                                                            <div class="d-flex mt-3">
                                                                <v-btn fab small class="rounded-lg blue-grey lighten-5" depressed>
                                                                    <v-icon color="grey darken-3" size="20">mdi-bag-checked</v-icon>
                                                                </v-btn>
                                                                <div class="ml-4 body-2">
                                                                    <div class="caption grey--text">Company</div>
                                                                    {{agent.brand_text}}
                                                                </div>
                                                            </div>
                                                            <div class="d-flex my-4">
                                                                <v-btn fab small class="rounded-lg" depressed>
                                                                    <v-icon color="grey darken-3" size="20">mdi-phone</v-icon>
                                                                </v-btn>
                                                                <div class="ml-4 body-2">
                                                                    <div class="caption grey--text">Phone number</div>
                                                                    {{agent.contact}}
                                                                </div>
                                                            </div>
                                                            <div class="d-flex my-4">
                                                                <v-btn fab small class="rounded-lg" depressed>
                                                                    <v-icon color="grey darken-3" size="20">mdi-card-account-details-outline</v-icon>
                                                                </v-btn>
                                                                <div class="ml-4 body-2">
                                                                    <div class="caption grey--text">RERA number</div>
                                                                    {{agent.rera}}
                                                                </div>
                                                            </div>
                                                            <div class="d-flex my-4">
                                                                <v-btn fab small class="rounded-lg" depressed>
                                                                    <v-icon color="grey darken-3" size="20">mdi-email-outline</v-icon>
                                                                </v-btn>
                                                                <div class="ml-4 body-2">
                                                                    <div class="caption grey--text">Email</div>
                                                                    {{agent.email}}
                                                                </div>
                                                            </div>
                                                            <div class="d-flex my-4">
                                                                <v-btn fab small class="rounded-lg" depressed>
                                                                    <v-icon color="grey darken-3" size="20">mdi-web</v-icon>
                                                                </v-btn>
                                                                <div class="ml-4 body-2">
                                                                    <div class="caption grey--text">Website</div>
                                                                    {{agent.website}}
                                                                </div>
                                                            </div>
                                                            <div class="d-flex my-4">
                                                                <v-btn fab small class="rounded-lg" depressed>
                                                                    <v-icon color="grey darken-3" size="22">mdi-map-marker-radius-outline</v-icon>
                                                                </v-btn>
                                                                <div class="ml-4 body-2">
                                                                    <div class="caption grey--text">Address</div>
                                                                    {{agent.address}}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- About Text -->
                                                        <div class="pa-3 mx-3">
                                                            <v-card-text class="blue lighten-5 rounded-lg">{{agent.bio}}</v-card-text>
                                                        </div>

                                                        <v-card-actions class="px-6">
                                                            <v-btn block large dark outlined class="blue darken-4 text-capitalize" depressed link :href="`https://wa.me/${agent.contact}`">Send Message</v-btn>
                                                        </v-card-actions>

                                                        <!-- Social Links -->
                                                        <v-card-actions class="justify-center my-4">
                                                            <v-btn class="mr-3" small fab v-if="agent.facebook" :href="agent.facebook" target="_blank">
                                                                <v-icon>mdi-facebook</v-icon>
                                                            </v-btn>
                                                            <v-btn class="mr-3" small fab v-if="agent.instagram" :href="agent.instagram" target="_blank">
                                                                <v-icon>mdi-instagram</v-icon>
                                                            </v-btn>
                                                            <v-btn class="mr-3" small fab v-if="agent.twitter" :href="agent.twitter" target="_blank">
                                                                <v-icon>mdi-twitter</v-icon>
                                                            </v-btn>
                                                            <v-btn small fab v-if="agent.linkedin" :href="agent.linkedin" target="_blank">
                                                                <v-icon>mdi-linkedin</v-icon>
                                                            </v-btn>
                                                        </v-card-actions>

                                                        <v-divider></v-divider>
                                                        <v-card-text class="text-center">
                                                            <v-icon color="yellow darken-3">mdi-lightning-bolt</v-icon> Powered By <strong>agnt.</strong>        
                                                        </v-card-text>

                                                    </v-card>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                        </v-container>

                                    </v-card>
                                </v-dialog>

                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn fab elevation="1" class="white" x-small v-bind="attrs" v-on="on">
                                            <v-icon>mdi-share-variant-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list dense elevation="0" class="py-0">
                                        <v-list-item link :href="`https://wa.me/?text=https://www.agentsnest.com/me/${agent.uid}`">
                                            <v-list-item-title>
                                                <v-icon left size="16">mdi-whatsapp</v-icon>
                                                Whatsapp
                                            </v-list-item-title>
                                        </v-list-item>
                                        <v-list-item link :href="`sms:&body=https://www.agentsnest.com/me/${agent.uid}`">
                                            <v-list-item-title>
                                                <v-icon left size="16">mdi-message-text-outline</v-icon>
                                                Message
                                            </v-list-item-title>
                                        </v-list-item>
                                        <v-list-item link target="_blank" :href="`mailto:&body=${agent.uid}`">
                                            <v-list-item-title>
                                                <v-icon left size="16">mdi-email</v-icon>
                                                Email 
                                            </v-list-item-title>
                                        </v-list-item>
                                        <v-list-item link :href="`https://wa.me/?text=https://www.agentsnest.com/me/${agent.uid}`">
                                            <v-list-item-title>
                                                <v-icon left size="16">mdi-whatsapp</v-icon>
                                                Copy
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-card-actions>

                        </v-card>

                        <!-- Agent Avatar -->
                        <v-card class="rounded-xl" flat>
                        
                            <!-- <v-toolbar flat class="d-none d-md-flex">
                                <v-img 
                                    :src="avatarPreview ? avatarPreview : agent.image"
                                    max-height="160px"
                                    aspect-ratio="1"
                                    contain
                                    class="text-end mx-auto rounded-xl"
                                >
                                    <v-btn fab depressed color="grey lighten-3" x-small>
                                        <label for="brandAvatar">
                                            <v-icon class="cursor-pointer">mdi-camera</v-icon>
                                            <input type="file" id="brandAvatar" hidden accept="image/*" @change="previewAvatar"/>
                                        </label>
                                    </v-btn>
                                </v-img>
                                <v-spacer></v-spacer>
                                <div class="title">Change Information here</div>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    class="white--text rounded-lg d-none d-md-block" 
                                    @click="saveDetails()"
                                    :class="success == true ? 'gradient' : 'grey darken-4'"
                                >{{submitBtn}}</v-btn>
                            </v-toolbar> -->
                            <div class="text-center my-5">
                                <v-avatar tile size="130" class="rounded-lg">
                                    <img 
                                        :src="avatarPreview ? avatarPreview : agent.image"
                                        lazy-src="../../assets/img/bg-grey.svg"
                                    >
                                        <label for="brandAvatar" class="uploadAvatarBtn">
                                            <v-icon color="grey lighten-1">mdi-camera</v-icon>
                                            <!-- <span class="caption">change</span> -->
                                            <input type="file" id="brandAvatar" hidden accept="image/*" @change="previewAvatar"/>
                                        </label>
                                </v-avatar>
                            </div>

                            <v-card-text>
                                <v-row>
                                    <v-col md="6" cols="12">
                                        <v-text-field label="Full Name" v-model="agent.name" outlined></v-text-field>
                                    </v-col>
                                    <v-col md="6" cols="12">
                                        <!-- <label>Email</label>
                                        <input type="text" readonly class="search-input" v-model="agent.email"> -->
                                        <v-text-field label="Email" v-model="agent.email" outlined></v-text-field>
                                    </v-col>
                                    <v-col md="6" cols="12">
                                        <v-text-field label="Contact Number" v-model="agent.contact" outlined></v-text-field>
                                    </v-col>
                                    <v-col md="6" cols="12">
                                        <v-text-field label="Your Website" v-model="agent.website" outlined></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                            
                        <!-- Basic Info -->
                        <v-card class="rounded-xl" flat>        
                            <v-card-title>Basic Info</v-card-title>
                            <v-card-text>
                                <v-textarea
                                    outlined
                                    label="About You"
                                    v-model="agent.bio"
                                ></v-textarea>
                                <v-row>
                                    <v-col md="4" cols="12">
                                        <v-text-field label="Full Address" v-model="agent.address" outlined></v-text-field>
                                    </v-col>
                                    <v-col md="4" cols="6">
                                        <v-text-field label="City" v-model="agent.city" outlined></v-text-field>
                                    </v-col>
                                    <v-col md="4" cols="6">
                                        <v-text-field label="State" v-model="agent.state" outlined></v-text-field>
                                    </v-col>
                                    <!-- <v-col md="3" cols="6">
                                        <v-text-field label="Country" v-model="agent.country" outlined></v-text-field>
                                    </v-col> -->
                                </v-row>
                            </v-card-text>
                        </v-card>

                        <!-- Business Details -->
                        <v-card class="rounded-xl mb-5" flat>
                            <v-card-title>Business Details</v-card-title>

                            <div>
                                <v-img
                                    :src="preview ? preview : agent.brand_logo"
                                    max-width="160px"
                                    aspect-ratio="2"
                                    contain
                                    class="text-end mx-auto"
                                >
                                    <v-btn fab depressed color="grey lighten-3" x-small>
                                        <label for="brandLogo">
                                            <v-icon class="cursor-pointer">mdi-camera</v-icon>
                                            <input type="file" id="brandLogo" hidden accept="image/*" @change="previewLogo"/>
                                        </label>
                                    </v-btn>
                                </v-img>
                                <div class="text-center">
                                    <span class="caption font-weight-bold">Company Logo</span> <br/>
                                    <span class="caption grey--text">Allowed JPG, GIF or PNG. Max size of 800K</span>
                                </div>
                            </div>

                            <!-- <v-card-actions class="px-6 py-6">
                                <label for="brandLogo" class="brandLogoLabel">
                                    Upload
                                    <input type="file" id="brandLogo" hidden accept="image/*" @change="previewLogo"/>
                                </label>
                            </v-card-actions> -->
                            <v-card-text>
                                <v-row>
                                    <v-col md="6" cols="12">
                                        <v-text-field label="Company Name" v-model="agent.brand_text" outlined></v-text-field>
                                    </v-col>
                                    <v-col md="6" cols="12">
                                        <v-text-field label="RERA Number" v-model="agent.rera" outlined></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                        <!-- Social Links -->
                        <v-card class="rounded-xl" flat>
                            <v-card-title>Social Links</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col md="6" cols="12">
                                        <v-text-field v-model="agent.facebook" outlined prepend-inner-icon="mdi-facebook"></v-text-field>
                                    </v-col>
                                    <v-col md="6" cols="12">
                                        <v-text-field v-model="agent.linkedin" outlined prepend-inner-icon="mdi-linkedin"></v-text-field>
                                    </v-col>
                                    <v-col md="6" cols="12">
                                        <v-text-field v-model="agent.instagram" outlined prepend-inner-icon="mdi-instagram"></v-text-field>
                                    </v-col>
                                    <v-col md="6" cols="12">
                                        <v-text-field v-model="agent.twitter" outlined prepend-inner-icon="mdi-twitter"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                        <v-card class="">
                            <v-toolbar flat>
                                <v-icon class="mr-2">mdi-qrcode-scan</v-icon>
                                <span>Your QRCode</span>
                            </v-toolbar>
                            <v-card-text class="mx-auto">
                                <VueCard 
                                    v-if="agent"
                                    orgPost="00000" 
                                    :orgCity="agent.city" 
                                    orgCountry="India" 
                                    :orgName="agent.brand_text" 
                                    :firstName="agent.name" 
                                    lastName="Doe" 
                                    :workPhone="agent.contact"  
                                />
                            </v-card-text>
                        </v-card>

                    </v-card>
                </v-col>

                <!-- Update Button -->
                <v-btn class="teal update-btn white--text text-capitalize" @click="saveDetails()">
                    <v-icon left color="white">mdi-content-save</v-icon>
                    Update
                </v-btn>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import Sidebar from '../../components/Account/Sidebar.vue'
import User from '../../Apis/User'
import VueCard from 'vue-vcard'
import Navbar from '../../components/Dashboard/Navbar.vue'

export default {
    components:{ VueCard, Navbar },
    data(){
        return{
            // agent:{
            //     email: '',
            //     contact: '',
            //     website: '',
            //     brand_logo: '',
            //     bio: '',
            //     city: '',
            //     state: '',
            //     country: '',
            //     facebook: '',
            //     linkedin: '',
            //     instagram: '',
            //     twitter: '',
            //     rera: '',
            //     brand_text: ''

            // },
            snackbar: false,
            preview: '',
            submitBtn: "Update",
            success: false,
            verified: true,
            avatarPreview: '',
            token: '',
            dialog: false,
        }
    },
    methods: {
        saveDetails() {
            User.update(this.agent.id, this.agent)
            .then((response) => {
                this.snackbar = true
                this.$store.dispatch('getAuth');
            });
        },
        previewLogo(e) {
            let file = e.target.files[0];

            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                this.preview = e.target.result;
                this.agent.brand_logo = e.target.result;
            };
        },
        previewAvatar(e) {
            let file = e.target.files[0];

            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                this.avatarPreview = e.target.result;
                this.agent.image = e.target.result;
            };
        },
        fetchUser(){
            // User.authForUpdate().then((response) => {
            //     this.agent = response.data.data;
            // });
        }
    },
    computed:{
        agent(){ return this.$store.state.auth; }
    },
    mounted(){
        this.token = localStorage.getItem('token');
    }
}
</script>

<style scoped>
.content-card{
    /* overflow-y: scroll; */
}
#brandLogo{width: 100%;margin-top:2em}
.update-btn{
    position: absolute;
    right: 2em;
    bottom: 20px;
    z-index: 2;
}
.search-input{
  background-color: #fefefe;
  border-radius: 6px;
  padding: 1em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.4),0 24px 20px -24px rgba(71,82,107,.3);
  margin-top: 5px;
}
.brandLogoLabel{
  border: 1px solid #999999;
  border-radius: 4px;
  padding: 5px 16px;
  cursor: pointer;
  font-size: 14px
}
.brandLogoLabel:hover{
    background: #efefef;
}
.gradient{
  background-image: linear-gradient(to right, #0ba360, #3cba92);
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
.uploadAvatarBtn{
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,.4);
    color: #ededed;
    width: 100%;
    padding: 5px;
    cursor: pointer;
}
</style>    