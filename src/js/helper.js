import { async } from 'regenerator-runtime';
import { TIMOUT_SEC, REC_PER_PAGE } from './configuration.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    //prettier-ignore
    const fetchURL= uploadData ? fetch(url, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(uploadData)}) : fetch(url);
    const response = await fetchURL;
    const data = await response.json();

    if (!response.ok)
      throw new Error(`${data.message} Error code: (${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const numberOfPages = length => {
  return Math.ceil(length / REC_PER_PAGE);
};

// export const getJSON = async url => {
//   try {
//     const response = await Promise.race([fetch(url), timeout(TIMOUT_SEC)]);

//     const data = await response.json();

//     if (!response.ok)
//       throw new Error(`${data.message} Error code: (${response.status})`);

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchUrl = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const res = await fetchUrl;
//     const data = await res.json();

//     return data;
//   } catch (err) {
//     console.error(err.message);
//   }
// };
