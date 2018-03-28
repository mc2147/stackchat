// Whoa?!? What is this?
// Thanks to the style-loader, sass-loader and css-loader, webpack allows us import scss,
// compiles it into css, and then auto-magically injects a <style> tag onto the DOM!
// Wowzers! Check out the webpack.config.js to see how to add them!
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components';

// import store, { gotMessagesFromServer } from './store';

// console.log('-------------------------');
// console.log('State before any actions: ', store.getState());//Built-in redux

// const gotMessagesAction = gotMessagesFromServer([{ author: 'Cody', content: 'Hello world!' }, { author: 'World', content: 'Oh, hey, Cody!' }]);
// store.dispatch(gotMessagesAction); //Built-in redux

// console.log('-------------------------');
// console.log('State after first GOT_MESSAGES_FROM_SERVER action: ', store.getState());

// const anotherMessagesAction = gotMessagesFromServer([{ author: 'Ben', content: 'I like JS. How about you, Fira?' }, { author: 'Fira', content: 'I like Python!' }]);
// store.dispatch(anotherMessagesAction);

// console.log('-------------------------');
// console.log('State after second GOT_MESSAGES_FROM_SERVER action: ', store.getState());

// import store, { gotMessagesFromServer } from './store';

// const unsubscribe = store.subscribe(function () {
//   console.log('----------------');
//   console.log('State changed!!', store.getState());
// });

// store.dispatch(gotMessagesFromServer([{ author: 'Milton', content: 'Hey @channel' }]));
// store.dispatch(gotMessagesFromServer([{ author: 'Marcy', content: 'Anybody @here want ice cream?' }]));

// unsubscribe();  

// store.dispatch(gotMessagesFromServer([{ author: 'Astro', content: 'To infinity and beyond!' }]));

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('app')
);
