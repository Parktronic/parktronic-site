(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search_info'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"search-info\">\r\n        <h3 class=\"search-info__address\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"address") : stack1), depth0))
    + "</h3>\r\n        <div class=\"search-info__container\">\r\n            <p class=\"search-info__lots\">Свободно: <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"free_lots") : stack1), depth0))
    + "</strong>/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"all_lots") : stack1), depth0))
    + "</p>\r\n            <div class=\"search-button-container\">\r\n                <img class=\"map_icon\" id=\"search_show-on-map_button_"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" alt=\"SVG Icon\" src=\"../../resources/images/icons8-map-24.png\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"isFavorite") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":10,"column":23}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depth0 != null ? lookupProperty(depth0,"isFavorite") : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":16},"end":{"line":13,"column":27}}})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img class=\"heart_icon\" id=\"search_add-parking_button_"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" alt=\"SVG icon\" src=\"../../resources/images/icons8-heart-filled.svg\">\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img class=\"heart_icon\" id=\"search_add-parking_button_"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" alt=\"SVG icon\" src=\"../../resources/images/icons8-heart-outline.svg\">\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"parking") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":17,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();