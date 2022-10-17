import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
    //TEST
    console.log(`token: ${JSON.stringify(newToken)}`);
    //ENDTEST
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

        //TEST
        console.log(`create response.data: ${JSON.stringify(response.data)}`);
        //ENDTEST

        return response.data;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}

const update = async (blogId, likes) => {

    console.log(`url: ${baseUrl}/${blogId}`);
    console.log(`likes: ${likes}`);

    try {
        const response = await axios.put(`${baseUrl}/${blogId}`, { likes });
        return response.data;
    }
    catch (error) {
        console.log(`Error: ${error.message} ${blogId}`);
        throw error;
    }
}

const destroy = async (blogId) => {
    const config = {
        headers: {Authorization: token},
    }

    try {
        const response = await axios.delete(`${baseUrl}/${blogId}`, config);
        return response.data;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}


export default { getAll, setToken, create, update, destroy }