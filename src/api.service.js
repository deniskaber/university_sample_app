
export const BASE_URL = 'http://localhost:3001/api';

class ApiService {
    get(url, parameters) {
        return fetch(url, {
            method: 'GET',
            credentials: "same-origin",
            cache: "no-cache",
            headers: {
                "Accept-Charset": 'utf-8',
            },
        })
            .then(response => response.json())
            .then(this._checkResponseError);
    }

    post(url, parameters) {
        return fetch(url, {
            method: 'POST',
            credentials: "same-origin",
            cache: "no-cache",
            headers: {
                "Accept-Charset": 'utf-8',
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(parameters.data),
        })
            .then(response => response.json())
            .then(this._checkResponseError);
    }

    put(url, parameters) {
        return fetch(url, {
            method: 'PUT',
            credentials: "same-origin",
            cache: "no-cache",
            headers: {
                "Accept-Charset": 'utf-8',
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(parameters.data),
        })
            .then(response => response.json())
            .then(this._checkResponseError);
    }

    delete(url, parameters) {
        return fetch(url, {
            method: 'DELETE',
            credentials: "same-origin",
            cache: "no-cache",
            headers: {
                "Accept-Charset": 'utf-8',
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(response => response.json())
            .then(this._checkResponseError);
    }

    _checkResponseError(parsed) {
        if (parsed.success === false) {
            return Promise.reject(parsed);
        }

        return parsed;
    }
}

export const apiService = new ApiService();
