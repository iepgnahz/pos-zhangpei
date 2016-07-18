'use strict'
function printReceipts(cartItems){
  var  mergedCartItem = mergeCartItem(cartItems);
  var  subTotal = computeSubTotal(mergedCartItem);
  var  sumTotal = computeSum(subTotal);
  print(sumTotal);
}

function mergeCartItem(cartItems){
  let mergedCartItem = [];
  for(let i = 0; i < cartItems.length; i++){
    let existItem = mergedCartItem.find(function(item){
      return item.barcode == cartItems[i].barcode;
     });
    if(existItem){
      existItem.subCount++;
    }else{
      mergedCartItem.push(Object.assign({},cartItems[i],{subCount: 1}))
    }
  }
  return mergedCartItem;
}

function computeSubTotal(mergedCartItem){
  let subTotal = [];
  for(let i=0; i < mergedCartItem.length; i++){
    let subPrice = mergedCartItem[i].subCount * mergedCartItem[i].price;
    subTotal.push(Object.assign({}, mergedCartItem[i], { subPrice: subPrice }));
  }
  return subTotal;
}

function computeSum(subTotal){
  let sumTotal = [];
  let sum = 0;
  for(let i = 0; i < subTotal.length; i++){
    sum += parseFloat(subTotal[i].subPrice);
  }
  sumTotal = { subTotal: subTotal, totalPrice: sum }
  return sumTotal;
}

function print(sumTotal){
  var attr = "";
  var str = "";
  for(let i = 0; i < sumTotal.subTotal.length; i++){
    for(attr in sumTotal.subTotal[i]){
      str += (attr + ": " + sumTotal.subTotal[i][attr] + "  ");
    }
    str += "\n";
  }
  str += "totalPrice " + sumTotal.totalPrice;
  console.log(str)
}
let cartItems = [
  {
    barcode: "ITEM000001",
    name: "电池",
    unit: "个",
    price: 2.00
  },
  {
    barcode: "ITEM000002",
    name: "可口可乐",
    unit: "个",
    price: 2.00
  },
  {
    barcode: "ITEM000002",
    name: "可口可乐",
    unit: "个",
    price: 2.00
  }
];
window.onload = function(){
   printReceipts(cartItems)
}
