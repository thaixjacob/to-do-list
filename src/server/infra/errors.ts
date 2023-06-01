// --> BACKEND (Custom error class)
/*

This custom class is used to represent an error in an HTTP request. When instantiating an object of this class,
a custom error is created with the message and status set. This allows the application to throw a specific error
to indicate that a requested resource was not found.

*/

export class HttpNotFoundError extends Error {
  status: number

  constructor(message: string) {
    super()
    this.message = message
    this.status = 404
  }
}
