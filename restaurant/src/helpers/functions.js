export const getSelectOptions = arr => {
  let res = [];
  if (arr?.length > 0) {
    arr.forEach(item => {
      res.push({ value: item._id, label: item.title });
    });
  }
  return res;
};


export function currencyFormat(num) {
    return '$' + num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }