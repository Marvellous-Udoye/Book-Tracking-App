import store from '../store/store';

// store.dispatch({
//   type: actions.BUG_ADDED,
//   payload: {
//     description: "Bug One"
//   }
// })
// // Return bug 2 and 3
// store.dispatch({
//   type: actions.BUG_REMOVED,
//   payload: {
//     id: 1
//   }
// })

console.log(store.getState())