/* eslint-disable require-jsdoc */
import axios from 'axios';

export async function logoutUser() {
  return await axios
      .get(`/api/logout`)
      .then((res) => null)
      .catch((err) => console.error(err));
}

export async function fetchUser() {
  return await axios
      .get(`/api/user`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
}

// test function
(async function() {
  return await axios
      .get('/api/me')
      .then((result) => {
        console.log('result.data: ', result.data);
        return result.data;
      })
      .catch((err) => console.error(err));
})();
