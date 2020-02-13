import fetch from 'isomorphic-fetch';

const getOptions = (verb: string, data?: object) => {
  const options: RequestInit = {
    method: verb,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}

export default {
  Get: function (path: string) {
    return fetch(path, getOptions('GET'))
  },
  Post: function (path: string, data: object) {
      return fetch(path, getOptions('POST', data));
  },
  Put: function (path: string, data: object) {
      return fetch(path, getOptions('PUT', data));
  },
  Delete: function (path: string) {
      return fetch(path, getOptions('DELETE'));
  }
}