// export const getDataPromise = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       fetch("http://localhost:4000/api")
//         .then(response => {
//           const json = response.json();
//           resolve(json);
//         })
//         .catch(error => reject(error));
//     }, 5000);
//   });
// };
export const getDataPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(process.env.PUBLIC_URL + "/insomnia.json")
        .then(response => {
          const json = response.json();
          resolve(json);
        })
        .catch(error => reject(error));
    }, 100);
  });
};
