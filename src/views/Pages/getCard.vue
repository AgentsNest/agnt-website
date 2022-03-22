<template>
    <v-card flat height="100vh" width="100%" class="transparent overflow-y-auto">
        <Navbar/>

        <v-snackbar 
            v-model="snackbar" 
            transition="scroll-y-transition" 
            top
            timeout="3000"
        >
            {{ toastMessage }}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-container>
            <v-row>
                <v-col cols="12" md="7">
                    <v-card class="text-center" flat>
                        <v-img
                            src="../../assets/img/v-card.png"
                            max-width="350px"
                            class="mx-auto"
                        ></v-img>
                        <div class="text-h5">OWN THE CARD NOW</div>
                        <div class="">Go contactless in three simple steps!</div>
                        <div class="mt-4 d-flex justify-center">
                            <div class="single-box">
                                <v-icon color="grey darken-3">mdi-cart-arrow-down</v-icon>
                                <div class="text">Purchase Your Card</div>
                            </div>
                            <div class="single-box mx-6">
                                <v-icon color="grey darken-3">mdi-account-circle-outline</v-icon>
                                <div class="text">Create Your Profile</div>
                            </div>
                            <div class="single-box">
                                <v-icon color="grey darken-3">mdi-credit-card-wireless-outline</v-icon>
                                <div class="text">Tap, Share & Go</div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="5">
                    <v-card class="pa-5" flat>
                        <div class="title grey--text text--darken-2">Request a callback</div>
                        <div class="caption mb-5">Please fill out form below and we will call you back</div>
                       <input type="text" class="search-input rounded-lg mb-4" v-model="name" placeholder="Your name">
                       <input type="text" class="search-input rounded-lg mb-4" v-model="number" placeholder="Contact Number">
                       <input type="text" class="search-input rounded-lg mb-4" v-model="company" placeholder="Company Name (if any)">
                       <v-btn block large depressed class="rounded-lg bg-gradient grey darken-3" @click="SendFeedback" dark>Submit</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import Navbar from '../../components/Dashboard/Navbar.vue'
import Pages from '../../Apis/Pages';

export default {
    components:{Navbar},
    data(){
        return{
            name: '',
            number: '',
            company: '',
            snackbar: false,
            toastMessage: 'Sent Successfully!'
        }
    },
    methods:{
        SendFeedback(){
            let data = new FormData();
            data.append('name', this.name)
            data.append('contact', this.number)
            data.append('message', this.company)

            Pages.new(data).then((response) => {
                // console.log(response);
                this.name = ""
                this.number = ""
                this.company = ""
                this.snackbar = true
            })
        }
    }
}
</script>

<style scoped>
.search-input{
  background-color: #fefefe;
  border-radius: 6px;
  padding: 0.8em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.4),0 24px 20px -24px rgba(71,82,107,.3);
  margin-top: 5px;
}
.single-box{
    box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
    padding: 10px;
    margin-bottom: 1em;
    border-radius: 12px;
    display: flex;
    flex-direction: column;

}
.single-box .text{
    text-align: center;
    margin-top: 6px;
    color: #666;
    font-size: 13px;
}
.text-span{
    font-size: 10px;
}
</style>