// --> BACKEND
/*

Responsible for handling a specific API route and returning the appropriate response.

*/

import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({ message: 'Response 200' })
}
