(function() {
    var template = Handlebars.template,
        templates = Handlebars.templates = Handlebars.templates || {};
    templates['login'] = template({
        "compiler": [8, ">= 4.3.0"],
        "main": function(container, depth0, helpers, partials, data) {
            return "<div class=\"auth-container\">\n    <form class=\"auth-container__form\">\n        <div class=\"login-form\">\n            <div class=\"login-form_container\">\n                <h3>Вход</h3><br>\n                <div class=\"login-form_container__input-container\">\n                    <input class=\"login-form_container__input\" type=\"email\" placeholder=\"Почта\" id=\"email\" name=\"email\" required><br>\n                </div>\n                <div class=\"login-form_container__input-container\">\n                    <input class=\"login-form_container__input\" type=\"password\" placeholder=\"Пароль\" id=\"password\" name=\"password\" required>\n                    <i id=\"login-form_container__input-show-button\" class=\"login-form_container__input-show-button\" >\n                        <span id=\"login-form_container__input-show-button-icon\" class=\"material-symbols-outlined\">visibility</span>\n                    </i>\n                </div>\n                <div class=\"button-container\">\n                    <button class=\"secondary-button\" type=\"submit\" id=\"login-button\">Войти</button>\n                    <button class=\"primary-button\" type=\"submit\" id=\"signup-button\">Регистрация</button>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>";
        },
        "useData": true
    });
})();