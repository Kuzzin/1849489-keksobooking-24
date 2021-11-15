const URL_GET = 'https://24.javascript.pages.academy/keksobooking/data';
const URL_POST = 'https://24.javascript.pages.academy/keksobooking';

const fetchOffers = (onSuccess, onError) => {
  fetch(URL_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

const uploadOffer = (onSuccess, onError, body) => {
  fetch(URL_POST, {
    method: 'POST',
    'Content-Type': 'multipart/form-data',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export { fetchOffers, uploadOffer };
