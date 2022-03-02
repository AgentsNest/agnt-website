<template>
    <v-card class="overflow-hidden" tile>
            
        <v-app-bar absolute color="#111828" dark elevate-on-scroll scroll-target="#scrolling-techniques-7" class="px-md-16" tile>
            <v-toolbar-title class="font-weight-bold headline">
                agnt. 
                <span class="caption">beta v.01</span>
            </v-toolbar-title>
            
            <v-spacer></v-spacer>

            <v-btn text class="text-capitalize d-none d-md-flex">Home</v-btn>
            <v-btn text class="text-capitalize d-none d-md-flex">About Us</v-btn>
            <v-btn text elevation="0" class="text-capitalize d-none d-md-flex">Contact Us</v-btn>
            <v-btn text elevation="0" class="text-capitalize d-none d-md-flex">Sign Up</v-btn>
            <v-btn  elevation="0" class="text-capitalize d-none d-md-flex gradient rounded-xl px-8" :to="{name: 'Login'}" link>Login</v-btn>

            <div class="d-print-block d-md-none d-lg-none">
                <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
            </div>

        </v-app-bar>

        <v-sheet id="scrolling-techniques-7" class="overflow-y-auto pt-12" min-height="100vh">
            <!-- Tracker and share -->
            <v-card class="py-12" color="#eff8fc" flat tile>
                <v-container>
                    <v-row class="">
                        <v-col cols="12" class="px-3 px-md-0 text-center">
                            <div class="text-center display-sm-1 display-3 mt-md-12 font-weight-medium">Grow your business</div>
                            <div class="text-center display-sm-1 display-3 mt-6 font-weight-medium">faster with Agents Nest</div>
                            <div class="text-center grey--text text--darken-2 my-8">One solution for all you digital, market, and personal business needs.</div>
                            <v-btn class="amber accent-3 rounded-lg pa-7" dark large depressed>Save time and invent</v-btn>
                            <div class="mt-3 grey--text text--darken-2">Towards a better future</div>
                        </v-col>
                        <v-col cols="12">
                            <v-img src="../assets/img/hero.png" lazy-src="../assets/img/hero.png" contain width="100%" max-width="1000px" class="mx-auto"></v-img>
                        </v-col>
                    </v-row>

                    <section class="px-8">
                        <v-row class="shadow-box pa-8 rounded-lg align-center">
                            <v-col>
                                <div class="sm-text-center display-1 sm-title secondary-color">Share property details and Track activity</div>
                                <div class="grey--text text--darken-1 sm-caption sm-text-center mt-3 mb-5">Forget all the hassles of sharing property details like floor plans, elevation images, sample flat images, and construction updates with a potential lead, with Agentsnest, you have the power of sharing it all via just a simple click. Select properties from our pool, or add your own, no more clusters of images, just a single link. And with our unique tracking system, keep a track of each property shared, opened/unopened timestamps, to help you filter out the best clientele.</div>
                            </v-col>
                            <v-col>
                                <v-img src="../assets/img/track.png"></v-img>
                            </v-col>
                        </v-row>
                        
                    </section>

                </v-container>
            </v-card>

            <!-- Existing Clients -->
            <v-card class="py-12 mb-2">
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
            </v-card>

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
            <v-card class="py-12 mb-2">
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
            </v-card>

            <!-- Brand Idenetity -->
            <v-card class="py-12" flat tile>
                <v-container>
                    <v-row class="align-center">
                        <v-col>
                            <v-img src="../assets/img/brand.png" lazy-src="../assets/img/brand.png"></v-img>
                        </v-col>
                        <v-col>
                            <section class="px-5">
                                <div class="sm-text-center display-1 sm-title secondary-color">Build your Brand Identity</div>
                                <div class="grey--text text--darken-1 sm-caption sm-text-center mt-3 mb-5">Forget allthe hassles of sharing property details like floor plans, elevation images, sample flat images, and construction updates with a potential, with Agentsnest, you have the power of sharing it all via just a simple click. Select properties from our pool</div>
                            </section>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

            <!-- Join Us Plan -->
            <v-card class="cyan py-12 px-10 price-div">
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
                <!-- <svg viewBox="0 0 500 150" preserveAspectRatio="none" class="viewBox demo-svg">
                    <path d="M0.00,49.98 C254.51,72.06 306.43,22.41 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" class="path">
                    </path>
                </svg> -->
            </v-card>

            <!-- Demo Book -->
            <v-card class="mt-12" flat tile>
                <v-container>
                    <v-row class="align-center rounded-xl">
                        <v-col cols="12" md="6">
                            <section class="px-8">
                                <div class="sm-text-center display-1 sm-title secondary-color">GET YOU FREE DEMO NOW!</div>
                                <div class="grey--text text--darken-1 sm-caption sm-text-center mt-3 mb-5">Our integrated lead genneration system gives you real-time updates whenever a new lead enters your ad campaigns. The CRM helps you manage, track, and share details with the leads and assists you to filter out the potential leads. You can assign leads to your team members, or even categorise them in.</div>
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
                            <div class="caption grey--text text--darken-1 mt-2">A software curated for Real Estate Agents offering an end-to-end business solution. We work around simplifying each tool for agents to manage their clients, properties, and the team on one platform.</div>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="title font-weight-bold secondary-color">Contact Us</div>
                            <div class="body-2 grey--text text--darken-1 mb-4"><span class="font-weight-bold secondary-color">Address:</span> Sushma Infinium, Chandigarh-Ambala Highway, Zirkpur, Punjab, India</div>

                            <div class="d-flex mb-2">
                                <v-icon size="20" color="#1e2d55">mdi-phone</v-icon>
                                <div class="caption ml-3 grey--text text--darken-1">+91 123 45678</div>
                            </div>
                            <div class="d-flex">
                                <v-icon size="20" color="#1e2d55">mdi-email</v-icon>
                                <div class="caption ml-3 grey--text text--darken-1">hello@agentsnest.com</div>
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
    </v-card>
</template>

<script>
export default {
    data(){
        return{
            videoOne: false,
            model: null,
        }
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
</style>