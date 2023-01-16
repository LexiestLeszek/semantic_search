// Create a search bar and add it to the page
const searchBar = document.createElement('input');
searchBar.setAttribute('type', 'text');
searchBar.setAttribute('placeholder', 'Ask a question...');
searchBar.style.position = 'fixed';
searchBar.style.top = '0';
searchBar.style.left = '0';
searchBar.style.zIndex = '9999'; // set high z-index to ensure search bar is above other elements
document.body.appendChild(searchBar);

// Listen for the user to submit their question
searchBar.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    // Load the compromise library
    const script = document.createElement('script');
    script.src = './compromise.min.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Wait for the compromise library to be loaded
    script.addEventListener('load', () => {
      // Use compromise to extract NLP data from the user's question
      const data = window.nlp(searchBar.value).out('terms');

      // Use the data to match the user's question with relevant information on the page
      const answers = window.nlp.match(data, document.body.innerText);

      // Send the answers to the content script for presentation to the user
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'answers', answers: answers});
      });
    });
  }
});
