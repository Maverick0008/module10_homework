const btn = document.querySelector('.j-btn-test')
const buttonDiv = document.querySelectorAll('.btn-icon')

btn.addEventListener('click', () => {
  buttonDiv.forEach(icon => icon.classList.toggle('second-icon'));
})