const popup = document.querySelector(".popup");
 wifiIcon = document.querySelector(".icon i");
 popupTitle = document.querySelector(".popup .title");
 popupDesc = document.querySelector(".desc");
reconnectBtn = document.querySelector(".reconnect");

let isOnline = true,
  intervalId,
  timer = 10;

const checkConnection = async () => {
  try {
    //try to fetch random data from API .IF status code is between
    //200 & 300 , the network connection is considered online
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false; // if there is an error connection is considered offline
  }
  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};

const handlePopup = (status) => {
  if (status) {
    // if the status is true (online), update icon, title, and description accordingly
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerText = "Connection restored now!";
    popupDesc.innerHTML ="Your device is now successfully connected to internet";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }

  // if the status is false (offline), update icon, title, and description accordingly

  wifiIcon.className = "uil uil-wifi-slash";
  popupTitle.innerText = "Connection Lost!";
  popupDesc.innerHTML =
    "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
  popup.className = "popup show";

  intervalId = setInterval(() => {
    timer--; //set an interval to decrease the timer by every 1 second
    if (timer === 0) checkConnection(); // if the timer reaches 0, check the connection again
     popup.querySelector(".desc b").innerText = timer;
  }, 1000);
};

//Only if is isOnline is true, Check the connection status after 3 seconds

setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click",checkConnection)
