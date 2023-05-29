// --> FRONTEND (Controller - Handles the response received from the server.)
/*

Defines a controller called todoController that has a get function. This function takes a page parameter,
which represents the desired results page, and uses the todoRepository to fetch the data related to
"todo" based on the given parameters.

*/

import { todoRepository } from '@ui/repository/todo' //Accesses/manipulates the data of "todo"
import { Todo } from '@ui/schema/todo'

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
  onSuccess: (todo: Todo) => void
}

function create({ content, onError, onSuccess }: TodoControllerCreateParams) {
  //Fail Fast Validation
  if (!content) {
    onError()
    return
  }

  todoRepository
    .createByContent(content)
    .then((newTodo) => {
      onSuccess(newTodo)
    })
    .catch(() => {
      onError
    })
}

export const todoController = {
  get,
  filterTodosByContent,
  create,
}
