const toThousands = (num: number): string => {
  if (isNaN(num) || typeof num !== 'number') {
    throw new Error('必须是一个有效数字');
  }
  const [integerPart, decimalPart] = String(num).split('.');
  let n = Number(integerPart);
  let d = Number(decimalPart);

  let rem = 0;
  let res = '';
  while (n) {
    rem = n % 1000;
    n = Math.floor(n / 1000);
    if (n) {
      res = ',' + rem + res;
    } else {
      res = rem + res;
    }
  }
  return d ? res + '.' + d : res;
};

export default toThousands;
