export const makeServerRequest = async (method, request, parameters) => {
    switch (method) {
        case 'GET': {
            let url = new URL(`https://loft-taxi.glitch.me/${request}`)
            url.search = new URLSearchParams(parameters).toString();
            return fetch(url).then(res => res.json());
        }
        case 'POST': {
            return fetch(`https://loft-taxi.glitch.me/${request}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameters)
            }).then(res => res.json());
        }
        default: {
            console.log("Undefined method!");
            return;
        }
    }
}