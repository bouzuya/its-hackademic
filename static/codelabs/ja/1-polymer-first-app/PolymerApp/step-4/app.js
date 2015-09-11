var tabs = document.querySelector('paper-tabs');

tabs.addEventListener('iron-select', function() {
  console.log("Selected: " + tabs.selected);
});