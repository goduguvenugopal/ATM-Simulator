const enter_btn = document.getElementById("enter-btn");
const pin = document.getElementById("pin");
const check_balance = document.getElementById("check-balance");
const deposit = document.getElementById("deposit");
const withdraw = document.getElementById("withdraw");
const cancel = document.getElementById("cancel");
const balance = document.getElementById("balance");
const btnBox = document.getElementById("btn-box");

window.addEventListener("load", () => {
  const pass = localStorage.getItem("pin");
  if (pass) {
    const parsedPin = JSON.parse(pass);
    pin.value = parsedPin;
  }
});

function welFunc() {
  const atmPin = pin.value.trim();
  if (atmPin.length < 4) {
    alert("Please Enter a Valid 4-digit ATM PIN");
  } else if (atmPin !== "") {
    localStorage.setItem("pin", JSON.stringify(atmPin));
    btnBox.className = "d-flex flex-column";
    balance.style.display = "block";
  }
}

let minBalance = 1000;

check_balance.addEventListener("click", minFunc);
function minFunc() {
  balance.innerText = `Your Account Balance ${minBalance.toLocaleString(
    "en-IN"
  )}`;
}

deposit.addEventListener("click", () => {
  const pro = prompt("Enter deposit money");
  if (pro !== null) {
    balance.innerHTML = `<h5 class="text-success">${parseInt(
      pro,
      10
    ).toLocaleString(
      "en-IN"
    )} rupees deposited successfully in your account</h5>`;
    minBalance += parseInt(pro, 10);
  }
});

withdraw.addEventListener("click",() =>{
  const pro = prompt("Enter withdraw money");
  if (pro !== null){
    if (parseInt(pro, 10) > minBalance){
      balance.innerText = "You Don't have suffucient balance in your account";
    } else if (parseInt(pro, 10) < minBalance){
      balance.innerHTML = `<h5 class="text-danger">${parseInt(
        pro,
        10
      ).toLocaleString("en-IN")} rupees debited in your account</h5>`;
      minBalance -= parseInt(pro, 10);
    }
  }
});

cancel.addEventListener("click",()=>{
  btnBox.className = "none";
  balance.style.display = "none";
  localStorage.removeItem("pin");
  pin.value = "";
  balance.innerText = "Welcome to Canara bank ATM";
});
