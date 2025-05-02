const pagePerRow = 10;
const currentPage = 11;
const totalRow = 250;
const maxBlock = 5;
const totalPage = Math.floor(totalRow / pagePerRow);
const lastBlock = totalPage;
const startRowNumber = (( currentPage - 1 ) * pagePerRow ) + 1;
const startBlock = (Math.floor(currentPage / maxBlock) * maxBlock) + 1
const endBlock = startBlock + maxBlock - 1;


// Math.floor = 내림
// Math.ceil = 올림
// Math.round = 반올림