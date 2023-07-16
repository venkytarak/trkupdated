<template>
  <v-container class="total">
    <v-sheet width="500" class="mx-auto">
      <v-card-text class="txt">Request Leads</v-card-text>

      <v-form fast-fail @submit.prevent>
        <v-text-field label="Branch name"></v-text-field>
        <v-text-field
          mt="5"
          v-model="firstName"
          label="No.of Leads"
          :rules="firstNameRules"
          type="number"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2 bt">Submit</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  name: "ReqLead",
  data: () => ({
    firstName: "",
    firstNameRules: [
      (value) => {
        if (value?.length > 1) return true;

        return "Leads must be at least 10 ";
      },
    ],
  }),
};
</script>
<style>
.total {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mx-auto {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.txt {
  /* height: 2rem; */
  text-align: center;
  font-size: 1.2rem;
  background-color: #def1fe;
}
.bt {
  background-color: #def1fe;
}
</style>
