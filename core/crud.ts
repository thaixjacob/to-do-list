// --> BACKEND
/*

Code related to CRUD operations (Create, Read, Update, Delete) to manage a list of tasks (all)

*/

import fs from 'fs' // ES6
import { v4 as uuid } from 'uuid'

const DB_FILE_PATH = './core/db'

//type UUID = string

interface Todo {
  id: string
  date: string
  content: string
  done: boolean
}

export function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  }

  const todos: Todo[] = [...read(), todo]

  // salvar o content no sistema
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2))
  return todo
}

export function read(): Array<Todo> {
  // ler o content no sistema
  const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8')
  const db = JSON.parse(dbString || '{}')
  if (!db.todos) {
    return []
  }
  return db.todos
}

/* function update(id: UUID, partialTodo: Partial<Todo>) {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  );

  if (!updatedTodo) {
    throw new Error('Please, provide another ID!');
  }

  return updatedTodo;
} */

/* function updateContentById(id: UUID, content: string): Todo {
  return update(id, {
    content,
  });
} */

/* 
function deleteById(id: UUID) {
  const todos = read();
  const todosWhitoutOne = todos.filter((todo) => {
    if (id === todo.id) {
      return false;
    }
    return true;
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos: todosWhitoutOne,
      },
      null,
      2
    )
  );
} */

/* function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, '');
} */

// [SIMULATION]
/* CLEAR_DB();

create('Primeira TODO');

const secondTodo = create('Segunda TODO');
deleteById(secondTodo.id);

const thirdTodo = create('Terceira TODO');
updateContentById(thirdTodo.id, 'Terceira TODO Atualizada');

create('Quarta TODO');

const todos = read();
console.log(todos);
console.log(todos.length);
 */
