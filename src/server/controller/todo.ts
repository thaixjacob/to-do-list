// --> BACKEND (Controller - Takes the data sources and defines the flow that things have to happen on the screen)
/*

When we send the code to the user's screen, what we will have is the output code coming out of the backend.

*/

import { todoRepository } from '@server/repository/todo'
import { NextApiRequest, NextApiResponse } from 'next'

function get(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query
  const page = Number(query.page)
  const limit = Number(query.limit)

  if (query.page && isNaN(page)) {
    res.status(400).json({ error: { message: '`page` must be a number' } })
    return
  }

  if (query.limit && isNaN(limit)) {
    res.status(400).json({ error: { message: '`limit` must be a number' } })
    return
  }

  const output = todoRepository.get({ page, limit })

  res.status(200).json({ total: output.total, pages: output.pages, todos: output.todos })
}

export const todoController = {
  get,
}
