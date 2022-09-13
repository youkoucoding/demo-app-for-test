var axios =require('axios')


const useFetch = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", //fakeApi
  timeout: 2000,
})

const getAsync = async () => {
  return await useFetch.get()
}

export { getAsync }