/**
 * Created by gopi on 8/28/14.
 */
angular.module('t2spare.system', [])

    .factory("Global", [
        function() {
            var _this = this;
            _this._data = {
                user: {},
                authenticated: false,
                dateFormat: 'dd-MMMM-yyyy',
                dateTimeFormat: 'dd-MMMM-yyyy HH:mm',
                dateTimeFormatMeridian: 'dd-MMMM-yyyy hh:mm a',
                timeFormat: 'HH:mm',
                timeFormatMeridian: 'hh:mm a',
                hourStep: 1,
                minStep: 15,
                isMeridian: true
            };

            return _this._data;
        }
    ])
    .factory('LocalStorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }]);
