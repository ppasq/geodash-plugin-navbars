geodash.directives.geodashMapNavbars = function(){
  return {
    controller: geodash.controllers.GeoDashControllerMapNavbars,
    restrict: 'EA',
    replace: true,
    scope: {},
    templateUrl: 'map_navbars.tpl.html',
    link: function ($scope, element, attrs, controllers)
    {
      setTimeout(function(){ geodash.ui.update(element); }, 0);
    }
  };
};
