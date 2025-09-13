
// Function to check if the inventory is empty.
function isInventoryEmpty() {
  let inventory = new URLSearchParams(location.search);
  return inventory.size === 0;;
}

// Function to add an item to the inventory.
function addItem(item, quantity) {
  let inventory = new URLSearchParams(location.search);

  let current = parseInt(inventory.get(item)) || 0;
  inventory.set(item, current + quantity);

  // Update the URL in the address bar, but don't reload
  window.history.pushState({}, "", "?" + inventory.toString());

  renderInventory();
}


// This function will be to remove an amount of items from the inventory.
// For example, this will be used to show how our characters loose life when they get attacked.
// IMPORTANT - This function will maintain the object's key in the inventory 
// even if it's amount is now 0.
function removeItem(item, quantity) {
  let inventory = new URLSearchParams(location.search);

  var current = parseInt(inventory.get(item)) || 0;

  inventory.set(item, Math.max(0, current - quantity));

  window.history.replaceState({}, "", "?" + inventory.toString());

  renderInventory();
}

// This function will delete an item from the inventory, even it's key, 
// so the item won't appear in the iventory anymore, not even with 0 units of it.
function deleteItem(item) {
  let inventory = new URLSearchParams(location.search);

  inventory.delete(item);

  location.search = inventory.toString();
}

// We are going to create a function to check the amount one item class in the inventory.
function amountItem(item) {
  let inventory = new URLSearchParams(location.search);

  return parseInt(inventory.get(item)) || 0;
}

function gameOver() {
  window.location.href = "index.html";
}

// Function to render inventory in the designed container.
function renderInventory() {

  let inventory = new URLSearchParams(location.search);

  // Icons used for the different objects that can be obtained.
  // IMPORTANT - Add paths without the "/" before, or else these won't be relative 
  // and imaged won't be detected.
  const itemIcons = {
    hp: "assets/hp.png",
    firstSword: "assets/weapons/firstSword.avif",
    greatSword: "assets/weapons/greatSword.jpeg",
    gloryArmor: "assets/gloryArmor.webp",
    medallion: "assets/medallion.png",
    strength: "assets/strength.png"
  };

  // Used to find the "div" in HTML where we want to render out inventory.
  let container = document.getElementById("inventory");
  let flags = document.getElementById("flags");

  // If a place to render the inventory hasn't been asigned, then we return, not rendering anything,
  if (!container) return;

  container.innerHTML = ""; // We clear the container before rendering.
  flags.innerHTML = "";

  // If the inventory is empty, we just print a new paragraph saying it's empty.
  if (inventory.size === 0) {
    container.innerHTML = "<p>(empty - no items at the moment)</p>";
  } else {
    // If there is any item, we just render it.
    for (let [item, count] of inventory.entries()) {
      if(item === "trollDefeated" || item === "strength" || item === "doorOpened")
        continue;
      // We create the div block that will contain the item slot.
      let slot = document.createElement("div");
      slot.className = "slot"; // CSS stiling.

      let img = document.createElement("img"); // Create the item's "img" block.
      img.src = itemIcons[item]; // Image source.
      img.alt = item; // Image name.
      slot.appendChild(img); // Append image in slot.

      // Creates a "div" block to show how many units of this item we have.
      let counter = document.createElement("p");
      counter.className = "count";
      counter.textContent = count;
      slot.appendChild(counter); // Append count into slot.

      container.appendChild(slot); // Append slot in container (inventory bar) .
    }
  }

  // Now, it's time to render boosts and flags.
  if(flags.size !== 0) {
    for(let item of inventory.entries()) {
      if(item === "strength") {
        let img = document.createElement("img");
        img.src = itemIcons[item]
        img.alt = item;

        flags.appendChild(img);
      }
    }
  }

}

// Automatically render inventory when a new page is loaded.
document.addEventListener("DOMContentLoaded", () => {
  renderInventory();
});

// Sleep function for animations.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
