!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var o=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,o.call(a.exports,a,a.exports),a.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequired7c6=o),o("ekC86");var a=document.querySelector(".favorites__categories-list"),i=document.querySelector(".favorites__gallery-list");!function(){for(var e in localStorage){var t=localStorage.getItem(e),r=JSON.parse(t);if("object"==typeof r&&null!==r&&"preview"in r)try{var o=document.querySelector(".favorites__not-atendent");document.querySelector(".favorites__categories-list").classList.remove("is-hidden"),o.classList.add("is-hidden");var n='<li class="favorites__gallery-list-item">\n          <div class="favorites__card">\n            <img src="'.concat(r.preview,'" alt="').concat(r.title,'" class="favorites__card-image">\n            <div class="favorites__card-info">\n              <h2 class="favorites__card-tittle">').concat(r.title,'</h2>\n              <p class="favorites__card-description">').concat(r.description,'</p>\n              <button class="favorites__card-btn">card test</button>\n            </div>\n            <div class="favorites__card-heart"><svg class="favorite__heart-svg">\n            <use href="./img/icons.svg#icon-heart"></use>\n            </svg></div>\n          </div>\n        </li>'),s='<li class="favorites__categories-item">\n          <button type="button" class="favorites__categories-btn">'.concat(r.category,"</button>\n          </li>");i.insertAdjacentHTML("beforeend",n),a.insertAdjacentHTML("beforeend",s)}catch(t){console.log("Key: ".concat(e,", Error parsing value: "),t)}}}(),o("7hKzD"),o("6f6o8"),o("9GKZD")}();
//# sourceMappingURL=Favorites.46348dbb.js.map
