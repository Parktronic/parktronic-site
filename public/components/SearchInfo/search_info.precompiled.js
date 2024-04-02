(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search_info'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"search-info\">\n        <h3 class=\"search-info__address\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"address") : stack1), depth0))
    + "</h3>\n        <div class=\"search-info__container\">\n            <p class=\"search-info__lots\">Свободно: <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"free_lots") : stack1), depth0))
    + "</strong>/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"all_lots") : stack1), depth0))
    + "</p>\n            <div class=\"search-button-container\">\n                <img class=\"search-secondary-button\" id=\"search_show-on-map_button_"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" alt=\"SVG Icon\" src=\"../../resources/images/icons8-map-24.png\">\n                <button class=\"search-outline-button\" id=\"search_add-parking_button_"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\">Добавить</button>\n            </div>\n        </div>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"parking") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":12,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();