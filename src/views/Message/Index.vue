<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Message Added Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <Navbar/>

        <v-card class="bg-gradient px-4 pt-2 pb-8 mt-n6 rounded-t-xl d-md-none d-flex" flat>
            <v-btn class="text-capitalize dark" text dark>
              <v-icon class="mr-3" size="20">mdi-message-text-outline</v-icon>
              Messages
            </v-btn>
            <v-spacer></v-spacer>
        </v-card>

        <v-card class="my-8 d-none d-md-flex" elevation="0">
            <div class="shadow rounded-lg">
              <v-btn large color="#111828" dark><v-icon>mdi-message-text-outline</v-icon></v-btn>
              <v-btn class="text-capitalize" text>Messages</v-btn>
            </div>
        </v-card>

        <v-card flat width="100%" class="white rounded-t-xl pb-16 pt-2 overflow-y-auto mt-n7 mt-md-0 fill-height">

            <v-tabs color="basil" grow>
                <v-tab class="text-capitalize">My Msg</v-tab>
                <v-tab class="text-capitalize">Sample Msg</v-tab>

                <!-- Content -->
                <v-tab-item>
                    <v-card height="80vh" class="overflow-y-auto">
                        <v-toolbar flat class="mb-1">
                            <v-spacer></v-spacer>
                            <v-btn class="white" small elevation="1" fab @click="addMsgBox = !addMsgBox"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-toolbar>
                        <div v-if="addMsgBox" class="px-4">
                            <textarea rows="3" placeholder="Add message..." class="search-textarea" v-model="form.text"></textarea>
                            <v-btn block class="mt-2" color="#111828" large dark @click="newMessage">Create Message</v-btn>
                        </div>
                        <v-card v-for="text in myMsg" :key="text.id" class="rounded-lg mb-3" elevation="1">
                            <v-card-text><strong>Hi, @clientName -</strong> <br> {{text.text}} <strong><br> Regards: <br> @yourName</strong></v-card-text>
                        </v-card>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card class="rounded-lg mb-3" elevation="1" v-for="message in messages" :key="message.id">
                        <v-card-text><strong>Hi, @clientName -</strong> <br> {{message.text}} <strong><br> Regards: <br> @yourName</strong></v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
            
        </v-card>

    </div>
</template>

<script>
import Other from '../../Apis/Other'
import User from '../../Apis/User'
import Navbar from "../../components/Dashboard/Navbar";

export default {
  components:{Navbar},
    data () {
      return {
        loading: false,
        snackbar: false,
        messages:[],
        myMsg:[],
        form:{
            text: '',
            type: 'agent',
            agent_id: null,
        },
        addMsgBox: false
      }
    },
    methods: {
        authUser(){
            User.auth().then(response => {
                this.form.agent_id = response.data.id;
            });
        },
        fetchData(){
            Other.allMessage().then(response => {
                this.messages = response.data;
            });
            Other.myMessage().then(response => {
                this.myMsg = response.data;
            });
        },
        newMessage(){
            let data = new FormData();

            data.append('text', this.form.text)
            data.append('agent_id', this.form.agent_id)
            data.append('type', this.form.type)

            Other.new(data)
            .then((response) => {
                this.fetchData();
                this.snackbar = true
                this.addMsgBox = false
            })
            .catch(error => {
                console.log(error);
            });  
        }
    },
    mounted(){
      this.fetchData();
      this.authUser();
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.search-textarea{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8em;
  width: 100%;
  /* max-width: 400px; */
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.addNewMsg{
    position: absolute;
    bottom: 5vh;
    right: 15px;
}
</style>