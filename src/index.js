import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GetExchange from './get-exchange';

async function exchangeRates() {
  const response = await GetExchange.exchangeRates();
  if (response.status) {
    printExchange(response, currencies);
  } else {
    printError(response, currencies);
  }
}




function printExchange(apiResponse) {
  let displayResults = document.querySelector('#displayResults');
  let selectionArray = [];
  let currencySelection = document.querySelectorAll('input[name=currency]:checked');
  currencySelection.forEach(function(element) {
    selectionArray.push(element);
  })

}



function handleForm(event) {
  event.preventDefault(); 

}




window.addEventListener('load', function() {
  document.querySelector('form').addEventListener('submit', handleForm);
    
});