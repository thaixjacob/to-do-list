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

export const todoController = {
  get,
}
