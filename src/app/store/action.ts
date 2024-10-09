import * as actions from './actionTypes'

// Another Syntax for actionCreators
// export default function bugAdded2(description: string) {
//   return {
//     type: actions.BUG_ADDED,
//     payload: {
//       description: "Bug Oneee"
//     }
//   }
// }

export const bugAdded = (description: string) => (
  // Used () to return a function and not curly bracket that would return a block of code
  {
    type: actions.BUG_ADDED,
    payload: {
      description
    }
  }
)

export const bugRemoved = (id: number) => (
  {
    type: actions.BUG_REMOVED,
    payload: {
      id
    }
  }
)

export const bugResolved = (id: number) => (
  {
    type: actions.BUG_RESOLVED,
    payload: {
      id
    }
  }
)
