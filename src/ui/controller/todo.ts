// --> FRONTEND
/*

Makes an asynchronous request to the API '/api/todos' and handles the response received from the server.

*/

import { todoRepository } from '@ui/repository/todo'

interface TodoControllerGetParams {
  page: number
}

async function get(params: TodoControllerGetParams) {
  return todoRepository.get({ page: params.page, limit: 5 })
}

export const todoController = {
  get,
}
