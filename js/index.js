$(".add-to-cart").click(function(event) {
  
  var name = $(this).attr("data-name");
  var price = Number($(this).attr("data-price"));
  addItem(name, price, 1);
  displayCart();
});

$("#clear-cart").click(function(event) {
  clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = listCart();

  var output = "";
  for (var i in cartArray) {
    output +=
      "<li>" + cartArray[i].name + " " +
      cartArray[i].count + "<br>" +
      " Subtotal= $" +
      cartArray[i].total 
      + "</li>";
  }
 
  $("#show-cart").html(output);
  $("#total-cart").html(total());
}

var cart = [];

var item = function(name, price, count) {
  this.name = name;
  this.price = price;
  this.count = count;
};

function addItem(name, price, count) {
  for (var i in cart) {
    if (cart[i].name === name) {
      cart[i].count += count;
      return;
    }
  }
  var newItem = new item(name, price, count);
  cart.push(newItem);
}

function removeItem(name) {
  for (var i in cart) {
    if (cart[i].name === name) {
      cart.splice(i, 1);
      break;
    }
  }
}

function total() {
  var totalCost = 0;
  for (var i in cart) {
    totalCost += cart[i].price * cart[i].count;
  }
  return totalCost.toFixed(2);
}

function clearCart() {
  cart = [];
}

function listCart() {
  var finalCart = [];
  for (var i in cart) {
    var item = cart[i];
    var itemCopy = {};
    for (var p in item) {
      itemCopy[p] = item[p];
    }
    itemCopy.total = (item.price * item.count).toFixed(2);
    finalCart.push(itemCopy);
  }
  return finalCart;
}