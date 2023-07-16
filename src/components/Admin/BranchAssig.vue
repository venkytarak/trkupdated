<!-- <template>
    <div>
      <v-select v-model="selectedBranch" :items="branches" label="Select a branch"></v-select>
  
      <v-data-table v-if="selectedBranch" :headers="headers" :items="filteredData"></v-data-table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedBranch: null,
        branches: ['Branch 1', 'Branch 2', 'Branch 3', 'Branch 4', 'Branch 5', 'Branch 6', 'Branch 7', 'Branch 8', 'Branch 9', 'Branch 10'],
        data: [
          { branch: 'Branch 1', name: 'John', age: 25 },
          { branch: 'Branch 2', name: 'Sarah', age: 30 },
          { branch: 'Branch 3', name: 'Peter', age: 35 },
          { branch: 'Branch 4', name: 'Emily', age: 28 },
          { branch: 'Branch 5', name: 'James', age: 40 },
          { branch: 'Branch 6', name: 'Anna', age: 32 },
          { branch: 'Branch 7', name: 'Tom', age: 27 },
          { branch: 'Branch 8', name: 'Mary', age: 29 },
          { branch: 'Branch 9', name: 'David', age: 31 },
          { branch: 'Branch 10', name: 'Lucy', age: 26 },
        ],
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Age', value: 'age' },
        ],
      };
    },
    computed: {
      filteredData() {
        return this.data.filter((item) => item.branch === this.selectedBranch);
      },
    },
  };
  </script>
   -->
   <template>
    <div>
      <v-select v-model="selectedBranch" :items="branches" label="Select a branch"></v-select>
  
      <!-- <v-data-table v-if="selectedBranch" :headers="headers" :items="filteredData"></v-data-table> -->
  
      <v-card v-if="selectedBranch">
        <v-card-title>{{ selectedBranch }}</v-card-title>
        <v-card-text>{{ branchLocations[selectedBranch] }}</v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedBranch: null,
        branches: ['Branch 1', 'Branch 2', 'Branch 3', 'Branch 4', 'Branch 5', 'Branch 6', 'Branch 7', 'Branch 8', 'Branch 9', 'Branch 10'],
        branchLocations: {
          'Branch 1': 'Location 1',
          'Branch 2': 'Location 2',
          'Branch 3': 'Location 3',
          'Branch 4': 'Location 4',
          'Branch 5': 'Location 5',
          'Branch 6': 'Location 6',
          'Branch 7': 'Location 7',
          'Branch 8': 'Location 8',
          'Branch 9': 'Location 9',
          'Branch 10': 'Location 10',
        },
        data: [
          { branch: 'Branch 1', name: 'John', age: 25 },
          { branch: 'Branch 2', name: 'Sarah', age: 30 },
          { branch: 'Branch 3', name: 'Peter', age: 35 },
          { branch: 'Branch 4', name: 'Emily', age: 28 },
          { branch: 'Branch 5', name: 'James', age: 40 },
          { branch: 'Branch 6', name: 'Anna', age: 32 },
          { branch: 'Branch 7', name: 'Tom', age: 27 },
          { branch: 'Branch 8', name: 'Mary', age: 29 },
          { branch: 'Branch 9', name: 'David', age: 31 },
          { branch: 'Branch 10', name: 'Lucy', age: 26 },
        ],
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Age', value: 'age' },
        ],
      };
    },
    computed: {
      filteredData() {
        return this.data.filter((item) => item.branch === this.selectedBranch);
      },
    },
  };
  </script>
  