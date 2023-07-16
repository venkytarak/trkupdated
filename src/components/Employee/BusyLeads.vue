<template>
    <div class=""><EmpSidebarVue/>
    <div class="intl">
    
    
        <button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button>
        <v-data-table
          :headers="headers"
          :items="leads"
          :sort-by="[{ key: 'client', order: 'asc' }]"
          class="elevation-1 mt-5 table"
          
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Busy clients</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
      
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.leadid"
                            label="lead id"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.client"
                            label="Clientname"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.date"
                            label="Date"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.amount"
                            label="amount"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                        <v-select
                        v-model="editedItem.status"
                        :items="items"
                        label="Select Status"
                        required
                      ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
      
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
             
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              size="small"
              class="me-2"
              @click="editItem(item.raw)"
            >
              mdi-pencil
            </v-icon>
          
          </template>
        
        </v-data-table></div>
        </div>
  </template>
  <script>
  import axios from 'axios'
import EmpSidebarVue from './EmpSidebar.vue'

    export default {
      name:'NotInterestedLeads',
      employeeName:'',
      components:
      {
EmpSidebarVue
      },
      data: () => ({
        dialog: false,
        dialogDelete: false,
        employeeName:'',
        leads:[]
,        headers: [
          {
            title: 'lead id',
            align: 'start',
            sortable: false,
            key: '0',
          },
          { title: 'clientname', key: '5' },
          { title: 'date', key: '8' },
         
          { title: 'status', key: '1' },
         
        ],
       
     
        items: [
      "Intrested",
      "NOt Intrested",
      "Free Trail",
      "Follow us",
      "Busy/Not pick",
      "Switch off",
      "Wrong number",
      "Special clients",
    ],
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
       
      },
  
      created () {
        this.employeeName = this.$route.params.employeeName;
   
        this.notinterestedlead()
      },
  
      methods: {
        notinterestedlead()
      {
        var empname = this.employeeName
        const status='Busy/Not Answered';
  axios.post('https://api.tkrgroups.co.in//leads/status',
  {name:empname,
  status:status})
    .then(response => {
      this.leads=response.data.leads;
      console.log(this.leads)
     
    });
      },
        goBack() {
      this.$router.go(-1)
    },
      },
    }
  </script> 
  <style scoped>
  .table
  {
    width: 70rem;
  }
  .intl
  {

    margin-left: 3rem;
    width: 80rem;
  }
  .back
{
  background:white;
      color:black;
      font-size: 1rem;
      border-radius: 30px;
      height: 3rem;
      width: 3rem;
      box-shadow: 3px 3px 3px 3px #9999 ;
}
  </style>
  