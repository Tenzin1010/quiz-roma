let score = 0;
let currentQuestion = 0;
let questionCounter =0;

//Read all the functions to start the Quiz
function handleSoccerQuiz()
{
     welcomeScreen();
     checkAnswer();
     nextQuestionButton();
}

//renders Quiz Welcome Screen
function welcomeScreen() 
{
    showWelcomeScreen();

    $('.questionScreen').hide();
    $('.showSummary').hide();

    $('.welcomeScreen').on('click', '.kickOffbutton',function(e){
        questionScreen(); 
        $('.questionCounter').text(1);

    });  
}

//sets up the welcome screen from welcomeTemplate
function showWelcomeScreen(){
    $('main').html(welcomeTemplate());  
}

//renders question screen 
function questionScreen() { 

    if(questionCounter < questions.length){
        questionCounter++;
        $('.questionCounter').text(questionCounter);
    }
  
    $('.welcomeScreen').hide();
    $('.showSummary').hide();
    $('.questionScreen').show();
    $('.buttonToGetToNextQuestion').hide();
   
       
    if (currentQuestion < questions.length){
       
        let question = questions[currentQuestion];
        $('.questionScreen h2').text(question.title);
        const answer = $('.questionScreen ul');

        if (answer.length === 0) 
        {
            $('.questionScreen').append('<ul></ul>');
        } //end if (answer.length === 0)

        for (let i=0; i<question.answers.length; i++){
            $('.questionScreen ul').append(`<label class="answer">
            <input type = "radio" id="${i}"  name ="answerOption" required>${question.answers[i]}<br>
            </label>`
            );
        }
        $('.questionScreen ul').append(`<button type="submit" class="submitAnswerButton">Submit</button>`);
        setTimeout(checkAnswer, 0);
      
    }//end if (currentQuestion < questions.length)
    else
     {
        showSumary();
        restartQuiz();
    }

} //end of questionScreen()

 // changes the counter of questions & displays
 function questionNumberCounter(){
     currentQuestion++;
   
     $('.questionCounter').text(currentQuestion);
 }  

 //this function will display result of the answers to the questions, correct and 
 //incorrect answers will have seperate screens
function checkAnswer() {
    $('.submitAnswerButton').on('click',function(e) {
        e.preventDefault();
        let correctAnswer = questions[currentQuestion].correct;
        const isCorrect = correctAnswer === parseInt ($('input:checked').attr('id'),10);
        showResult(isCorrect); 
        
    });   
} 

//function either displays correct or incorrect answer screen
function showResult(isCorrect) {
    if (isCorrect) 
    {
        correctAnswerScreen();
        currentScore();       
    }
     else 
    {
        inCorrectAnswerScreen();
        
    } 
} 

// function for correct answer display
function correctAnswerScreen(){
    $('.questionScreen').hide();
     $('.questionResultScreen').html( `
     <h2> You got it!!! <br>A natural baller</h2>
    <button type="button" class="buttonToGetToNextQuestion">Next Question</button>`);
 } //end of correctAnswerScreen
 
 
//function for wrong answer display
function inCorrectAnswerScreen(){
    //let q = questions[currentQuestion]; // 0 

    //let ca = q.correct;// 2
    //let displaya = q.answers[ca];
    $('.questionScreen').hide();
   $('.questionResultScreen').html(`
    <h2> Better Luck next time</h2><br>
    <p> Correct answer was: ${displaya} <br>
   <button type="button" class="buttonToGetToNextQuestion">Next Question</button>`);
} //end of incorrectAnswerScreen

//function to show the next question 
function nextQuestionButton () {
    $('main').on('click', '.buttonToGetToNextQuestion', function(e) {
       
        currentQuestion++;
     //  $('.questionResultScreen').hide();
        questionScreen();
        
    });
} 

 //adds 1 to current score
function scoreAddedTocorrectAnswer(){
    score++;
}

//takes total score and renders
function currentScore() {
    scoreAddedTocorrectAnswer();
    $('.scoreCounter').text(score);
}

//this function will render the final result 
function showSumary() {
    if (score>=2) 
        {showPassedSummary();}
        else showFailedSummary();
    }    


//this function will set up  the final screen if correct>=6 with
function showPassedSummary() {
    $('.welcomeScreen').hide();
    $('.showSummary').show();
    $('.questionScreen').hide();
    $('.showSummary').html(`<h2>Summary of your quiz</h2>
    <p>You scored ${score} out of ${questions.length} correct</p>
     <button type="button" class="retakeQ">
    Retake Quiz</button>`);
    
}
//funcftion restarts quiz once all questions have been answered
function restartQuiz() {
    $('main').on('click', '.retakeQ',function(event){
      location.reload(); //this reloads the current doc from the $(handleSoccerQuiz);
    }); 

}
//this function will set up the final screen if correct<6
function showFailedSummary() {
    $('.welcomeScreen').hide();
    $('.showSummary').show();
    $('.questionScreen').hide();
    $('.showSummary').html(`<h2>Summary of your quiz</h2>
    <p>You scored ${score} out of ${questions.length} correct</p>
    <h2>Kick harder next time</> <br>
    <button type="button" class="retakeQ">
    Retake Quiz</button>`);
}



$(handleSoccerQuiz);



