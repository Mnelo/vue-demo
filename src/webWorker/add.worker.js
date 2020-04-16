self.onmessage = (e) => {
  let res = e.data;
  for (let i = 0; i < 1000000000; i++) {
    res++;
  }

  self.postMessage(res);
};
