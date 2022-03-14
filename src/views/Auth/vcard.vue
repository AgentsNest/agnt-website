<template>
    <div>
        <v-card flat tile class="overflow-y-auto">

            <div
                class="align-center d-flex pt-6 pb-12"
                style="
                    background: #1a232e;
                    background: -webkit-linear-gradient(to right, #1a232e, #272e35);
                    background: linear-gradient(to right, #1a232e, #272e35);
                "
            >
                <v-img
                    :src="user.image"
                    :lazy-src="user.image"
                    class="rounded-xl mx-auto"
                    aspect-ratio="1"
                    max-width="180"
                    width="100%"
                ></v-img>
            </div>

            <v-card class="rounded-t-xl mt-n6" flat>
                <v-card-actions>
                    <div class="pa-4">
                        <div class="title">{{user.name}}</div>
                        <div class="caption">RERA: {{user.rera}}</div>
                        <div class="caption">{{user.brand_text}}</div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-img max-width="100" :src="user.brand_logo"></v-img>
                </v-card-actions>

                <v-divider></v-divider>
                <div class="px-6 my-2 grey--text">Business Details</div>
                <v-divider></v-divider>

                <div class="py-3 px-6">
                    <div class="d-flex mt-3">
                        <v-icon color="black" size="20">mdi-bag-checked</v-icon>
                        <div class="ml-2 body-2">{{user.brand_text}}</div>
                    </div>
                    <div class="d-flex my-4">
                        <v-icon color="black" size="20">mdi-phone</v-icon>
                        <div class="ml-2 body-2">{{user.contact}}</div>
                    </div>
                    <div class="d-flex my-4">
                        <v-icon color="black" size="20">mdi-card-account-details-outline</v-icon>
                        <div class="ml-2 body-2">{{user.rera}}</div>
                    </div>
                    <div class="d-flex my-4">
                        <v-icon color="black" size="20">mdi-email-outline</v-icon>
                        <div class="ml-2 body-2">{{user.email}}</div>
                    </div>
                    <div class="d-flex my-4">
                        <v-icon color="black" size="20">mdi-web</v-icon>
                        <div class="ml-2 body-2">{{user.website}}</div>
                    </div>
                    <div class="d-flex my-4">
                        <v-icon color="black" size="22">mdi-map-marker-radius-outline</v-icon>
                        <div class="ml-2 body-2">{{user.address}}</div>
                    </div>
                </div>
                <!-- About Text -->
                <div class="pa-3">
                    <v-card-text class="blue lighten-5 rounded-lg">{{user.bio}}</v-card-text>
                </div>

                <v-card-actions>
                    <v-btn block x-large dark class="amber accent-3 text-capitalize" depressed link :href="`https://wa.me/${user.contact}`">Send Message</v-btn>
                </v-card-actions>

                <!-- Social Links -->
                <v-card-actions class="justify-center my-4">
                    <v-btn class="mr-3" small fab v-if="user.facebook" :href="user.facebook" target="_blank">
                        <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn class="mr-3" small fab v-if="user.instagram" :href="user.instagram" target="_blank">
                        <v-icon>mdi-instagram</v-icon>
                    </v-btn>
                    <v-btn class="mr-3" small fab v-if="user.twitter" :href="user.twitter" target="_blank">
                        <v-icon>mdi-twitter</v-icon>
                    </v-btn>
                    <v-btn small fab v-if="user.linkedin" :href="user.linkedin" target="_blank">
                        <v-icon>mdi-linkedin</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-divider></v-divider>
                <v-card-text class="text-center">
                    <v-icon color="yellow darken-3">mdi-lightning-bolt</v-icon> Powered By <strong>agnt.</strong>        
                </v-card-text>

            </v-card>

        </v-card>

    </div>
</template>

<script>
import User from '../../Apis/User'

export default {
    data(){
        return{
            user:''
        }
    },
    mounted(){
        User.vcard(this.$route.params.uid)
        .then((res) => {
            this.user = res.data;
        })
    },
    methods:{
        
    }
}
</script>

<style>

</style>