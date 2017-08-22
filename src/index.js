import expect from 'expect';
import './index.css';

console.log('all test passed!');
expect(1).toEqual(1)

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

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({}); // initialize

  return { getState, dispatch, subscribe };
}


const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
}

// store に対して dispatch されると、呼び出されるハンドラ的なやつ
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
