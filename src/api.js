export const serverLogIn = async (email, password) => {
  return fetch(
    `https://loft-taxi.glitch.me/auth?username=${email}&password=${password}`
  ).then(res => res.json()).then(data => data.success);
};

export const serverCard = async (cardName, cardNumber, expiryDate, cvc) => {
  return fetch(
    `https://loft-taxi.glitch.me/card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cardName, cardNumber, expiryDate, cvc})
    }
  ).then(res => res.json()).then(data => data.success);
};