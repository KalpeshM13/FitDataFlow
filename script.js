// Dark theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    function setTheme(dark) {
      if (dark) {
        html.classList.add('dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else {
        html.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
    }
    // Persist theme
    const userTheme = localStorage.getItem('theme');
    if (userTheme === 'dark' || (userTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme(true);
    }
    themeToggle.onclick = () => {
      const dark = !html.classList.contains('dark');
      setTheme(dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    };

    // Utility for random data
    function generateRandomData(min, max, count) {
      return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

    document.querySelector('.sync-btn').addEventListener('click', function() {
    // Update last synced time
    const now = new Date();
    const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('last-synced').textContent = formatted;

    // Update battery value using Battery Status API
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
        const percent = Math.round(battery.level * 100);
        document.getElementById('battery-value').textContent = percent + '%';
        });
    } else {
        // Fallback: show "N/A" if not supported
        document.getElementById('battery-value').textContent = '82%';
    }
    });


    document.getElementById('syncBtn').addEventListener('click', function() {
    const now = new Date(); // Gets current date and time from the system[2][5][8]
    // Format as "Monday, 19 May, 2025"
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-IN', options);
    document.getElementById('displayDate').textContent = formattedDate;
});



    // Chart.js global options for tooltips and responsive
    Chart.defaults.plugins.tooltip.enabled = true;
    Chart.defaults.plugins.tooltip.backgroundColor = "#232f47";
    Chart.defaults.plugins.tooltip.titleColor = "#fff";
    Chart.defaults.plugins.tooltip.bodyColor = "#fff";
    Chart.defaults.plugins.tooltip.borderColor = "#4f8cff";
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.animation.duration = 800;

    // Destroy utility
    function destroyIfExists(chart) { if (chart) { chart.destroy(); } }

    // Heart Rate Charts
    let heartDayChart, heartWeekChart, heartMonthChart;
    function drawHeartCharts() {
      destroyIfExists(heartDayChart);
      destroyIfExists(heartWeekChart);
      destroyIfExists(heartMonthChart);
      heartDayChart = new Chart(document.getElementById('heart-day-chart').getContext('2d'), {
        type: 'line',
        data: {
          labels: Array.from({length:24},(_,i)=>`${i}:00`),
          datasets: [{
            label: 'Heart Rate',
            data: [58, 62, 65, 70, 60, 75, 80, 77, 90, 105, 78, 60, 72, 85, 90, 87, 82, 75, 70, 65, 62, 60, 58, 55],
            borderColor: '#4f8cff',
            backgroundColor: 'rgba(79, 140, 255, 0.13)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7,
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 50, max: 110, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } } }
      });
      heartWeekChart = new Chart(document.getElementById('heart-week-chart').getContext('2d'), {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Min',
            data: generateRandomData(50, 60, 7),
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74,222,128,0.0)',
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7,
          },{
            label: 'Avg',
            data: generateRandomData(70, 80, 7),
            borderColor: '#4f8cff',
            backgroundColor: 'rgba(79,140,255,0.13)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7,
          },{
            label: 'Max',
            data: generateRandomData(90, 110, 7),
            borderColor: '#f87171',
            backgroundColor: 'rgba(248,113,113,0.0)',
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7,
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 40, max: 120, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } } }
      });
      heartMonthChart = new Chart(document.getElementById('heart-month-chart').getContext('2d'), {
        type: 'line',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => i + 1),
          datasets: [{
            label: 'Avg Heart Rate',
            data: generateRandomData(65, 85, 30),
            borderColor: '#4f8cff',
            backgroundColor: 'rgba(79,140,255,0.13)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7,
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 50, max: 100, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } } }
      });
    }
    // Steps Charts
    let stepsDayChart, stepsWeekChart, stepsMonthChart;
    function drawStepsCharts() {
      destroyIfExists(stepsDayChart);
      destroyIfExists(stepsWeekChart);
      destroyIfExists(stepsMonthChart);
      stepsDayChart = new Chart(document.getElementById('steps-day-chart').getContext('2d'), {
        type: 'bar',
        data: {
          labels: Array.from({length:24},(_,i)=>`${i}:00`),
          datasets: [{
            label: 'Steps',
            data: [50, 30, 20, 10, 10, 100, 800, 700, 100, 600, 500, 800, 100, 900, 700, 600, 800, 1100, 1200, 900, 100, 50, 30, 10],
            backgroundColor: '#22c55e',
            borderRadius: 6,
            barThickness: 12,
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 1250, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } } }
      });
      stepsWeekChart = new Chart(document.getElementById('steps-week-chart').getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Steps',
            data: generateRandomData(5000, 12000, 7),
            backgroundColor: '#22c55e',
            borderRadius: 6,
            barThickness: 30,
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 15000, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } } }
      });
      stepsMonthChart = new Chart(document.getElementById('steps-month-chart').getContext('2d'), {
        type: 'bar',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => i + 1),
          datasets: [{
            label: 'Steps',
            data: generateRandomData(4000, 14000, 30),
            backgroundColor: '#22c55e',
            borderRadius: 6,
            barThickness: 8,
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 15000, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } } }
      });
    }
    // Sleep Charts (with tooltips enabled)
    let sleepDayChart, sleepWeekChart, sleepMonthChart;
    function drawSleepCharts() {
      destroyIfExists(sleepDayChart);
      destroyIfExists(sleepWeekChart);
      destroyIfExists(sleepMonthChart);
      sleepDayChart = new Chart(document.getElementById('sleep-day-chart').getContext('2d'), {
        type: 'line',
        data: {
          labels: ['22:00', '23:00', '0:00', '1:00', '2:00', '3:00', '4:00', '5:00'],
          datasets: [{
            label: 'Deep',
            data: [0, 20, 40, 20, 40, 30, 10, 0],
            backgroundColor: 'rgba(79, 140, 255, 0.45)',
            borderColor: '#4f8cff',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7,
            stack: 'stack'
          }, {
            label: 'Light',
            data: [0, 30, 40, 50, 40, 60, 30, 0],
            backgroundColor: 'rgba(74, 222, 128, 0.45)',
            borderColor: '#4ade80',
            fill: '-1',
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7,
            stack: 'stack'
          }, {
            label: 'REM',
            data: [0, 20, 30, 20, 30, 20, 10, 0],
            backgroundColor: 'rgba(168, 85, 247, 0.45)',
            borderColor: '#a855f7',
            fill: '-1',
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7,
            stack: 'stack'
          }]
        },
        options: {
          plugins: { legend: { display: true, labels: { color: 'var(--text-secondary)' } } },
          scales: { y: { min: 0, max: 100, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } }
        }
      });
      sleepWeekChart = new Chart(document.getElementById('sleep-week-chart').getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Deep',
            data: generateRandomData(1, 3, 7),
            backgroundColor: 'rgba(79, 140, 255, 0.85)',
            borderRadius: 6,
            stack: 'Stack 0'
          }, {
            label: 'Light',
            data: generateRandomData(3, 5, 7),
            backgroundColor: 'rgba(74, 222, 128, 0.85)',
            borderRadius: 6,
            stack: 'Stack 0'
          }, {
            label: 'REM',
            data: generateRandomData(1, 2, 7),
            backgroundColor: 'rgba(168, 85, 247, 0.85)',
            borderRadius: 6,
            stack: 'Stack 0'
          }]
        },
        options: {
          plugins: { legend: { display: true, labels: { color: 'var(--text-secondary)' } } },
          scales: { y: { stacked: true, min: 0, max: 12, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } }
        }
      });
      sleepMonthChart = new Chart(document.getElementById('sleep-month-chart').getContext('2d'), {
        type: 'line',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => i + 1),
          datasets: [{
            label: 'Hours',
            data: generateRandomData(5, 9, 30),
            borderColor: '#a855f7',
            backgroundColor: 'rgba(168, 85, 247, 0.18)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 7,
          }]
        },
        options: {
          plugins: { legend: { display: true, labels: { color: 'var(--text-secondary)' } } },
          scales: { y: { min: 0, max: 10, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } }
        }
      });
    }
    // Calories Charts
    let caloriesDayChart, caloriesWeekChart, caloriesMonthChart;
    function drawCaloriesCharts() {
      destroyIfExists(caloriesDayChart);
      destroyIfExists(caloriesWeekChart);
      destroyIfExists(caloriesMonthChart);
      caloriesDayChart = new Chart(document.getElementById('calories-day-chart').getContext('2d'), {
        type: 'bar',
        data: {
          labels: Array.from({length:24},(_,i)=>`${i}:00`),
          datasets: [{
            label: 'Calories',
            data: [45, 60, 80, 60, 90, 120, 220, 180, 210, 220, 100, 80, 200, 120, 180, 90, 220, 180, 190, 110, 90, 80, 70, 60],
            backgroundColor: '#a78bfa',
            borderRadius: 6,
            barThickness: 12,
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 230, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } } }
      });
      caloriesWeekChart = new Chart(document.getElementById('calories-week-chart').getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Calories',
            data: generateRandomData(1500, 2300, 7),
            backgroundColor: '#a78bfa',
            borderRadius: 6,
            barThickness: 30,
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 2500, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } } }
      });
      caloriesMonthChart = new Chart(document.getElementById('calories-month-chart').getContext('2d'), {
        type: 'bar',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => i + 1),
          datasets: [{
            label: 'Calories',
            data: generateRandomData(1300, 2400, 30),
            backgroundColor: '#a78bfa',
            borderRadius: 6,
            barThickness: 8,
          }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 2500, grid: { color: 'rgba(0,0,0,0.07)' } }, x: { grid: { display: false } } } }
      });
    }
    // Initial draw
    drawHeartCharts();
    drawStepsCharts();
    drawSleepCharts();
    drawCaloriesCharts();

    // Tab functionality
    document.querySelectorAll('.chart-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const chartId = this.getAttribute('data-chart');
        const chartGroup = chartId.split('-')[0];
        document.querySelectorAll(`.chart-tab[data-chart^="${chartGroup}"]`).forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll(`[id^="${chartGroup}-"][id$="-container"]`).forEach(container => container.classList.remove('active'));
        document.getElementById(`${chartId}-container`).classList.add('active');
        // Redraw charts for random data
        if(chartGroup==='heart') drawHeartCharts();
        if(chartGroup==='steps') drawStepsCharts();
        if(chartGroup==='sleep') drawSleepCharts();
        if(chartGroup==='calories') drawCaloriesCharts();
      });
    });