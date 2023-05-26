/* eslint-disable no-console */
// --> FRONTEND (View - Displays everything to the user)
/*

Defines the structure and layout of the frontend application's home page.

*/

import React from 'react'
import { GlobalStyles } from '@ui/theme/GlobalStyles'
import { todoController } from '@ui/controller/todo'

const BACKGROUND_IMAGE =
  'https://img.freepik.com/free-photo/calendar-planner-agenda-schedule-concept_53876-133697.jpg?w=996&t=st=1683805630~exp=1683806230~hmac=7a118bb63f487d0e78dd994c04322297ac4bace251f71053f9865ad65830ef8e'

interface HomeTodo {
  id: string
  content: string
}

function HomePage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = React.useState(false)
  const [totalPages, setTotalPages] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const [todos, setTodos] = React.useState<HomeTodo[]>([])
  const [search, setSearch] = React.useState('')

  const homeTodos = todoController.filterTodosByContent<HomeTodo>(search, todos) //derived state in React

  const hasNoTodos = homeTodos.length === 0 && !isLoading
  const hasMorePages = totalPages > page

  // Load infos onload
  React.useEffect(() => {
    setInitialLoadComplete(true)
    if (!initialLoadComplete) {
      todoController
        .get({ page })
        .then(({ todos, pages }) => {
          setTodos(todos)
          setTotalPages(pages)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [])

  return (
    <main>
      <GlobalStyles themeName="orange" />
      <header
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE}')`,
        }}
      >
        <div className="typewriter">
          <h1>What should I do today?</h1>
        </div>
        <form>
          <input type="text" placeholder="Run, Study..." />
          <button type="submit" aria-label="Add new item">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input
            type="text"
            placeholder="Filter current list, e.g. Dentist"
            value={search}
            onChange={function handleSearch(event) {
              setSearch(event.target.value) //onChange in React
            }}
          />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Task</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {homeTodos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{todo.id.substring(0, 4)}</td>
                  <td>{todo.content}</td>
                  <td align="right">
                    <button data-type="delete">Delete</button>
                  </td>
                </tr>
              )
            })}

            {isLoading && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                  Loading...
                </td>
              </tr>
            )}

            {hasNoTodos && (
              <tr>
                <td colSpan={4} align="center">
                  No items found
                </td>
              </tr>
            )}

            {hasMorePages && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                  <button
                    data-type="load-more"
                    onClick={() => {
                      setIsLoading(true)
                      const nextPage = page + 1

                      setPage(nextPage)

                      todoController
                        .get({ page: nextPage })
                        .then(({ todos, pages }) => {
                          setTodos((oldTodos) => {
                            return [...oldTodos, ...todos]
                          })
                          setTotalPages(pages)
                        })
                        .finally(() => {
                          setIsLoading(false)
                        })
                    }}
                  >
                    Page {page}. Show more{' '}
                    <span
                      style={{
                        display: 'inline-block',
                        marginLeft: '4px',
                        fontSize: '1.2em',
                      }}
                    >
                      ↓
                    </span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default HomePage
