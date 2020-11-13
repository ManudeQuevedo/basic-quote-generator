const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')


async function getQuote() {
   
   const proxyUrl = 'https://damp-ravine-86052.herokuapp.com/'
   const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
   
   try {
      const response = await fetch(proxyUrl + apiUrl)
      const data = await response.json()
      
      // If the API does not returns an author, we will set Unknown as the default value.
      if(data.quoteAuthor === '') {
         authorText.innerText = 'Unknown'
      } else {
         authorText.innerText = data.quoteAuthor
      }

      quoteText.innerText = data.quoteText
   } catch (error) {
      getQuote()
   }

   // 16777215 (decimal) == ffffff in hexidecimal
   let newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

   // Convert hex to RGB:
   let rgbColor = newColor.replace('#', '');
   let r = parseInt(rgbColor.substring(0, 2), 16);
   let g = parseInt(rgbColor.substring(2, 4), 16);
   let b = parseInt(rgbColor.substring(4, 6), 16);
   let result = 'rgba(' + r + ',' + g + ',' + b + ')';

   document.body.style.backgroundColor = newColor;
   output.textContent = newColor + " - " + result;
}

// Sharing on Twitter functinallity:
function tweetQuote() {
   const quote = quoteText.innerText
   const author = authorText.innerText
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
   window.open(twitterUrl, '_blank')
}

// Event listeners for the buttons to function as expected
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)



getQuote()