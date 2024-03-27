(function() {
    var template = Handlebars.template,
        templates = Handlebars.templates = Handlebars.templates || {};
    templates['navbar'] = template({
        "compiler": [8, ">= 4.3.0"],
        "main": function(container, depth0, helpers, partials, data) {
            return "<nav class=\"navbar\">\n    <div class=\"navbar_logo\">\n        <a id=\"navbar-logo-label\">\n            Parktronic\n        </a>\n    </div>\n    <div class=\"navbar_profile\" id=\"navbar-profile\">\n        <div class=\"navbar_button-container\">\n            <button class=\"secondary-button\" id=\"navbar-login-button\">Войти</button>\n            <button class=\"secondary-button\" id=\"navbar-signup-button\">Регистрация</button>\n        </div>\n    </div>\n</nav>\n";
        },
        "useData": true
    });
})();