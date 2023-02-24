const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const sourceWebsite = window.location.href;
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //grab the author and text objects from the api result
    if(!quote.author){
        authorText.textContent = "Unknown";
    } else{
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 120){
        quoteText.classList.add("long-quote");
    } else{
        quoteText.classList.remove("long-quote");
    }
    //set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
    }

// Get quotes from API, using asynchronous javascript
async function getQuotes(){
    const apiUrl = "https://type.fit/api/quotes";
    try {
        loading();
        // this constant wont be populated until the data is fetched from the api
        const response = await fetch(apiUrl);
        //turn the response into a json for easy management
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch error here if theres any issues
        alert(error);
    }
}

function tweetQuote(){
    // Make a template string value for your tweet. Template strings allow you to pass variables into the string.
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}   - ${authorText.textContent}    Quote Generator: ${sourceWebsite}`;
    // open the above url with template string in a new tab.
    window.open(twitterUrl, '_blank');
}

//on button press, run newQuote again.
newQuoteBtn.addEventListener("click", newQuote);

twitterBtn.addEventListener("click", tweetQuote);

// on load run this to get started.
getQuotes();
