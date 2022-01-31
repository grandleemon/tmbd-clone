export const numberWithCommas = (num:number | undefined) => num && num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
