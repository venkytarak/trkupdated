
<template>
  <div class="top">
   
    <div class="buttons mt-5">
      <VBtn
        :class="{ 'active': showRequested }"
        @click="showRequested = true; showApproved = false;"
      >
        Requested Leads
      </VBtn>
      <VBtn
        :class="{ 'active': showApproved }"
        @click="showRequested = false; showApproved = true;"
      >
        Approved Leads
      </VBtn>
    </div>
    <div v-if="showRequested">
      <v-container>
        <v-title style="font-size: 1.5rem">Requested Leads</v-title>
      <v-data-table class="table">
          <thead style="background-color: #def1fe">
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">emp Name</th>
              <th class="text-left">Branch name</th>
              <th class="text-left">Language</th>
              <th class="text-left">Date of Requested</th>
              <th class="text-left">Leads Requested</th>
             
              <th class="text-left">action</th>
              <th class="text-left">status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in leadrequests" :key="item.name">
              <td>{{ item[0] }}</td>
              <td>{{ item[4] }}</td>
              <td>{{ item[6] }}</td>
           
              <td>{{ item[2] }}</td>
              <td>{{ item[3] }}</td>
              <td>{{ item[1] }}</td>
              
              
             
  
              <td style="color:red; display:flex;">
                <v-btn @click="approveLead(index)">Approve</v-btn>
                <v-btn @click="cancelLead(index)">Cancel</v-btn>
              </td>
             
              <td :style="{color: item[5] === 'completed' ? 'green' : 'red'}">{{ item[5] }}</td>
            </tr>
          </tbody>
        </v-data-table> 
       
        
  
      </v-container>
    </div>

 <div >
  <v-container v-if="showApproved ">
    <v-title style="font-size: 1.5rem">Approved Leads</v-title>
    <v-data-table class="table"  >
      <thead style="background-color: #def1fe;width:10rem">
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">emp Name</th>
          <th class="text-left">Branch name</th>
          <th class="text-left">Language</th>
          <th class="text-left">Date of Requested</th>
          <th class="text-left">Leads Requested</th>
         
          
          <th class="text-left">status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in updatedleads" :key="item.name">
          <td>{{ item[0] }}</td>
          <td>{{ item[4] }}</td>
          <td>{{ item[6] }}</td>
       
          <td>{{ item[2] }}</td>
          <td>{{ item[3] }}</td>
          <td>{{ item[1] }}</td>
          
          
         

        
          <td :style="{color: item[5] === 'completed' ? 'green' : 'red'}">{{ item[5] }}</td>
        </tr>
      </tbody>
    </v-data-table>
  </v-container>
 </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios';
export default {
  name: "SplClients",
  data() {
    return {
      leadrequests:[],
      showRequested: true,
      showApproved: false,
      leadList: [],
      updatedleads:[],
      headers: [
      { text: 'ID', value: 'id' },
      { text: 'Emp Name', value: 'employee_name' },
      { text: 'Branch Name', value: 'branch_name' },
      { text: 'Language', value: 'language' },
      { text: 'Date of Request', value: 'date_of_request' },
      { text: 'Leads Requested', value: 'leads_requested' },
      { text: 'Action', value: 'actions', sortable: false },
      { text: 'Status', value: 'status' }
    ]
      
    };
  },
  created()
    {
this.fetchleads()
this.fetchremainingleads()
this.fetchcompleted() 
    },
   
      
  methods: {
    fetchcompleted()
    {
      axios.get('https://api.tkrgroups.co.in//updaterequest')
    .then(response => {
     this.updatedleads=response.data.leads
     console.log(this.updatedleads)
    })
    .catch(error => {
      console.error(error);
    });
       

    },  
    fetchremainingleads()
    {
      axios.get('https://api.tkrgroups.co.in//fetchleads')
  .then(response => {
    this.leadList= response.data.leads;

    console.log(this.leadList);
  })
  .catch(error => {
    console.error(error);
  });
    },
    fetchleads()
      {
        axios.get('https://api.tkrgroups.co.in//getrequests')
  .then(response => {
    this.leadrequests = response.data.leads;
    console.log(this.leadrequests)

    // console.log(this.leadrequests);
  })
  .catch(error => {
    console.error(error);
  });},
  cancelLead(index)
  {
    const item = this.leadrequests[index];
    axios.post('https://api.tkrgroups.co.in//updaterequest', {
      status:'Rejected',
     
      name:item[4],
      count:item[1]
    })
    .then(response => {
     console.log(response)
      Swal.fire({
        title:'Not enough leads',
        text:'Request Rejected',
        icon:'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
    })
    .catch(error => {
      console.error(error);
    });


  },
    approveLead(index) {
      console.log(index)
      const item = this.leadrequests[index];
      const availableLeads = this.leadList.length;
      if (availableLeads < item[1]) {
        Swal.fire({
        title:'Not enough leads',
        text: `You don't have enough leads. Please upload more leads to assign to ${item[4]}.`,
        icon: '',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
        // alert(
        //   `You don't have enough leads. Please upload more leads to assign to ${item[4]}.`
        // );
      } else {
        const employeeId = item[4];
        const assignedLeads = this.leadList.splice(0, item[1]);
        item.countofleads=0;
        item[5] = "completed";
        item.assignedTo = employeeId;
        Swal.fire({
        title: 'Success',
        text:`${assignedLeads.length} leads assigned to employee ${employeeId}.`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        location.reload();
      });
        console.log(
          `${assignedLeads.length} leads assigned to employee ID ${employeeId}.`
        );
       
        axios.post('https://api.tkrgroups.co.in//api/leads/assign', {
          count:item[1],
          branch_name:item[6],
          emp_name:item[4],
          language:item[2]
  

})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});
axios.post('https://api.tkrgroups.co.in//updaterequest', {
      status:item[5],
    
      name:item[4],
      count:item[1]
    })
    .then(response => {
     this.updatedleads=response.data.leads
     console.log(this.updatedleads)
    })
    .catch(error => {
      console.error(error);
    });
    const indexToRemove = this.leadrequests.indexOf(item);
    if (indexToRemove > -1) {
      this.leadrequests.splice(indexToRemove, 1);
    }
  

   
      }
    },
  },
};
</script>

<style>
.table {
  margin-top: 3%;
  border: 2px solod #000;
}
.buttons
{
  display:flex;
  justify-content: space-evenly;
  width: 30rem;
  
}
.active {
  background-color: lightgreen;
  color: white;
}

</style>
