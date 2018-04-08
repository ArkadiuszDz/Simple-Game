$(document).ready(function(){

    function shuffle(a) {
        for (var i = a.length; i; i--) {
             var j = Math.floor(Math.random() * i);
             [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }   

    function displayElements(type,numSq,numCir,numTri,color,positions){
        var element;
        if(type=='triangle'){
            for (var i=numSq+numCir;i<numSq+numCir+numTri;i++){
                element = $('<div>',{class: type}).css('borderBottomColor', color);
                $(table[0]).find('#' + positions[i]).append(element);
            }
        } else if (type=='triangleHollow'){
            
        } else {
            for (var i=0+numSq*(type=='circle');i<numSq+numCir*(type=='circle');i++){
                element = $('<div>',{class: type}).css('backgroundColor', color);
                $(table[0]).find('#' + positions[i]).append(element);
            }
        }
    }

    function displayElement(type,color,number){
        var element;
        if(type=='triangle'){  
                element = $('<div>',{class: type}).css('borderBottomColor', color);
                $(questionBox[number]).append(element);
            
        } else if (type=='triangleHollow'){
            
        } else {
                element = $('<div>',{class: type}).css('backgroundColor', color);
                $(questionBox[number]).append(element);
        }
    }

    function startGame() {
                     
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
    
    var elements = [{name: 'square', numOfElements: 0},{name: 'circle', numOfElements: 0},{name: 'triangle',numOfElements: 0}];

    var numOfSquares = Math.round(Math.random() * (maxNumOfElements - minNumOfElements) + minNumOfElements);
    var numOfCircles = Math.round(Math.random() * (maxNumOfElements - minNumOfElements) + minNumOfElements);
    var numOfTriangles = Math.round(Math.random() * (maxNumOfElements - minNumOfElements) + minNumOfElements);
    
        (elements[0]).numOfElements = numOfSquares;
        (elements[1]).numOfElements = numOfCircles;
        (elements[2]).numOfElements = numOfTriangles;
        
    shuffle(colorsEasy);
    shuffle(colorsMedium);
    shuffle(positions);
    shuffle(elements);

    var count = 2;
    
        countDown = setInterval(function(){
           
            timeCount.text('Time: ' + count);
            if (count==0){
                clearInterval(countDown);
                
                timeCount.text('Start!');
                answerBox.hide();
                resultCheck.hide();
                var myTimeout = setTimeout(function(){
                    $('.circle').fadeOut();
                    $('.square').fadeOut();
                    $('.triangle').fadeOut();
                    clearTimeout(myTimeout);
                    
                    if (select.val()=='easy'){
                        displayElement(elements[0].name,colorsEasy[0],0);
                        resultCheck.show();
                        resultCheck.animate({top: "40%"},1000);
                        $(answerBox[0]).fadeIn();
                    } else if (select.val()=='medium'){
                        displayElement(elements[0].name,colorsEasy[0],0);
                        displayElement(elements[1].name,colorsEasy[1],1);
                        resultCheck.show();
                        resultCheck.animate({top: "40%"},1000);
                        $(answerBox[0]).fadeIn();
                        $(answerBox[1]).fadeIn();
                    } else if (select.val()=='hard'){
                        displayElement(elements[0].name,colorsMedium[0],0);
                        displayElement(elements[1].name,colorsMedium[1],1);
                        displayElement(elements[2].name,colorsMedium[2],2);
                        resultCheck.show();
                        resultCheck.animate({top: "40%"},2000);
                        $(answerBox[0]).fadeIn();
                        $(answerBox[1]).fadeIn();
                        $(answerBox[2]).fadeIn();
                    }
    
                },1000);
                resultCheck.css('top',0);
                
                if (select.val()=='easy'){
                    displayElements(elements[0].name,numOfSquares,numOfCircles,numOfTriangles,colorsEasy[0],positions);               
                    $(answerBox[0]).fadeIn();
                } else if (select.val()=='medium'){
                    displayElements(elements[0].name,numOfSquares,numOfCircles,numOfTriangles,colorsEasy[0],positions);
                    displayElements(elements[1].name,numOfSquares,numOfCircles,numOfTriangles,colorsEasy[1],positions);                  
                    $(answerBox[0]).fadeIn();
                    $(answerBox[1]).fadeIn();
                } else if (select.val()=='hard'){
                    displayElements(elements[0].name,numOfSquares,numOfCircles,numOfTriangles,colorsMedium[0],positions);
                    displayElements(elements[1].name,numOfSquares,numOfCircles,numOfTriangles,colorsMedium[1],positions);
                    displayElements(elements[2].name,numOfSquares,numOfCircles,numOfTriangles,colorsMedium[2],positions);
                    $(answerBox[0]).fadeIn();
                    $(answerBox[1]).fadeIn();
                    $(answerBox[2]).fadeIn();
                }
    
            }
            count--;
    
        },1000);
    
        return elements;
    }

    function handleClick(){
        resultShow.text(0);
        if (button.text()=='START'){
            result = 0;
            var elArray = startGame();
            $(answerBox[0]).attr('data-number',elArray[0].numOfElements);
            $(answerBox[1]).attr('data-number',elArray[1].numOfElements);
            $(answerBox[2]).attr('data-number',elArray[2].numOfElements);
            button.text('STOP');
            button.css('backgroundColor','red');
            select.attr('disabled',true).css('color','darkgray');
        } else {
            button.text('START');
            timeCount.text('Start!');
            button.css('backgroundColor','green');
            select.attr('disabled',false).css('color','black');
            clearInterval(countDown);
            return false;
        }

    }

    function handleClickCheck(){
        
        select.attr('disabled',true).css('color','darkgray');
      
        if (select.val()=='easy'){
   
            if($(answerBox[0]).attr('data-number')==$(inputs[0]).val()){
                var elArray = startGame();
                $(inputs[0]).val('');
                $(answerBox[0]).attr('data-number',elArray[0].numOfElements);
                result++;
                resultShow.text(result);
            } else {
                button.removeClass('running');
                gameOver();
                return false;
            }
 
        } else if (select.val()=='medium'){
            if(($(answerBox[0]).attr('data-number')==$(inputs[0]).val()) && ($(answerBox[1]).attr('data-number')==$(inputs[1]).val())){
                
                result = result + 2;
                resultShow.text(result);
                var elArray = startGame();
                $(answerBox[0]).attr('data-number',elArray[0].numOfElements);
                $(answerBox[1]).attr('data-number',elArray[1].numOfElements);
                $(inputs[0]).val('');
                $(inputs[1]).val('');
            } else {

                button.removeClass('running');
                gameOver();
                return false;
            }
            
        } else if (select.val()=='hard'){

            if($(answerBox[0]).attr('data-number')==$(inputs[0]).val() && $(answerBox[1]).attr('data-number')==$(inputs[1]).val() && $(answerBox[2]).attr('data-number')==$(inputs[2]).val()){
                result = result + 3;
                resultShow.text(result);
                var elArray = startGame();
                $(answerBox[0]).attr('data-number',elArray[0].numOfElements);
                $(answerBox[1]).attr('data-number',elArray[1].numOfElements);
                $(answerBox[2]).attr('data-number',elArray[2].numOfElements);
                $(inputs[0]).val('');
                $(inputs[1]).val('');
                $(inputs[2]).val('');
            } else {
                button.removeClass('running');
                gameOver();
                return false;
            }
        }
    }

    function handleClickOK(){
        scoreMessage.hide();
        $(inputs[0]).val('');
        $(inputs[1]).val('');
        $(inputs[2]).val('');
        button.attr('disabled',false);
        select.attr('disabled',false).css('color','black');
        button.css('backgroundColor','green');
        saveResult.hide();
        saveBtn.attr('disabled',false).css('background-color','yellow').css('color','black');
    }

    function gameOver() {
        button.attr('disabled',true);
        button.text('START');
        button.css('backgroundColor','grey');
        select.attr('disabled',true).css('color','darkgray');
        resultCheck.css('top',0);
        answerBox.hide();
        resultCheck.hide();
        scoreMessage.css('top','40%');
        scoreMessage.find('h4').find('span').text(result);
        scoreMessage.show(1000);
        if (result > 9){
            saveResult.show();
        } else {
            saveResult.hide();
        }
    }

    function showScores() {
        scores.show(1000).slideDown(2500);
        closeBtn.show();
        buttonScores.attr('disabled',true).css('background-color','darkgray');
        scoresEasy.children().remove('p');
        scoresMedium.children().remove('p');
        scoresHard.children().remove('p');
        $.ajax({
            url: scoresUrl,
            method: 'GET',
            dataType: 'json'
          }).done((response) => {
        
            response['easy'].sort(function(a,b){
                return b.score - a.score;
            });

            response['medium'].sort(function(a,b){
                return b.score - a.score;
            });

            response['hard'].sort(function(a,b){
                return b.score - a.score;
            });

            for (var i=0;i<response['easy'].length;i++){
                var p = $('<p>',{class: "score"});
                p.text(response['easy'][i].name + " " + response['easy'][i].score);
                scoresEasy.append(p);
            } 

            for (var i=0;i<response['medium'].length;i++){
                var p = $('<p>',{class: "score"});
                p.text(response['medium'][i].name + " " + response['medium'][i].score);
                scoresMedium.append(p);
            } 

            for (var i=0;i<response['hard'].length;i++){
                var p = $('<p>',{class: "score"});
                p.text(response['hard'][i].name + " " + response['hard'][i].score);
                scoresHard.append(p);
            } 

          }).fail((error) => {
            console.log(error);
          });
    }

    function saveScores(score){
        var playerName = playerNameInput.val();
        $.ajax({
            url: 'http://localhost:3000/'+select.val(),
            method: 'POST',
            dataType: 'json',
            data: {"name": playerName,
                "score": score,
            }
          }).done(function(response){           

          }).fail(function(error){
            console.log(error);
          });
    }
    
    var countDown;
    var minHorizontal = 5;
    var maxHorizontal = 300;
    var minVertical = 5;
    var maxVertical = 380;
    var cellWidth;
    var cellHeight;
    var numOfElements;
    var result = 0;
    var gamePanel = $('#gamePanel');
    var table = gamePanel.find('table').find('tbody');
    var select = $('.container').find('.selectBox').find('select');
    var button = $('button#start');
    var buttonCheck = $('button#check');
    var timeCount = $('.topPanel').find('span');
    var tr;
    var th;
    var row = 6;
    var column = 8;
    var positions = [];
    var minNumOfElements;
    var maxNumOfElements;
    var colorsEasy = ["red","green","blue","yellow","orange","gray","white","magenta","aquamarine"];
    var colorsMedium = ['rgba(232,158,158,0.6)', 'rgba(146,191,162,0.5)', 'rgba(173,133,70,0.5)', 'rgba(241,232,210,0.5)'];
    var elementsHard = ['square','circle','triangleHollow'];
    var questionBox = $('.question');
    var answerBox = $('.answer');
    var resultCheck = $('.resultCheck');
    var inputs = $('input');
    var resultShow = $('.result').find('p').find('span');
    var scoreMessage = $('.scoreMessage');
    var buttonOK = $('.buttonWrap').find('button');
    var buttonScores = $('button#showScores');
    var scoresUrl = "http://localhost:3000/db";
    var scoresEasy = $('#scoresEasy');
    var scoresMedium = $('#scoresMedium');
    var scoresHard = $('#scoresHard');
    var scores = $('#scores');
    var closeBtn = $('.closeBtn');
    var saveResult = $('.saveResult');
    var saveBtn = $('#save');
    var playerNameInput = $('#playerName');
   
    resultShow.text(result);
    answerBox.hide();
    resultCheck.hide();
    scoreMessage.hide();

    cellWidth = (maxHorizontal - minHorizontal) / column;
    cellHeight = (maxVertical - minVertical) / row;

    for (i=0;i<row;i++){
        tr = $('<tr>');
        for (j=0;j<column;j++){
            th = $('<th>',{width: cellWidth, height: cellHeight, id: i + '-' + j});
            tr.append(th);
        }
        table.append(tr);
    }

    numOfElements = row * column;

    for (i=0;i<row;i++){
        for(j=0;j<column;j++){
            positions.push(i + '-' + j);
        }
    }


    button.on('click',handleClick);
    buttonCheck.on('click',handleClickCheck);
    buttonOK.on('click',handleClickOK);
    buttonScores.on('click',showScores);
    
    closeBtn.on('click',function(){

        closeBtn.hide(500);
        scores.hide(1000);
        buttonScores.attr('disabled',false).css('background-color','yellow');
        
    });

    saveBtn.on('click',function(){
        saveScores(result);
        saveBtn.attr('disabled',true).css('background-color','grey').css('color','white');
    });
    
});