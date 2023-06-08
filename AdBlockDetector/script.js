const detect= document.querySelector("#detect");
const wrapper=document.querySelector(".wrapper");
const button=wrapper.querySelector("button");

//these are some possible classes that adblocker avoid to render
//AdBlocker add display:none to all these classes to hide ads from vistors
let adClasses = ["ad","ads","adsbox","ad-placement","doubleclick","ad-placeholder","ad-badge"];

for(let item of adClasses){
    detect.classList.add(item); //adding all array item in detect element
}

//getting display property value of our detect element
//if the user has enabled adblocker then it will return none otherwise it will block
let getProperty = window.getComputedStyle(detect).getPropertyValue("display");

button.addEventListener("click",()=>{
    wrapper.classList.remove("show");// hide popup on button click
});

//if wrapper doesnt contains show class then check adblocker is enabled or not
if(!wrapper.classList.contains("show")){
//if display property value is none then show the popup else hide it
getProperty == "none" ? wrapper.classList.add("show") : wrapper.classList.remove("show");
}
