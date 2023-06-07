// --> BACKEND
/*

The code defines a default handler for an API route, defining the logic for handling HTTP requests.
When a request is made to this route, the code checks the method of the request.

*/

import { NextApiRequest, NextApiResponse } from 'next'
import { todoController } from '@server/controller/todo'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    await todoController.get(request, response)
    return
  }

  if (request.method === 'POST') {
    await todoController.create(request, response)
    return
  }

  response.status(405).json({
    error: {
      message: 'Method not allowed',
    },
  })
}
