geodash.controllers.GeoDashControllerMapNavbars = function($scope, $element, $controller, $interpolate)
{
  angular.extend(this, $controller('GeoDashControllerBase', {$element: $element, $scope: $scope}));

  var mainScope = $element.parents(".geodash-dashboard:first").isolateScope();
  $scope.dashboard = geodash.util.deepCopy(mainScope.dashboard);
  $scope.state = geodash.util.deepCopy(mainScope.state);
  $scope.months = MONTHS_ALL;
  $scope.default_tooltip_placement =
  {
    "top": "bottom",
    "left": "right",
    "bottom": "top",
    "right": "left"
  };

  $scope.$on("refreshMap", function(event, args)
  {
    $scope.state = geodash.util.deepCopy(args.state);
  });

  $scope.link = function(navbar, tab)
  {
    var name = extract("page", navbar);
    if(angular.isDefined(name))
    {
      var page = geodash.api.getPage(name);
      if(angular.isDefined(page))
      {
        return $interpolate(page)({ state: $scope.state, month: month });
      }
      else
      {
        return "";
      }
    }
    else
    {
      return "";
    }
  };

  $scope.class_navbar = function(navbar)
  {
    var str = "geodash-map-navbar";

    var placement = extract("placement", navbar, "bottom");

    str += " geodash-placement-"+placement;

    if(angular.isDefined(extract("switch", navbar))) {
      str += " geodash-radio-group";
    }

    if(placement == "left" || placement == "right")
    {
      str += " container-fluid";
    }
    else // if(placement == "left" || placement == "right")
    {
      str += " row";
    }

    return str;
  };

  $scope.style_navbar = function(navbar)
  {
    var styleMap = {};

    if(angular.isDefined(extract("css.properties", navbar)))
    {
      angular.extend(styleMap, geodash.util.arrayToObject(
        extract("css.properties", navbar),
        {'$interpolate': $interpolate, 'ctx': {'navbar': navbar}}
      ));
    }

    return geodash.codec.formatCSS(styleMap);
  };

  $scope.class_tab_wrapper = function(navbar, tab)
  {
    var placement = extract("placement", navbar, "bottom");
    if(placement == "left" || placement == "right")
    {
      return "row";
    }
    else // if(placement == "left" || placement == "right")
    {
      return "col";
    }
  };

  $scope.class_tab = function(navbar, tab)
  {
    var str = "btn";

    if(angular.isDefined(navbar.switch))
    {
      if(tab.value == extract(navbar.switch, $scope))
      {
        str += ' btn-primary selected geodash-intent geodash-radio geodash-on';
      }
      else
      {
        str += ' btn-default geodash-intent geodash-radio';
      }
    }
    else
    {
      str += ' btn-default geodash-intent';
    }

    var placement = extract("placement", navbar, "bottom");
    if(placement == "left" || placement == "right")
    {
      str += " col";
    }
    return str;
  };

  $scope.style_tab = function(navbar, tab)
  {
    var styleMap = {};

    if(angular.isDefined(extract("css.properties", tab)))
    {
      angular.extend(styleMap, geodash.util.arrayToObject(
        extract("css.properties", tab),
        {'$interpolate': $interpolate, 'ctx': {'tab': tab}}
      ));
    }

    return geodash.codec.formatCSS(styleMap);
  };

  $scope.tab_tooltip_placement = function(navbar, tab)
  {
    return extract(
      "tooltip.placement",
      tab,
      $scope.default_tooltip_placement[extract("placement", navbar, "bottom")]
    );
  }

  $scope.intents = function(navbar, tab)
  {
    var data = [];
    var intents = extract("intents", tab) || extract("intents", navbar);
    if(Array.isArray(intents))
    {
      for(var i = 0; i < intents.length; i++)
      {
        var intent = intents[i];
        var intentName = intent.name;
        if(angular.isDefined(intentName))
        {
          var intentProperties = intent.properties;
          if(angular.isDefined(intentProperties))
          {
            var intentData = geodash.util.arrayToObject(intentProperties, {'$interpolate': $interpolate, 'ctx': {'tab': tab}});
            data.push({ "name": intent.name, "data": intentData });
          }
          else
          {
            data.push({ "name": intent.name });
          }
        }
      }
    }
    return data;
  };

};
