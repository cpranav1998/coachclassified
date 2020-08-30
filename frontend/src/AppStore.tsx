import { types, cast, flow } from 'mobx-state-tree'


const Todo = types.model('Todo', {  // A: define a model
  id: types.number,
  text: types.string,
  completed: types.boolean
}).actions(self => ({    // B: define actions
  markAsCompleted () {
    self.completed = true
  }
}))

let nextTodoId = 10    // Used for id allocation only

const TodoListStore = types.model('TodoListStore', {
  todos: types.array(Todo)
}).views(self => ({  // A: define computed properties
  get numCompletedTodo () {
    return self.todos.filter(todo => todo.completed).length
  },
  getTodoById (todoId: number) {
    return self.todos.find(todo => todo.id === todoId)
  }
})).actions(self => ({
  addTodo: flow(function * addTodo (text: string) { // B: define asynchronous actions
    // Replace with real interactions with the server
    const newTodo = yield Promise.resolve({ id: nextTodoId++, text, completed: false })
    self.todos.push(newTodo)
  }),
  fetchTodoList: flow(function * fetchTodoList () {
    // Replace with real interactions with the server
    const todoList = yield Promise.resolve([{ id: 1, text: 'A todo item', completed: false }])
    self.todos = cast(todoList)     // C: cast from snapshot types to model types
  })
}))

export {Todo, TodoListStore}