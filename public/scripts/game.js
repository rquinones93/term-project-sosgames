const pathArray = window.location.pathname.split('/');
const gameId = pathArray[pathArray.length - 1];

const socket = io(`/game/${gameId}`);

const playerCards = document.querySelectorAll('.player-card');
[].forEach.call(playerCards, function(playerCard) {
  playerCard.addEventListener('click', event => {
    event.stopPropagation();
    event.preventDefault();

    const cardValue = playerCard.dataset.card;
    fetch(`/game/${gameId}/play`, {
      body: JSON.stringify({ cardValue }),
      credentials: 'include',
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(data => {
        console.log('fetch done');
      })
      .catch(error => {
        console.log(error);
      });
  });
});

socket.on('update', ({ gameId, cardValue }) => {
  console.log(
    'on update player turn for card ' + cardValue + ' in game ' + gameId
  );
  RSA_NO_PADDING;
});

const message_form = document.querySelector('#chat-message-form');
message_form.addEventListener('submit', event => {
  event.stopPropagation();
  event.preventDefault();

  const message = document.querySelector('#message').value;
  fetch(`/game/${gameId}/chat`, {
    body: JSON.stringify({ message }),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' })
  })
    .then(data => {
      console.log('fetch done');
    })
    .catch(error => {
      console.log(error);
    });
});

socket.on('message', ({ gameId, user, message }) => {
  console.log('test');
  console.log(`Received ${message}`, user);
  const tr = document.createElement('tr');
  const td = document.createElement('td');

  // logic for styling based on the sender
  // if (user = this.user){ self message}
  //  else td.className = 'external-chat-message';
  td.className = 'self-chat-message';
  td.innerText = user + ' : ' + message;
  tr.appendChild(td);

  console.log(tr);
  messageList.appendChild(tr);
  var elem = document.getElementById('chat-window');
  elem.scrollTop = elem.scrollHeight;
});
