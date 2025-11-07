///update json file and following to seperate fruit from veg
/// original data from https://www.sfenvironment.org/vegetables-fruits-in-season-bay-area

/// Create func that gets seasonal data from file and asigns to vars
async function loadSeason(month) {
  const response = await fetch('data.json');
  const data = await response.json();

  const listProduce = data[month];
  const produceContainer = document.getElementById('produce');
  const monthTitle = document.getElementById('monthTitle');
  /// ex January Harvest
  monthTitle.textContent = `${month} Harvest`;

  produceContainer.innerHTML = produceList
    /// .map is method creating array from array/callback for each index (asc order)
    /// outputs new array where prev elements are string html list item
    /// join takes each element in the transformed array and joines them into a string
    .map(item => `<li>${item}</li>`)
    .join('');
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
