const arrDelElement = function (arr, index) {
    let tempArr = [...arr];
    tempArr.splice(index, 1);
    return tempArr;
};

export default arrDelElement;