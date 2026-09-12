let currentPlayer=null;
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
const diceResultText = document.getElementById("dice-result");
const resultText = document.getElementById("result");
const bankPanel=document.getElementById("bank-panel");
const debtPanel=document.getElementById("debt-panel");
const menu=document.getElementById("menu-panel")
const login=document.getElementById("login-panel")
const signup=document.getElementById("signup-panel")
const SignupToggle=document.getElementById("toggle-signup-Password")
const LoginToggle=document.getElementById('toggle-login-Password')
const signupPassword=document.getElementById("password")
const loginPassword=document.getElementById('login-password')

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
    if (panelId==="debt-panel"&&debt<=0){
        return;
    }
    const panels = document.querySelectorAll('.panel, #play-model, #instruction-panel, #bank-panel, #status-panel,#menu-panel');
    panels.forEach(panel => {panel.style.display="none";});
        const selectedPanel=document.getElementById(panelId);
        if (!selectedPanel){
            console.error("panel not found:",panelId);
            return;
        }
        if (panelId==="menu-panel"||panelId==="play-model"){
            selectedPanel.style.display="flex";
        }
        else {
            selectedPanel.style.display="block";
        }
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
    if (state.debt>0){
        alert("Your Debt:"+state.debt)
        alert("you have two options:")
        menu.style.display='none';
        debtPanel.style.display="block";
    } 
    else {
        showPanel('bank-panel');
    }
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
    if (repayAmount>0 && repayAmount<=bal && repayAmount<=state.debt){
        bal-=repayAmount;
        state.debt-=repayAmount;
        alert("Loan repaid successfully! Your new balance is: "+bal);
        alert("current debt:"+state.debt)
        saveData();
        if (state.debt===0){
        showPanel("bank-panel");
    }
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

function updateandShowStatus(){
    document.getElementById("total-wins").textContent = state.win;
    document.getElementById("total-losses").textContent = state.lose;
    document.getElementById("current-balance").textContent = bal;
    document.getElementById("current-debt").textContent = state.debt;
    document.getElementById("total-games").textContent = state.win + state.lose;
    let winPercentage=(state.win/(state.win+state.lose))*100;
    if (isNaN(winPercentage)){
        winPercentage=0;
    }
    document.getElementById("win-percentage").textContent = winPercentage.toFixed(2) + "%";

    showPanel("status-panel");
}

function resetGame(){
    if (confirm("Are you sure you want to reset the game? This will clear all your data.")) {
        const username=localStorage.getItem("currentPlayer");
        if (username){
            const savedPlayer=localStorage.getItem("player:"+username);
            if (savedPlayer){
                const player=JSON.parse(savedPlayer)
                player.bankpass=null;
                player.balance=null;
                player.state={
                    win:0,
                    lose:0,
                    debt:0
                };
                state={win:0,lose:0,debt:0};
                bal=0
                localStorage.setItem("player:" + username, JSON.stringify(player));
            }
        }
        localStorage.password
        localStorage.removeItem("balance");
        localStorage.removeItem("state");
        location.reload();
    }
    showPanel('menu-panel')
}

function Run(){
    let x=Math.floor(Math.random()*2)+1
    if (x===1){
        alert("Police caught!\n Game Over");   
        document.body.innerHTML = `
            <h1 style="text-align:center; margin-top:40vh;">
                Thanks for playing! 🎲
            </h1>`
    }
    else{
        alert("Escaped!");
        localStorage.clear();
        location.reload();
        return;
    }
    saveData();
    
}

SignupToggle.addEventListener('click',function(){
        if (signupPassword.type==='password'){
            signupPassword.type='text';
            this.textContent='Hide';
        }else{
            signupPassword.type='password';
            this.textContent='Show';
        }
    })

LoginToggle.addEventListener('click',function(){
        if (loginPassword.type==='password'){
            loginPassword.type='text';
            this.textContent='Hide';
        }else{
            loginPassword.type='password';
            this.textContent='Show';
        }
    })   

function Signup(){
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    
    if (!firstname||!lastname||!username||!password){
        alert("Please fill all the field");
        return;
    }

    if (localStorage.getItem("player:"+username)){
        alert("Username already exists!");
        return;
    }
    bankpass=prompt("enter bank password:")
    if (bankpass===null||bankpass===""){
        alert("Bank password is required");
        return;
    }
    bal=prompt("enter your balance")
    if (isNaN(bal)||bal<0){
        alert("Invalid Balance!");
        return;
    }
    const player={ firstname:firstname,lastname:lastname,username:username,password:password,bankpass:bankpass,balance:bal,state:{win:0,lose:0,debt:0}};

    localStorage.setItem("player:"+username,JSON.stringify(player));
    alert("Acount is created!");
    currentPlayer=player;
    showPanel("menu-panel");
}

function Login(){
    const loguser=document.getElementById("login-username").value.trim();
    const logpass=document.getElementById("login-password").value;
    const rememberMe=document.getElementById("remember-me").checked;
    const savedplayer=localStorage.getItem("player:"+loguser);
    if (!savedplayer){
        alert("Account not found");
        return;
    }
    const player=JSON.parse(savedplayer);

    if (player.password!=logpass){
        alert("Wrong password");
        return;
    }

    currentPlayer=player
    if (rememberMe){
        localStorage.setItem("currentPlayer",loguser);
        sessionStorage.removeItem("currentPlayer");
    }else{
        sessionStorage.setItem("currentPlayer",loguser);
        localStorage.removeItem("currentPlayer");
    }
    alert("Welcome"+player.firstname+"!");
    showPanel("menu-panel");
}

const loggedUser=localStorage.getItem("currentPlayer")||sessionStorage.getItem("currentPlayer");
if (loggedUser){
    const savedPlayer=localStorage.getItem("player:"+loggedUser);
    if(savedPlayer){
        currentPlayer=JSON.parse(savedPlayer);
        if (currentPlayer.bankpass===null||currentPlayer.balance===null){
            bankpass=prompt("enter bank password:");
            if (bankpass===null||bankpass===""){
            alert("Bank password is required");
        }
        bal=Number(prompt("enter your balance"));
        if (isNaN(bal)||bal<0){
            alert("Invalid Balance!");
        }
        currentPlayer.bankpass=bankpass;
        currentPlayer.balance=bal;
        localStorage.setItem("player:"+currentPlayer.username,JSON.stringify(currentPlayer));
        }
        showPanel("menu-panel");
    }else{
        localStorage.removeItem("currentPlayer");
        showPanel('welcome-panel');
    }  
}else {showPanel("welcome-panel");}


login.addEventListener("keydown",(event)=>{if (event.key==="Enter")Login();});
signup.addEventListener("keydown",(event)=>{if (event.key==="Enter")Signup();});

function changeAccount(){
    if(confirm("Are you sure you want to change account")){
        localStorage.removeItem("currentPlayer");
        sessionStorage.removeItem("currentPlayer");
        currentPlayer=null;
        showPanel("login-panel");
    }
}

function logout(){
    if(confirm("Are you sure you want to logout?")){
        localStorage.removeItem("currentPlayer");
        sessionStorage.removeItem("currentPlayer");
        currentPlayer=null;
        showPanel("welcome-panel")
    }
}

function forgotPassword(){
    const username=prompt("Enter your username");
    if (!username) return;
    const savedPlayer=localStorage.getItem("player:"+username);
    if (!savedPlayer){
        alert("Account not found!");
        return;
    }
    const player=JSON.parse(savedPlayer);
    const newPassword=prompt("enter new password");
    if (!newPassword){
        alert("wrong password!");
        return;
    }
    player.password=newPassword;
    localStorage.setItem("player:"+username,JSON.stringify(player));
    alert("Password changed");
    showPanel("login-panel")
}