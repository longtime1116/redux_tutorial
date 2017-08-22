import React from 'react'
import ReactDOM from 'react-dom'
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import './index.css';
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    default:
      return state;
  }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux'
  };
  const stateAfter = [{
      id: 0,
      text: 'Learn Redux',
      completed: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodo();
console.log('All tests passed')

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

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement = {() =>
          store.dispatch({
            type: 'INCREMENT'
      })}
      onDecrement ={() =>
          store.dispatch({
            type: 'DECREMENT'
          })
      }
    />,
    document.getElementById('root')
  )
}

// store に対して dispatch されると、呼び出されるハンドラ的なやつ
store.subscribe(render);
render();

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
