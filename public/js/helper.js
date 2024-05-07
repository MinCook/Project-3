const close = document.querySelector("[close]")
const divRight = document.querySelector(".right")
const closeHeader = document.querySelector("[closeHeader]")
const micOn = document.querySelector("[micOn]")
const statusOn = micOn.getAttribute("[micOn]")
const micOff = document.querySelector("[micOff]")
const statusOff = micOff.getAttribute("[micOff]")
micOff.style.display = 'none'
close.addEventListener("click",()=>{
    if(divRight.style.display === 'none'){
        divRight.style.display = 'inline-block'
    }
    else{
        divRight.style.display = 'none'
    }
})
closeHeader.addEventListener("click",()=>{
        divRight.style.display = 'none'
})

micOn.addEventListener("click",()=>{
    micOn.style.display = 'none'
    micOff.style.display = 'inline-block'
})
micOff.addEventListener("click",()=>{
    micOff.style.display = 'none'
    micOn.style.display = 'inline-block'
})



