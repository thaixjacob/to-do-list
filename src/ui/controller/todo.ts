// --> FRONTEND (Controller - Handles the response received from the server.)
/*

Defines a controller called todoController that has a get function. This function takes a page parameter,
which represents the desired results page, and uses the todoRepository to fetch the data related to
"todo" based on the given parameters.

*/

import { todoRepository } from '@ui/repository/todo' //Accesses/manipulates the data of "todo"
import { Todo } from '@ui/schema/todo'
import { z as schema } from 'zod'

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
  const parsedParams = schema.string().nonempty().safeParse(content)

  if (!parsedParams.success) {
    onError()
    return
  }

  todoRepository
    .createByContent(parsedParams.data)
    .then((newTodo) => {
      onSuccess(newTodo)
    })
    .catch(() => {
      onError
    })
}

interface TodoControllerToggleDoneParams {
  id: string
  updateTodoOnScreen: () => void
  onError: () => void
}
function toggleDone({ id, updateTodoOnScreen, onError }: TodoControllerToggleDoneParams) {
  // Optmistic Update
  // updateTodoOnScreen();

  todoRepository
    .toggleDone(id)
    .then(() => {
      // Update Real
      updateTodoOnScreen()
    })
    .catch(() => {
      onError()
    })
}

export const todoController = {
  get,
  filterTodosByContent,
  create,
  toggleDone,
}
