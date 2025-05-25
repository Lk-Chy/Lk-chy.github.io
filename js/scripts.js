// Show alert on page load
window.onload = function () {
  alert("Hello TEJ!");

  // Initializing unit price for samosa and tea
  document.getElementById("samosa-price").value = 50;
  document.getElementById("tea-price").value = 25;

  updateItemTotals(); // function so that the total gets updated on change of quantity (for this part i took help of chatgpt to automate the totals)
};

// initializing the quantities to 0
let samosaQty = 0;
let teaQty = 0;

// Fetching necessary elements
const samosaQtyDisplay = document.getElementById("quantity-samosa");
const teaQtyDisplay = document.getElementById("quantity-tea");

const samosaPlusBtn = document.getElementById("samosa-plus");
const samosaMinusBtn = document.getElementById("samosa-minus");

const teaPlusBtn = document.getElementById("tea-plus");
const teaMinusBtn = document.getElementById("tea-minus");

//updating values in webpage
function updateQuantities() {
  samosaQtyDisplay.textContent = samosaQty;
  teaQtyDisplay.textContent = teaQty;
  updateItemTotals();
}

// total items updates without vat and tips
function updateItemTotals() {
  const samosaPrice = Number(document.getElementById("samosa-price").value);
  const teaPrice = Number(document.getElementById("tea-price").value);

  const samosaTotal = samosaPrice * samosaQty;
  const teaTotal = teaPrice * teaQty;

  document.getElementById("samosa-total").textContent = `Total: ${samosaTotal}`;
  document.getElementById("tea-total").textContent = `Total: ${teaTotal}`;

  const totalPrice = samosaTotal + teaTotal;
  document.getElementById(
    "total-price"
  ).textContent = `Total price: ${totalPrice}`;
}

// Adding increament and decreament functions on button
samosaPlusBtn.addEventListener("click", () => {
  samosaQty++;
  updateQuantities();
});

samosaMinusBtn.addEventListener("click", () => {
  if (samosaQty > 0) samosaQty--;
  updateQuantities();
});

teaPlusBtn.addEventListener("click", () => {
  teaQty++;
  updateQuantities();
});

teaMinusBtn.addEventListener("click", () => {
  if (teaQty > 0) teaQty--;
  updateQuantities();
});

// Grnd total calculation with vat and tip
document.getElementById("calculate-button").addEventListener("click", () => {
  const samosaPrice = Number(document.getElementById("samosa-price").value);
  const teaPrice = Number(document.getElementById("tea-price").value);

  const samosaTotal = samosaPrice * samosaQty;
  const teaTotal = teaPrice * teaQty;

  const totalPrice = samosaTotal + teaTotal;
  const vat = totalPrice * 0.13;
  const tip = totalPrice * 0.1;
  const grandTotal = totalPrice + vat + tip;

  //updating the values in webpage
  document.getElementById("vat-total").textContent = vat.toFixed(2);
  document.getElementById("tip-total").textContent = tip.toFixed(2);
  document.getElementById(
    "grand-total-label"
  ).textContent = `Grand Total: ${grandTotal.toFixed(2)}`;
});

document.getElementById("submit-bill").addEventListener("click", function () {
  const labelText = document.getElementById("grand-total-label").textContent;

  // Extract number after "Grand Total: "
  const grandTotal = parseFloat(labelText.split(":")[1]);

  // Check for invalid grand total
  if (isNaN(grandTotal)) {
    alert("Invalid grand total. Please calculate it first.");
    return;
  }

  const data = {
    grandTotal: grandTotal,
    timestamp: new Date().toISOString(),
  };

  // Log for debugging
  console.log("Submitting data:", data);

  fetch("http://localhost:3000/api/bills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    // i took help from chatgpt for this part as i was getting problem with submission which suggested me to add error handeling
    // the problem was my node.js wasn't running

    .then((response) => {
      if (!response.ok) {
        throw new Error("Server responded with status " + response.status);
      }
      return response.json();
    })
    .then((result) => {
      console.log("Server response:", result);
      alert("✅ Bill submitted successfully!");
    })
    .catch((error) => {
      console.error("❌ Failed to submit bill:", error);
      alert("❌ Failed to submit bill. Check console for details.");
    });
});
