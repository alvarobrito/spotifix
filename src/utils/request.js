function get({ url }) {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response;
    }
    const error = new Error(response.statusText);
    error.status = response.status;
    error.response = response;
    throw error;
  });
}

export { get };
