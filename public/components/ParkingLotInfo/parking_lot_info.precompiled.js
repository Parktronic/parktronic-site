(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['parking_lot_info'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"parking-lot-info\">\n        <h3 class=\"parking-lot-info__address\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"address") : stack1), depth0))
    + "</h3>\n        <div class=\"parking-lot-info__container\">\n            <p class=\"parking-lot-info__numbers\">Свободно: <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"free_lots") : stack1), depth0))
    + "</strong>/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"all_lots") : stack1), depth0))
    + "</p>\n            <div class=\"parking-lot-button-container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"inSearch") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":19,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img class=\"map_icon\" id=\"search_show-on-map_button_"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" alt=\"SVG Icon\" src=\"../../resources/images/icons8-map-24.png\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isFavorite") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":9,"column":20},"end":{"line":13,"column":27}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <img class=\"heart_icon\" id=\"search_add-parking_button_"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" alt=\"SVG icon\" src=\"../../resources/images/icons8-heart-filled.svg\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <img class=\"heart_icon\" id=\"search_add-parking_button_"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" alt=\"SVG icon\" src=\"../../resources/images/icons8-heart-outline.svg\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img class=\"map_icon\" id=\"favorites-show-on-map_button_"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" alt=\"SVG Icon\" src=\"../../resources/images/icons8-map-24.png\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isFavorite") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":20},"end":{"line":18,"column":27}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <img class=\"heart_icon\" id=\"favorites-delete-button_"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" alt=\"SVG icon\" src=\"../../resources/images/icons8-heart-filled.svg\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"parking") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":23,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();