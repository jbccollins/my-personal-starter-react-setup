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

const httpReturn = async (res: Response, parseJson: boolean) => {
  if (parseJson) {
    return await res.json();
  } else {
    return res;
  }
}

export default {
  Get: async (path: string, parseJson: boolean = true) => {
    const res = await fetch(path, getOptions('GET'));
    const toReturn = await httpReturn(res, parseJson);
    return toReturn;
  },
  Post: async (path: string, data: object, parseJson: boolean = true) => {
      const res = await fetch(path, getOptions('POST', data));
      const toReturn = await httpReturn(res, parseJson);
      return toReturn;
  },
  Put: function (path: string, data: object) {
      return fetch(path, getOptions('PUT', data));
  },
  Delete: function (path: string) {
      return fetch(path, getOptions('DELETE'));
  }
}