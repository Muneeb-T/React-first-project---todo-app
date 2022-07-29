/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import './style.css'
import moment from 'moment'

function App() {
     const today = new Date()
     const [todo, setToDo] = useState('')
     const [todos, setToDos] = useState([])
     const [filter, setFilter] = useState('all')
     const [edit, setEditId] = useState(null)

     const addNewTodo = () => {
          if (todo !== '') {
               if (edit) {
                    const editedTodos = todos.map((currentTodo) =>
                         currentTodo.id === edit
                              ? {
                                     ...currentTodo,
                                     input: todo,
                                }
                              : {
                                     ...currentTodo,
                                },
                    )
                    setToDos(editedTodos)
                    setEditId(null)
               } else {
                    setToDos([
                         {
                              id: Date.now(),
                              input: todo,
                              status: false,
                              date: new Date(),
                         },
                         ...todos,
                    ])
                    setToDo('')
                    if (filter !== 'all') setFilter('all')
               }
          }
     }
     const deleteTodo = (id) => {
          const deleted = todos.filter((currentTodo) => currentTodo.id !== id)
          setToDos([...deleted])
     }

     const changeStatus = (id) => {
          setToDos(
               todos.filter((currentTodo) => {
                    if (currentTodo.id === id) {
                         const { status } = currentTodo
                         currentTodo.status = !status
                         currentTodo.status = status ? null : new Date()
                    }
                    return currentTodo
               }),
          )
     }

     const filterTodos = (todo) => {
          const { status } = todo
          if (
               (status && filter === 'done') ||
               (!status && filter === 'todo') ||
               filter === 'all'
          ) {
               return todo
          }
          return null
     }

     const editTodo = (id, input) => {
          setToDo(input)
          setEditId(id)
     }

     return (
          <main className="to-do-wrapper">
               <header className="to-do-header">
                    <div className="to-do-header-title">
                         <div>
                              <button
                                   className="to-do-header-delete"
                                   onClick={() => setToDos([])}
                              >
                                   🗑
                              </button>
                         </div>
                         <h2 className="to-do-header-date">
                              {moment(today).format('ddd, DD MMM YYYY')}
                         </h2>
                    </div>
                    <div className="to-do-header-input">
                         <input
                              type="text"
                              className="to-do-input"
                              placeholder="Enter todo here"
                              value={todo}
                              autoComplete="false"
                              onChange={(e) => setToDo(e.target.value)}
                         />
                         <button
                              className="to-do-input-submit"
                              onClick={addNewTodo}
                         >
                              {edit ? '📋' : '👈'}
                         </button>
                    </div>
               </header>
               <section className="to-do-content">
                    <div className="navbar">
                         <button
                              onClick={() => setFilter('all')}
                              style={
                                   filter === 'all'
                                        ? {
                                               backgroundColor: 'red',
                                          }
                                        : {}
                              }
                         >
                              All
                         </button>
                         <button
                              onClick={() => setFilter('done')}
                              style={
                                   filter === 'done'
                                        ? {
                                               backgroundColor: 'red',
                                          }
                                        : {}
                              }
                         >
                              Done
                         </button>
                         <button
                              onClick={() => setFilter('todo')}
                              style={
                                   filter === 'todo'
                                        ? {
                                               backgroundColor: 'red',
                                          }
                                        : {}
                              }
                         >
                              Todo
                         </button>
                    </div>

                    {todos.length ? (
                         todos.filter(filterTodos).map((todo) => {
                              const { id, input, status, date, timeDone } = todo

                              return (
                                   <div
                                        className="to-do-content-cards"
                                        key={id}
                                   >
                                        <button
                                             className="to-do-content-card-checkbox"
                                             onClick={() => changeStatus(id)}
                                        >
                                             {status ? '✔' : null}
                                        </button>
                                        <div className="to-do-content-cards-info">
                                             <h3
                                                  className="to-do-content-card-task"
                                                  style={
                                                       status
                                                            ? {
                                                                   textDecorationLine:
                                                                        'line-through ',
                                                                   textDecorationStyle:
                                                                        'solid',
                                                                   color: 'gray',
                                                              }
                                                            : {}
                                                  }
                                             >
                                                  {input}
                                             </h3>
                                             <p className="time">
                                                  Created :{' '}
                                                  {moment(date).format('LT')}
                                                  {status
                                                       ? `, Done : ${moment(
                                                              timeDone,
                                                         ).format('LT')}`
                                                       : null}
                                             </p>
                                        </div>
                                        <div>
                                             <button
                                                  className="to-do-content-card-edit-btn"
                                                  onClick={() =>
                                                       editTodo(id, input)
                                                  }
                                             >
                                                  ✏️
                                             </button>
                                             <button
                                                  className="to-do-content-card-delete-btn"
                                                  onClick={() => deleteTodo(id)}
                                             >
                                                  ❌
                                             </button>
                                        </div>
                                   </div>
                              )
                         })
                    ) : (
                         <Empty />
                    )}
               </section>
          </main>
     )
}

const Empty = () => {
     return (
          <div className="empty-todos">
               <h3 className="empty-message-text">Empty todos</h3>
          </div>
     )
}

export default App
