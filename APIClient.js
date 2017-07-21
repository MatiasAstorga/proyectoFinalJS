class APIClient {
    constructor() {}

    get(url) {
        var myHeaders = new Headers();

        var init = {
            method: 'GET',
            headers: myHeaders
        };

        return fetch(url, init).then((response) => response.json());
    }

    post(url, data) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var init = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        };

        return fetch(url, init)
    }

    delete(url, data) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var init = {};
        if (data != undefined) {
            init = {
                method: 'DELETE',
                headers: myHeaders,
                body: JSON.stringify(data)
            };
        } else {
            init = {
                method: 'DELETE',
                headers: myHeaders
            };
        }

        return fetch(url, init);
    }

    update(url, data) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var init = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(data)
        };

        return fetch(url, init);
    }
}