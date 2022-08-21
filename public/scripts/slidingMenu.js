// functions to open and close the sliding menu

/* global document */

const openMenu = function() {
  document.getElementById("slideMenu").style.marginLeft = '0px';
  document.getElementById("expand-arrow").style.marginLeft = "250px";
};


const closeMenu = function() {
  document.getElementById("slideMenu").style.marginLeft = '-250px';
  document.getElementById("expand-arrow").style.marginLeft = "0px";
};

module.exports = {openMenu, closeMenu};
