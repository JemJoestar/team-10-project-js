!function(){var e=document.querySelector(".js-menu-container"),t=document.querySelector(".js-open-menu"),a=document.querySelector(".js-close-menu"),n=document.querySelector(".menu-toggle"),o=document.querySelector(".menu-toggle-mobil"),d=function(a){a.stopImmediatePropagation(),"false"===t.getAttribute("aria-expanded")&&(n.classList.add("hidden"),o.classList.remove("hidden")),"true"===t.getAttribute("aria-expanded")&&(n.classList.remove("hidden"),o.classList.add("hidden"));var d="true"===t.getAttribute("aria-expanded")||!1;t.setAttribute("aria-expanded",!d);e.classList.toggle("is-open");bodyScrollLock[d?"enableBodyScroll":"disableBodyScroll"](document.body)};t.addEventListener("click",d),a.addEventListener("click",d),window.matchMedia("(min-width: 768px)").addEventListener("change",(function(a){a.matches&&(e.classList.remove("is-open"),t.setAttribute("aria-expanded",!1),bodyScrollLock.enableBodyScroll(document.body))}))}();var pathName=document.location.pathname;if(pathName.includes("index")){var page=document.querySelectorAll(".home");page.forEach((function(e){e.classList.add("current")}))}else if(pathName.includes("shopping")){var pages=document.querySelectorAll(".shopping");pages.forEach((function(e){e.classList.add("current")}))}
//# sourceMappingURL=shopping-list-page.86cb3159.js.map
