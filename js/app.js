console.log("We are in post man project");

// Utility function
// 1. utility function to get DOM element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// initialize no of parameters
let addedParamCount = 0;

// Hide the parameters box hide initially
let parametersBox = document.getElementById("parameterBox");
parametersBox.style.display = "none";

// if the user clicks on params box, hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parameterBox").style.display = "block";
});

// if the user clicks on json box, hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parameterBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

// If the user clicks on plus button add more parameters
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="row my-3">
          <label for="url" class="col-sm-2 col-form-label">parameter ${
            addedParamCount + 2
          }</label>
          <div class="col">
            <input
              id="parameterKey${addedParamCount + 2}"
              type="text"
              class="form-control"
              placeholder="parameter${addedParamCount + 2} key"
            />
          </div>
          <div class="col">
            <input
              type="text"
              id="parameterValue${addedParamCount + 2}"
              class="form-control"
              placeholder="parameter${addedParamCount + 2} Value"
            />
          </div>
          <button class="btn btn-info deletParam">-</button>
        </div>`;
  // Convert the element string to DOM element
  let paramElement = getElementFromString(string);
  //   console.log(paramElement);
  params.appendChild(paramElement);
  //   Add an event Listner to remove the parameters on clicking - button
  let deleteParam = document.getElementsByClassName("deletParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      confirm("Are you sure you want to delete");
      e.target.parentElement.remove();
    });
  }
  addedParamCount++;
});

// if the user click on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // Show please wait in the reponse box to request patience from the user
  document.getElementById("responsePrism").value =
    "Please wait... Fetching response";

  // Fetch all the value user has entered
  let url = document.getElementById("url").value;
  let requestType = document.querySelector('input[name="requestType"]:checked')
    .value;
  let contentType = document.querySelector('input[name="contentType"]:checked')
    .value;

  // if user has used params option instead of json, collects all the parameters in an object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("responsePrism").value;
  }
  // log all the values in console for debugging
//   console.log("url is", url);
//   console.log("requestType is ", requestType);
//   console.log("contentType is ", contentType);
//   console.log("data is ", data);

  // if the request type is post, invoke fetch api to create a post request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById("responseJsonText").value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById("responseJsonText").value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  }

  // ending of the function
});
