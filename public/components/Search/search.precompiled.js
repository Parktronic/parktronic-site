(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"search-form\" id=\"search-form\">\n    <input type=\"text\" class=\"search-form_input\" id=\"search-input\" placeholder=\"Введите адрес парковки\">\n    <img class=\"search-form_icon\" id=\"search-form-icon\" src=\"../../resources/images/icons8-search.svg\" alt=\"SVG Icon\">\n</div>";
},"useData":true});
})();