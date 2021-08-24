
function getTemplate(placehold) {
   let items = placehold.map(item => `<li class="list" data-type="${item.id}">${item.name}</li>`)

   const element = `
         <div class="select__input" data-type="input">
         <span class="span">Выбери один элемент</span>
         <i class="fa fa-chevron-down" data-type="arrow"></i>
      </div>
      <div class="select__block" data-type="listname">
         <ul class="select__list">
            ${items.join('')}
         </ul>
      </div>
   `
   return element;
}

let el;

export function select(selector, options) {
   el = document.querySelector(selector);
   const template = getTemplate(options.placeholder);
   el.innerHTML = template;
   const input = el.querySelector('[data-type="input"]')
   const arrow = el.querySelector('[data-type="arrow"]');
   el.addEventListener('click', clickHandler);


   function clickHandler(event) {
      const type = event.target.dataset.type;
      const clickEl = options.placeholder;
      if (type === 'input') {
         input.classList.toggle('selected');
         if (input.classList.contains('selected')) {
            open();
         } else {
            close();
         }
      } 
      for (let i = 0; i < clickEl.length + 1; i++) {
         if (type === String(i)) {
            const span = el.querySelector('.span');
            let textEl = options.placeholder.find(f => {
               if(type === f.id) {
                  return f
               }
            });
            const allList = el.querySelectorAll('li')
            allList.forEach(a => {
               a.classList.remove('activecolor')
            })
            span.innerHTML = textEl.name;
            const bacColor = el.querySelector(`[data-type="${i}"]`);
            bacColor.classList.add('activecolor');
            close();
         }
      }
   }

   function open() {
      el.classList.add('open');
      arrow.classList.remove('fa-chevron-down');
      arrow.classList.add('fa-chevron-up');

   }

   function close() {
      el.classList.remove('open');
      arrow.classList.remove('fa-chevron-up');
      arrow.classList.add('fa-chevron-down');
      input.classList.remove('selected');
   }

}
