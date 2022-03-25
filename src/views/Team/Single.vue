<template>
    <v-card flat height="100vh">

        <Navbar/>

        <v-card class="bg-gradient px-4 pt-2 pb-8 mt-n6 rounded-t-xl d-md-none d-flex" flat>
            <v-btn dark icon @click="$router.go(-1)"><v-icon>mdi-keyboard-backspace</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize dark" text dark>
              <v-icon class="mr-2" size="20">mdi-account-group</v-icon>
              Leads ({{total_leads}})
            </v-btn>
        </v-card>

         <v-card class="my-8 px-8 d-none d-md-flex align-center" elevation="0">
            <v-btn text @click="$router.go(-1)" class="text-capitalize">
                <v-icon left>mdi-keyboard-backspace</v-icon><span>Back</span>
            </v-btn>
            <v-spacer></v-spacer>
            <div class="shadow rounded-lg">
              <v-btn dark large><v-icon>mdi-account-group</v-icon></v-btn>
              <v-btn class="text-capitalize" text>Leads ({{total_leads}})</v-btn>
            </div>
        </v-card>

        <v-card flat width="100%" class="white rounded-t-xl pb-16 pt-2 overflow-y-auto mt-n7 mt-md-0 fill-height">

            <v-card-text>
                <v-text-field
                    v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details outlined dense
                ></v-text-field>
            </v-card-text>

            <v-card class="overflow-y-auto pb-8" flat>
                <v-list three-line>
                    <v-list-item v-for="lead in filterLead" :key="lead.id">
                        <v-list-item-content>
                            <v-list-item-title>{{ lead.name }}</v-list-item-title>
                            <v-list-item-subtitle>
                                {{ lead.contact }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle v-if="lead.activities">
                                <div v-for="task in lead.activities.slice(0, 1)" :key="task.id">
                                    {{task.action}}
                                    {{task.notes}}
                                    {{task.message}}
                                    {{task.call}}
                                    {{task.whatsapp}}
                                </div>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

        </v-card>
    </v-card>
</template>

<script>
import Lead from '../../Apis/Lead'
import Navbar from "../../components/Dashboard/Navbar";

export default {
  components:{Navbar},
    data () {
        return {
            search: '',
            leads:[],
            lead:{},
            total_leads: '',
        }
    },
    methods:{
        async fetchData(){
            let id = this.$route.params.id
            Lead.getTeamMemberLead(id).then(response => {
                this.leads = response.data.data;
                this.total_leads = response.data.total;
            });
        }
    },
    computed:{
        filterLead: function(){
            return this.leads.filter((lead) => {
                return lead.name.toLowerCase().match(this.search.toLowerCase());
            })
        },
    },
    mounted(){
        this.fetchData();
    }
}
</script>

<style>

</style>