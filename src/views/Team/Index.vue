<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000"
        >
            Team Member Added Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <Navbar/>

        <v-card class="bg-gradient px-4 pt-2 pb-8 mt-n6 rounded-t-xl d-md-none d-flex" flat>
            <v-btn class="text-capitalize dark" text dark>
              <v-icon class="mr-2">mdi-account-group</v-icon>
              My Team ({{teams.length}})
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn small outlined text class="text-capitalize" dark @click="dialog = !dialog">
              <v-icon left>mdi-plus</v-icon>
              Add New
            </v-btn>
        </v-card>

         <v-card flat width="100%" class="white rounded-t-xl pb-16 pt-2 overflow-y-auto mt-n7 mt-md-0 fill-height">

            <v-card-text>
              <v-row>
                <v-col md="8" cols="12">
                  <div class="d-none d-md-flex shadow pa-2 rounded-lg mb-5">
                    <v-btn class="text-capitalize" text>
                      <v-icon class="mr-2">mdi-account-group</v-icon>
                      My Team ({{teams.length}})
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small outlined text class="text-capitalize" @click="dialog = !dialog">
                      <v-icon left>mdi-plus</v-icon>
                      Add New
                    </v-btn>
                  </div>
                  <v-row>
                      <v-col md="6" v-for="(team, index) in teams" :key="index">
                          <v-list-item class="shadow rounded-lg" height="100%"
                            :to="{name: 'teamLeads', params:{id: team.id}}"
                          >
                              <v-list-item-avatar tile :color="randomColor(team.id)" 
                                class="white--text rounded-lg title" size="48"
                              >
                                {{team.name[0]}}
                              </v-list-item-avatar>

                              <v-list-item-content>
                                  <v-list-item-title v-html="team.name" class="font-weight-bold"></v-list-item-title>
                                  <v-list-item-subtitle>{{team.email}}</v-list-item-subtitle>
                                  <v-list-item-subtitle>
                                      <span class="text--primary mr-2">Property:</span> 
                                      <span v-if="team.leads">{{team.leads.length}}</span>
                                  </v-list-item-subtitle>
                                  <v-list-item-subtitle><span class="text--primary">Added:</span> {{team.created_at | formatDate}}</v-list-item-subtitle>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-btn icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                              </v-list-item-action>

                            
                          </v-list-item>
                      </v-col>
                  </v-row>
                </v-col>

                <v-col md="4" class="d-none d-md-block">
                  <v-card class="pa-5 rounded-lg">
                    <div class="text-h6 mb-4">Add New Team</div>
                    <v-img
                        max-width="300"
                        class="mx-auto"
                        src="../../assets/img/client.svg"
                        lazy-src="../../assets/img/client.svg"
                    >
                        <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                        </template>
                    </v-img>

                    <v-card class="pa-4" flat>
                        <input type="text" class="input-field" placeholder="Name" v-model="team.name">
                        <input type="text" class="input-field" placeholder="Email" v-model="team.email">
                        <input type="text" class="input-field" placeholder="Password" v-model="team.password">
                        <v-btn rounded-md large block dark class="grey darken-4" @click="SaveTeam">Create account</v-btn>
                    </v-card>
                  </v-card>
                </v-col>
            </v-row>
          </v-card-text>

          <!-- new team dialog -->
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <div class="pa-3 grey text-center lighten-2">Add New </div>

              <v-card-text class="py-4">
                <input type="text" class="input-field" placeholder="Name" v-model="team.name">
                <input type="text" class="input-field" placeholder="Email" v-model="team.email">
                <input type="text" class="input-field" placeholder="Password" v-model="team.password">
                <v-btn 
                  rounded-md large block dark 
                  class="text-capitalize grey darken-4" 
                  @click="SaveTeam"
                  :loading="loading"
                >Create account</v-btn>
              </v-card-text>

            </v-card>
          </v-dialog>

        </v-card>
    </div>
</template>

<script>
import User from '../../Apis/User';
import Navbar from "../../components/Dashboard/Navbar";

export default {
  components:{Navbar},
    data: () => ({
        team:{
          name: '',
          email: '',
          password: '',
          agent_id: null,
        },
        snackbar : false,
        teams: [],
        colorCache: {},
        dialog: false,
        loader: null,
        loading: false,
    }),
    methods:{
      async fetchTeam(){
        User.agentTeam()
        .then(response => {
          this.teams = response.data;
          // console.log(response)
        })
      },
      SaveTeam(){
        let data = new FormData();

        data.append('name', this.team.name)
        data.append('email', this.team.email)
        data.append('contact', this.team.contact)
        data.append('agent_id', this.team.agent_id)

        this.loading = true

        User.newTeamAdd(data)
        .then(() => {
          this.fetchTeam();
          this.loading = false
          this.snackbar = true;
          this.team = ''
          this.dialog = false;
        })
      },
      randomColor(id) {
        const r = () => Math.floor(256 * Math.random());
        return this.colorCache[id] || (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`);
      }
    },
    mounted(){
      this.fetchTeam();
    }
}
</script>

<style scoped>
.content-card{
    overflow-y: scroll;
}
.input-field{
  border-radius: 6px;
  padding: 0.7em 1em;
  font-size: 15px;
  width: 100%;
  /* box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1); */
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  background: #f5f5f5;
  outline: none;
  margin-bottom: 1.5em;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8em;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}

</style>