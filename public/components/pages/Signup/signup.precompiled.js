(function() {
    var template = Handlebars.template,
        templates = Handlebars.templates = Handlebars.templates || {};
    templates['signup'] = template({
        "compiler": [8, ">= 4.3.0"],
        "main": function(container, depth0, helpers, partials, data) {
            return "<div class=\"auth-container\">\n    <form class=\"auth-container__form\">\n        <div class=\"signup-form\">\n            <div class=\"signup-form_container\">\n                <h3>Регистрация</h3><br>\n                <div class=\"signup-form_container__input-container\">\n                    <input class=\"signup-form_container__input\" placeholder=\"Имя\" id=\"name\" name=\"name\" required><br>\n                </div>\n                <div class=\"signup-form_container__input-container\">\n                    <input class=\"signup-form_container__input\" type=\"email\" placeholder=\"Почта\" id=\"email\" name=\"email\" required><br>\n                </div>\n                <div class=\"signup-form_container__input-container\">\n                    <input class=\"signup-form_container__input\" placeholder=\"Имя пользователя\" id=\"username\" name=\"username\" required><br>\n                </div>\n                <div class=\"signup-form_container__input-container\">\n                    <input class=\"signup-form_container__input\" type=\"password\" placeholder=\"Пароль\" id=\"password\" name=\"password\" required>\n                    <i id=\"signup-form_container__input-show-button\" class=\"signup-form_container__input-show-button\" >\n                        <span id=\"signup-form_container__input-show-button-icon\" class=\"material-symbols-outlined\">visibility</span>\n                    </i>\n                </div>\n                <div class=\"signup-form_container__input-container\">\n                    <input class=\"signup-form_container__input\" type=\"password\" placeholder=\"Повторите пароль\" id=\"repeat_password\" name=\"repeat_password\" required>\n                    <i id=\"signup-form_container__input-show-rep-button\" class=\"signup-form_container__input-show-button\" >\n                        <span id=\"signup-form_container__input-show-rep-button-icon\" class=\"material-symbols-outlined\">visibility</span>\n                    </i>\n                </div>\n<!--                <div class=\"signup-form_container_avatar\">-->\n<!--                    <a>Аватар</a>-->\n<!--                    <label id=\"signup-avatar-button\">-->\n<!--                            <input class=\"signup-form_container_avatar__input\" type=\"file\" id=\"avatar\" name=\"avatar\" accept=\"image/png, image/jpeg, image/jpg\">-->\n<!--                        Загрузить-->\n<!--                    </label>-->\n<!--                    <a id=\"signup-avatar-cancel\">❌</a>-->\n<!--                </div>-->\n                <div class=\"button-container\">\n                    <button class=\"secondary-button\"  id=\"signup-button\">Создать аккаунт</button>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>";
        },
        "useData": true
    });
})();