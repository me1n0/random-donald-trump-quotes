const newQuoteButton = document.querySelector("#js-new-quote");
newQuoteButton.addEventListener("click", getQuote);
const spinner = document.querySelector("#js-spinner");
const twitterButton = document.querySelector("#js-tweet");

const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

async function getQuote() {
  spinner.classList.remove("hidden");

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    displayQuote(json.message);
  } catch (err) {
    console.log(err);
    alert("Failed to fetch new quote");
  } finally {
    newQuoteButton.disabled = false;
    spinner.classList.add("hidden");
  }
}

function displayQuote(quote) {
  const quoteText = document.querySelector("#js-quote-text");
  quoteText.textContent = quote;
}

function setTweetButton(quote) {
  twitterButton.setAttribute(
    "href",
    `https://twitter.com/share?text=${quote} - Donald Trump`
  );
}

getQuote();
