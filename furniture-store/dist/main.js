// ── Extension 1
let money = 1000;
document.getElementById("money").textContent = money;

// ── Exercise 3
document.getElementById("priceBtn").addEventListener("click", function () {
  const item = document.getElementById("priceInput").value.trim();
  if (!item) return;

  const req = new XMLHttpRequest();
  req.open("GET", "/priceCheck/" + encodeURIComponent(item));
  req.onload = function () {
    const data = JSON.parse(req.responseText);
    const resultEl = document.getElementById("priceResult");
    if (data.price !== null) {
      resultEl.textContent = "Price of " + item + ": $" + data.price;
    } else {
      resultEl.textContent = "Item not found in store.";
    }
  };
  req.send();
});

// ── Exercise 5 + Extension 1
document.getElementById("buyBtn").addEventListener("click", function () {
  const item = document.getElementById("buyInput").value.trim();
  if (!item) return;

  const resultEl = document.getElementById("buyResult");

  // Extension 1
  const priceReq = new XMLHttpRequest();
  priceReq.open("GET", "/priceCheck/" + encodeURIComponent(item));
  priceReq.onload = function () {
    const priceData = JSON.parse(priceReq.responseText);

    if (priceData.price === null) {
      resultEl.textContent = "That item doesn't exist in the store.";
      return;
    }

    // Extension 1
    if (money < priceData.price) {
      resultEl.textContent = "You can't afford that. You should get a job! 💼";
      return;
    }

    // User can afford it
    const buyReq = new XMLHttpRequest();
    buyReq.open("GET", "/buy/" + encodeURIComponent(item));
    buyReq.onload = function () {
      const buyData = JSON.parse(buyReq.responseText);

      if (buyData.error) {
        resultEl.textContent = "Error: " + buyData.error;
        return;
      }

      // Extension 1
      money -= buyData.price;
      document.getElementById("money").textContent = money;

      // Exercise 5
      resultEl.textContent =
        "Congratulations, you've just bought " + buyData.name +
        " for $" + buyData.price + ". There are " + buyData.inventory +
        " left now in the store.";
    };
    buyReq.send();
  };
  priceReq.send();
});

// ── Exercise 6
document.getElementById("saleBtn").addEventListener("click", function () {
  const req = new XMLHttpRequest();
  req.open("GET", "/sale/?admin=true");
  req.onload = function () {
    const data = JSON.parse(req.responseText);
    document.getElementById("saleResult").textContent = JSON.stringify(data, null, 2);
  };
  req.send();
});

// ── Extension 2
let lastChairPrice = null;

setInterval(function () {
  const req = new XMLHttpRequest();
  req.open("GET", "/priceCheck/chair");
  req.onload = function () {
    const data = JSON.parse(req.responseText);
    const currentPrice = data.price;

    if (lastChairPrice !== null && currentPrice < lastChairPrice) {
      // Price dropped — buy immediately!
      const buyReq = new XMLHttpRequest();
      buyReq.open("GET", "/buy/chair");
      buyReq.onload = function () {
        console.log("bought chair for less");
      };
      buyReq.send();
    } else {
      console.log("still waiting for a price drop...");
    }

    lastChairPrice = currentPrice;
  };
  req.send();
}, 3000);
