// --> FRONTEND
/* 

Fonte da verdade do meu dado, onde o controller obtem a informaçao
Perguntar: O que recebo e o que retorno?
*/

interface TodoRepositoryGetParams {
  page: number
  limit: number
}

interface TodoRepositoryGetOutput {
  todos: Todo[]
  total: number
  pages: number
}

function get({ page, limit }: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  return fetch('/api/todos').then(async (serverResponse) => {
    const todosString = await serverResponse.text()
    const todosFromServer = JSON.parse(todosString).todos

    const ALL_TODOS = todosFromServer
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex)
    const totalPages = Math.ceil(ALL_TODOS.lenght / limit)

    return {
      todos: paginatedTodos,
      total: ALL_TODOS.lenght,
      pages: totalPages,
    }
  })
}

export const todoRepository = {
  get,
}

//Model/Schema
interface Todo {
  id: string
  content: string
  date: Date
  done: boolean
}
