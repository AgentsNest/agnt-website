<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <!-- Desktop Screen -->
        <v-card class="pa-md-5 shadow" height="100%" width="100%" flat tile>
            <!-- <v-toolbar flat>

                <v-card class="my-8 d-none d-md-flex" elevation="0">
                    <div class="shadow rounded-lg">
                    <v-btn small color="#111828" dark><v-icon size="18">mdi-format-list-bulleted-type</v-icon></v-btn>
                    <v-btn class="text-capitalize" text>Clients</v-btn>
                    </div>
                </v-card>

                <v-spacer></v-spacer>

                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small depressed class="text-capitalize rounded" color="#111828" dark v-bind="attrs" v-on="on">
                            <v-icon left>mdi-plus</v-icon>
                            Add Lead
                        </v-btn>
                    </template>
                    <v-list dense>
                        <v-list-item link :to="{name: 'AddLeads'}"><v-list-item-title>Manually add</v-list-item-title></v-list-item>
                        <v-list-item link :to="{name: 'bulkUploadLead'}"><v-list-item-title>Bulk Upload</v-list-item-title></v-list-item>
                    </v-list>
                </v-menu>

            </v-toolbar> -->

            <v-card flat>
                <!-- <v-toolbar flat class="d-none d-md-block">
                    <select class="mr-1" @change="onChangeGroup($event)">
                        <option selected disabled>Group</option>
                        <option v-for="group in groups" :key="group.id" :value="group.id">{{group.title}}</option>
                    </select>
                    
                    <v-btn fab tile small elevation="0" dark class="gradient rounded-lg" @click="addLeadToGroup">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>
                    
                    <select class="mr-1 ml-6" @change="onChangeTeamMember($event)">
                        <option selected disabled>Team</option>
                        <option v-for="team in teams" :key="team.id" :value="team.id">{{team.name}}</option>
                    </select>

                    <v-btn fab tile small elevation="0" dark class="gradient rounded-lg" @click="assignToTeam">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>

                    <select class="mr-1 ml-6" @change="onChangeLeadStatus($event)">
                        <option selected disabled>Lead Status</option>
                        <option value="New">New</option>
                        <option value="Cold">Cold</option>
                        <option value="Hot">Hot</option>
                        <option value="New">Warm</option>
                    </select>
                    <v-btn fab tile small elevation="0" dark class="gradient rounded-lg" @click="changeLeadStatus">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>
                </v-toolbar> -->

                <v-container v-if="selectedLeads.length >= 2">
                    <v-row>
                        <v-col cols="4" class="d-flex">
                            <v-autocomplete
                                v-model="group_id"
                                :items="groups"
                                item-text="title"
                                item-value="id"
                                small-chips
                                outlined
                                dense
                                label="Group"
                            ></v-autocomplete>
                            <v-btn fab tile small elevation="0" color="#111828" dark class="rounded ml-2" @click="addLeadToGroup">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="4" class="d-flex">
                            <v-autocomplete
                                v-model="team_id"
                                :items="teams"
                                item-text="name"
                                item-value="id"
                                small-chips
                                outlined
                                dense
                                label="Team"
                            ></v-autocomplete>
                            <v-btn fab tile small elevation="0" dark color="#111828" class="rounded ml-2" @click="assignToTeam">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="4" class="d-flex">
                            <v-autocomplete
                                v-model="status_name"
                                :items="leadStatus"
                                item-text="title"
                                item-value="title"
                                small-chips
                                outlined
                                dense
                                label="Lead Status"
                            ></v-autocomplete>
                            <v-btn fab tile small elevation="0" dark color="#111828" class="rounded-lg ml-2" @click="changeLeadStatus">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>

                
                <v-card-title>
                    <v-btn fab small class="mr-2 blue lighten-5" elevation="0">
                        <v-icon color="blue darken-4">mdi-account-group</v-icon>
                    </v-btn> Clients 
                    <span v-if="selectedLeads.length >= 2">({{selectedLeads.length}})</span>
                    <v-spacer></v-spacer>
                    <v-btn class="text-capitalize dark" dark small @click="newLeadDialog = !newLeadDialog">Add Client</v-btn>
                </v-card-title>

                <!-- <v-data-table
                    :headers="headers"
                    :items="leads.data"
                    :items-per-page="15"
                    class="elevation-0"
                    :search="search"
                    v-model="selectedLeads"
                >
                    <template v-slot:body="props">
                        <tbody>
                            <tr v-for="lead in props.items" :key="lead.id" class="cursor-pointer">
                                <td>{{ lead.name}}</td>
                                <td>{{ lead.contact }}</td>
                                <td><v-chip class="green lighten-5 green--text text--darken-3"  label>{{ lead.status }}</v-chip></td>
                                <td>{{ lead.team_id }}</td>
                                <td>
                                    <div v-if="lead.activities" class="caption">
                                        <div v-for="task in lead.activities.slice(0, 1)" :key="task.id" class="grey--text text--darken-2">
                                            {{task.action}} {{task.notes}} {{task.message}} {{task.call}} {{task.whatsapp}}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <v-btn icon><v-icon small @click="editedLeadDialogBox(lead.id)">mdi-pencil</v-icon></v-btn>
                                    <v-btn icon><v-icon small @click="deleteLeadDialogBox(lead.id)">mdi-delete</v-icon></v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table> -->
                
                <vue-good-table
                    :columns="headers"
                    :rows="leads"
                    :search-options="{
                        enabled: true,
                        skipDiacritics: true,
                    }"
                    :pagination-options="{
                        enabled: true,
                        position: 'bottom',
                        perPage: 15,
                    }"
                    :sort-options="{
                        enabled: false,
                    }"
                    styleClass="vgt-table condensed"
                    @on-page-change="onPageChange"
                    :totalRows="totalRecords"
                    :isLoading.sync="isLoading"
                >
                    <!-- Activities -->
                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'name'" class="nameFiled">
                            <div class="subtitle-2">
                                {{props.row.name}}
                                <span class="newTag red lighten-2 white--text rounded-xl" v-if="props.row.isNew">new</span>
                            </div>
                        </span>
                        <span v-if="props.column.field == 'contact'">
                            <div style="font-size: 14px">{{props.row.contact}}</div>
                        </span>
                        <span v-if="props.column.field == 'status'">
                            <v-chip outlined label color="indigo darken-3" small>{{props.row.status}}</v-chip>
                        </span>
                        <span v-if="props.column.field == 'activity'">
                            <div v-for="task in props.row.activities.slice(0, 1)" :key="task.id" style="font-size: 14px">
                                {{task.action}} {{task.notes}} {{task.message}} {{task.call}} {{task.whatsapp}}
                            </div>
                        </span>
                        <span v-if="props.column.field == 'view'">
                            <v-btn small depressed dark class="grey darken-3 text-capitalize">view</v-btn>
                        </span>
                        <span v-if="props.column.field == 'actions'">
                            <v-btn icon><v-icon small @click="editedLeadDialogBox(props)">mdi-pencil</v-icon></v-btn>
                            <v-btn icon><v-icon small @click="deleteLeadDialogBox(props)">mdi-delete</v-icon></v-btn>
                        </span>
                    </template>
                </vue-good-table>
                <!-- ===========================
                          Edit Lead Dialog 
                ============================ -->
                <v-dialog v-model="editLead" persistent max-width="400px">
                    <v-card>
                        <v-toolbar dense elevation="1">
                            <div>Lead Details</div>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="editLead = !editLead"><v-icon>mdi-close</v-icon></v-btn>
                        </v-toolbar>
                        <v-card-text class="pt-6">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Name" v-model="editedLead.name" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Contact" v-model="editedLead.contact"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-text-field label="Email" v-model="editedLead.email" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-select
                                            :items="leadStatus"
                                            label="Lead Status"
                                            item-text="title"
                                            item-value="title"
                                            @change="onChangeLeadStatus($event)"
                                            v-model="editedLead.status"
                                        ></v-select>
                                    </v-col>
                                    <!-- <v-col cols="12" md="4">
                                        <v-select
                                            :items="teams"
                                            item-text="name"
                                            item-value="id"
                                            label="Assign Team"
                                            v-model="editedLead.team_id"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-select
                                            :items="groups"
                                            item-text="title"
                                            item-value="id"
                                            label="Group"
                                            v-model="editedLead.group_id"
                                        ></v-select>
                                    </v-col> -->
                                </v-row>
                            </v-container>
                            <!-- <small>*indicates required field</small> -->
                        </v-card-text>
                        <v-btn block dark class="text-capitalize" @click="updateSingleLead(editedLead.id)">Update</v-btn>
                    </v-card>
                </v-dialog>

                <!-- ===========================
                    Add New Lead Dialog 
                ============================ -->
                <v-dialog v-model="newLeadDialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Add Client</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Name" v-model="newLead.name" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Contact" v-model="newLead.contact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="12">
                                    <v-text-field label="Email" v-model="newLead.email" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                        :items="leadStatus"
                                        label="Lead Status"
                                        item-text="title"
                                        item-value="title"
                                        @change="onChangeLeadStatus($event)"
                                        v-model="newLead.status"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                        :items="teams"
                                        item-text="name"
                                        item-value="id"
                                        label="Assign Team"
                                        v-model="editedLead.team_id"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                        :items="groups"
                                        item-text="title"
                                        item-value="id"
                                        label="Group"
                                        v-model="editedLead.group_id"
                                    ></v-select>
                                </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="newLeadDialog = !newLeadDialog">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="saveNewLead">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-card>

        <!--====================================== 
        ======================================
            Single Lead Sidebar
        ======================================
        ====================================== -->
            <v-navigation-drawer v-model="drawer" tile absolute temporary right class="navigation-bar" width="40vw">
                <v-card flat tile class="grey lighten-4">

                    <v-toolbar elevation="2" class="">
                        <v-toolbar-title>
                            <v-avatar :color="lead.color" size="42" class="mr-2" v-if="lead.name">
                                <span class="white--text text-h5">{{lead.name[0]}}</span>
                            </v-avatar>
                            {{lead.name}}
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card class="pa-3 grey lighten-4" flat tile>
                        <v-simple-table>
                            <tbody>
                                <tr><td>Email</td><td>{{lead.email}}</td></tr>
                                <tr><td>Contact</td><td>{{lead.contact}}</td></tr>
                                <tr><td>City</td><td>{{lead.city}}</td></tr>
                                <tr><td>Assign To</td><td>{{lead.team_id}}</td></tr>
                                <tr>
                                    <td>Lead Status</td>
                                    <td>
                                        <v-chip class="ma-2" color="pink" label text-color="white">
                                            {{lead.status}}
                                        </v-chip>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-card>

                    <!-- <v-card-actions class="d-flex align-center justify-center">
                        <v-btn fab tile small class="mx-3 pa-6 white rounded-lg" elevation="1"
                            :href="`tel:${lead.contact}`"
                            @click="callNow"
                        >
                            <v-icon color="light-blue darken-3">mdi-phone</v-icon>
                        </v-btn>
                        <v-btn fab tile small class="mx-3 pa-6 white rounded-lg" elevation="1"
                            :href="`mailto:${lead.mail}`"
                            @click="addActivityMessage"
                        >
                            <v-icon color="red">mdi-email-outline</v-icon>
                        </v-btn>
                        <v-btn fab tile small class="mx-3 pa-6 white rounded-lg" elevation="1"
                            href="whatsapp://send?abid=phonenumber&text=Hello%2C%20World!"
                            @click="addActivityWhatsapp"
                        >
                            <v-icon color="green darken-4">mdi-whatsapp</v-icon>
                        </v-btn>
                    </v-card-actions> -->

                    <v-bottom-navigation color="teal" grow flat class="mb-3">
                        <v-btn @click="callNow" :href="`tel:${lead.contact}`">
                            <span>Call</span>
                            <v-icon>mdi-phone</v-icon>
                        </v-btn>
                        <v-btn :href="`mailto:${lead.email}`" target="_blank" @click="addActivityMessage">
                            <span>Email</span>
                            <v-icon>mdi-email-outline</v-icon>
                        </v-btn>
                        <v-btn @click="whatsappShareDialog">
                            <span>Message</span>
                            <v-icon>mdi-message-reply-text-outline</v-icon>
                        </v-btn>
                        <!-- <v-btn>
                            <span>Group</span>
                            <v-icon>mdi-folder-table-outline</v-icon>
                        </v-btn> -->
                        <v-btn @click="shareWebsiteListDialog">
                            <span>Website</span>
                            <v-icon>mdi-web</v-icon>
                        </v-btn>
                    </v-bottom-navigation>

                    <!-- ******************************** 
                            Share Msg/Whatsapp Dialog 
                    ********************************** -->
                    <v-bottom-sheet v-model="whatsappShare">
                        <v-list two-line height="350" class="overflow-y-auto">
                            <v-list-item v-for="message in messages" :key="message.id">
                                <v-list-item-avatar>
                                    <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <p>{{message.text}}</p>
                                </v-list-item-content>

                                <v-btn class="text-capitalize blue darken-2" dark 
                                    v-if="message"
                                    :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a ${message.text} %0a Regards:${agentName}`"
                                    target="_blank"
                                    @click="addActivityWhatsapp"
                                >
                                    Share
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-bottom-sheet>
                    <!-- ******************************** 
                            End Msg/Whatsapp Dialog 
                    ********************************** -->

                    <!-- ******************************** 
                            Share Website Dialog 
                    ********************************** -->
                    <v-bottom-sheet v-model="sheet">
                        <v-list two-line>
                            <v-list-item v-for="website in websites" :key="website.id">
                                <v-list-item-avatar>
                                    <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>{{website.title}}</v-list-item-title>
                                    <v-list-item-subtitle>Total shared: {{website.trackers.length}}</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-btn class="text-capitalize blue darken-2" dark 
                                    v-if="website"
                                    @click="shareNow(lead, website)"
                                >
                                    Share
                                </v-btn>
                                <!-- :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a Here is the details for ${website.title} %0a http://localhost:3000/wt/${tracker_id}`"
                                    target="_blank" -->
                            </v-list-item>
                        </v-list>
                    </v-bottom-sheet>
                    <!-- ******************************** 
                            End Share Website Dialog 
                    ********************************** -->

                    <v-dialog
                        v-model="websiteShareConfirmation"
                        width="500"
                    >
                        <v-card>
                            <v-card-title class="text-h5 grey lighten-2">
                            Privacy Policy
                            </v-card-title>

                            <v-card-text>
                            {{tracker_id}}
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                text
                                @click="dialog = false"
                            >
                                I accept
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>


                    <!-- <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Followups</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <VueCtkDateTimePicker 
                                    :no-button-now = "true" 
                                    v-model="followup.send_date"  
                                    format='YYYY-MM-DD HH:mm'
                                />
                                <v-text-field class="mt-3" dense label="Remark" v-model="followup.remarks" placeholder="Remark" outlined></v-text-field>
                                <v-btn block class="text-capitalize gradient white--text" large @click="addFollowup">
                                    Add Followup
                                </v-btn>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels> -->

                    <v-card height="300" class="mt-3 overflow-y-auto" flat>
                        <div class="px-6 pt-3">Activities <span v-if="lead.activities" class="ml-2">({{lead.activities.length}})</span></div>
                        <v-card-text>
                            <v-timeline dense clipped>
                                <v-timeline-item fill-dot class="white--text mb-3" color="grey lighten-3" >
                                    <template v-slot:icon><v-icon>mdi-plus</v-icon></template>
                                    <v-text-field
                                        v-model="input"
                                        hide-details
                                        label="Add activity..."
                                        outlined
                                        dense
                                        @keydown.enter="addActivityNotes"
                                    >
                                        <template v-slot:append>
                                            <v-btn small class="text-capitalize grey darken-4 white--text" depressed @click="addActivityNotes">Add activity</v-btn>
                                        </template>
                                    </v-text-field>
                                </v-timeline-item>
                                <v-timeline-item
                                    v-for="activity in lead.activities" :key="activity.id"
                                    class="mb-4" color="pink" small
                                >
                                    <v-row justify="space-between">
                                        <v-col cols="7" v-if="activity.action" v-text="activity.action"></v-col>
                                        <v-col cols="7" v-if="activity.notes" v-text="activity.notes"></v-col>
                                        <v-col cols="7" v-if="activity.call" v-text="activity.call"></v-col>
                                        <v-col cols="7" v-if="activity.message" v-text="activity.message"></v-col>
                                        <v-col cols="7" v-if="activity.whatsapp" v-text="activity.whatsapp"></v-col>
                                        <v-col class="text-right" cols="5">{{activity.created_at | formatDate}}</v-col>
                                    </v-row>
                                </v-timeline-item>
                            </v-timeline>
                        </v-card-text>
                    </v-card>

                </v-card>
            </v-navigation-drawer>
        <!--====================================== 
        ======================================
            Single Lead Sidebar Ends
        ======================================
        ====================================== -->

        </v-card>

    </div>
