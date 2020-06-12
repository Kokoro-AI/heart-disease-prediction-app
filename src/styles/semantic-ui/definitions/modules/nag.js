/*!
 * # Semantic UI - Nag
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

(function ($, window, document, undefined) {
  $.fn.nag = function (parameters) {
    const
      $allModules = $(this);
    const moduleSelector = $allModules.selector || '';

    let time = new Date().getTime();
    let performance = [];

    const query = arguments[0];
    const methodInvoked = (typeof query === 'string');
    const queryArguments = [].slice.call(arguments, 1);
    let returnedValue;
    $allModules
      .each(function () {
        const
          settings = ($.isPlainObject(parameters))
            ? $.extend(true, {}, $.fn.nag.settings, parameters)
            : $.extend({}, $.fn.nag.settings);

        const { className } = settings;
        const { selector } = settings;
        const { error } = settings;
        const { namespace } = settings;

        const eventNamespace = `.${namespace}`;
        const moduleNamespace = `${namespace}-module`;

        const $module = $(this);

        const $close = $module.find(selector.close);
        const $context = (settings.context)
          ? $(settings.context)
          : $('body');

        const element = this;
        const instance = $module.data(moduleNamespace);

        let moduleOffset;
        let moduleHeight;

        let contextWidth;
        let contextHeight;
        let contextOffset;

        let yOffset;
        let yPosition;

        let timer;
        let module;

        const requestAnimationFrame = window.requestAnimationFrame
          || window.mozRequestAnimationFrame
          || window.webkitRequestAnimationFrame
          || window.msRequestAnimationFrame
          || function (callback) { setTimeout(callback, 0); };
        module = {

          initialize() {
            module.verbose('Initializing element');

            $module
              .on(`click${eventNamespace}`, selector.close, module.dismiss)
              .data(moduleNamespace, module);
            if (settings.detachable && $module.parent()[0] !== $context[0]) {
              $module
                .detach()
                .prependTo($context);
            }

            if (settings.displayTime > 0) {
              setTimeout(module.hide, settings.displayTime);
            }
            module.show();
          },

          destroy() {
            module.verbose('Destroying instance');
            $module
              .removeData(moduleNamespace)
              .off(eventNamespace);
          },

          show() {
            if (module.should.show() && !$module.is(':visible')) {
              module.debug('Showing nag', settings.animation.show);
              if (settings.animation.show == 'fade') {
                $module
                  .fadeIn(settings.duration, settings.easing);
              } else {
                $module
                  .slideDown(settings.duration, settings.easing);
              }
            }
          },

          hide() {
            module.debug('Showing nag', settings.animation.hide);
            if (settings.animation.show == 'fade') {
              $module
                .fadeIn(settings.duration, settings.easing);
            } else {
              $module
                .slideUp(settings.duration, settings.easing);
            }
          },

          onHide() {
            module.debug('Removing nag', settings.animation.hide);
            $module.remove();
            if (settings.onHide) {
              settings.onHide();
            }
          },

          dismiss(event) {
            if (settings.storageMethod) {
              module.storage.set(settings.key, settings.value);
            }
            module.hide();
            event.stopImmediatePropagation();
            event.preventDefault();
          },

          should: {
            show() {
              if (settings.persist) {
                module.debug('Persistent nag is set, can show nag');
                return true;
              }
              if (module.storage.get(settings.key) != settings.value.toString()) {
                module.debug('Stored value is not set, can show nag', module.storage.get(settings.key));
                return true;
              }
              module.debug('Stored value is set, cannot show nag', module.storage.get(settings.key));
              return false;
            },
          },

          get: {
            storageOptions() {
              const
                options = {};
              if (settings.expires) {
                options.expires = settings.expires;
              }
              if (settings.domain) {
                options.domain = settings.domain;
              }
              if (settings.path) {
                options.path = settings.path;
              }
              return options;
            },
          },

          clear() {
            module.storage.remove(settings.key);
          },

          storage: {
            set(key, value) {
              const
                options = module.get.storageOptions();
              if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
                window.localStorage.setItem(key, value);
                module.debug('Value stored using local storage', key, value);
              } else if (settings.storageMethod == 'sessionstorage' && window.sessionStorage !== undefined) {
                window.sessionStorage.setItem(key, value);
                module.debug('Value stored using session storage', key, value);
              } else if ($.cookie !== undefined) {
                $.cookie(key, value, options);
                module.debug('Value stored using cookie', key, value, options);
              } else {
                module.error(error.noCookieStorage);
              }
            },
            get(key, value) {
              let
                storedValue;
              if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
                storedValue = window.localStorage.getItem(key);
              } else if (settings.storageMethod == 'sessionstorage' && window.sessionStorage !== undefined) {
                storedValue = window.sessionStorage.getItem(key);
              }
              // get by cookie
              else if ($.cookie !== undefined) {
                storedValue = $.cookie(key);
              } else {
                module.error(error.noCookieStorage);
              }
              if (storedValue == 'undefined' || storedValue == 'null' || storedValue === undefined || storedValue === null) {
                storedValue = undefined;
              }
              return storedValue;
            },
            remove(key) {
              const
                options = module.get.storageOptions();
              if (settings.storageMethod == 'localstorage' && window.localStorage !== undefined) {
                window.localStorage.removeItem(key);
              } else if (settings.storageMethod == 'sessionstorage' && window.sessionStorage !== undefined) {
                window.sessionStorage.removeItem(key);
              }
              // store by cookie
              else if ($.cookie !== undefined) {
                $.removeCookie(key, options);
              } else {
                module.error(error.noStorage);
              }
            },
          },

          setting(name, value) {
            module.debug('Changing setting', name, value);
            if ($.isPlainObject(name)) {
              $.extend(true, settings, name);
            } else if (value !== undefined) {
              settings[name] = value;
            } else {
              return settings[name];
            }
          },
          internal(name, value) {
            if ($.isPlainObject(name)) {
              $.extend(true, module, name);
            } else if (value !== undefined) {
              module[name] = value;
            } else {
              return module[name];
            }
          },
          debug() {
            if (settings.debug) {
              if (settings.performance) {
                module.performance.log(arguments);
              } else {
                module.debug = Function.prototype.bind.call(console.info, console, `${settings.name}:`);
                module.debug.apply(console, arguments);
              }
            }
          },
          verbose() {
            if (settings.verbose && settings.debug) {
              if (settings.performance) {
                module.performance.log(arguments);
              } else {
                module.verbose = Function.prototype.bind.call(console.info, console, `${settings.name}:`);
                module.verbose.apply(console, arguments);
              }
            }
          },
          error() {
            module.error = Function.prototype.bind.call(console.error, console, `${settings.name}:`);
            module.error.apply(console, arguments);
          },
          performance: {
            log(message) {
              let
                currentTime;
              let executionTime;
              let previousTime;
              if (settings.performance) {
                currentTime = new Date().getTime();
                previousTime = time || currentTime;
                executionTime = currentTime - previousTime;
                time = currentTime;
                performance.push({
                  Name: message[0],
                  Arguments: [].slice.call(message, 1) || '',
                  Element: element,
                  'Execution Time': executionTime,
                });
              }
              clearTimeout(module.performance.timer);
              module.performance.timer = setTimeout(module.performance.display, 500);
            },
            display() {
              let
                title = `${settings.name}:`;
              let totalTime = 0;
              time = false;
              clearTimeout(module.performance.timer);
              $.each(performance, (index, data) => {
                totalTime += data['Execution Time'];
              });
              title += ` ${totalTime}ms`;
              if (moduleSelector) {
                title += ` '${moduleSelector}'`;
              }
              if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
                console.groupCollapsed(title);
                if (console.table) {
                  console.table(performance);
                } else {
                  $.each(performance, (index, data) => {
                    console.log(`${data.Name}: ${data['Execution Time']}ms`);
                  });
                }
                console.groupEnd();
              }
              performance = [];
            },
          },
          invoke(query, passedArguments, context) {
            let
              object = instance;
            let maxDepth;
            let found;
            let response;
            passedArguments = passedArguments || queryArguments;
            context = element || context;
            if (typeof query === 'string' && object !== undefined) {
              query = query.split(/[\. ]/);
              maxDepth = query.length - 1;
              $.each(query, (depth, value) => {
                const camelCaseValue = (depth != maxDepth)
                  ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1)
                  : query;
                if ($.isPlainObject(object[camelCaseValue]) && (depth != maxDepth)) {
                  object = object[camelCaseValue];
                } else if (object[camelCaseValue] !== undefined) {
                  found = object[camelCaseValue];
                  return false;
                } else if ($.isPlainObject(object[value]) && (depth != maxDepth)) {
                  object = object[value];
                } else if (object[value] !== undefined) {
                  found = object[value];
                  return false;
                } else {
                  module.error(error.method, query);
                  return false;
                }
              });
            }
            if ($.isFunction(found)) {
              response = found.apply(context, passedArguments);
            } else if (found !== undefined) {
              response = found;
            }
            if ($.isArray(returnedValue)) {
              returnedValue.push(response);
            } else if (returnedValue !== undefined) {
              returnedValue = [returnedValue, response];
            } else if (response !== undefined) {
              returnedValue = response;
            }
            return found;
          },
        };

        if (methodInvoked) {
          if (instance === undefined) {
            module.initialize();
          }
          module.invoke(query);
        } else {
          if (instance !== undefined) {
            instance.invoke('destroy');
          }
          module.initialize();
        }
      });
    return (returnedValue !== undefined)
      ? returnedValue
      : this;
  };

  $.fn.nag.settings = {

    name: 'Nag',

    debug: false,
    verbose: false,
    performance: true,

    namespace: 'Nag',

    // allows cookie to be overriden
    persist: false,

    // set to zero to require manually dismissal, otherwise hides on its own
    displayTime: 0,

    animation: {
      show: 'slide',
      hide: 'slide',
    },

    context: false,
    detachable: false,

    expires: 30,
    domain: false,
    path: '/',

    // type of storage to use
    storageMethod: 'cookie',

    // value to store in dismissed localstorage/cookie
    key: 'nag',
    value: 'dismiss',

    error: {
      noCookieStorage: '$.cookie is not included. A storage solution is required.',
      noStorage: 'Neither $.cookie or store is defined. A storage solution is required for storing state',
      method: 'The method you called is not defined.',
    },

    className: {
      bottom: 'bottom',
      fixed: 'fixed',
    },

    selector: {
      close: '.close.icon',
    },

    speed: 500,
    easing: 'easeOutQuad',

    onHide() {},

  };
}(jQuery, window, document));
