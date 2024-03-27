(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sideBarMenu'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };
  return "            <a class=\"side-bar_profile__name\" id=\"side-bar_profile__name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"form-author-menu form-author-menu__open\">\n    <div class=\"side-bar_up__container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"user") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":5,"column":15}}})) != null ? stack1 : "")
    + "        <span id=\"author-menu-close-button\" class=\"material-symbols-outlined\">menu_open</span>\n    </div>\n    <div id=\"search-form__container\"></div>\n    <div id=\"popup\"></div>\n    <div class=\"search_result\" id=\"search_result\"></div>\n    <h1 class=\"favourites_header\">Мои парковки</h1>\n    <div class=\"user-parkings-container\" id=\"user-park-container\"></div>\n</div>";
},"useData":true});
})();