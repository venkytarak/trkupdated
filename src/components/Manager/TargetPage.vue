<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" class="mt-5">
        <v-card>
          <v-card-title class="abc" style="background:#d3d3d3		;color:black;">Monthly Target</v-card-title>
          <v-card-text style="margin-left:10rem;" >
           
            <p style="font-size:1.2rem;color:black;" class="mt-2">Branch target :$42000</p> <br>
            <p style="font-size:1.2rem;color:black;" class="mt-2"> Leads: 3040</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="mt-5">
        <v-card>
          <v-card-title class="abc" style="background:#d3d3d3		;color:black;">Daily Target</v-card-title>
          <v-card-text style="margin-left:20rem;">
            <p style="font-size:1.2rem;color:black;" class="mt-2">Branch target :$42000</p> <br>
            <p style="font-size:1.2rem;color:black;" class="mt-2"> Leads: 3040</p>
          
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    select: null,
    select1: null,
    select2: null,
    items: ["Spandana", "John", "Bean", "George", "Honey"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    date: null,
    firstName: "",
    firstName2: "",
    rules: [
      (v) => !!v || "Amount is required",
      (v) => /^\d+$/.test(v) || "Amount must be a number",
    ],
  }),

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) alert("Form is valid");
    },
    async validate2() {
      const { valid } = await this.$refs.form2.validate();

      if (valid) alert("Form is valid");
    },
  },
};
</script>

<style scoped>
.abc {
  text-align: center;
}

.v-card {
  border-radius: 10px;
  box-shadow: 0 5px 5px 5px #8888;
}
</style>
