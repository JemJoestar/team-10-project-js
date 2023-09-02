const btnChange = document.querySelector('.checkbox-ios');

const THEME = {
    light: 'light',
    dark: 'dark',
}


btnChange.addEventListener('click', onChangeThemeClick);

function onChangeThemeClick(e, {light,dark} = THEME) {
    document.body.classList.toggle(light);
    document.body.classList.toggle(dark);
}

