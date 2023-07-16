<template>
  <ManagerSidebar />
  <v-card class="crudtble">
    <v-card-title>
      <span class="text-h5">AddEmployee</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Emp id"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Emp Name"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Leads Assigned" type="number"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn to="/MgEmp" color="blue-darken-1" variant="text"> Cancel </v-btn>
      <v-btn to="/MgEmp" color="blue-darken-1" variant="text"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ManagerSidebar from "@/components/ManagerSidebar.vue";
export default {
  name: "EmpAdd",
  components: {
    ManagerSidebar,
  },
};
</script>
