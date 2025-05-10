const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let dropDowns = document.querySelectorAll(".dropDown select");
let btn = document.querySelector(".btn-exchange");

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".To select");
let msg = document.querySelector(".msg");
for (let select of dropDowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "To" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlage(evt.target);
  });
}
const updateFlage = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newScr;
};
// btn.addEventListener("click",async(evt)=>{
//    evt.preventDefault();
//    let amount=document.querySelector("#text");
//    let amountValue=amount.value;
//    console.log(amountValue);
//    if(amountValue===""||amountValue<1){
//       amountValue=1;
//       amount.value="1";
//    }
//    console.log(fromCurr.value,toCurr.value);
//    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//    const response= await fetch(URL);
//    // const response= await fetch(BASE_URL);
//    // console.log(response);
// })

const updateCurrency = async () => {
  let amount = document.querySelector("#text");
  let amountValue = amount.value;
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }

  const baseCurrency = fromCurr.value.toLowerCase();
  const targetCurrency = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${baseCurrency}.json`;
  const response = await fetch(URL);
  const data = await response.json();
  const rate = data[baseCurrency][targetCurrency];

  const convertedAmount = amountValue * rate;
  console.log(
    `${amountValue} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`
  );

  msg.innerText = `${amountValue} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
};
window.addEventListener("load", () => {
  updateCurrency();
});
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateCurrency();
});
