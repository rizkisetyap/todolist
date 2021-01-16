console.log('hello wordl');

const flash = document.querySelector('.flash-msg') || null;
if(flash){
  const flash_close = flash.querySelector('.close');
  flash_close.addEventListener('click',() => flash.style.display = 'none');
}


