demo.directive('treemapBreadcrumb', ['$rootScope', '$q', function($rootScope, $q) {
  return {
    restrict: 'EA',
    replace: true,
    require: '^babbage',
    scope: {
      showCut: '='
    },
    template: '<ol class="breadcrumb"><li ng-repeat="level in levels" ng-class="{ active: isActive(level) }"><a href="" ng-click="setTile(level.name);">{{level.parent_cut}}</a></li></ol>',
    link: function(scope, element, attrs, babbageCtrl) {
      var dimensions;
      babbageCtrl.subscribe(function(event, model, state) {
        dimensions = model.dimensions;
        var levelPromise = getLevels(dimensions);
        levelPromise.then(function(levels) {
          scope.levels = levels;
        });
      });
      var removeLevels = function(level) {
        var levelLength = scope.levels.length;
        for(var i=0;i<levelLength;i++) {
          if(scope.levels[i].name == level) {
            return scope.levels.slice(i);
          }
        }
      };
      var cutsWithOutLevels = function(levels) {
        var state = babbageCtrl.getState();
        var cutLength = state.cut.length;
        var levelLength = levels.length;
        var newCuts = [];
        for(var i=0;i<cutLength;i++) {
          var cut = state.cut[i];
          var cutElements = cut.split(":");
          var include = true;
          for(var j=0;j<levelLength;j++) {
            if(cutElements[0] == babbageCtrl.getDimensionKey(levels[j].name)) {
              include = false;
            }
          }
          if(include) {
            newCuts.push(cut);
          }
        }
        return newCuts;
      };
      scope.valueForLevel = function(level) {
        for(var name in dimensions) {
          if(name == level) {
            return dimensions[name].label;
          }
        }
      };
      scope.isActive = function(level) {
        var state = babbageCtrl.getState();
        return level == state.tile[0];
      };
      scope.setTile = function(name) {
        var state = babbageCtrl.getState();
        state.cut = cutsWithOutLevels(removeLevels(name));
        state.tile = [name];
        babbageCtrl.setState(state);
      };
      function labelForKey(data, keyRef, labelRef, value) {
        for(var i=0;i<data.length;i++) {
          if(data[i][keyRef] == value) {
            return data[i][labelRef];
          }
        }
      }
      function dimensionLabel(name) {
        return dimensions[name].label;
      }
      function getCutObj(cuts) {
        var cutObj = {};
        for(var k=0;k<cuts.length;k++) {
          var cut = cuts[k].split(":");
          cutObj[cut[0]] = cut[1];
        }
        return cutObj;
      }
      function isCurrentLevel(tile, level) {
        return tile == level;
      }
      function collectDimensionPromises(names) {
        var promises = [];
        for(var i=0;i<names.length;i++) {
          promises.push(babbageCtrl.getDimensionMembers(names[i]));
        }
        return promises;
      }
      var getLevels = function(dimensions) {
        var deferred = $q.defer();
        var state = babbageCtrl.getState();
        var hierarchies = state.hierarchies;

        var elements = [];
        var promises = [];
        var newLevels = [];
        for(var name in hierarchies) {
          var hierarchy = hierarchies[name];
          var levels = hierarchy.levels;
          var levelLength = levels.length;
          var mainHierarchy = [{name: name, label: dimensions[ name ].label , parent_cut: dimensions[name].label}];
          var dimensionNames = [name];
          for(var i=0;i<levelLength;i++) {
            if(isCurrentLevel(state.tile[0],levels[i])) {
              elements = [name].concat(levels);
              promises = collectDimensionPromises(dimensionNames);
              newLevels = mainHierarchy;
              break;
            }
            dimensionNames.push(levels[i]);
          }
        }
        if(elements.length > 0) {
          $q.all(promises).then(function(results) {
            var state = babbageCtrl.getState();
            var cuts = getCutObj(state.cut);
            for(var j=0;j<results.length;j++) {
              var result = results[j];
              var parentName = elements[j];
              var name = elements[j+1];
              var keyRef = dimensions[parentName].key_ref;
              var labelRef = dimensions[parentName].label_ref;
              var value = cuts[keyRef];
              newLevels.push({name: name, label: dimensions[name].label, parent_cut: labelForKey(result.data.data, keyRef, labelRef, value)});
            }
            deferred.resolve(newLevels);
          });
        }else {
          deferred.resolve([{name: state.tile[0], label: dimensions[ state.tile[0] ].label, parent_cut: dimensions[state.tile[0]].label }]);
        }
        return deferred.promise;
      };
      var state = babbageCtrl.getState();
      //scope.levels = getLevels(state.hierarchies);
    }
  };
}]);
