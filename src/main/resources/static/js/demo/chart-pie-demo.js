// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");

let labels = [];
let data = [];
let colorClassList = ["primary","success","info","danger","warning","secondary","dark","light"];

for (let i = 0; i < 8; i++) {
  if(i == 7){
    $("#interest-stat-" + i).css("color","#5ED92E6C");
    break;
  }
  $("#interest-stat-" + i).addClass("text-"+colorClassList[i]);

}


for (const interest in countedInterestMap) {
  labels.push(interest);
  data.push(countedInterestMap[interest]);
}

var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc','#f6c23e','#e74a3b','#858796','#5a5c69','#5ED92E6C'],
      hoverBackgroundColor: ['rgba(94,217,46,0.42)', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234,236,244,0.46)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
