$(document).ready(function(){
    
    var gamePanel = $('#gamePanel');

    var width = 15;

    var minHorizontal = 5;
    var maxHorizontal = 300;

    var minVertical = 5;
    var maxVertical = 380;

    var numOfSquares = 2;
    var numOfCircles = 2;
    var numOfTriangles = 3;

    var positionsHor = [];
    var positionsVer = [];

    positionsHor[0] = Math.floor(Math.random() * (maxHorizontal - minHorizontal) + minHorizontal);
    positionsVer[0] = Math.floor(Math.random() * (maxVertical - minVertical) + minVertical);


    function generatePositions (numOfElements,posHor,posVer,minHor,maxHor,minVer,maxVer) {

        var statusH = true; 
        var statusV = true;

        for (var i=1;i<numOfElements;i++){
            while (statusH){
                var horizontal = Math.floor(Math.random() * (maxHor - minHor) + minHor);
                for(var j=0;j<posHor.length;j++){
                    if (Math.abs(horizontal - posHor[j]) <= (width+5)){
                        statusH = true;
                        break;
                    } else {
                        statusH = false;                  
                    }
                }
    
            }
            posHor.push(horizontal);
            statusH = true;
    
            while (statusV){
                vertical = Math.floor(Math.random() * (maxVertical - minVertical) + minVertical);
                for(var j=0;j<posVer.length;j++){
                    if (Math.abs(vertical - posVer[j]) <= (width+5)){
                        statusV = true;
                        break;
                    } else {
                        statusV = false;                  
                    }
                }
    
            }
            posVer.push(vertical);
            statusV = true;
        }

        return [posHor,posVer];

    }

    var square;
    var circle;
    var triangle;

    var arrayPositions = generatePositions (numOfSquares,positionsHor,positionsVer,minHorizontal,maxHorizontal,minVertical,maxVertical);
    positionsHor = arrayPositions[0];
    positionsVer = arrayPositions[1];

    arrayPositions = generatePositions (numOfCircles+1,positionsHor,positionsVer,minHorizontal,maxHorizontal,minVertical,maxVertical);
    positionsHor = arrayPositions[0];
    positionsVer = arrayPositions[1];

    console.log(arrayPositions);
    arrayPositions = generatePositions (numOfTriangles+1,positionsHor,positionsVer,minHorizontal,maxHorizontal,minVertical,maxVertical);

    console.log(arrayPositions);

    for (var i=0;i<numOfSquares;i++){
        square = $('<div>',{class: 'square'});
        square.css('top',positionsVer[i]).css('left',positionsHor[i]);
        gamePanel.append(square);
    }

    for (var i=numOfSquares;i<numOfSquares+numOfCircles;i++){
        circle = $('<div>',{class: 'circle'});
        circle.css('top',positionsVer[i]).css('left',positionsHor[i]);
        gamePanel.append(circle);
    }

    for (var i=numOfSquares+numOfCircles;i<numOfSquares+numOfCircles+numOfTriangles;i++){
        triangle = $('<div>',{class: 'triangle'});
        triangle.css('top',positionsVer[i]).css('left',positionsHor[i]);
        gamePanel.append(triangle);
    }

   // for (var i=0;i<numOfSquares;i++){
    //     square = $('<div>',{class: 'square'}).css('backgroundColor', colorsMedium[0]);
    //     $(table[0]).find('#' + positions[i]).append(square);
    // }

    // for (var i=numOfSquares;i<numOfSquares+numOfCircles;i++){
    //     circle = $('<div>',{class: 'circle'}).css('backgroundColor', colorsMedium[1]);
    //     $(table[0]).find('#' + positions[i]).append(circle); 
    // }

    // for (var i=numOfSquares+numOfCircles;i<numOfSquares+numOfCircles+numOfTriangles;i++){
    //     triangle = $('<div>',{class: 'triangle'}).css('borderBottomColor', colorsMedium[2]);
    //     $(table[0]).find('#' + positions[i]).append(triangle);
    // }

});




