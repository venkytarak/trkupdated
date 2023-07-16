<template>
  <canvas id="myChart"></canvas>
</template>

<script>
import Chart from "chart.js/auto";


export default {
  mounted() {
  const ctx = document.getElementById("myChart");

  fetch('https://api.tkrgroups.co.in//branch_counts')
    .then(response => response.json())
    .then(data => {
      const branches = Object.keys(data);
      const counts = Object.values(data);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: branches,
          datasets: [
            {
              label: "Top  sales",
              data: counts,
              borderWidth: 1,
              backgroundColor: "#a96292",
              borderColor: "#a96292",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch(error => console.error(error));
}

  
};
</script>
