<template>
  <div>
      <v-row>
          <v-col md="4">
              <Sidebar />
          </v-col>
          <v-col md="8">
              <!-- <v-card height="88vh" class="rounded-xl pa-5 content-card" flat>
                    <v-card-title>You Membership Plan</v-card-title>
                    <v-card-subtitle>You may cancel your subscription (including free trials) at any time. Subscriptions are automatically billed according to the period stated upon purchase (weekly/monthly/annually). The cancellation steps vary depending on who your subscription is billed through.</v-card-subtitle>

                    <v-row class="mt-4">
                        <v-col md="4">
                            <v-card class="pa-2 d-flex flex-column align-center rounded-xl" tile>
                                <v-btn outlined class="mb-8 mt-6 px-6 py-5">3 Months</v-btn>
                                <div class="d-flex mb-6">
                                    <div class="text-h5">₹</div>
                                    <div class="d-flex flex-column align-left">
                                    <div class="text-h3 font-weight-bold">4500</div> 
                                    <div class="caption pl-3">1100/Month</div>
                                    </div>
                                </div>
                                <v-btn block class="rounded-xl" disabled>Choose</v-btn>
                            </v-card>
                        </v-col>
                        <v-col md="4">
                            <v-card class="pa-2 d-flex flex-column align-center rounded-xl" tile>
                                <v-btn outlined class="mb-8 mt-6 px-6 py-5">6 Months</v-btn>
                                <div class="d-flex mb-6">
                                    <div class="text-h5">₹</div>
                                    <div class="d-flex flex-column align-left">
                                    <div class="text-h3 font-weight-bold">9000</div> 
                                    <div class="caption pl-3">1300/Month</div>
                                    </div>
                                </div>
                                <v-btn block class="rounded-xl blue darken-3" dark>Selected Plan</v-btn>
                            </v-card>
                        </v-col>
                        <v-col md="4">
                            <v-card class="pa-2 d-flex flex-column align-center rounded-xl" tile>
                                <v-btn outlined class="mb-8 mt-6 px-6 py-5">12 Months</v-btn>
                                <div class="d-flex mb-6">
                                    <div class="text-h5">₹</div>
                                    <div class="d-flex flex-column align-left">
                                    <div class="text-h3 font-weight-bold">15000</div> 
                                    <div class="caption pl-3">1500/Month</div>
                                    </div>
                                </div>
                                <v-btn block class="rounded-xl" disabled>Choose</v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
              </v-card> -->
            <v-card height="88vh" class="px-md-8 content-card">
                <div class="d-flex align-center pa-md-4">
                    <div>
                        <h3>Pro</h3>
                        <div>Everything you need to grow your business</div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-img src="../../assets/img/membership.svg" max-width="250"></v-img>
                </div>

                <v-card-text>
                    <v-row>
                        <v-col cols="4">
                            <v-btn small depressed fab class="teal lighten-5 mr-2"><v-icon color="teal">mdi-check</v-icon></v-btn>
                            new Companies
                        </v-col>
                        <v-col cols="4">
                            <v-btn small depressed fab class="teal lighten-5 mr-2"><v-icon color="teal">mdi-check</v-icon></v-btn>
                            new Companies
                        </v-col>
                        <v-col cols="4">
                            <v-btn small depressed fab class="teal lighten-5 mr-2"><v-icon color="teal">mdi-check</v-icon></v-btn>
                            new Companies
                        </v-col>
                        <v-col cols="4">
                            <v-btn small depressed fab class="teal lighten-5 mr-2"><v-icon color="teal">mdi-check</v-icon></v-btn>
                            new Companies
                        </v-col>
                        <v-col cols="4">
                            <v-btn small depressed fab class="teal lighten-5 mr-2"><v-icon color="teal">mdi-check</v-icon></v-btn>
                            new Companies
                        </v-col>
                        <v-col cols="4">
                            <v-btn small depressed fab class="teal lighten-5 mr-2"><v-icon color="teal">mdi-check</v-icon></v-btn>
                            new Companies
                        </v-col>
                    </v-row>
                </v-card-text>

                <div class="mt-8 px-2">
                    <v-toolbar class="rounded-lg" elevation="1">
                        <v-btn icon><v-icon color="teal">mdi-record-circle</v-icon></v-btn>    
                        <div>3 Months</div>
                        <v-spacer></v-spacer>
                        <div>₹ 5900</div>
                    </v-toolbar>
                </div>

                <div class="text-center grey--text caption mt-12">By clicking on subscribe now, you agree to our <router-link :to="{name: 'Policy'}">terms and condition.</router-link> Cancel anytime </div>
                <v-card-actions>
                    <v-btn block color="teal" dark class="text-capitalize" large @click="submitPaymentMethod()"> Subscribe Now</v-btn>
                </v-card-actions>


            </v-card>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import Sidebar from '../../components/Account/Sidebar.vue'
