/* eslint-disable quotes */

const BASE_URL = 'http://localhost:3000'
describe('/ - Todos Feed', () => {
  it('when load, renders the page', () => {
    // Trailing Slash
    cy.visit(BASE_URL)
  })

  it('when create a new todo, it must appears in the screen', () => {
    // 0 - interceptation
    cy.intercept('POST', `${BASE_URL}/api/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: '4e995049-b1d5-41a0-9b1f-bd4c4592a4eb',
            date: '2023-06-05T13:16:36.458Z',
            content: 'Test todo',
            done: false,
          },
        },
      })
    }).as('createTodo')

    // 1 - open the page
    cy.visit(BASE_URL)

    // 2 - select the input && type in the input to create a new todo
    const inputAddTodo = "input[name='add-todo']"
    cy.get(inputAddTodo).type('Test todo')

    // 3 - click the button to create it
    const btnAddTodo = "[aria-label='Add new item']"
    cy.get(btnAddTodo).click()

    // 4 - check if it creates a new todo successfully
    cy.get('table > tbody').contains('Test todo')
  })
})
