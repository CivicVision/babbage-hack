angular.module('budget.templates', ['budget-templates/dimension-filter.html', 'budget-templates/dimension-filter-dropdown.html' , 'budget-templates/breadcrumb.html', 'budget-templates/cut-filter.html', 'budget-templates/cut-filter-dropdown.html', 'budget-templates/cut-filter-dropdown-sub.html']);

angular.module('budget-templates/dimension-filter.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('budget-templates/dimension-filter.html', '<div class="babbage-dimension-filter"></div>');
}]);

angular.module('budget-templates/dimension-filter-dropdown.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('budget-templates/dimension-filter-dropdown.html', '<div class="babbage-dimension-filter"> <div class="dropdown"> <div class="btn-group" dropdown ng-show="filter.length"> <a class="btn btn-default dropdown-toggle ng-click" dropdown-toggle>{{selected}} <span class="caret"></span></a> <ul class="dropdown-menu"> <li ng-repeat="attr in filter"> <a ng-click="update(attr)"> <strong>{{attr.label}}</strong> </a> </li> </ul> </div> </div></div>');
}]);

angular.module('budget-templates/cut-filter.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('budget-templates/cut-filter.html', '<div class="babbage-cut-filter"></div>');
}]);

angular.module('budget-templates/cut-filter-dropdown.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('budget-templates/cut-filter-dropdown.html', '<div class="babbage-cut-filter"> <div class="dropdown"> <div class="btn-group" dropdown ng-show="filter.length"> <a class="btn btn-default dropdown-toggle ng-click" dropdown-toggle>{{selected}} <span class="caret"></span></a> <ul class="dropdown-menu"> <li ng-repeat="attr in filter"> <a ng-click="update(attr)"> <strong>{{attr.label}}</strong> </a> </li> </ul> </div> </div></div>');
}]);

angular.module('budget-templates/cut-filter-dropdown-sub.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('budget-templates/cut-filter-dropdown-sub.html', '<div class="babbage-cut-filter"> <div class="dropdown"> <div class="btn-group" dropdown ng-show="filter.length"> <a class="btn btn-default dropdown-toggle ng-click" dropdown-toggle>{{selected}} <span class="caret"></span></a> <ul class="dropdown-menu"> <li ng-repeat="attr in filter" ng-class="{\'dropdown-header\': attr.type == \'header\'}"> <a ng-click="update(attr)" ng-hide="attr.type == \'header\'" ng-class="{sub: attr.type == \'sub\'}"> <strong>{{attr.label}}</strong> </a><strong ng-show="attr.type == \'header\'">{{attr.label}}</strong> </li> </ul> </div> </div></div>');
}]);

angular.module('budget-templates/breadcrumb.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('budget-templates/breadcrumb.html', '<ol class="breadcrumb"><li ng-repeat="level in levels" ng-class="{ active: isActive(level) }"><a href="" ng-click="setTile(level.name);">{{level.parent_cut}}</a></li></ol>');
}]);
