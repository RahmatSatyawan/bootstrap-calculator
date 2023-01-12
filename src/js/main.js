console.log("Tes");

//Variabel
var display = document.getElementById("main_screen");
var displaySecond = document.getElementById("second_screen");
var stored = 0;
const dot = document.getElementById("dot");
let lastElement = "operator";

//DarkModeToggle
document
  .getElementById("darkmode_toggle")
  .addEventListener("change", funcToggle);

var el = document.getElementsByClassName("container-fluid");
if (el.length <= 1) {
  for (let i = 0; i <= el.length; i++) {
    el[i].classList.add("dark-mode");
  }
}

//Funct DarkModeToggle
function funcToggle() {
  var dark = document.getElementsByClassName("dark-mode");
  console.log(`${dark}`);
  if (!this.checked) {
    var elements = document.getElementsByClassName("container-fluid");
    if (!dark.length) {
      for (let i = 0; i <= elements.length; i++) {
        elements[i].classList.remove("dark-mode");
        elements[i].classList.add("dark-mode");
      }
    }
  } else {
    var elements = document.getElementsByClassName("container-fluid");
    if (dark.length) {
      for (let i = 0; i <= elements.length; i++) {
        elements[i].classList.add("dark-mode");
        elements[i].classList.remove("dark-mode");
      }
    }
  }
}

//Func addNumber
function addNumber(id) {
  let number = document.getElementById(id).textContent;
  let val = display.value;
  //Removes leading zero if no decimal.
  if (val[0] === "0" && val[1] !== ".") {
    val = val.slice(0, -1);
    lastElement = "operator";
  }
  if (val.length < 17) {
    val += number;
    lastElement = "number";
  }
  display.value = val;
  console.log(`${lastElement} ${display.value}`);
}

//AddOperator
function addOperator(id) {
  let operator = document.getElementById(id).textContent;
  let val = display.value;

  // Prevents a first char to be an operator.
  if (stored == 0 && 1 <= val.length && val.length < 16) {
    if (lastElement === "number") {
      val += operator;
      lastElement = "operator";
    }
    //Changes operator
    else if (lastElement === "operator") {
      val = val.slice(0, -1) + operator;
    }
  }
  if (stored !== 0 && val.length < 16) {
    if (lastElement === "number") {
      val += operator;
      lastElement = "operator";
    }
    //Changes operator
    else if (lastElement === "operator") {
      val = val.slice(0, -1) + operator;
    }
  }

  display.value = val;
  console.log(`${lastElement} ${display.value} ${stored}`);
}

//SetCe
function setCe() {
  let val = display.value;
  val = val.slice(0, -1);
  display.value = val;
}

//SetAc
function setAc() {
  display.value = "";
  stored = 0;
  displaySecond.value = "";
  lastElement = "operator";

  if (dot.classList.contains("unclickable")) {
    dot.classList.remove("unclickable").add("clickable");
  } else {
    return;
  }
}

//SetPercent
function setPercent() {
  let val = display.value;
  val = val * 1;
  if (typeof val == "number" && !isNaN(val)) {
    // check if it is integer
    if (Number.isInteger(val)) {
      val = val / 100;
    } else {
      val = val / 100;
    }
  } else {
    console.log(`NAN is not a number`);
  }
  display.value = val;
}

//SignSw
function signSw() {
  let val = display.value;
  val = val[0] === "-" ? val.slice(1) : "-" + val.slice(0);
  display.value = val;
}

//Total
function setTotal() {
  let val = display.value;
  //If last element operator display Error.
  if (lastElement === "operator") {
    return syntaxErr(val);
  }

  // for (let i = 0; i < val.length; i++) {
  //   console.log("it");
  //   if (string(val[i]) == "x") {
  //     val[i] = "*";
  //     console.log(`${val[i]}`);
  //     console.log(`${val}`);
  //     // val = test(val); cacth error
  //     val = eval(val);
  //     display.value = val;
  //   }
  // }

  //Calculate a value and replace decimal zeros if exist.
  if (stored == 0) {
    if (val.length <= 17) {
      val = eval(val)
        .toFixed(4)
        .replace(/\.?0*$/g, "");
      console.log(`stored 0 ${val} ${stored} `);
    } else {
      val = exp(eval(val), 6);
    }
  }

  if (stored !== 0) {
    if (val.length <= 17) {
      let concatt = stored.concat(val);
      val = eval(concatt);
      // .toFixed(4)
      // .replace(/\.?0*$/g, "");
      console.log(`ini ${val} ${stored} `);
    } else {
      val = exp(eval(val), 6);
    }
  }
  // val = test(val); cacth error
  displaySecond.value = val;
  stored = displaySecond.value;
  display.value = "";
}

//Add event listener.
document.addEventListener("click", (e) => {
  console.log("click");
  const clicked = e.target;

  if (clicked.classList[0] === "number") {
    addNumber(clicked.id);
  }

  if (clicked.classList[0] === "operator") {
    //Prevent multiple dots in one number.
    if (clicked === dot) {
      dot.classList.remove("clickable");
      dot.classList.add("unclickable");
    } else if (clicked !== dot) {
      dot.classList.remove("unclickable");
      dot.classList.add("clickable");
    }
    addOperator(clicked.id);
  }

  switch (clicked.id) {
    case "ce":
      setCe();
      break;
    case "ac":
      setAc();
      break;
    case "percent":
      setPercent();
      break;
    case "sign":
      signSw();
      break;
    case "equal":
      setTotal();
      break;
  }
});
