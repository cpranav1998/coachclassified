import React from 'react'
import logo from './logo.svg'
import './App.css'
import { inject, observer, Provider } from 'mobx-react'
import * as Store from './AppStore'

interface TodoItemProps {
  todo: typeof Store.Todo.Type    // A: the type of the model
}

const TodoItem: React.FC<TodoItemProps> = observer(({ todo }) => (  // B: observer
  <li>
    <div onClick={() => todo.markAsCompleted()}>
      {todo.completed ? 'Done: ' : null}{todo.text}
    </div>
  </li>
))

interface TodoListProps {
  todoListStore?: typeof Store.TodoListStore.Type;   // A: the injected store property
}

@inject('todoListStore')   // B: inject the store
@observer                  // C: decorate with @observer
class TodoList extends React.Component<TodoListProps> {
  private addTodo = () => {
    const text = window.prompt('New todo')
    if (text) {
      // @ts-ignore
      todoListStore.addTodo(text)
    }
  }

  componentDidMount () {
    // @ts-ignore
    todoListStore.fetchTodoList()
  }

  render () {
    const store = this.props.todoListStore!  // D: assert it's not undefined
    return (
      <ul>
        {store.todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
        <li><button onClick={this.addTodo}>Add Todo</button></li>
      </ul>
    )
  }
}


const App: React.FC = () => {
  return (
    <Provider todoListStore={Store.TodoListStore}>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    </Provider>
  )
}

export default App
