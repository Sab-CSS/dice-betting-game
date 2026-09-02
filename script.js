const bankpass=prompt("enter your bank password")
const bal=prompt("enter your balance")
const play=document.getElementById("play")
const inst=document.getElementById("instruction")
const bank=document.getElementById("bank")
const status=document.getElementById("status")
const exit=document.getElementById("exit")
const instructionmodel=document.getElementById("instruction-model")
const closeInstruction=document.getElementById("close-instruction")
const a=Math.floor(Math.random()*6)+1;
const b=Math.floor(Math.random()*6)+1;
const c=Math.floor(Math.random()*6)+1;
let win=0,lose=0,debt=0;

exit.addEventListener('click',() =>{
    window.close();
});

inst.addEventListener('click',() =>{
    instructionmodel.style.display="block";
})

closeInstruction.addEventListener('click',() =>{
    instructionmodel.style.display="none";
})