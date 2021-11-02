export const serverLogIn = (email, password) =>
    fetch(`https://loft-taxi.glitch.me/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(res => res.json());