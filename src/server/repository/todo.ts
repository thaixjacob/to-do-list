// --> BACKEND (Repository - Takes the data sources and defines the flow that things have to happen on the screen)
/*

Implements a repository for "all" related operations (tasks or items to be done) using a read mechanism called
read provided by the @db-crud-todo module.

*/

// Supabase ==================================================================
// TODO: Separar em outro arquivo

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SECRET_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// ===========================================================================

import { read, create, update, deleteById as dbDeleteById } from '@db-crud-todo'
import { HttpNotFoundError } from '@server/infra/errors'
import { Todo, TodoSchema } from '@server/schema/todo'

interface TodoRepositoryGetParams {
  page?: number
  limit?: number
}
interface TodoRepositoryGetOutput {
  todos: Todo[]
  total: number
  pages: number
}
async function get({ page, limit }: TodoRepositoryGetParams = {}): Promise<TodoRepositoryGetOutput> {
  const currentPage = page || 1
  const currentLimit = limit || 10
  const startIndex = (currentPage - 1) * currentLimit
  const endIndex = currentPage * currentLimit - 1

  const { data, error, count } = await supabase
    .from('todos')
    .select('*', {
      count: 'exact',
    })
    .order('date', { ascending: false })
    .range(startIndex, endIndex)

  if (error) {
    throw new Error('Failed to fetch data')
  }

  const parsedData = TodoSchema.array().safeParse(data)

  if (!parsedData.success) {
    throw new Error('Failed to parse TODO from database')
  }

  const todos = parsedData.data
  const total = count || todos.length
  const totalPages = Math.ceil(total / currentLimit)

  return {
    todos,
    total,
    pages: totalPages,
  }
}

async function createByContent(content: string): Promise<Todo> {
  const newTodo = create(content)

  return newTodo
}

async function toggleDone(id: string): Promise<Todo> {
  const ALL_TODOS = read()

  const todo = ALL_TODOS.find((todo) => todo.id === id)

  if (!todo) throw new Error(`It was not possible to find a to do with id ${id}`)

  const updatedTodo = update(todo.id, {
    done: !todo.done,
  })

  return updatedTodo
}

async function deleteById(id: string) {
  const ALL_TODOS = read()
  const todo = ALL_TODOS.find((todo) => todo.id === id)

  if (!todo) throw new HttpNotFoundError(`Todo with id "${id}" not found`)
  dbDeleteById(id)
}

export const todoRepository = {
  get,
  createByContent,
  toggleDone,
  deleteById,
}
