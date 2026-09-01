const bankpass=prompt("enter your bank password")
const bal=prompt("enter your balance")
const play=document.getElementById("play")
const inst=document.getElementById("instruction")
const bank=document.getElementById("bank")
const status=document.getElementById("status")
const exit=document.getElementById("exit")

exit.addEventListener("click",() =>{
    window.close();
});