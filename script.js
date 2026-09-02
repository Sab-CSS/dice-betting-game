const bankpass=prompt("enter your bank password")
let bal=prompt("enter your balance")
let state=JSON.parse(localStorage.getItem("state")) || {
    win:0,
    lose:0,
    debt:0
};


const exit=document.getElementById("exitGame");
const instructionmodel=document.getElementById("instruction-model");
const closeInstruction=document.getElementById("close-instruction");
const RollDice=document.getElementById("roll-dice");
const diceResultText = document.getElementById("dice-result");
const resultText = document.getElementById("result");
const bankPanel=document.getElementById("bank-panel");


function saveData(){
    localStorage.setItem("password",password);
    localStorage.setItem("balance",bal);
    localStorage.setItem("state",JSON.stringify(state));
}
function loadData(){
    let savedPassword=localStorage.getItem("password");
    bal=localStorage.getItem("balance");
    state=JSON.parse(localStorage.getItem("state"));
}

exit.addEventListener('click',() =>{
    window.close();
});

inst.addEventListener('click',() =>{
    instructionmodel.style.display="block";
})

closeInstruction.addEventListener('click',() =>{
    instructionmodel.style.display="none";
})

RollDice.addEventListener('click',() =>{
    let Dice1=Math.floor(Math.random()*6)+1;
    let Dice2=Math.floor(Math.random()*6)+1;
    let Dice3=Math.floor(Math.random()*6)+1;
    let a=Number(document.getAnimations().getElementById("dice1").value);
    let b=Number(document.getAnimations().getElementById("dice2").value);
    let c=Number(document.getAnimations().getElementById("dice3").value);
    if (a==Dice1 && b==Dice2 && c==Dice3){
        state.win++;
        bal+=100000;
        resultText.innerHTML="You Win  the bet of 100000! Your balance is now: "+bal;
    }
    else if (a!=Dice1 && b!=Dice2 && c!=Dice3){
        state.lose++;
        bal-=50000;
        resultText.innerHTML="You Lose the bet and pay 50000! Your balance is now: "+bal;}
    else if (a!=Dice1 && b==Dice2 && c==Dice3 || a==Dice1 && b!=Dice2 && c==Dice3 || a==Dice1 && b==Dice2 && c!=Dice3){
        state.lose++;
        bal-=10000;
        resultText.innerHTML="You Lose the bet and pay 10000! Your balance is now: "+bal;
    }
    else {
        state.win++;
        bal=bal+10000;
        resultText.innerHTML="You Win the bet of 10000! Your balance is now: "+bal;
    }
    saveData();
});

function openBank(){
    let pwcheck=prompt("Enter your bank password to access the bank");
    if (Number(pwcheck)!==Number(bankpass)){
        return alert("Incorrect password! Access denied.");
    }
    showPanel('bank-panel');

}