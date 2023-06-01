// --> BACKEND
/* 

Sets the behaviour of the route handler for the route in question, directing DELETE requests to the
deleteById function and returning an error for other request methods.

*/

import { todoController } from '@server/controller/todo'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'DELETE') {
    todoController.deleteById(request, response)
    return
  }

  response.status(405).json({
    error: {
      message: 'Method not allowed',
    },
  })
}
