// --> BACKEND
/*

Define o comportamento do manipulador de rota para a rota em questão, direcionando as requisições PUT para a função
toggleDone do controlador de tarefas e retornando um erro para outros métodos de requisição.

*/

import { todoController } from '@server/controller/todo'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'PUT') {
    todoController.toggleDone(request, response)
    return
  }

  response.status(405).json({
    error: {
      message: 'Method not allowed',
    },
  })
}
