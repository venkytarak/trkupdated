<template>
  <div class="">
    
  <div class="intl mt-5">
  
  
      <!-- <button @click="goBack" class="back mt-5"><v-icon>mdi-arrow-left-bold</v-icon></button> -->
      
      <v-data-table
        :headers="headers"
        :items="employees"
        :sort-by="[{ key: 'name', order: 'asc' }]"
        class="elevation-1 mt-5"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title style="color:blue">Employees leads status</v-toolbar-title>
           
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
           
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

  export default {
    name:'InterestedLeads',
    components:
    {
   
      
    },
    
    data: () => ({
      addEmpModal:false,
      empname:'',
        empemail:'',
        emppassword:'',
        selectedBranch:'',
      employees:[],     
       dialog: false,
      dialogDelete: false,
      branchname:[],
      branc:'',
      headers: [
        {
          title: 'empid',
          align: 'start',
          sortable: false,
          key: '0',
        },
        { title: 'employee name', key: '1' },
        { title: 'email', key: '2' },
    
        
        { title: 'role', key: '5' },
        // { title: 'Actions', key: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        empid: '',
        name: 0,
        branch: 0,
        mail: 0,
        role: 0,
      },
      defaultItem: {
      empid: '',
        name: 0,
        branch: 0,
        mail: 0,
        role: 0,
      },
      items: [
   "Manager",
   "Employee"
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
      this.branch= this.$route.params.branchName;
 this.managername= this.$route.params.manager;
      this.initialize()
      this.fetchemployees()
      this.fetchbranchname()
    },

    methods: {
      async fetchbranchname()
      {
        try{
        const { data } = await axios.get("https://api.tkrgroups.co.in//apiget/branchename")
        // this.managers = data.emp_list
        this.branchname=data.branch
        
        console.log(this.branchname)
        }
      
      catch (error) {
          console.error(error);
        }

      },
      addemp() {
        axios.post('https://api.tkrgroups.co.in//insertemp', {
          name:this.empname,
          email:this.empemail,
          password:this.emppassword,
          branch:this.selectedBranch
        })
          .then(response => {
            // this.branches.push(response.data)
            // this.addBranchModal
            console.log(response.data)
          }
            );
          },

        
      goBack() {
    this.$router.go(-1)
  },
      initialize () {
       
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      async fetchemployees()
      {
      
     
      
  const role = 'manager'; // or 'admin'
  const branchname = this.branch; // applicable only for manager role
  axios.get(`https://api.tkrgroups.co.in//employees/${role}?branchname=${branchname}`)
    .then(response => {
      this.employees = response.data.employees;
      console.log(this.employees);
    })
    .catch(error => {
      console.log(error);
    });


      },
    },
   
  }
</script> 
<style scoped>
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
.empbtn
{
 margin-left:30rem;
 background:lightgreen;
 height: 2.2rem;
 width: 9rem;
 border-radius:5px ;
 margin-right:3rem;

}
</style>
