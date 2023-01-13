import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GetExchange from './get-exchange';

async function exchangeRates() {
  const response = await GetExchange.exchangeRates();
  if (response.status) {
    printExchange(response);
  } else {
    //printError(response, currencies);
  }
}




function printExchange(response) {
  let displayResults = document.querySelector('#displayResults');
  let displayList = document.createElement('ul');
  let apiMatchArray = [];
  let currencySelection = document.querySelectorAll('input[name=currency]:checked');
  for (const key in response.conversion_rates) {
    if (currencySelection.includes(key)) {
      apiMatchArray.push(key);
    }
  }
  // console.log(apiMatchArray);
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