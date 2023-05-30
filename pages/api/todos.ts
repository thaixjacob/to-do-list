// --> BACKEND
/*

The code defines a default handler for an API route, defining the logic for handling HTTP requests.
When a request is made to this route, the code checks the method of the request.

*/

import { NextApiRequest, NextApiResponse } from 'next'
import { todoController } from '@server/controller/todo'

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    todoController.get(request, response)
    return
  }

  if (request.method === 'POST') {
    todoController.create(request, response)
    return
  }

  response.status(405).json({
    error: {
      message: 'Method not allowed',
    },
  })
}
