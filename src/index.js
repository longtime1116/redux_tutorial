import {createStore} from 'redux'
import expect from 'expect';
import './index.css';

console.log('all test passed!');
expect(1).toEqual(1)

//function counter(state, action) {
//  if (typeof state === 'undefined') {
//    return 0; // If state is undefined, return the initial application state
//  }
//
//  if (action.type === 'INCREMENT') {
//    return state + 1;
//  } else if (action.type === 'DECREMENT') {
//    return state - 1;
//  } else {
//    return state; // In case an action is passed in we don't understand
//  }
//}

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
}

store.subscribe(render);
render();

document.addEventListener('click', () => {
    store.dispatch({ type : 'INCREMENT' })
});

expect (
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect (
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect (
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect (
  counter(1, { type: 'DECREMENT' })
).toEqual(0);

expect (
    counter(1, { type: 'SOMETHING_ELSE' })
).toEqual(1);
