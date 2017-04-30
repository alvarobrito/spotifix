import config from '@/config';

function request({ url, options = {} }) {
  var myRequest = new Request(url, options);
  return fetch(myRequest).then((response) => {
    if (response.ok) {
      return response;
    }
    const error = new Error(response.statusText);
    error.status = response.status;
    error.response = response;
    throw error;
  });
}

function getAuthCode() {
  const { accounts, clientId, clientSecret, scopes } = config.spotify;
  const url = new URL(accounts.auth);
  const params = {
    client_id: clientId,
    client_secret: clientSecret,
    response_type: 'code',
    redirect_uri: accounts.redirectURI,
    scope: scopes.user,
  };

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  return url;
}

export { request, getAuthCode };
