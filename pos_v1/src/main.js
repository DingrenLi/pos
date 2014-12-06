//TODO: Please write code in this file.

//TODO: Please write code in this file.
//TODO: Please write code in this

var context = "";
function List() {

}

function  printInventory (input_list) {
    var list_total = CalculateTotalItem(input_list);
    var list_promotion = CalculatePromotionItem(list_total);


    context += '***<没钱赚商店>购物清单***\n';
    PrintListTotal(list_total,list_promotion);
    context += '----------------------\n';
    context += '挥泪赠送商品：\n';
    PrintListPromotion(list_promotion);
    context += '----------------------\n';
    PrintResult(list_total,list_promotion);
    context += '**********************';

    console.log(context);
}
function CalculateTotalItem(input_list){
    var list_total = new List();
    for (var location = 0;location < input_list.length; location++){
        var barcode = input_list[location].split('-')[0];
        var count = input_list[location].split('-')[1];
        count = (count == null) ? 1 : count;
        if(!list_total[barcode]){
            list_total[barcode] = 0;}
        list_total[barcode] += parseInt(count);}
    return list_total;
}
function CalculatePromotionItem(list_total){
    var list_promotion=new List();
    for(barcode in list_total)
        var count=CalculateItemNumber(list_total[barcode]);
    if((!IsInPromotionItem(barcode))&&(count>0)) {
        list_promotion[barcode]=count;
    }
    return list_promotion;
}
/**
 * @return {number}
 */
function CalculateItemNumber(count){
    if(count>=3){
        return parseInt(count / 3);
    }
    return -1;
}
/**
 * @return {number}
 */
function  IsInPromotionItem(barcode){
    var promotions = loadPromotions();
    for (var location = promotions.length - 1; location >= 0; location--) {
        if((promotions[location].barcodes.indexOf(barcode) >= 0)&&(promotions[location].type=='BUY_TWO_GET_ONE_FREE')){
            return 0;}}
    return -1;
}
function PrintListTotal(list_total,list_promotion){
    var list_all = loadAllItems()
    for(var location in list_all ){
        if(list_all[location].barcode in list_total){
            var barcode = list_all[location].barcode;
            var count = list_total[barcode];
            var freeCount = 0;
            if(list_promotion[barcode]){
                freeCount = parseInt(list_promotion[barcode]);
            }
            context += '名称：' +list_all[location].name + '，' +
            '数量：' + count + list_all[location].unit + '，' +
            '单价：' + list_all[location].price.toFixed(2) + '(元)，' +
            '小计：' + (list_all[location].price * (count - freeCount)).toFixed(2) + '(元)\n';
        }
    }

}
function PrintListPromotion(list_promotion){
    var allItems = loadAllItems()
    for(var location in allItems){
        if(allItems[location].barcode in list_promotion){
            var barcode = allItems[location].barcode;
            var count = list_promotion[barcode];
            context += '名称：' + allItems[location].name + '，' +
            '数量：' + count + allItems[location].unit + '\n';
        }
    }

}
function PrintResult(list_total,list_promotion){
    var allItems = loadAllItems()
    var totalCost = 0,savedCost = 0;
    for(var location in allItems){
        if(allItems[location].barcode in list_total){
            var barcode = allItems[i].barcode;
            var count = list_promotion[barcode];
            if(list_promotion[barcode]){
                count -= parseInt(list_promotion[barcode]);
            }
            totalCost += allItems[location].price * count;
        }

    }
    context += '总计：' + totalCost.toFixed(2) + '(元)\n' +
    '节省：' + savedCost.toFixed(2) + '(元)\n';
}






