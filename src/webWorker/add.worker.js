self.onmessage = (e) => {
  let number = e.data;
  let reslut;
  for (let i = 2; i < number - 1; i++) {
    if (!(number % i)) {
      reslut = `不是质数,可被${i}整除`;
      self.postMessage(reslut);

      return;
    }
  }

  reslut = "是质数";

  self.postMessage(reslut);
};