import User from '../../Apis/User.js'

export default {
    components:{ Sidebar },
    data(){
        return {
            stripeAPIToken:'pk_test_51JliZ4SHLn14bCLXnQ9gAKtthnEgaPdgJc1fjnRhG3Nih5h0rzGkNlzmLZFy2W9DsLMwMMDn06PaK0mDrWmoOOTj008QCo6LFa',
            stripe: '',
            elements: '',
            card: '',
            intentToken: '',
            cardname: '',
            addPaymentStatus: 0,
            addPaymentStatusError: '',
            paymentMethods: [],
            paymentMethodsLoadStatus: 0,
            paymentMethodSelected: {},
            selectedPlan: '',
        }
    },
    mounted(){
        this.includeStripe('js.stripe.com/v3/', function(){
            this.configureStripe();
        }.bind(this) );

        this.loadIntent();
        this.loadPaymentMethods();
    },
    methods: {
        /*
            Includes Stripe.js dynamically
        */
        includeStripe( URL, callback ){
            let documentTag = document, tag = 'script',
                object = documentTag.createElement(tag),
                scriptTag = documentTag.getElementsByTagName(tag)[0];
            object.src = '//' + URL;
            if (callback) { object.addEventListener('load', function (e) { callback(null, e); }, false); }
            scriptTag.parentNode.insertBefore(object, scriptTag);
        },
        /*
            Configures Stripe by setting up the elements and 
            creating the card element.
        */
        configureStripe(){
            this.stripe = Stripe( this.stripeAPIToken ); // eslint-disable-line
            this.elements = this.stripe.elements();
            this.card = this.elements.create('card');

            this.card.mount('#card-element');
        },
        /*
            Loads the payment intent key for the user to pay.
        */
        loadIntent(){
            User.setupIntent()
            .then( function( response ){
                this.intentToken = response.data;
                // console.log(response.data);
            }.bind(this));
        },
        submitPaymentMethod(){
            this.addPaymentStatus = 1;

            this.stripe.confirmCardSetup(
                this.intentToken.client_secret, {
                    payment_method: {
                        card: this.card,
                        billing_details: {
                            name: this.cardname
                        }
                    }
                }
            ).then(function(result) {
                if (result.error) {
                    this.addPaymentStatus = 3;
                    this.addPaymentStatusError = result.error.message;
                } else {
                    this.savePaymentMethod( result.setupIntent.payment_method );
                    this.addPaymentStatus = 2;
                    this.card.clear();
                    this.cardname = '';
                }
            }.bind(this));
        },
        savePaymentMethod(method){
            let data = new FormData();
            data.append('payment_method', method)

            User.savePaymentMethod(data)
            .then(function(){
                this.loadPaymentMethods();
            }.bind(this));
        },
        /*
            Loads all of the payment methods for the
            user.
        */
        loadPaymentMethods(){
            this.paymentMethodsLoadStatus = 1;

            User.loadPaymentMethodsApi()
            .then(function(response){
                this.paymentMethods = response.data;

                this.paymentMethodsLoadStatus = 2;
            }.bind(this));
        },

        removePaymentMethod(paymentID){
            let data = new FormData();
            data.append('id', paymentID)

            User.removePaymentMethodApi()
            .then(function(response){
                console.log(response)
                this.loadPaymentMethods();
            }.bind(this));
        },

        updateSubscription(){
            let data = new FormData();
            data.append('plan', this.selectedPlan)
            data.append('payment', this.paymentMethodSelected)

            User.updateSubscription(data)
            .then(function(response) {
                alert('You Are Subscribed!');
            }.bind(this));
        }

    },
    
}
</script>

<style scoped>
.content-card{
    overflow-y: scroll;
}

.shadow{
    background-color: #fefefe;
    border-radius: 6px;
    padding: 1em;
    width: 33.3%;
    box-shadow: 0 2px 6px 0 rgba(136,148,171,.4),0 24px 20px -24px rgba(71,82,107,.3);
}
</style>