var tabs = document.querySelector('paper-tabs');

var list = document.querySelector('post-list');

tabs.addEventListener('iron-select', function() {
  list.show = tabs.selectedItem.getAttribute('name');
});