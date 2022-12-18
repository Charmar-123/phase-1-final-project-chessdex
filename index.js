const nameSearch = document.querySelector('input[type="search"]');

nameSearch.addEventListener('focus', (event) => {
  event.target.style.background = '#CBEDD5';
});

nameSearch.addEventListener('blur', (event) => {
  event.target.style.background = '';
});