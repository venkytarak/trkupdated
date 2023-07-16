<template>
    <div class=""> <AdminSidebar/>
     <v-container class="mt-5 " >
       <v-row justify="center" align="center">
         <v-col cols="12" md="6" class="mt-5">
           <v-card class="box">
             <v-card-title class="abc">Add Dnd leads</v-card-title>
             <v-card-text>
               <v-form @submit.prevent="submitForm">
                 
                
                
 
                 <v-text-field
                   v-model="number"
                   label="Enter the number"
                 ></v-text-field>
   
                 <v-btn
                   color="#250361"
                   class="mt-4 tc"
                   block
                   type="submit"
                   @click="addnd"
                   >Add to Dnd</v-btn
                 >
               </v-form>
             </v-card-text>
           </v-card>
         </v-col>
       </v-row>
     </v-container></div>
   </template>
   
   <script>
 
 
 import axios from "axios";
 import Swal from "sweetalert2";
 import "sweetalert2/dist/sweetalert2.min.css"
 import AdminSidebar from "./AdminSidebar.vue";
 export default {
     components:
     {
         AdminSidebar
     },
   data: () => ({
     valid: true,
     number: "",
     rules: [
       (v) => !!v || "Amount is required",
       (v) => /^\d+$/.test(v) || "Amount must be a number",
     ],
   }),
   methods: {
     addnd() {
       axios
         .post("https://api.tkrgroups.co.in//addnd", {
           number: this.number,
         })
         .then((response) => {
           console.log(response.data);
           if (response.data === "Mobile number added to DND table.") {
             Swal.fire("Success", "Mobile number added to DND table.", "success");
           } else if (response.data === "Mobile number already exists in DND table.") {
             Swal.fire("Error", "Mobile number already exists in DND table.", "error");
           } else {
             Swal.fire("Error", "An error occurred while processing your request.", "error");
           }
         })
         .catch((error) => {
           console.log(error);
           Swal.fire("Error", "An error occurred while communicating with the server.", "error");
         });
     },
   },
 };
 
 
 
   </script>
   
   <style scoped>
   .abc {
     text-align: center;
   }
   .tc {
     color: white;
   }
   .v-card {
     border-radius: 10px;
     box-shadow: 0 5px 5px 5px #8888;
   }
   .box
   {
     margin-top: 10rem;
     
   }
   </style>
   