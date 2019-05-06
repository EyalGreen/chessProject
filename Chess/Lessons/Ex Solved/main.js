function Ex1(){
    var x = prompt("Enter your age: ");
    var age = x*1;
if(age<=16){
    alert("אתה קטן מדי בשביל לנהוג אחייי");
}else if(age>16){
        alert("אתה בסדר");
    }else{
        alert("מתחמן גילאים שכמותך");
    }
}

function Ex2(){
    var x = prompt("Enter you age: ");
    var age = x*1;
    if(age<=16){
        alert("אתה קטן מדי בשביל לנהוג");

    }else if(age>16&&age<=18){
        alert("אתה בגיל ללמוד");

    }else if(age>18&&age<=70){
        alert("אתה יכול לנהוג");
    }
    
    else if(age>=70){
        alert("אתה יכול לנהוג באישור רופא");
    }
}

function Ex3(){
    var username = prompt("Enter your username: ");
    var password = prompt("Enter your password: ");
    if(username == "hackeru" && password == "hackeru123"){
        alert("You in!");
    }else{
        alert("Worng username or password");
    }
}

function Ex4(){
    var x = prompt("Enter your size: ");
    var size = x*1;
    if(size >= 24 && size<=30){
        alert("S מידתך היא");
    }else if(size >= 31 && size<=36){
        alert("M מידתך היא");

    }else if(size >= 36){
        alert("L מידתך היא");

    }else{
        alert("מתנצלים, אבל אין לנו מידות כאלה");
    }

}

function Ex5(){
    var sum = 0;
    for (let i = 1; i <= 5; i++) {
        var x = prompt(`Enter your ${i} number: `);
        sum+=x*1;
    }
    alert(`Your sum is: ${sum}`);
}

function Ex6(){
    var username = prompt("Enter your username: ");
    var password = prompt("Enter your password: ");

if(!username){
    alert("You need to Fill the username input");

    
    }if(!password){
        alert("You need to Fill the PassWord input");
    }
    
    if(username&&password){
        if(username == "hackeru" && password == "hackeru123"){
            alert("You in!");
        }else{
            alert("Worng username or password");
            }
    }
}


function Ex7(){
    var x = prompt("Enter you number: ");
    var number = x*1;
    var sum = 0;
    for(let i = 1 ; i<=number;i++)
    {
        sum+=i
    }
    alert(sum);
}

function Ex8(){
    var x = prompt("Enter you number: ");
    var number = x*1;
    if(number%2 == 0){
        alert("זוגי");

    }else{
        alert("אי-זוגי");
    }
}

function Ex9(){
    var stop = false;
    var sum = 0;
    while(!stop){
        var x = prompt("Enter you number: ");
        var number = x*1;
        if(number == 0){
            stop = true;
        }else{
            sum+=number;

        }
    }
    alert(sum);
}

function Ex10(){
    var NumberOfWords = prompt("כמות המילים במשפט:")*1;
    var sent = "";
    for(let i = 1;i<=NumberOfWords;i++){
        var word = prompt(`Enter your ${i} word: `);
        sent+=word+" ";        
    }
    alert(sent);
}

function Ex11(){
}