const btnChange = document.querySelector('.checkbox-ios');

const THEME = 'dark';



// перевірка, чи є у сxовищі тема 
if (!(localStorage.getItem('theme') === null)) {
    document.body.classList.add(THEME);
    document.querySelector("input[type=checkbox]").checked = true;
}

// додаємо слухач на перемикач теми
btnChange.addEventListener('change', onChangeThemeClick);

function onChangeThemeClick() {
    document.body.classList.toggle(THEME);
//  Перевіряємо, чи додана тема. Якщо так, додаємо у веб сховище 
    if (document.body.classList.contains(THEME)) {
        localStorage.setItem('theme', THEME);
        return;
    }

    localStorage.removeItem('theme');
}


