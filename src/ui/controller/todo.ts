// --> FRONTEND
/*

Makes an asynchronous request to the API '/api/todos' and handles the response received from the server.

*/

import { todoRepository } from '@ui/repository/todo'

interface TodoControllerGetParams {
  page?: number
}

async function get({ page }: TodoControllerGetParams = {}) {
  return todoRepository.get({ page: page || 1, limit: 10 })
}

export const todoController = {
  get,
}
