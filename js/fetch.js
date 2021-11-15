const fetchOffers = (onSuccess, onError) => {

  fetch('https://24.javascript.pages.academy/keksobooking/data')
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
  fetch('https://24.javascript.pages.academy/keksobooking', {
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


export {fetchOffers, uploadOffer};
