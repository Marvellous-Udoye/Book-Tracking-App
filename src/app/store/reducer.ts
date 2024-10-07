// interface Bug {
//   id: number;
//   description: string;
//   resolved: boolean;
// }

// interface Action {
//   type: string;
//   payload: {
//     id: number;
//     description: string;
//   }
// }

// let lastId = 0

// function reducer(state: Bug[] = [], action: Action) {
//   switch (action.type) {
//     case "bugAdded":
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false
//         }
//       ]
//     case "bugRemoved":
//       return state.filter((bug) => bug.id !== action.payload.id)
//     default:
//       return state
//   }
//   if (action.type === "bugAdded") {
//     return [
//       ...state,
//       {
//         id: ++lastId,
//         description: action.payload.description,
//         resolved: false
//       }
//     ]
//   } else if (action.type === "bugRemoved") {
//     return state.filter((bug) => bug.id !== action.payload.id)
//   }

//   return state
// }

// export default reducer;