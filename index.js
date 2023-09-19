const button = document.querySelector('button');
const adviceNumber = document.querySelector('#advice-number');

let quoteCache = []; // initialize an empty cache array

button.addEventListener('click', () => {
  fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(data => {
      const quote = data.slip.advice;
      const randomAdviceNumber = Math.floor(Math.random() * 100) + 1; // generate a random advice number between 1 and 100
      adviceNumber.textContent = `#Advice ${randomAdviceNumber}`; // update the advice number with the random number
      
      if (!quoteCache.includes(quote)) { // check if the quote is not already in the cache
        quoteCache.push(quote); // add the new quote to the cache
        if (quoteCache.length > 10) { // limit the cache to 10 quotes
          quoteCache.shift(); // remove the oldest quote from the cache
        }
        const quoteText = document.querySelector('#quote-text'); // select the quote text
        quoteText.textContent = quote; // update the quote text
      } else {
        // if the quote is already in the cache, generate a new quote
        button.click(); // simulate a click event to trigger a new fetch request
      }
    });
});
