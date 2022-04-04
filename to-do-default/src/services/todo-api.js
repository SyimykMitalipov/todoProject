

class TodoApi {
    _baseUrl = 'http://abdyko.tmweb.ru/api'
    _credentials = JSON.parse(localStorage.getItem('credentials')) 


    login = (username , password) => {
        fetch( 
            `${this._baseUrl}/token/`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            }
        ).then(response => {
            if(response.ok){
                return response.json()
            }else {
                throw new Error('Something was wrong!')
            }
        }).then(data => {
            localStorage.setItem('credentials', JSON.stringify(data))
            window.location.reload
        }).catch(err => {
            localStorage.removeItem('credentials')
            window.location.reload
        })
    }

    getTodos = () => {
        const credentials =  this._credentials

       return fetch(
            `${this._baseUrl}/v1/todo/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${credentials.access}`
                }
            }
        ).then(response => {
            return response.json()
        })
    }
    createTodos = (label) => {
        const credentials =  this._credentials

       return fetch(
            `${this._baseUrl}/v1/todo/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${credentials.access}`
                },
                body: JSON.stringify({
                    label: label,
                    important: false,
                    done: false,
                })
            }
        ).then(response => {
            return response.json()
        })
    }

    deleteTodos = (id) => {
        const credentials =  this._credentials

       return fetch(
            `${this._baseUrl}/v1/todo/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${credentials.access}`
                }
            }
        ).then(response => {
            return response.text()
        })
    }
    updateTodo (id, body) {
        const credentials = this._credentials
        return fetch(
            `${this._baseUrl}/v1/todo/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${credentials.access}`
                },
                body: JSON.stringify(body)
            }
        ).then(response => {
            return response.json()
        })
    }

}

export default TodoApi;