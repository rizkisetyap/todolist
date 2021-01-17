const flash = document.querySelector('.flash-msg') || null;
const menu_icon = document.querySelector('.menu') || null;
const list = document.querySelector('.links');


if(flash){
  const flash_close = flash.querySelector('.close');
  flash_close.addEventListener('click',() => flash.style.display = 'none');
}

if(menu_icon){
  menu_icon.addEventListener('click',() => {
    if(list.style.display === 'none'){
      list.style.display = 'block';
    }else {
      list.style.display = 'none';
      
    }
  })
}




