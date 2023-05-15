import React from 'react'
import { GlobalStyles } from '@ui/theme/GlobalStyles'

const BACKGROUND_IMAGE =
  'https://img.freepik.com/free-photo/calendar-planner-agenda-schedule-concept_53876-133697.jpg?w=996&t=st=1683805630~exp=1683806230~hmac=7a118bb63f487d0e78dd994c04322297ac4bace251f71053f9865ad65830ef8e'

function HomePage() {
  return (
    <main>
      <GlobalStyles themeName="orange" />
      <header
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE}')`,
        }}
      >
        <div className="typewriter">
          <h1>What should I do today?</h1>
        </div>
        <form>
          <input type="text" placeholder="Run, study..." />
          <button type="submit" aria-label="Add new item">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input type="text" placeholder="Filter current list, e.g. Dentist" />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Task</th>
              <th />
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>d4f26</td>
              <td>Walk for 30 minutes in the park in the morning.</td>
              <td align="right">
                <button data-type="delete">Delete</button>
              </td>
            </tr>

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                Loading...
              </td>
            </tr>

            <tr>
              <td colSpan={4} align="center">
                No items found
              </td>
            </tr>

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: 'center' }}>
                <button data-type="load-more">
                  Show more{' '}
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: '4px',
                      fontSize: '1.2em',
                    }}
                  >
                    ↓
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default HomePage
