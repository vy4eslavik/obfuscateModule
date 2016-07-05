/**
 * @param {Array} data – массив CSS классов
 */
module.exports = function (data) {
    // init global params
    var result = {},                                                                            //  outObject
        classCount = [],                                                                        //  rating Class
        usageShortName = {},                                                                    //  dictionary usage shortName
        firstCharList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',                 //  charList for generate shortList
        OtherCharsList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';    //  charList+number+symbol for generate shortList

    // Generate rating class in classCount; classCount = [{className, count}]
    var i = -1;
    data.slice().sort().reduce(function (array, el) {
        if (!array.length || array.length && array[array.length - 1] != el) {
            array.push(el);
            classCount.push({className: el, count: 1});
            i++;
        }else{
            classCount[i].count++;
        }
        return array;
    }, []);

    console.log('Count unique classes: '+classCount.length);
    // Sort classCount Descending by classCount[].count
    classCount = classCount.sort(function(a,b){
        if(a.count < b.count){
            return 1;
        }else{
            return -1;
        }
    });

    console.log('Max count of the class: '+classCount[0].className+' ('+classCount[0].count+')');
    // generate shortName
    classCount.forEach(function(item, index){
        if(i < firstCharList.length){
            //  top class have 1 symbol
            result[item.className] = firstCharList[index];
        }else{
            //  other class have 2-3 symbol
            result[item.className] = generateShortName(index);
        }
    });
    // generate random shortName 2-3 symbol
    function generateShortName(index){
        // max combination 3328
        var shortName;
        shortName = firstCharList.charAt(Math.floor(Math.random()*firstCharList.length)) +
            OtherCharsList.charAt(Math.floor(Math.random()*OtherCharsList.length));
        if(index > 2500){
            // max combination 212992
            shortName += OtherCharsList.charAt(Math.floor(Math.random()*OtherCharsList.length));
        }
        if(usageShortName[shortName]){
            // current shortClassName usage
            return generateShortName();
        }else{
            // add to dictionary current shortClassName
            usageShortName[shortName] = true;
            return shortName;
        }
    }

    return result;
};