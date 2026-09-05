let bankpass;
let bal=0;
let savedPassword = localStorage.getItem("password");
let savedBalance = localStorage.getItem("balance");
if (savedPassword===null){
    bankpass=prompt("Set your bank password:");
    bal=Number(prompt("Set your initial balance:"));
    localStorage.setItem("password",bankpass);
    localStorage.setItem("balance",bal);
}else{
    bankpass=savedPassword;
    bal=Number(savedBalance);
}
let state=JSON.parse(localStorage.getItem("state")) || {
    win:0,lose:0,debt:0
};

const playButton=document.getElementById("play");
const bankButton=document.getElementById("bank");
const inst=document.getElementById("instruction");
const status=document.getElementById("status");
const exit=document.getElementById("exitGame");
const instructionmodel=document.getElementById("instruction-model");
const closeInstruction=document.getElementById("close-instruction");
const diceResultText = document.getElementById("dice-result");
const resultText = document.getElementById("result");
const bankPanel=document.getElementById("bank-panel");


function saveData(){
    localStorage.setItem("password",bankpass);
    localStorage.setItem("balance",bal);
    localStorage.setItem("state",JSON.stringify(state));
}
function loadData(){
    let savedPassword = localStorage.getItem("password");
    let savedBalance = localStorage.getItem("balance");
    let savedState=localStorage.getItem("state");
    if (savedBalance!==null){
         bal=Number(localStorage.getItem("balance"));
    }
    if (savedState){
        state=JSON.parse(savedState);
    }
}

loadData();

function showPanel(panelId){
    const panels = document.querySelectorAll('.panel, #play-model, #instruction-panel, #bank-panel, #status-panel,#menu-panel');
    panels.forEach(panel => {
        if (panel.id===panelId){
            if (panelId==="menu-panel"||panelId==="play-model"){
                panel.style.display="flex";
            }
            else {
                panel.style.display="block";
            }
        }else {
            panel.style.display="none";
        }
    });
}

if (playButton){
    playButton.addEventListener('click',() =>{
        showPanel('play-panel');
    });}
if (status){
    status.addEventListener('click',() =>{
        showPanel('status-panel');
    });
} 

if (inst){
    inst.addEventListener('click',() =>{
        instructionmodel.style.display="block";
    });
}

if (closeInstruction){
    closeInstruction.addEventListener('click',() =>{
        showPanel('menu-panel');
    });
}

if (exit){
    exit.addEventListener('click',() =>{
        saveData();
        window.close();
    });
}

function rollDice(){
    const finalDice1 = Math.floor(Math.random() * 6) + 1;
    const finalDice2 = Math.floor(Math.random() * 6) + 1;
    const finalDice3 = Math.floor(Math.random() * 6) + 1;
    const button=document.querySelector('button[onclick="rollDice()"]');
    button.disabled=true;
    let rolls=0;
    const totalRolls=10;
    const animation=setInterval(() => {
    const Dice1=Math.floor(Math.random()*6)+1;
    const Dice2=Math.floor(Math.random()*6)+1;
    const Dice3=Math.floor(Math.random()*6)+1;
    diceResultText.innerHTML = `🎲 ${Dice1} &nbsp; 🎲 ${Dice2} &nbsp; 🎲 ${Dice3}`;
    rolls++;
    if (rolls >= totalRolls) {
        clearInterval(animation);
        diceResultText.innerHTML = `🎲 ${finalDice1} &nbsp; 🎲 ${finalDice2} &nbsp; 🎲 ${finalDice3}`;
        button.disabled = false;
        calculation(finalDice1, finalDice2, finalDice3);
    }
}, 100);
}

if (bankButton){
    bankButton.addEventListener('click',openBank);
}

function openBank(){
    let pwcheck=prompt("Enter your bank password to access the bank");
    if (Number(pwcheck)!==Number(bankpass)){
        return alert("Incorrect password! Access denied.");
    }
    showPanel('bank-panel');

}


function Takeloan(){
    let loanAmount=Number(prompt("Enter the amount you want to take as a loan:"));
    if (loanAmount>0){
        bal+=loanAmount;
        state.debt+=loanAmount;
        alert("Loan taken successfully! Your new balance is: "+bal);
        alert("Your total debt is now: "+state.debt);
        saveData();
    }
}

function Repayloan(){
    let repayAmount=Number(prompt("Enter the amount you want to repay:"));
    state.debt-=repayAmount;
    if (repayAmount>0 && repayAmount<=bal && repayAmount<=state.debt){
        bal-=repayAmount;
        alert("Loan repaid successfully! Your new balance is: "+bal);
        saveData();
    }
    else {
        alert("Invalid repayment amount or insufficient funds.");
    }
}

function bankstatus(){
    alert("current balance: "+bal+"\nTotal wins: "+state.win+"\nTotal losses: "+state.lose+"\nTotal debt: "+state.debt);
}

function exitBank(){
    saveData();
    showPanel('menu-panel');
}
function calculation(DIce1,Dice2,Dice3){
    let a=Number(document.getElementById("Dice1").value);
    let b=Number(document.getElementById("Dice2").value);
    let c=Number(document.getElementById("Dice3").value);
    if (a==Dice1 && b==Dice2 && c==Dice3){
        state.win++;
        bal+=100000;
        resultText.innerHTML="You Win  the bet of 100000! Your balance is now: "+bal;
    }
    else if (a!=Dice1 && b!=Dice2 && c!=Dice3){
        state.lose++;
        bal-=50000;
        resultText.innerHTML="You Lose the bet and pay 50000! Your balance is now: "+bal;}
    else if (a!=Dice1 && b==Dice2 && c==Dice3 ||
         a==Dice1 && b!=Dice2 && c==Dice3 ||
          a==Dice1 && b==Dice2 && c!=Dice3)
          {
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
}
    
function exitGame(){
    saveData();
    if (confirm("Are you sure you want to exit the game? ")) {
        document.body.innerHTML = `
            <h1 style="text-align:center; margin-top:40vh;">
                Thanks for playing! 🎲
            </h1>
        `
    }
}