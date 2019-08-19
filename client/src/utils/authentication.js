import axios from 'axios'

const register = ({ username, email, password }) => {
    return axios.post('/user/register', {
        username,
        email,
        password,
    })
}

const login = ({ email, password }) => {
    return axios.post('/user/login', {
        email,
        password,
    })
}

const getAccessToken = () => {
    return localStorage.getItem('auth-token')
}

const setAccessToken = token => {
    localStorage.setItem('auth-token', token)
}

const removeAccessToken = () => {
    localStorage.removeItem('auth-token')
    window.location = '/'
}

const getUser = () => {
    if (getAccessToken()) {
        return axios.get('/user/getuser', {
            headers: { 'auth-token': getAccessToken() },
        })
    }
}

const createExercise = exercise => {
    if (getAccessToken()) {
        return axios.post('/exercises/add', exercise, {
            headers: { 'auth-token': getAccessToken() },
        })
    }
}

const getExercises = () => {
    if (getAccessToken()) {
        return axios.get('/exercises/', {
            headers: {
                'auth-token': getAccessToken(),
            },
        })
    }
}

const getOneExercise = id => {
    if (getAccessToken()) {
        return axios.get('/exercises/' + id, {
            headers: {
                'auth-token': getAccessToken(),
            },
        })
    }
}

const updateExercise = (id, exercise) => {
    if (getAccessToken()) {
        return axios.post('/exercises/update/' + id, exercise, {
            headers: {
                'auth-token': getAccessToken(),
            },
        })
    }
}

const deleteTheExercise = id => {
    if (getAccessToken()) {
        return axios.delete('/exercises/' + id, {
            headers: {
                'auth-token': getAccessToken(),
            },
        })
    }
}

export {
    register,
    login,
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    getUser,
    createExercise,
    getExercises,
    getOneExercise,
    updateExercise,
    deleteTheExercise,
}
