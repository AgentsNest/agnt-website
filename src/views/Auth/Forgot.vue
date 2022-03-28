<template>
    <v-card height="100vh" class="w-full">
        <v-img
            src="../../assets/img/bg.svg"
            class="d-flex align-center justify-center w-full"
            height="100vh"
        >
            <v-row>
                <v-col cols="12" md="4" class="mx-auto">
                    <v-card class="px-12 py-8 rounded-lg">
                        <router-link to="/">
                            <div class="text-center mb-6 font-weight-bold text-h5 black--text">agnt.</div>
                        </router-link>
                        <div class="font-weight-bold">Forgot Password?</div>
                        <div class="caption mb-5">No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</div>
                        <v-text-field
                            label="You Email Address"
                            placeholder="You Email Address"
                            solo
                            class="rounded-lg"
                            v-model="email"
                        ></v-text-field>
                        <v-btn @click="sendData" class="text-capitalize grey darken-4" dark large outlined block>Send Reset Link</v-btn>
                        <v-card-text class="text-center">
                            Remember Password?
                            <v-btn small class="rounded-lg" text :to="{name: 'Login'}">Login</v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-img>
    </v-card>
</template>

<script>
import User from '../../Apis/User'

export default {
    data(){
        return {
            email: ''
        }
    },
    methods:{
        sendData(){
            let data = new FormData();
            data.append('email', this.email)

            User.forget(data)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style>

</style>