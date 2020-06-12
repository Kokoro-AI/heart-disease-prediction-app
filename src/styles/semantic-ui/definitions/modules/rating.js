/*!
 * # Semantic UI - Rating
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

(function ($, window, document, undefined) {
  $.fn.rating = function (parameters) {
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
            ? $.extend(true, {}, $.fn.rating.settings, parameters)
            : $.extend({}, $.fn.rating.settings);

        const { namespace } = settings;
        const { className } = settings;
        const { metadata } = settings;
        const { selector } = settings;
        const { error } = settings;

        const eventNamespace = `.${namespace}`;
        const moduleNamespace = `module-${namespace}`;

        const element = this;
        let instance = $(this).data(moduleNamespace);

        const $module = $(this);
        let $icon = $module.find(selector.icon);

        let module;
        module = {

          initialize() {
            module.verbose('Initializing rating module', settings);

            if ($icon.length === 0) {
              module.setup.layout();
            }

            if (settings.interactive) {
              module.enable();
            } else {
              module.disable();
            }
            module.set.rating(module.get.initialRating());
            module.instantiate();
          },

          instantiate() {
            module.verbose('Instantiating module', settings);
            instance = module;
            $module
              .data(moduleNamespace, module);
          },

          destroy() {
            module.verbose('Destroying previous instance', instance);
            module.remove.events();
            $module
              .removeData(moduleNamespace);
          },

          refresh() {
            $icon = $module.find(selector.icon);
          },

          setup: {
            layout() {
              const
                maxRating = module.get.maxRating();
              const html = $.fn.rating.settings.templates.icon(maxRating);
              module.debug('Generating icon html dynamically');
              $module
                .html(html);
              module.refresh();
            },
          },

          event: {
            mouseenter() {
              const
                $activeIcon = $(this);
              $activeIcon
                .nextAll()
                .removeClass(className.selected);
              $module
                .addClass(className.selected);
              $activeIcon
                .addClass(className.selected)
                .prevAll()
                .addClass(className.selected);
            },
            mouseleave() {
              $module
                .removeClass(className.selected);
              $icon
                .removeClass(className.selected);
            },
            click() {
              const
                $activeIcon = $(this);
              const currentRating = module.get.rating();
              const rating = $icon.index($activeIcon) + 1;
              const canClear = (settings.clearable == 'auto')
                ? ($icon.length === 1)
                : settings.clearable;
              if (canClear && currentRating == rating) {
                module.clearRating();
              } else {
                module.set.rating(rating);
              }
            },
          },

          clearRating() {
            module.debug('Clearing current rating');
            module.set.rating(0);
          },

          bind: {
            events() {
              module.verbose('Binding events');
              $module
                .on(`mouseenter${eventNamespace}`, selector.icon, module.event.mouseenter)
                .on(`mouseleave${eventNamespace}`, selector.icon, module.event.mouseleave)
                .on(`click${eventNamespace}`, selector.icon, module.event.click);
            },
          },

          remove: {
            events() {
              module.verbose('Removing events');
              $module
                .off(eventNamespace);
            },
          },

          enable() {
            module.debug('Setting rating to interactive mode');
            module.bind.events();
            $module
              .removeClass(className.disabled);
          },

          disable() {
            module.debug('Setting rating to read-only mode');
            module.remove.events();
            $module
              .addClass(className.disabled);
          },

          get: {
            initialRating() {
              if ($module.data(metadata.rating) !== undefined) {
                $module.removeData(metadata.rating);
                return $module.data(metadata.rating);
              }
              return settings.initialRating;
            },
            maxRating() {
              if ($module.data(metadata.maxRating) !== undefined) {
                $module.removeData(metadata.maxRating);
                return $module.data(metadata.maxRating);
              }
              return settings.maxRating;
            },
            rating() {
              const
                currentRating = $icon.filter(`.${className.active}`).length;
              module.verbose('Current rating retrieved', currentRating);
              return currentRating;
            },
          },

          set: {
            rating(rating) {
              const
                ratingIndex = (rating - 1 >= 0)
                  ? (rating - 1)
                  : 0;
              const $activeIcon = $icon.eq(ratingIndex);
              $module
                .removeClass(className.selected);
              $icon
                .removeClass(className.selected)
                .removeClass(className.active);
              if (rating > 0) {
                module.verbose('Setting current rating to', rating);
                $activeIcon
                  .prevAll()
                  .andSelf()
                  .addClass(className.active);
              }
              settings.onRate.call(element, rating);
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
              if ($allModules.length > 1) {
                title += `${' ' + '('}${$allModules.length})`;
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

  $.fn.rating.settings = {

    name: 'Rating',
    namespace: 'rating',

    debug: false,
    verbose: false,
    performance: true,

    initialRating: 0,
    interactive: true,
    maxRating: 4,
    clearable: 'auto',

    onRate(rating) {},

    error: {
      method: 'The method you called is not defined',
      noMaximum: 'No maximum rating specified. Cannot generate HTML automatically',
    },

    metadata: {
      rating: 'rating',
      maxRating: 'maxRating',
    },

    className: {
      active: 'active',
      disabled: 'disabled',
      selected: 'selected',
      loading: 'loading',
    },

    selector: {
      icon: '.icon',
    },

    templates: {
      icon(maxRating) {
        let
          icon = 1;
        let html = '';
        while (icon <= maxRating) {
          html += '<i class="icon"></i>';
          icon++;
        }
        return html;
      },
    },

  };
}(jQuery, window, document));
