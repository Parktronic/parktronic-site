(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navbar'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<nav class=\"navbar\">\r\n    <div class=\"navbar_logo\">\r\n        <img class=\"navbar_parktronic_icon\" id=\"navbar-parktronic-icon\" src=\"../../resources/images/parktronic-logo.png\">\r\n        <a id=\"navbar-logo-label\">\r\n            Parktronic\r\n        </a>\r\n    </div>\r\n    <div class=\"navbar_profile\" id=\"navbar-profile\">\r\n        <div class=\"navbar_button-container\">\r\n            <button class=\"secondary-button\" id=\"navbar-login-button\">Войти</button>\r\n            <button class=\"secondary-button\" id=\"navbar-signup-button\">Регистрация</button>\r\n        </div>\r\n    </div>\r\n</nav>";
},"useData":true});
})();