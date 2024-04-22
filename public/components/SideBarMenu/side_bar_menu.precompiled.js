(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['side_bar_menu'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"search-form__container\" id=\"search-form__container\"></div>\n    <div class=\"search-popup\" id=\"favorites-popup\">\n        <div class=\"search-popup_container\" id=\"popup_container\">\n            <div class=\"search-popup_title_container\">\n                <h3 class=\"search-popup_title\">Мои избранные парковки</h3>\n                <img class=\"search-popup_image\" id=\"favorites-popup-cancel-button\" src=\"../../resources/images/icons8-cross-24.svg\" alt=\"SVG Icon\">\n            </div>\n            <div class=\"user-parkings-container\" id=\"user-park-container\"></div>\n        </div>\n    </div>\n    <div class=\"mobile-layout_bottom-menu\">\n        <img class=\"mobile-bottom-menu_icons\" id=\"side-bar_profile__name\" alt=\"PNG Icon\" src=\"../../resources/images/icons8-user-40.png\"></img>\n        <img class=\"mobile-bottom-menu_icons\" id=\"open-favourite_button\" alt=\"PNG Icon\" src=\"../../resources/images/icons8-favorite-40.png\"></img>\n        <img class=\"mobile-bottom-menu_icons\"  alt=\"PNG Icon\" src=\"../../resources/images/icons8-address-40.png\"></img>\n        <img class=\"mobile-bottom-menu_icons\"  alt=\"PNG Icon\" src=\"../../resources/images/icons8-menu-40.png\"></img>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"side-bar-menu side-bar-menu__open\">\n        <div class=\"side-bar_up__container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"user") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":12},"end":{"line":23,"column":19}}})) != null ? stack1 : "")
    + "            <span class=\"material-symbols-outlined\" id=\"side-bar-menu-close-button\">menu_open</span>\n        </div>\n        <div id=\"search-form__container\"></div>\n        <h1 class=\"favourites_header\">Мои парковки</h1>\n        <div class=\"user-parkings-container\" id=\"user-park-container\"></div>\n    </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <a class=\"side-bar_profile__name\" id=\"side-bar_profile__name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"first_name") : stack1), depth0))
    + "</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isSmallScreen") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":30,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();