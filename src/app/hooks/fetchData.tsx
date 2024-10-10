// import { useState } from "react";

// const [data, setData] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState('')

// const fetchData = async (url: string) => {
//   const response = await fetch(url)
//   try {
//     if (!response) {
//       throw new Error("Unable to fetch data");
//       setLoading(true)
//     }
//     return response
//   } catch (e) {
//     setError(`Error: ${e}`)
//   } finally {
//     setLoading(false)
//   }
// }