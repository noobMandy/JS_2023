const wrapper = document.querySelector(".wrapper");
const generateBtn = wrapper.querySelector(".form button");
const qrInput = wrapper.querySelector(".form input");
const qrImg = wrapper.querySelector(".qr-code img");

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value;
  if (!qrValue) return alert("Please enter any input!!"); //if the input is empty then return from here
  generateBtn.innerText = "Generating QR Code...";
  //getting a QR code of the user entered value using qrserver
  //api and passing the the api returned img src to qrImg
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    //once QR code img loaded
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";
  });
  qrInput.addEventListener("keyup", () => {
    if (!qrInput.value) {
      wrapper.classList.remove("active");
    }
  });
});
