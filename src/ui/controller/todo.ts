// --> FRONTEND (Controller - Handles the response received from the server.)
/*

Defines a controller called todoController that has a get function. This function takes a page parameter,
which represents the desired results page, and uses the todoRepository to fetch the data related to
"todo" based on the given parameters.

*/

import { todoRepository } from '@ui/repository/todo' //Accesses/manipulates the data of "todo"

interface TodoControllerGetParams {
  page: number
}

async function get(params: TodoControllerGetParams) {
  return todoRepository.get({ page: params.page, limit: 10 })
}

function filterTodosByContent<Todo>(search: string, todos: Array<Todo & { content: string }>): Todo[] {
  const homeTodos = todos.filter((todo) => {
    const searchNormalized = search.toLowerCase()
    const contentNormalized = todo.content.toLowerCase()
    return contentNormalized.includes(searchNormalized)
  })
  return homeTodos
}

interface TodoControllerCreateParams {
  content?: string
  onError: () => void
  onSuccess: (todo: any) => void
}

function create({ content, onError, onSuccess }: TodoControllerCreateParams) {
  //Fail Fast em caso de nao tiver o content.
  if (!content) {
    onError()
    return
  }

  //It will come from the repository
  const todo = {
    id: '4585',
    content,
    date: new Date(),
    done: false,
  }

  onSuccess(todo)
}

export const todoController = {
  get,
  filterTodosByContent,
  create,
}
