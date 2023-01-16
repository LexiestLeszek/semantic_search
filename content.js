// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'answers') {
      // Present the user with a list of possible answers
      const list = document.createElement('ul');
      message.answers.forEach(answer => {
        const item = document.createElement('li');
        item.innerText = answer.text;
        item.addEventListener('click', () => {
          // Navigate to the relevant part of the page when the user clicks on an answer
          window.scrollTo(0, answer.offset.start);
          document.body.style.backgroundColor = 'yellow';
          setTimeout(() => {
            document.body.style.backgroundColor = '';
          }, 1000);
        });
        list.appendChild(item);
      });
      document.body.appendChild(list);
    }
  });
  