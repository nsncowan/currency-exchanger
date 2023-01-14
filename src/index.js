import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GetExchange from './get-exchange';

async function exchangeRates() {
  const response = await GetExchange.exchangeRates();
  if (response.result) {
    printExchange(response);
  } else {
    printError(response);
  }
}

function printExchange(response) {
  let displayResults = document.querySelector('#displayResults');
  displayResults.innerText = null;
  let displayList = document.createElement('ul');
  let dollarAmount = parseInt(document.getElementById('dollarInput').value);
  let apiMatchArray = [];
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  let selections = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  if (selections.length > 5) {
    displayResults.innerText = `Please select 5 or fewer currencies.`;
  }
  else {
  for (const key in response.conversion_rates) {
    if (selections.includes(key)) {
      apiMatchArray.push(`${key} : ${(dollarAmount * response.conversion_rates[key])}`);
    }
  }
  apiMatchArray.forEach(element => {
    let newLi = document.createElement('li');
    newLi.append(element);
    displayList.append(newLi);
  });
  displayResults.append(displayList);
}
}

function printError(response) {
  displayResults.innerText = `${response.status} ${response.statusText}. We could not complete your conversions at this time.`;
}

function handleForm(event) {
  event.preventDefault(); 
  exchangeRates();
}

window.addEventListener('load', function() {
  document.querySelector('form').addEventListener('submit', handleForm);
    
});