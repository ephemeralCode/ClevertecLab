export const authRequestInterceptor = (axiosConfig) => {
  const token = localStorage.getItem('authorization');
  const config = { ...axiosConfig };

  if (config.headers === undefined) {
    config.headers = {};
  }
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json, text/plain, */*';

  return config;
};
