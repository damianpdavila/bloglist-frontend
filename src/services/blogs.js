import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: {Authorization: token},
  }

  try {
      const response = await axios.post(baseUrl, newBlog, config);
      return response.data;
  }
  catch (error) {
      console.log(error.message);
      throw error;
  }
}

export default { getAll, setToken, create }