function startGame() {

    if (button.text()=='Start'){
   
        button.text('Stop');
        select.attr('disabled',true).css('color','darkgray');
    } else {
        button.text('Start');
        select.attr('disabled',false).css('color','white');
      
    }
          
    $('.circle').remove();
    $('.square').remove();
    $('.triangle').remove();
    answerBox.hide();
    resultCheck.hide();

    switch (select.val()){
        case 'very-easy':
            minNumOfElements = 2;
            maxNumOfElements = 5;
            break;
        case 'easy':
            minNumOfElements = 3;
            maxNumOfElements = 5;
            break;
        case 'medium':
            minNumOfElements = 3;
            maxNumOfElements = 6;
            break;
        case 'hard':
            minNumOfElements = 4;
            maxNumOfElements = 9;
            break;
    }

var numOfSquares = Math.round(Math.random() * (maxNumOfElements - minNumOfElements) + minNumOfElements);
var numOfCircles = Math.round(Math.random() * (maxNumOfElements - minNumOfElements) + minNumOfElements);
var numOfTriangles = Math.round(Math.random() * (maxNumOfElements - minNumOfElements) + minNumOfElements);

shuffle(colorsEasy);
shuffle(colorsMedium);
shuffle(positions);

var count=2;

    var countDown = setInterval(function(){
        console.log(count);
        timeCount.text('Time: ' + count);
        if (count==0){
            clearInterval(countDown);
            console.log('Start');
            timeCount.text('Start!');
            answerBox.hide();
            resultCheck.hide();
            var myTimeout = setTimeout(function(){
                console.log('Minęły dwie sekundy');
                console.log(myTimeout);
                $('.circle').fadeOut();
                $('.square').fadeOut();
                $('.triangle').fadeOut();
                clearTimeout(myTimeout);
                
                if (select.val()=='very-easy'){
                    displayElement(elements[0],colorsEasy[0],0);
                    resultCheck.show();
                    resultCheck.animate({top: "40%"},1500);
                    $(answerBox[0]).fadeIn();
                } else if (select.val()=='easy'){
                    displayElement(elements[0],colorsEasy[0],0);
                    displayElement(elements[1],colorsEasy[1],1);
                    resultCheck.show();
                    resultCheck.animate({top: "40%"},1500);
                    $(answerBox[0]).fadeIn();
                    $(answerBox[1]).fadeIn();
                } else if (select.val()=='medium'){
                    displayElement(elements[0],colorsMedium[0],0);
                    displayElement(elements[1],colorsMedium[1],1);
                    displayElement(elements[2],colorsMedium[2],2);
                    resultCheck.show();
                    resultCheck.animate({top: "40%"},1500);
                    $(answerBox[0]).fadeIn();
                    $(answerBox[1]).fadeIn();
                    $(answerBox[2]).fadeIn();
                }

            },1000);
            resultCheck.css('top',0);
            if (select.val()=='very-easy'){
                shuffle(elements);
                displayElements(elements[0],numOfSquares,numOfCircles,numOfTriangles,colorsEasy[0],positions);
                // resultCheck.show();
                // resultCheck.animate({top: "50%"},1000);
                $(answerBox[0]).fadeIn();
            } else if (select.val()=='easy'){
                shuffle(elements);
                displayElements(elements[0],numOfSquares,numOfCircles,numOfTriangles,colorsEasy[0],positions);
                displayElements(elements[1],numOfSquares,numOfCircles,numOfTriangles,colorsEasy[1],positions);
                // resultCheck.fadeIn();
                $(answerBox[0]).fadeIn();
                $(answerBox[1]).fadeIn();
            } else if (select.val()=='medium'){
                displayElements(elements[0],numOfSquares,numOfCircles,numOfTriangles,colorsMedium[0],positions);
                displayElements(elements[1],numOfSquares,numOfCircles,numOfTriangles,colorsMedium[1],positions);
                displayElements(elements[2],numOfSquares,numOfCircles,numOfTriangles,colorsMedium[2],positions);
                // resultCheck.fadeIn();
                $(answerBox[0]).fadeIn();
                $(answerBox[1]).fadeIn();
                $(answerBox[2]).fadeIn();
            }

            console.log(elements);

        }
        count--;

    },1000);

}



    // button.on('click',function(e){
    //     if (button.text()=='Start'){
    //         status = true;
    //         console.log('Tutaj jestem');
    //         button.text('Stop');
    //         select.attr('disabled',true).css('color','darkgray');
    //     } else {
    //         button.text('Start');
    //         select.attr('disabled',false).css('color','white');
    //         status = false;
    //     }
              
    //     $('.circle').remove();
    //     $('.square').remove();
    //     $('.triangle').remove();
    //     answerBox.hide();
    //     resultCheck.hide();

    //     switch (select.val()){
    //         case 'very-easy':
    //             minNumOfElements = 2;
    //             maxNumOfElements = 5;
    //             break;
    //         case 'easy':
    //             minNumOfElements = 3;
    //             maxNumOfElements = 5;
    //             break;
    //         case 'medium':
    //             minNumOfElements = 3;
    //             maxNumOfElements = 6;
    //             break;
    //         case 'hard':
    //             minNumOfElements = 4;
    //             maxNumOfElements = 9;
    //             break;
    //     }

    // var numOfSquares = Math.round(Math.random() * (maxNumOfElements - minNumOfElements) + minNumOfElements);
    // var numOfCircles = Math.round(Math.random() * (maxNumOfElements - minNumOfElements) + minNumOfElements);
    // var numOfTriangles = Math.round(Math.random() * (maxNumOfElements - minNumOfElements) + minNumOfElements);

    // shuffle(colorsEasy);
    // shuffle(colorsMedium);
    // shuffle(positions);

    // var count=2;

    //     var countDown = setInterval(function(){
    //         console.log(count);
    //         timeCount.text('Time: ' + count);
    //         if (count==0){
    //             clearInterval(countDown);
    //             console.log('Start');
    //             timeCount.text('Start!');
    //             answerBox.hide();
    //             resultCheck.hide();
    //             var myTimeout = setTimeout(function(){
    //                 console.log('Minęły dwie sekundy');
    //                 console.log(myTimeout);
    //                 $('.circle').fadeOut();
    //                 $('.square').fadeOut();
    //                 $('.triangle').fadeOut();
    //                 clearTimeout(myTimeout);
                    
    //                 if (select.val()=='very-easy'){
    //                     displayElement(elements[0],colorsEasy[0],0);
    //                     resultCheck.show();
    //                     resultCheck.animate({top: "40%"},1500);
    //                     $(answerBox[0]).fadeIn();
    //                 } else if (select.val()=='easy'){
    //                     displayElement(elements[0],colorsEasy[0],0);
    //                     displayElement(elements[1],colorsEasy[1],1);
    //                     resultCheck.show();
    //                     resultCheck.animate({top: "40%"},1500);
    //                     $(answerBox[0]).fadeIn();
    //                     $(answerBox[1]).fadeIn();
    //                 } else if (select.val()=='medium'){
    //                     displayElement(elements[0],colorsMedium[0],0);
    //                     displayElement(elements[1],colorsMedium[1],1);
    //                     displayElement(elements[2],colorsMedium[2],2);
    //                     resultCheck.show();
    //                     resultCheck.animate({top: "40%"},1500);
    //                     $(answerBox[0]).fadeIn();
    //                     $(answerBox[1]).fadeIn();
    //                     $(answerBox[2]).fadeIn();
    //                 }

    //             },1000);
    //             resultCheck.css('top',0);
    //             if (select.val()=='very-easy'){
    //                 shuffle(elements);
    //                 displayElements(elements[0],numOfSquares,numOfCircles,numOfTriangles,colorsEasy[0],positions);
    //                 //$(answerBox[0]).fadeIn();
    //             } else if (select.val()=='easy'){
    //                 shuffle(elements);
    //                 displayElements(elements[0],numOfSquares,numOfCircles,numOfTriangles,colorsEasy[0],positions);
    //                 displayElements(elements[1],numOfSquares,numOfCircles,numOfTriangles,colorsEasy[1],positions);
    //                 $(answerBox[0]).fadeIn();
    //                 $(answerBox[1]).fadeIn();
    //             } else if (select.val()=='medium'){
    //                 displayElements(elements[0],numOfSquares,numOfCircles,numOfTriangles,colorsMedium[0],positions);
    //                 displayElements(elements[1],numOfSquares,numOfCircles,numOfTriangles,colorsMedium[1],positions);
    //                 displayElements(elements[2],numOfSquares,numOfCircles,numOfTriangles,colorsMedium[2],positions);
    //                 $(answerBox[0]).fadeIn();
    //                 $(answerBox[1]).fadeIn();
    //                 $(answerBox[2]).fadeIn();
    //             }

    //             console.log(elements);

    //         }
    //         count--;

    //     },1000);


    // });
   