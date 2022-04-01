<template>
    <div class="main-div">
        <v-row>
            <v-col cols="12" md="6">
                <v-img src="../../assets/img/login.png" class="mt-md-16">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-col>
            <v-col cols="12" md="6">
                <v-card flat class="pa-4 white flex flex-col pa-md-16 align-center" height="100vh">
                    <v-card-text>
                        <div class="title font-weight-bold">Realtor Login</div>
                        <div class="mb-5">Please enter the details below to continue.</div>

                        <v-text-field label="Email" type="email" append-icon="email" v-model="form.email"></v-text-field>
                        <v-text-field 
                            label="Password"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            v-model="form.password"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn block large class="amber accent-3" dark depressed @click="login">Login</v-btn>
                    </v-card-actions>
                    <v-btn block text class="grey--text text-capitalize" :to="{name: 'forgotPassword'}">Forgot Password</v-btn>
                    <!-- <div class="text-center grey--text mt-4">
                        I'm new user.
                        <router-link :to="{name: 'Register'}">Sign Up</router-link>
                    </div> -->
                </v-card>
            </v-col>
        </v-row>
        
        <!-- <v-img
            src="../../assets/img/login.png"
            gradient="to top right, rgba(40, 53, 147,.8), rgba(60, 171, 186,.9)"
            class="d-flex text-center align-center"
            height="100vh"
        >
            <div class="logo-text">agnt.</div>

            <v-row>
                <v-col md="4" offset-md="4">
                    <v-card class="rounded-xl pa-10">
                        <div class="text-h5 text-center">Realtor Login</div>
                        <v-card-subtitle class="">Please enter the details below to continue.</v-card-subtitle>

                        <v-card-text>
                            <v-alert
                                v-show="errors" color="red" dense  dismissible
                                border="left" elevation="1" colored-border
                                class="caption"
                            >
                                Something went wrong.!
                            </v-alert>

                            <v-text-field
                                label="Email"
                                placeholder="Enter your email"
                                v-model="form.email"
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                placeholder="Password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"
                                v-model="form.password"
                                @keyup.enter="login"
                            ></v-text-field>
                            <router-link :to="{name: 'forgotPassword'}" class="blue--text text--darken-3">Forgot Password</router-link>
                        </v-card-text>


                        <v-card-actions>
                            <button class="gradient" @click="login">Login</button>
                        </v-card-actions>
                        <div class="mt-3">
                            I'm new user. <router-link :to="{name: 'Register'}">Sign Up</router-link>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-img> -->

    </div>
</template>

<script>
import User from "../../Apis/User";

export default {
    data () {
        return {
            showPassword: false,
            form:{
                email: "",
                password: "",
                device_name: 'mobile'
            },
            errors:''
        }
    },
    methods:{
        login(){
            User.login(this.form)
            .then((response) => {
                localStorage.setItem("token", response.data);
                this.$router.push('/dashboard');
            })
            .catch((error) => {
                this.errors = error.response.data.errors;
                console.log(error.response.data.errors);
            });
        }
    }
}
</script>

<style>
.main-div{
    background: #FAFCFF;
    height: 100vh;
}
.logo-text{
  color: #fff;
  font-weight: bold;
  font-size: 6vh;
  margin-bottom: 0.6em;
}
.gradient{
    background-image: linear-gradient(to right, #283593, #3cabba);
    box-shadow: 0 4px 15px 0 rgba(23, 91, 168, 0.75);
    color: #fff;
    width: 100%;
    border-radius: 12px;
    padding: 14px;
}
</style>