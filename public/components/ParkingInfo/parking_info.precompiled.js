(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['parking_info'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };
  return "    <div class=\"parking-info\">\n        <h3 class=\"parking-info__address\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"address") : stack1), depth0))
    + "</h3>\n        <p class=\"parking-info__lots\">Свободно: <strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"free_lots") : stack1), depth0))
    + "</strong>/"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"all_lots") : stack1), depth0))
    + "</p>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"favourite") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":9,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <button class=\"secondary-button\" id=\"show-on-map_button_"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"parking") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\">На карте</button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <button class=\"secondary-button\" id=\"add-parking_button\">Добавить</button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };
  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"parking") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":11,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();