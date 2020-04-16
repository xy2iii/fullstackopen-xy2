import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newObj =>
  axios.put(baseUrl, newObj).then(response => response.data)

const update = (id, newObj) =>
  axios.put(`${baseUrl}/${id}`, newObj).then(response => response.data)

export default {
  getAll: getAll,
  create: create,
  update: update,
}
