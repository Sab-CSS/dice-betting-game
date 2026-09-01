const bankpass=prompt("enter your bank password")
const bal=prompt("enter your balance")
const play=document.getElementById("play")
const inst=document.getElementById("instruction")
const bank=document.getElementById("bank")
const status=document.getElementById("status")
const exit=document.getElementById("exit")
const instructionmodel=document.getElementById("instruction-model")
const closeInstruction=document.getElementById("close-instruction")

exit.addEventListener('click',() =>{
    window.close();
});

inst.addEventListener('click',() =>{
    instructionmodel.style.display="block";
})

closeInstruction.addEventListener('click',() =>{
    instructionmodel.style.display="none";
})