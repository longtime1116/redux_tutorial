import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import './index.css';
//const { Component } = React;

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // undefined を渡すべき(中身についてはtodoに任せる)
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};
class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  // Since the subscription happens in `componentDidMount`,
  // it's important to unsubscribe in `componentWillUnmount`.
  componentWillUnmount() {
    this.unsubscribe(); // return value of `store.subscribe()`
  }

  render () {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

FilterLink.contextTypes = {
  store: React.PropTypes.object
}

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    {', '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >
      Active
    </FilterLink>
      {', '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >
      Completed
    </FilterLink>
  </p>
);

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      // Use the `Array.filter()` method
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

const combineReducers = reducers => {
  return (state = {}, action) => {
    // Reduce all the keys for reducers from `todos` and `visibilityFilter`
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        // Call the corresponding reducer function for a given key
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {}, // The `reduce` on our keys gradually fills this empty object until it is returned.
    );
  };
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({}); // initialize

  return { getState, dispatch, subscribe };
};

const store = createStore(todoApp);

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}
  >
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos (
      state.todos,
      state.visibilityFilter
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: "TOGGLE_TODO",
        id
      })
    }
  };
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

//class VisibleTodoList extends Component {
//  componentDidMount() {
//    const { store } = this.context;
//    this.unsubscribe = store.subscribe(() =>
//      this.forceUpdate()
//    );
//  }
//
//  componentWillUnmount() {
//    this.unsubscribe(); // return value of `store.subscribe()`
//  }
//
//  render () {
//    const props = this.props;
//    const { store } = this.context;
//    const state = store.getState();
//
//    return (
//      <TodoList
//        todos={
//          getVisibleTodos(
//            state.todos,
//            state.visibilityFilter
//          )
//        }
//        onTodoClick={id =>
//          store.dispatch({
//            type: 'TOGGLE_TODO',
//            id
//          })
//        }
//      />
//    );
//  }
//}
//
//VisibleTodoList.contextTypes = {
//  store: React.PropTypes.object
//}

let nextTodoId = 0;
const AddTodo = (props, { store }) => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
    <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value,
        })
        input.value = '';
    }}>
        Add Todo
      </button>
    </div>
  );
};

// 受け取る側
AddTodo.contextTypes = {
  store: React.PropTypes.object
}

const TodoApp = () => (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
)

//class Provider extends Component {
//  getChildContext() {
//    return {
//      // ここに追加すれば、増やせる
//      store: this.props.store // This corresponds to the `store` passed in as a prop
//    };
//  }
//
//  render() {
//    return this.props.children;
//  }
//}
// 渡す側
//Provider.childContextTypes = {
//  store: React.PropTypes.object
//}

// See Section 8 for earlier `render()` example
const render = () => {
  ReactDOM.render(
    <Provider store={createStore(todoApp)}>
      <TodoApp />
    </Provider>,
    document.getElementById('root'),
  );
};

const testRender = () => {
  console.log(store.getState())
}

store.subscribe(render);
store.subscribe(testRender);
render();
