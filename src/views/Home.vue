<template>
    <v-card class="overflow-hidden" tile>
            
        <v-app-bar absolute elevate-on-scroll color="#fff" scroll-target="#scrolling-techniques-7" width="80vw" class="mx-auto py-4" tile>
            <v-toolbar-title class="font-weight-bold headline">
                agnt. 
                <!-- <span class="caption">beta v.01</span> -->
            </v-toolbar-title>
            
            <v-spacer></v-spacer>

            <v-btn 
                text elevation="0"
                class="text-capitalize d-none d-md-flex py-3 mr-6 amber rounded-md" 
                outlined
                @click.stop="bookDemo = true"
            >Book Demo Now</v-btn>

            <div class="align-center d-none d-md-flex">
                <v-btn v-if="!isLoggedIn" elevation="0" class="text-capitalize gradient rounded-md px-8" dark :to="{name: 'Login'}" link>Login</v-btn>
                <v-btn v-else elevation="0" class="text-capitalize gradient rounded-lg px-8 py-6" dark :to="{name: 'Dashboard'}" link>Dashboard</v-btn>
            </div>

            <div class="d-print-block d-md-none d-lg-none">
                <v-btn v-if="isLoggedIn" icon :to="{name: 'Dashboard'}" link><v-icon>mdi-view-dashboard</v-icon></v-btn>
                <v-btn v-else icon :to="{name: 'Login'}" link><v-icon>mdi-login-variant</v-icon></v-btn>
            </div>

        </v-app-bar>

        <v-sheet id="scrolling-techniques-7" class="overflow-y-auto pt-12" min-height="100vh">
            <!-- Tracker and share -->
            <v-card class="py-12" color="#fefefe" flat tile>
                <v-container>
                    <v-row class="">
                        <v-col cols="12" md="6" class="px-md-0">
                            <div class="text-h3 mt-md-12 font-weight-medium d-none d-md-block">Grow your business</div>
                            <div class="text-h3 mt-4 font-weight-medium d-none d-md-block">faster with agentsnest</div>
                            <div class="grey--text text--darken-4 my-6" style="font-size: 22px">One solution for all you digital, market, and personal business needs.</div>

                            <div class="d-flex align-center">
                                <v-btn fab class="rounded-lg mr-2" x-small depressed color="amber lighten-5"><v-icon color="amber darken-3">mdi-check</v-icon></v-btn>
                                One-click-share property details with leads
                            </div>
                            <div class="d-flex align-center my-3">
                                <v-btn fab class="rounded-lg mr-2" x-small depressed color="amber lighten-5"><v-icon color="amber darken-3">mdi-check</v-icon></v-btn>
                                Manage your team member from one place
                            </div>
                            <div class="d-flex align-center">
                                <v-btn fab class="rounded-lg mr-2" x-small depressed color="amber lighten-5"><v-icon color="amber darken-3">mdi-check</v-icon></v-btn>
                                Activity tracker with Real-time notifications.
                            </div>

                            <v-btn class="amber accent-4 rounded-lg pa-7 mt-6" dark large depressed @click.stop="bookDemo = true">Book Demo Now</v-btn>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-img src="../assets/img/hero.png" lazy-src="../assets/img/hero.png" contain width="100%" height="100%" class="mx-auto"></v-img>
                        </v-col>
                    </v-row>

                    <section class="px-8">
                        <v-row class="shadow-box pa-8 rounded-lg align-center">
                            <v-col>
                                <div class="sm-text-center display-1 sm-title secondary-color">Share property details and Track activity</div>
                                <div class="grey--text text--darken-1 sm-caption subtitle-1 sm-text-center mt-3 mb-5">Forget all the hassles of sharing property details like floor plans, elevation images, sample flat images, and construction updates with a potential lead, with Agentsnest, you have the power of sharing it all via just a simple click. Select properties from our pool, or add your own, no more clusters of images, just a single link. And with our unique tracking system, keep a track of each property shared, opened/unopened timestamps, to help you filter out the best clientele.</div>
                            </v-col>
                            <v-col>
                                <v-img src="../assets/img/track.png"></v-img>
                            </v-col>
                        </v-row>
                        
                    </section>

                </v-container>
            </v-card>

            <!-- Existing Clients -->
            <!-- <v-card class="py-12 mb-2">
                <v-container>
                    <v-row class="align-center">
                        <v-col>
                            <v-img src="../assets/img/clientexist.png" lazy-src="../assets/img/clientexist.png"></v-img>
                        </v-col>
                        <v-col>
                            <section class="px-5">
                                <div class="sm-text-center display-1 title-sm secondary-color">Attend to your Existing Clients</div>
                                <div class="grey--text text--darken-1 sm-caption sm-text-center mt-3 mb-5">Forget all the hassles of sharing property details like floor plans, elevation images, sample flat images, and construction updates with a potential lead, with Agentsnest, you have the power of sharing it all via just a simple click. Select properties from our pool, or add your own, no more clusters of images, just a single link. And with our unique tracking system, keep a track of each property shared, opened/unopened timestamps, to help you filter out the best clientele.</div>
                            </section>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card> -->

            <!-- Grow Your Business Faster -->
            <v-card class="py-16" flat tile color="#111828">
                <v-container>
                    <section class="mb-16">
                        <div class="text-center md-display-1 title white--text">Grow Your Business Faster</div>
                    </section>
                    <v-row>
                        <v-col>
                            <v-list color="transparent" two-line>
                                <v-list-item>
                                    <v-img src="../assets/img/icons/tap.png" class="mr-4"></v-img>
                                    <div class="white--text">One-click-share property details with leads</div>
                                </v-list-item>
                                <v-list-item class="my-16">
                                    <v-img src="../assets/img/icons/team.png" class="mr-4"></v-img>
                                    <div class="white--text">Manage your team member from one place</div>
                                </v-list-item>
                                <v-list-item>
                                    <v-img src="../assets/img/icons/rating.png" class="mr-4"></v-img>
                                    <div class="white--text">One-platform updates for existing clients.</div>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col>
                            <v-img src="../assets/img/icons/Image.png" lazy-src="../assets/img/icons/Image.png" max-width="300px" class="mx-auto"></v-img>
                        </v-col>
                        <v-col>
                            <v-list color="transparent" two-line>
                                <v-list-item>
                                    <v-img src="../assets/img/icons/notification.png" class="mr-4"></v-img>
                                    <div class="white--text">Activity tracker with Real-time notifications.</div>
                                </v-list-item>
                                <v-list-item class="my-16">
                                    <v-img src="../assets/img/icons/creative.png" class="mr-4"></v-img>
                                    <div class="white--text">Never miss opportunities, get notified</div>
                                </v-list-item>
                                <v-list-item>
                                    <v-img src="../assets/img/icons/lead-generation.png" class="mr-4"></v-img>
                                    <div class="white--text">Lead generation integrated synchronised CRM.</div>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <!-- CRM Real-time Updates -->
            <!-- <v-card class="py-12">
                <v-container>
                    <v-row class="align-center">
                        <v-col>
                            <section class="px-5">
                                <div class="sm-text-center display-1 title-sm secondary-color">A CRM with Real-time Updates</div>
                                <div class="grey--text text--darken-1 sm-caption sm-text-center mt-3 mb-5">Our integrated lead genneration system gives you real-time updates whenever a new lead enters your ad campaigns. The CRM helps you manage, track, and share details with the leads and assists you to filter out the potential leads. You can assign leads to your team members, or even categorise them in.</div>
                            </section>
                        </v-col>
                        <v-col>
                            <v-img src="../assets/img/crm.png" lazy-src="../assets/img/crm.png"></v-img>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card> -->

            <!-- Brand Idenetity -->
            <v-card class="py-12 grey lighten-4" flat tile>
                <v-container>
                    <v-row class="align-center">
                        <v-col>
                            <v-img src="../assets/img/brand.png" lazy-src="../assets/img/brand.png"></v-img>
                        </v-col>
                        <v-col>
                            <section class="px-5">
                                <div class="sm-text-center display-1 sm-title secondary-color">Build your Brand Identity</div>
                                <div class="grey--text text--darken-1 sm-caption subtitle-1 sm-text-center mt-3 mb-5">Forget allthe hassles of sharing property details like floor plans, elevation images, sample flat images, and construction updates with a potential, with Agentsnest, you have the power of sharing it all via just a simple click. Select properties from our pool</div>
                            </section>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <!-- Join Us Plan -->
            <!-- <v-card class="cyan py-12 px-10 price-div">
                <div class="curve">
                    <v-card-text>
                        <div class="white--text font-weight-bold sm-title display-1">JUST ONE PLATFORM</div>
                        <div class="white--text font-weight-bold sm-title display-1">YOUR OWN SOLUTION</div>
                        <div class="my-5 title">STARTING WITH A 3 MONTH SUBSCRIPTION</div>
                        <div>At just <span class="sm-text-h4 text-h3 font-weight-bold">₹5,999</span> </div>
                    </v-card-text>
                    <div class="text-center mx-auto mt-16">
                        <v-btn large class="px-12" color="#111828" dark>Join Us</v-btn>
                    </div>
                </div>
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" class="viewBox demo-svg">
                    <path d="M0.00,49.98 C254.51,72.06 306.43,22.41 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" class="path">
                    </path>
                </svg>
            </v-card> -->

            <!-- Demo Book -->
            <v-card class="mt-12" flat tile>
                <v-container>
                    <v-row class="align-center rounded-xl">
                        <v-col cols="12" md="6">
                            <section class="px-8">
                                <div class="sm-text-center display-1 sm-title secondary-color">GET YOU FREE DEMO NOW!</div>
                                <div class="grey--text text--darken-1 sm-caption subtitle-1 sm-text-center mt-3 mb-5">Our integrated lead genneration system gives you real-time updates whenever a new lead enters your ad campaigns. The CRM helps you manage, track, and share details with the leads and assists you to filter out the potential leads. You can assign leads to your team members, or even categorise them in.</div>
                            </section>
                        </v-col>
                        <v-col cols="12" md="6" class="align-center flex flex-col">
                            <v-card tile color="#111828" class="pa-16 rounded-lg">
                                <v-card-text class="py-16">
                                    <v-text-field label="Name" solo></v-text-field>
                                    <v-text-field label="Email" solo></v-text-field>
                                    <v-text-field label="Contact" solo></v-text-field>
                                    <v-btn block class="amber accent-3 text-capitalize" large dark>Send Informtaion</v-btn>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <!-- Footer -->
            <v-card class="pt-8">
                <v-container class="mb-6">
                    <v-row class="px-2">
                        <v-col cols="12" md="6">
                            <div class="title font-weight-bold secondary-color">agnt.</div>
                            <div class="subtitle-1 grey--text text--darken-1 mt-2">A software curated for Real Estate Agents offering an end-to-end business solution. We work around simplifying each tool for agents to manage their clients, properties, and the team on one platform.</div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="title font-weight-bold secondary-color">Contact Us</div>
                            <div class="subtitle-1 grey--text text--darken-1 mb-4"><span class="font-weight-bold secondary-color">Address:</span> Sushma Infinium, Chandigarh-Ambala Highway, Zirkpur, Punjab, India</div>

                            <!-- <div class="d-flex mb-2">
                                <v-icon size="20" color="#1e2d55">mdi-phone</v-icon>
                                <div class="subtitle-1 ml-3 grey--text text--darken-1">+91 123 45678</div>
                            </div> -->
                            <div class="d-flex">
                                <v-icon size="20" color="#1e2d55">mdi-email</v-icon>
                                <div class="subtitle-1 ml-3 grey--text text--darken-1">hello@agentsnest.com</div>
                            </div>

                        </v-col>
                    </v-row>
                </v-container>

                <v-divider></v-divider>

                <v-card-text class="text-center">
                    Copyright © 2022 agentsnest. All rights reserved.
                </v-card-text>
            </v-card>

        </v-sheet>

        <!-- Book Demo Dialog -->
        <v-dialog
            transition="dialog-top-transition"
            v-model="bookDemo"
            width="80vh"
        >
            <v-card class="rounded-lg mx-auto book-box">
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="bookDemo = !bookDemo"><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>
                <v-card-text class="">
                    <div class="">
                        <div class="text-h4 mb-8">Book Demo Now</div>
                        <div><input type="text" placeholder="Name" class="search-input"></div>
                        <div><input type="email" placeholder="Email" class="search-input"></div>
                        <div><input type="text" placeholder="Phone" class="search-input"></div>
                        <v-btn block depressed class="bg-gradient text-capitalize my-4" x-large dark>Book Now</v-btn>
                        <!-- <div class="mt-10">250+ BROKERS IN 10+ CITIES TRUST US</div> -->
                    </div>
                    <!-- <div>
                        <v-img src="../assets/img/plans.jpg"></v-img>
                    </div> -->
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
export default {
    data(){
        return{
            videoOne: false,
            model: null,
            isLoggedIn: false,
            bookDemo: false,
        }
    },
    created(){
        if(localStorage.getItem('token'))
            this.isLoggedIn = true
        else 
            this.isLoggedIn = false
    }
}
</script>

<style scoped>
.primary-bg{
    background: #111828;
}
.shadow-box{
    box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
    background: #ffffff;
}
.secondary-color{
    color: #1e2d55;
}

/* .curve::before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 100% 50%;
    width: 55%;
    height: 100%;
    transform: translate(85%, 60%);
    background-color: hsl(216, 21%, 16%);
} */
.demo-svg{
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0px;
    transform: rotate(-6deg);
    opacity: 0.2;
}
.viewBox{
    width: 100%;
}
.path{
  stroke: none;
  fill: #fff;
}
.price-div{
    width: 80%;
    margin: 0 auto;
    background: #36D1DC; 
    background: -webkit-linear-gradient(to left, #5B86E5, #36D1DC); 
    background: linear-gradient(to left, #5B86E5, #36D1DC);
}
.search-input{
  background-color: #fff;
  border-radius: 8px;
  padding: 0.8em 1em;
  margin-bottom: 1em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>