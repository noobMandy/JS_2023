const wrapper = document.querySelector(".wrapper"),
  form = wrapper.querySelector("form"),
  fileInp = form.querySelector("input");
infoText = form.querySelector("p");
(closeBtn = wrapper.querySelector(".close")),
  (copyBtn = wrapper.querySelector(".copy"));
function fetchRequest(formData, file) {
  infoText.innerText = "Scanning QR Code...";
  //sending post request to qr server api with passing
  //form data as body and getting response from it
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? "Upload QR Code to Scan"
        : "Couldnt Scan QR Code";
      if (!result) return;
      wrapper.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file); // URL.createObjectURL creates string containing a URL of passed object. And, passing this URL as image src
      wrapper.classList.add("active");
    })
    .catch(() => {
      infoText.innerText = "Couldn't Scan QR Code";
    });
}

fileInp.addEventListener("change", (e) => {
  let file = e.target.files[0]; //getting user selected file
  if (!file) return;
  let formData = new FormData(); //creating a new FormData object
  formData.append("file", file); // adding selected file to form data
  fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
  let text = wrapper.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
  copyBtn.innerText = "Text Copied";
});
form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
