<template>
    <div class="">
      <button @click="goBack" class="back mt-4"><v-icon>mdi-arrow-left-bold</v-icon></button>
      <v-container >
        <v-title style="font-size: 1.5rem"> Assigned leads</v-title>
        <v-data-table class="table" :items-per-page="10">
          <thead style="background-color: #def1fe">
            <tr>
              <th class="text-left">Lead iD</th>
              <!-- <th class="text-left">Lead</th> -->
              <th class="text-left">Language</th>
              <th class="text-left">Action</th>
             
            </tr>
          </thead>
          <tbody >
            <tr v-for="(item, index) in lead" :key="index">
              <td>{{ item[0] }}</td>
              <!-- <td>{{ item[1]}}</td> -->
              <td>{{ item[2]}}</td>
              <td> <v-btn @click="handleActionClick(item)">action</v-btn></td>
             
            </tr>
            
          </tbody>
         
        </v-data-table> 
      
      </v-container>
      <v-dialog v-model="dialogVisible" style="width:60rem">
        <v-card>
          <v-card-title>
            Edit Lead {{ selectedLead.name }}
          </v-card-title>
          <v-card-text>
            <v-form ref="form" class="form-container">
              
             <div class="items"><div class="row">
              <v-text-field v-model="date" label="Day" type="date" required></v-text-field>
              <v-text-field v-model="name" label="Client name" required></v-text-field>
             

              </div>
              <div class="row"> <v-text-field v-model="leadselected" :label="selectedLead[1]" readonly></v-text-field>
                <v-text-field v-model="alternatenumber" label="Alternate mobile number" required></v-text-field>
                
                </div>
              <div class="row">
                <v-text-field v-model="langselected" :label="selectedLead[2]" readonly></v-text-field>
                <v-select
              v-model="selectedstatus"
              :items="statusOptions"
              label="Select Status"
              required
            ></v-select>
               
              </div>
               
            <div class="row" v-if="selectedstatus === 'Interested'">
              <v-text-field  v-model="amount" label="Amount"></v-text-field>
    
            <!-- <v-select
              v-model="select1"
              :items="payopt"
              label="Select Payment Options"
              required
            ></v-select> -->
              </div> </div>
            </v-form>
            
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!allFieldsFilled" @click="saveChanges(selectedLead)">Complete</v-btn>

            <v-btn @click="dialogVisible = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog></div>
      
  </template>
  <script>
  import axios from 'axios';

  export default {
    name: "SplClients",
    components: {
     
    },
    data() {
      return {
        employeeName:'',
        
        dialogVisible: false,
      selectedLead: null,
      selectedstatus:null,
      intcount:'',
      lead:[],
      date:'',
      name:'',
      alternatenumber:'',
      amount:'',
      
        
        statusOptions: ["Interested","Not interested","Busy/Not Answered", "Dnd", "Follow Up"],
      
      };
    },
    computed: {
  allFieldsFilled() {
    return this.date && this.name  && this.selectedstatus ;
  }
},
    created()
    {
      this.employeeName = this.$route.params.employeeName;
    console.log(this.employeeName);
      this.fetchleads();
   
    },
    methods: {
      
    
      fetchleads() {
        
  const name = this.employeeName;
  axios.get(`https://api.tkrgroups.co.in//getleads/emp?name=${name}`)
    .then(response => {
      this.lead=response.data.leads;
     
    });
},

      goBack() {
      this.$router.go(-1)
    },
    handleActionClick(item) {
      this.selectedLead = item;
      console.log(this.selectedLead)
      this.dialogVisible = true;
      

    },
    saveChanges(item) {
  console.log('saveChanges called with item:', item[1]);
  console.log('this.selectedLead:', this.selectedLead);
  console.log('item === this.selectedLead:', item === this.selectedLead);

  this.dialogVisible = false;
  const index = this.lead.indexOf(item);

  if (index > -1) {
    this.lead.splice(index, 1);
    console.log('Item removed from lead array:', item);
  } else {
    console.log('Item not found in lead array:', item);
  }
  // axios.post('http://127.0.0.1:5000/updatelead/status', {
  //       status: this.selectedstatus,
  //       number:item[1]
        
  //     })
  //       .then(response => {
  //        console.log(response.data)});
  axios.post('https://api.tkrgroups.co.in//updatelead/status', {
        status: this.selectedstatus,
        lead_id:item[0],
        number:item[1],
        language:item[2],
        date:this.date,
        name:this.name,
        amount:this.amount,
        alternatenumber:this.alternatenumber,
        empname:this.employeeName,
        branch:item[3]

        
      })
        .then(response => {
         console.log(response.data)});
        //  this.selectedstatus=null
       
},
  
  },
  };



  </script>
  <style>
  .form-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .row {
    display: flex;
    flex: 1 1 50%;
    margin-bottom: 20px;
  }
  .items
  {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .v-text-field {
    flex: 1 1 auto;
    margin-right: 10px;
  }
  
  .table {
    margin-top:3%;
    width: 50rem;
  }
  .back
{
  background:white;
      color:black;
      font-size: 1rem;
      border-radius: 30px;
      margin-left: 1.5rem;
      height: 3rem;
      width: 3rem;
      box-shadow: 3px 3px 3px 3px #9999 ;
}
  </style>
  