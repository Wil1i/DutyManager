var userContainers = document.querySelectorAll(".userContainer");
var dutyHoursFilter = document.getElementById("dutyHoursFilter");
var searchBox = document.getElementById("searchBox");
var userNames = document.querySelectorAll(".userName");

for (let i = 0; i < userContainers.length; i++) {
  if (userContainers[i].id) {
    userContainers[i].addEventListener("click", () => {
      window.location.href = window.location.href + "/" + userContainers[i].id;
    });
  }
}

dutyHoursFilter.addEventListener("click", () => {
  var filterThings = document.querySelectorAll(".onFilter");
  var usersHandler = document.getElementById("usersHandlerUL");
  for (let i = 0; i < filterThings.length; i++) {
    var target = filterThings[filterThings.length - (i + 1)];
    usersHandler.appendChild(target);
  }
});

searchBox.addEventListener("keypress", (e) => {
  for (let i = 0; i < userNames.length; i++) {
    var target = userNames[i];
    if (!target.innerHTML.includes(searchBox.value + e.key)) {
      target.parentNode.style.display = "none";
    } else {
      target.parentNode.style.display = "flex";
    }
  }
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key == "Backspace") {
    for (let i = 0; i < userNames.length; i++) {
      var target = userNames[i];
      if (
        !target.innerHTML.includes(
          searchBox.value.substring(0, searchBox.value.length - 1)
        )
      ) {
        target.parentNode.style.display = "none";
      } else {
        target.parentNode.style.display = "flex";
      }
    }
  }
});
