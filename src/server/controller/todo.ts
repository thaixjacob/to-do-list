// --> BACKEND (controller - Takes the data sources and defines the flow that things have to happen on the screen)
/*

The code defines a CONTROLLER for the "GET" route of an API. When this route is accessed, the get function is executed.
Within the get function, the read method of the @db-crud-todo module is called to get all the "alls" (tasks) from the database.
An HTTP response is then sent with status 200 and the body containing a JSON object with the "all" property, which contains the fetched alls.

*/

import { read } from '@db-crud-todo'
import { NextApiRequest, NextApiResponse } from 'next'

function get(_req: NextApiRequest, res: NextApiResponse) {
  const ALL_TODOS = read()

  res.status(200).json({ todos: ALL_TODOS })
}

export const todoController = {
  get,
}
