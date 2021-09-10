const computersElement = document.getElementById("computers");
const balanceElement = document.getElementById("balance");
const payElement = document.getElementById("pay");
const loanElement = document.getElementById("loan");
const bankElement = document.getElementById("bank");
const workElement = document.getElementById("work");
const repayLoanElement = document.getElementById("repayLoan");
const featureElement = document.getElementById("feature")
const buyLaptopElement = document.getElementById("buyLaptop");
const costOfLaptopElement = document.getElementById("price")
const loanTotalElement = document.getElementById("loanTotal");
const imageElement = document.getElementById("image");
const nameElement = document.getElementById("name")
const descriptionElement = document.getElementById("description");


let computers = [];
let balance = 0.0;
let pay = 0.0;
let loanTotal = 0.0;
//let outstandingLoan = 0.0;
let price = 0.0;
let hasLoan = false;
let priceOfComputer = 0.0;
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToStore(computers));

const addComputersToStore = (computers) => {
    computers.forEach(x => addComputerToStore(x));
}

const addComputerToStore = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

const handleComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex]
    priceOfComputer = selectedComputer.price;
    costOfLaptopElement.innerText = selectedComputer.price + " NOK";
    imageElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image
    nameElement.innerText = selectedComputer.title;
    descriptionElement.innerText = selectedComputer.description;
    featureElement.innerText = selectedComputer.specs;

    //selectedComputer.image.onerror(function() {imageElement.src = "https://emdplugins.com/media/marketplacedb_5defb59312058_404_pagenot_found.png"});

}


const handleWorkClick = () => {
    pay = pay + 100;
    payElement.innerText = pay;
}
const handleBankClick = () => {
    if (hasLoan === true) {
        const loanPercentage = (10 / 100) * loanTotal;
        balance = balance - loanPercentage + pay;
        loanTotal = loanTotal - loanPercentage;
        pay = 0;
        loanTotalElement.innerText = loanTotal;
        balanceElement.innerText = balance;
        payElement.innerText = 0;
    } else {
        balance = balance + pay;
        balanceElement.innerText = balance;
        pay = 0;
        payElement.innerText = 0;
    }

}
const handleLoanClick = () => {
    const loanAmount = prompt("Enter amount to loan:");
    if (loanAmount > balance * 2) {
        prompt("You cannot loan more than the double of your bank balance");
    } else if (hasLoan === true) {
        alert("You already have a loan");
    } else {
        loanTotal = loanAmount;
        loanTotalElement.innerText = loanTotal;
        hasLoan = true;
        const showRepay = () => {
            document.getElementById("repayLoan").style.visibility = "visible";
        }
        showRepay();
    }
}
const handlePayBackLoan = () => {
    console.log("asdas")
    if (balance < loanTotal) {
        alert("You do not have enough money to pay back your loan")
    } else {
        balance = balance - loanTotal;
        balanceElement.innerText = balance
        loanTotalElement.innerText = 0;
        hasLoan = false;
        const hideRepay = () => {
            document.getElementById("repayLoan").style.visibility = "hidden";
        }
        hideRepay();
    }
}
const handleBuyLaptop = () => {
    if (priceOfComputer <= balance) {
        balance = balance - priceOfComputer;
        balanceElement.innerText = balance;
        alert("You are now the proud owner of a new computer")
    } else {
        alert("Not enough money to buy this computer")
    }
}


computersElement.addEventListener("change", handleComputerChange);
workElement.addEventListener("click", handleWorkClick);
bankElement.addEventListener("click", handleBankClick)
loanElement.addEventListener("click", handleLoanClick)
repayLoanElement.addEventListener("click", handlePayBackLoan)
buyLaptopElement.addEventListener("click", handleBuyLaptop)
