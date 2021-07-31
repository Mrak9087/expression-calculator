function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let locExpr = expr;
 
    locExpr = locExpr.replace(/\s/g, '').
                    replace(/\+/g, ' + ').
                    replace(/\-/g, ' - ').
                    replace(/\*/g, ' * ').
                    replace(/\//g, ' / ').
                    replace(/\(/g, ' ( ').
                    replace(/\)/g, ' ) ').
                    replace(/\s{2}/g, ' ').
                    trimLeft().trimRight();
    
    let arrExpr = locExpr.split(' ');
 
    if (!checkBrackets(arrExpr)){
        throw Error('ExpressionError: Brackets must be paired')
    }
 
    while (arrExpr.includes('(')){
        let openBracket = -1;
        let closeBracket = -1;
        for (let i = 0; i < arrExpr.length; i++){
            if (arrExpr[i] == '('){
                openBracket = i
            }
        }
        
        if (openBracket > -1){
            closeBracket = arrExpr.indexOf(')', openBracket)
        }
        
        let res = calculate(arrExpr.slice(openBracket+1,closeBracket))
        arrExpr.splice(openBracket,closeBracket - openBracket + 1, res)
    }

    if (arrExpr.length == 1){
        return arrExpr[0]
    }
 
    return calculate(arrExpr);
 
    
}
 
function checkBrackets(arr){
    let countBracket = [0,0];
    arr.forEach((item) =>{
        if (item == '('){
            countBracket[0]++;
        }
 
        if (item == ')'){
            countBracket[1]++;
        }
    });
 
    return countBracket[0] == countBracket[1];
}
 
function calculate(exprArr){
    let num1 = 0;
    let num2 = 0;
    if (exprArr[0] == '-'){
        let tmp = `-${exprArr[1]}`
        exprArr.splice(0, 2, tmp);
    } 
    
    for (let i = 0; i < exprArr.length; i++){
        let res = 0
        if (exprArr[i] == '*'){
            res = +exprArr[i-1] * +exprArr[i+1];    
            exprArr.splice(i-1, 3, res);
            i--;
        }
        if (exprArr[i] == '/'){
            if (!(+exprArr[i+1])) {
                
                throw TypeError("TypeError: Division by zero.");
            }
            res = +exprArr[i-1] / +exprArr[i+1];    
            exprArr.splice(i-1, 3, res);
            i--
        }
    }
    for (let i = 0; i < exprArr.length; i++){
        let res = 0
        if (exprArr[i] == '+'){
            res = +exprArr[i-1] + +exprArr[i+1];    
            exprArr.splice(i-1, 3, res);
            i--;
        }
        if (exprArr[i] == '-'){
            res = +exprArr[i-1] - +exprArr[i+1];    
            exprArr.splice(i-1, 3, res);
            i--;
        }
    }
    return exprArr[0];
}

module.exports = {
    expressionCalculator
}