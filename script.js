let apiQuotes = [];
function newQuote(){
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
}

// Get quotes from API, using asynchronous javascript
async function getQuotes(){
    const apiUrl = "https://type.fit/api/quotes";
    try {
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

// on load run this to get started.
getQuotes();
