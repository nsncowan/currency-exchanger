import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GetExchange from './get-exchange';

async function exchangeRates() {
  const response = await GetExchange.exchangeRates();
  if (response.result) {
    console.log(response.conversion_rates.EUR);
    printExchange(response);
  } else {
    //printError(response, currencies);
  }
}




function printExchange(response) {
  let displayResults = document.querySelector('#displayResults');
  let displayList = document.createElement('ul');
  
  let dollarAmount = parseInt(document.getElementById('dollarInput').value)
  let apiMatchArray = [];
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  let currencySelection = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  console.log(currencySelection);
  for (const key in response.conversion_rates) {
    if (currencySelection.includes(key)) {
      apiMatchArray.push(`${key} : ${(dollarAmount * response.conversion_rates[key])}`);
    }
  }
  console.log("api match array", apiMatchArray);
  
  apiMatchArray.forEach(element => {
    let newLi = document.createElement('li');
    newLi.append(element);
    displayList.append(newLi);
  });
  displayResults.append(displayList);
}



function handleForm(event) {
  event.preventDefault(); 
  exchangeRates();
}




window.addEventListener('load', function() {
  document.querySelector('form').addEventListener('submit', handleForm);
    
});