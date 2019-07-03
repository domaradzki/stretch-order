export const getDataPromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch("http://localhost:5000/api")
          .then(response => {
            const json = response.json();
            resolve(json);
          })
          .catch(error => reject(error));
      }, 5000);
    });
  };