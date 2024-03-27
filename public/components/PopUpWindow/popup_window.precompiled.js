(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['popup_window'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"popup\" id=\"popup_container\">\n    <div class=\"popup_window\">\n        <div class=\"popup_title_container\">\n            <h3 class=\"popup_title\" id=\"popup-title\">Здесь будут найденные парковки</h3>\n            <img class=\"popup_image\" id=\"popup-cancel-button\" src=\"../../resources/images/icons8-cross-24.svg\" alt=\"SVG Icon\">\n        </div>\n        <div class=\"parkings_container\" id=\"parkings-container\"></div>\n    </div>\n</div>\n";
},"useData":true});
})();