export const urlAPI = 'https://strapi.cleverland.by';

export const config = {
  headers: {
    // Authorization: `Bearer ${token}`,
    Accept: 'application/json, text/plain, */*',
  },
};

export const authRequestInterceptor = () => {
  const token = sessionStorage.getItem('authorization');

  if (config.headers === undefined) {
    config.headers = {};
  }
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';

  return config;
};
