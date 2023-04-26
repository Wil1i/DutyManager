const input = document.querySelector(".personeli__input");
const numbers = document.querySelectorAll(".numbers__num");
const remove = document.getElementById("remove");
const submit = document.getElementById("submit");
const appleAlert = document.querySelector(".apple-service");
const loginAlert = document.querySelector(".success-login");
const logoutAlert = document.querySelector(".success-logout");
let timeout;

const svg = {
  out: `<path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M17.4697 13.4697C17.1768 13.7626 17.1768 14.2374 17.4697 14.5303C17.7626 14.8232 18.2374 14.8232 18.5303 14.5303L19.8232 13.2374C20.5066 12.554 20.5066 11.446 19.8232 10.7626L18.5303 9.46967C18.2374 9.17678 17.7626 9.17678 17.4697 9.46967C17.1768 9.76256 17.1768 10.2374 17.4697 10.5303L18.1893 11.25L13 11.25C12.5858 11.25 12.25 11.5858 12.25 12C12.25 12.4142 12.5858 12.75 13 12.75L18.1893 12.75L17.4697 13.4697Z"
    fill="#efefef"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M11 4.51611L14 4.51611C15.5188 4.51611 16.75 5.74733 16.75 7.26611C16.75 7.68033 16.4142 8.01611 16 8.01611C15.5858 8.01611 15.25 7.68033 15.25 7.26611C15.25 6.57576 14.6904 6.01611 14 6.01611H11V4.51611ZM16 16.5161C16.4142 16.5161 16.75 16.8519 16.75 17.2661C16.75 18.7849 15.5188 20.0161 14 20.0161H11V18.5161H14C14.6904 18.5161 15.25 17.9565 15.25 17.2661C15.25 16.8519 15.5858 16.5161 16 16.5161Z"
    fill="#efefef"
  />
  <path
    opacity="0.65"
    d="M3 5.99676C3 5.27511 3.38195 4.60121 4.01783 4.20091L7.44642 2.36612C8.9654 1.40989 11 2.43812 11 4.16198V19.838C11 21.5619 8.9654 22.5901 7.44642 21.6339L4.01785 19.7959C3.38196 19.3956 3.00002 18.7217 3.00002 18L3 5.99676Z"
    fill="#efefef"
  />`,
  warn: `<path
  opacity="0.4"
  d="M10.3708 2.36419L5.33248 4.71069C3.87515 5.38942 2.91343 6.90939 3.00617 8.57773C3.36871 15.1001 5.1914 17.9715 9.92759 21.3315C11.1823 22.2216 12.8361 22.2238 14.0899 21.3322C18.8406 17.9539 20.5981 15.0419 20.9925 8.60032C21.0953 6.92095 20.1321 5.38485 18.6646 4.70139L13.6462 2.36419C12.6036 1.8786 11.4134 1.8786 10.3708 2.36419Z"
  fill="#efefef"
/>
<path
  d="M11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17Z"
  fill="#efefef"
/>
<path
  fill-rule="evenodd"
  clip-rule="evenodd"
  d="M12 14.75C11.5858 14.75 11.25 14.4142 11.25 14L11.25 7C11.25 6.58579 11.5858 6.25 12 6.25C12.4142 6.25 12.75 6.58579 12.75 7L12.75 14C12.75 14.4142 12.4142 14.75 12 14.75Z"
  fill="#efefef"
/>`,
};

const clickAnimation = (elem) => {
  elem.classList.add("click-animate");
  elem.addEventListener("animationend", () =>
    elem.classList.remove("click-animate")
  );
};

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", () => {
    clickAnimation(numbers[i]);
    input.value = input.value + numbers[i].innerHTML;
  });
}

remove.addEventListener("click", () => {
  clickAnimation(remove);
  input.value = input.value.slice(0, -1);
});

const activeAppleAlert = () => {
  if (timeout && timeout.clearTimeout) timeout.clearTimeout();
  timeout = setTimeout(() => {
    loginAlert.classList.remove("active-alert");
    logoutAlert.classList.remove("active-alert");
    appleAlert.classList.add("active-alert");
  }, 5000);
};

const customAlert = (text, mode) => {
  switch (mode) {
    case "warn":
      logoutAlert.style.background = "orange";
      logoutAlert.querySelector("span").innerHTML = text;
      logoutAlert.querySelector("svg").innerHTML = svg.warn;
      appleAlert.classList.remove("active-alert");
      loginAlert.classList.remove("active-alert");
      logoutAlert.classList.add("active-alert");
      break;
    case "danger":
      logoutAlert.style.background = "#dc3131";
      logoutAlert.querySelector("span").innerHTML = text;
      logoutAlert.querySelector("svg").innerHTML = svg.out;
      appleAlert.classList.remove("active-alert");
      loginAlert.classList.remove("active-alert");
      logoutAlert.classList.add("active-alert");
      break;
    case "success":
      loginAlert.querySelector("span").innerHTML = text;
      appleAlert.classList.remove("active-alert");
      logoutAlert.classList.remove("active-alert");
      loginAlert.classList.add("active-alert");
      break;
  }
  activeAppleAlert();
};

submit.addEventListener("click", async () => {
  clickAnimation(submit);

  // submit personel
  axios
    .post("/api/duty/change", { codePersoneli: input.value })
    .then((isUserDuty) => {
      if (isUserDuty.data == true) {
        axios
          .post("/?action=logout", { codePersoneli: input.value })
          .then((response) => {
            customAlert("با موفقیت خارج شدید!", "danger");
          });
      } else {
        axios
          .post("/?action=login", { codePersoneli: input.value })
          .then((response) => {
            if (
              response.data.err &&
              response.data.err == "internet connection"
            ) {
              customAlert("اینترنت خود را چک کنید", "warn");
              return;
            }

            if (response && response.data && response.data.dataValues) {
              const data = response.data.dataValues;
              customAlert(
                `${data.firstName} ${data.lastName} خوش آمدید‌!`,
                "success"
              );
            } else {
              customAlert("کد پرسنلی نامعتبر است!", "warn");
            }
          });
      }

      input.value = "";
    });
});

appleAlert.addEventListener("click", () => {
  var s = document.getElementById("s");
  if (s.requestFullscreen) {
    s.requestFullscreen();
  } else if (s.webkitRequestFullscreen) {
    s.webkitRequestFullscreen();
  } else if (s.msRequestFullscreen) {
    s.msRequestFullscreen();
  }
});
