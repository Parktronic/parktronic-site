(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"index\">\n    <h3>Добро пожаловать на Parktronic!</h3>\n    <div class=\"index_content-container\">\n        <div class=\"index_content-container_description\">\n            Проект \"Parktronic\" - это умный сервис для поиска свободных парковочных мест.<br>\n            Для начала использования войдите в аккаунт или создайте его.\n            <div class=\"button-container\">\n                <button class=\"secondary-button\" id=\"index-forms-button\">Опробовать Parktronic</button>\n            </div>\n            <a>Нет аккаунта?  <span id=\"index-signup-button\">Зарегистрируйтесь бесплатно</span></a>\n        </div>\n        <img class=\"index_content-container_description__picture\" src=\"../../../resources/images/computer_preview.png\" alt=\"\">\n    </div>\n</div>";
},"useData":true});
})();
