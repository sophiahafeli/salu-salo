///update json file and following to seperate fruit from veg
/// original data from https://www.sfenvironment.org/vegetables-fruits-in-season-bay-area

/// Create func that gets seasonal data from file and asigns to vars
async function loadSeason(month) {
  const response = await fetch('data.json');
  const data = await response.json();

  const produce = data[month];
  const produceContainer = document.getElementById('produce');
  const monthTitle = document.getElementById('monthTitle');
  monthTitle.textContent = `${month}'s Harvest`;

  // Create separate lists for fruit and vegetables
  const fruitList = produce.Fruit.map(item => `<li>${item}</li>`).join('');
  const vegList = produce.Vegetables.map(item => `<li>${item}</li>`).join('');

  // Combine into HTML
  produceContainer.innerHTML = `
  <div class="produce-box">
    <h3>Fruit</h3>
    <ul>${fruitList}</ul>
  </div>
  <div class="produce-box">
    <h3>Vegetables</h3>
    <ul>${vegList}</ul>
  </div>
`;
}


/// Create func that assigns value and content to list for each month 
// (like key, val)
function populateMonths() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const select = document.getElementById('monthSelect');
  months.forEach(month => {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    select.appendChild(option);
  });

  /// set current month to todays date
  const currentMonth = months[new Date().getMonth()];
  select.value = currentMonth;
  loadSeason(currentMonth);
  select.addEventListener('change', (e) => loadSeason(e.target.value));
}

populateMonths();