</template>

<script>
import Lead from '../../Apis/Lead'
import Group from '../../Apis/Other'
import User from '../../Apis/User'
import Website from '../../Apis/Website'
import Tracker from '../../Apis/Tracker'
import Other from '../../Apis/Other'
// import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import _ from 'lodash'


export default {
    components:{ VueGoodTable },
    data () {
      return {
        search: '',
        benched: 0,
        // headers: [
        //   { text: 'Name',align: 'start',sortable: false,value: 'name' },
        //   { text: 'Contact No.', value: 'contact' },
        //   { text: 'Status', value: 'status' },
        //   { text: 'Assign', value: 'team_id' },
        //   { text: 'Last Remark', value: 'activities.notes' },
        //   { text: 'Actions', value: 'actions', sortable: false },
        // ],
        status_name: '',
        lead:{},
        total_leads : 0,
        loading: true,
        options: {},
        page: 1,
        last_page : null,
        agent: null,
        agentName: '',
        drawer: false,
        input: '',
        followup:{
            send_date : "",
            remarks: ""
        },
        snackbar: false,
        snackbarText: '',
        leadStatusCustom: [
            'New',
            'Cold',
            'Hot',
            'Warm'
        ],
        selectedLeads: [],
        groups:[],
        teams: [],
        team_id: null,
        group_id: null,
        status: '',
        editLead: false,
        editedLead: {},
        sheet: false,
        websites: [],
        website: null,
        shareData:{
            website_id: null,
            lead_id: null,
            agent_id: null,
            opened: false,
            total_views: 0
        },
        tracker_id : null,
        clientList: false,
        user_id: null,
        submitted: false,
        opened: [],
        unopened: [],
        websiteShareConfirmation: false,
        messages: [],
        whatsappShare: false,
        websiteName: '',
        leadStatus:[
            {id: 1, title: 'New'},
            {id: 2, title: 'Cold'},
            {id: 3, title: 'Hot'},
            {id: 4, title: 'Warm'},
            {id: 5, title: 'Dead'}
        ],
        whateverActivatesThisLink: true,
        newLeadDialog: false,
        newLead: {},
        serverParams: {
            page: 1, 
            perPage: 10
        },
        totalRecords: 0,
        isLoading: false,
        headers:[
            { label: 'Name', field: 'name' },
            { label: 'Contact No.', field: 'contact' },
            { label: 'Status', field: 'status' },
            { label: 'Activity', field: 'activity' },
            { label: 'View', field: 'view' },
            { label: 'Actions', field: 'actions' },
        ],
        leads: {
            searchTerm: '',
            total: 0,
            per_page: 5,
            from: 1,
            to: 0,
            current_page: 1
        },
        rows:[]
      }
    },
    methods:{
        fetchData(){
            Lead.auth(this.leads.searchTerm)
            .then(response => {
                // this.totalRecords = response.data.meta.total;
                this.leads = response.data.data;
                // this.rows = response.data.leads.data; 
                // console.log(response.data)
            });
        },
        searchLead: _.debounce(function (params) {
            this.updateParams(params);
            this.fetchData();
            return false;
        }, 500),
        onPageChange(params) {
            this.updateParams({page: params.currentPage});
            this.fetchData();
        },
        updateParams(newProps) {
            this.serverParams = Object.assign({}, this.serverParams, newProps);
        },
        onRowClick(params){
            alert(params.row.id)
        },
        async fetchGroups(){
            Group.userGroup().then(response => {
                this.groups = response.data;
            });
        },
        async fetchTeams(){
            User.agentTeam()
            .then(response => {
                this.teams = response.data;
            })
        },
        async fetchAgent(){
            User.auth()
            .then(response => {
                this.agent = response.data.data.id;
                this.agentName = response.data.data.name;
                if (response.data.data.subscribed === 'YES') {
                    this.whateverActivatesThisLink = true
                } else {
                    this.whateverActivatesThisLink = false
                }
            })
        },
        shareWebsiteListDialog(){
            this.sheet = true;
            Website.auth().then(response => {
                this.websites = response.data.websites;
            });
        },
        whatsappShareDialog(){
            this.whatsappShare = true;
            Group.messageSample().then(response => {
                this.messages = response.data.data;
            });
        },
        detailsSidebar(lead){
            this.drawer = true
            Lead.details(lead).then(response => {
                this.lead = response.data.data;
            });
        },
        onChangeTeamMember(event){
            this.team_id = event.target.value
        },
        onChangeGroup(event){
            this.group_id = event.target.value
        },
        onChangeLeadStatus(event){
            this.status = event.target.value
        },
        addActivityNotes(){
            let data = new FormData();
            data.append('notes', this.input)
            data.append('lead_id', this.lead.id)

            Lead.addActivityNotes(data)
            .then(() => {
                this.fetchData();
                this.snackbar = true
                this.snackbarText = 'Activity Note Added'
            })
        },
        callNow(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('call', 'Phone Call')

            Lead.addActivityCall(data)
            .then((res) => {
                // this.fetchData();
                console.log(res)
            })
        },
        addActivityMessage(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('message', 'Send Email')

            Lead.addActivityMessage(data)
            .then(() => {
                // this.fetchData();
            })
        },
        addActivityWhatsapp(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('whatsapp', 'Whatsapp Message')

            Lead.addActivityWhatsapp(data)
            .then(() => {
                // this.fetchData();
            })
        },
        addFollowup(){
            let data = new FormData();
            data.append('lead_id', this.lead.id)
            data.append('agent_id', this.agent)
            data.append('send_date', this.followup.send_date)
            data.append('remarks', this.followup.remarks)

            Lead.addFollowup(data)
            .then(() => {
                this.snackbar = true
                this.snackbarText = 'Followup Added !!'
                this.followup = ''
                this.fetchData();
            })
        },
        assignToTeam(){
            let selected = this.selectedLeads;

            for (var key in selected) {
                // console.log(selected[key]);
                User.asignLeadToTeam(selected[key].id, {
                    team_id: this.team_id
                })
                .then(response => {
                    this.fetchData();
                    this.snackbarText = 'Lead successufully assigned to team member!'
                    this.snackbar = true;
                    this.selectedLeads = []
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        addLeadToGroup(){
            let selected = this.selectedLeads;

            for (var key in selected) {
                console.log(selected[key]);
                User.asignLeadToTeam(selected[key].id, {
                    group_id: this.group_id
                })
                .then(response => {
                    this.fetchData();
                    this.snackbarText = 'Lead successufully added to group'
                    this.snackbar = true;
                    this.selectedLeads = []
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        changeLeadStatus(){
            let selected = this.selectedLeads;

            for (var key in selected) {
                // console.log(selected[key]);
                User.asignLeadToTeam(selected[key].id, {
                    status: this.status_name
                })
                .then(response => {
                    this.fetchData();
                    this.snackbarText = 'Lead Staus changed'
                    this.snackbar = true;
                    this.selectedLeads = []
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        updateSingleLead(lead){
            User.asignLeadToTeam(lead, {
                // group_id: this.editedLead.group_id,
                // team_id: this.editedLead.team_id,
                contact: this.editedLead.contact,
                email: this.editedLead.email,
                status: this.editedLead.status,
                name: this.editedLead.name
            })
            .then(response => {
                // this.fetchData();
                this.snackbarText = 'Lead Updated'
                this.snackbar = true;
                this.editLead = false
                this.fetchData();
            })
            .catch((error) => {
                console.log(error)
            })
        },
        deleteLeadDialogBox(props){
            // console.log(lead)
            Lead.delete(props.row.id)
        },
        editedLeadDialogBox(props){
            Lead.details(props.row.id)
            .then(response => {
                this.editLead = true
                this.editedLead = response.data.data;
            });
        },
        infiniteHandler($state){
            if (this.page === this.last_page) {
                $state.complete();
            } else {
                this.page = this.page + 1;
                Lead.auth(this.page).then(response => {
                    // console.log(response.data.data)
                    response.data.data.forEach(data => {
                        this.leads.push(data);
                    });
                    $state.loaded();
                });
            }
        },
        loadMoreDesktop($state){
            if (this.page == this.last_page) {
                $state.complete();
            } else {
                this.page = this.page + 1;
                Lead.auth(this.page).then(response => {
                    response.data.data.forEach(data => {
                        this.leads.push(data);
                    });
                    $state.loaded();
                });
            }
        },
        shareNow(lead, website){
            this.websiteName = website;

            let form = new FormData();
            form.append('website_id', website.id)
            form.append('lead_id', lead.id)
            form.append('agent_id', this.shareData.agent_id)
            form.append('opened', false)
            form.append('total_views', 0)

            // for (var pair of form.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Tracker.new(form)
            .then(response => {
                this.tracker_id = response.data.url
                // console.log(response.data)
                if (response.data == 'Already Sent') {
                    this.snackbarText = 'Already Sent!'
                    this.snackbar = true
                } else {
                    this.sendWhatsapp();
                }
                // this.websiteShareConfirmation = true
            })
            // .then(() => {
            //     this.sendWhatsapp();
            // })
            .catch(error => {
                console.log(error);
            })
        },
        sendWhatsapp(){
            // let num=document.getElementById("number").value;
            // let leadname= document.getElementById("leadname").value;
            // let website= document.getElementById("website").value;
            // let websiteslug= document.getElementById("websiteslug").value;

            // console.log(this.lead.contact, this.lead.name, this.tracker_id, this.websiteName.title);

            window.open(`https://wa.me/${this.lead.contact}?text=Hi ${this.lead.name} %0a Here is the details for ${this.websiteName.title} %0a https://agentsnest.com/wt/${this.tracker_id}`, '_blank');


        },
        saveNewLead(){
            Lead.new(this.newLead)
            .then(() => {
                this.snackbar = true
            })
        }
    },
    computed:{
        filterLead: function(){
            return this.leads.filter((lead) => {
                return lead.name.toLowerCase().match(this.search.toLowerCase());
            })
        },
        // leads(){  return this.$store.state.leads; },
        selectAll:{
            get : function (){
                return this.leads ? this.selectedLeads.length == this.leads.length : false;
            },
            set: function(value) {
                var selectedLeads = [];

                if(value) {
                    this.leads.forEach(function (lead) {
                        selectedLeads.push(lead.id);
                    });
                }

                this.selectedLeads = selectedLeads;
            }
        },
    },
    mounted(){
      this.fetchData();
      this.fetchGroups();
      this.fetchTeams();
      this.fetchAgent();
        User.auth().then(response => {
            this.shareData.agent_id = response.data.data.id;
        });
        // this.$store.dispatch('getLeads');
    }
}
</script>

<style scoped>
.navigation-bar{display: none;}
.content-card{
  overflow-y: scroll;
}
.nameFiled{
    position: relative;
}
.newTag{
    font-size: 9px;
    padding: 2px 5px;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 1em;
  margin-bottom: 2em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.cursor-pointer{cursor: pointer;}
select{
    background-color: #fff;
    border-radius: 6px;
    width: 10vw;
    padding: 0.5em;
    outline: none;
    -webkit-appearance: listbox !important;
    box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>