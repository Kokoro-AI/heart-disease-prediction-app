/*!
 * # Semantic UI - Modal
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

(function ($, window, document, undefined) {
  $.fn.modal = function (parameters) {
    const
      $allModules = $(this);
    const $window = $(window);
    const $document = $(document);
    const $body = $('body');

    const moduleSelector = $allModules.selector || '';

    let time = new Date().getTime();
    let performance = [];

    const query = arguments[0];
    const methodInvoked = (typeof query === 'string');
    const queryArguments = [].slice.call(arguments, 1);

    const requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function (callback) { setTimeout(callback, 0); };

    let returnedValue;
    $allModules
      .each(function () {
        const
          settings = ($.isPlainObject(parameters))
            ? $.extend(true, {}, $.fn.modal.settings, parameters)
            : $.extend({}, $.fn.modal.settings);

        const { selector } = settings;
        const { className } = settings;
        const { namespace } = settings;
        const { error } = settings;

        const eventNamespace = `.${namespace}`;
        const moduleNamespace = `module-${namespace}`;

        const $module = $(this);
        const $context = $(settings.context);
        const $close = $module.find(selector.close);

        let $allModals;
        let $otherModals;
        let $focusedElement;
        let $dimmable;
        let $dimmer;

        const element = this;
        let instance = $module.data(moduleNamespace);

        let elementNamespace;
        let id;
        let observer;
        let module;
        module = {

          initialize() {
            module.verbose('Initializing dimmer', $context);

            module.create.id();
            module.create.dimmer();
            module.refreshModals();

            module.bind.events();
            if (settings.observeChanges) {
              module.observeChanges();
            }
            module.instantiate();
          },

          instantiate() {
            module.verbose('Storing instance of modal');
            instance = module;
            $module
              .data(moduleNamespace, instance);
          },

          create: {
            dimmer() {
              const
                defaultSettings = {
                  debug: settings.debug,
                  dimmerName: 'modals',
                  duration: {
                    show: settings.duration,
                    hide: settings.duration,
                  },
                };
              const dimmerSettings = $.extend(true, defaultSettings, settings.dimmerSettings);
              if (settings.inverted) {
                dimmerSettings.variation = (dimmerSettings.variation !== undefined)
                  ? `${dimmerSettings.variation} inverted`
                  : 'inverted';
              }
              if ($.fn.dimmer === undefined) {
                module.error(error.dimmer);
                return;
              }
              module.debug('Creating dimmer with settings', dimmerSettings);
              $dimmable = $context.dimmer(dimmerSettings);
              if (settings.detachable) {
                module.verbose('Modal is detachable, moving content into dimmer');
                $dimmable.dimmer('add content', $module);
              } else {
                module.set.undetached();
              }
              if (settings.blurring) {
                $dimmable.addClass(className.blurring);
              }
              $dimmer = $dimmable.dimmer('get dimmer');
            },
            id() {
              id = (`${Math.random().toString(16)}000000000`).substr(2, 8);
              elementNamespace = `.${id}`;
              module.verbose('Creating unique id for element', id);
            },
          },

          destroy() {
            module.verbose('Destroying previous modal');
            $module
              .removeData(moduleNamespace)
              .off(eventNamespace);
            $window.off(elementNamespace);
            $close.off(eventNamespace);
            $context.dimmer('destroy');
          },

          observeChanges() {
            if ('MutationObserver' in window) {
              observer = new MutationObserver(((mutations) => {
                module.debug('DOM tree modified, refreshing');
                module.refresh();
              }));
              observer.observe(element, {
                childList: true,
                subtree: true,
              });
              module.debug('Setting up mutation observer', observer);
            }
          },

          refresh() {
            module.remove.scrolling();
            module.cacheSizes();
            module.set.screenHeight();
            module.set.type();
            module.set.position();
          },

          refreshModals() {
            $otherModals = $module.siblings(selector.modal);
            $allModals = $otherModals.add($module);
          },

          attachEvents(selector, event) {
            const
              $toggle = $(selector);
            event = $.isFunction(module[event])
              ? module[event]
              : module.toggle;
            if ($toggle.length > 0) {
              module.debug('Attaching modal events to element', selector, event);
              $toggle
                .off(eventNamespace)
                .on(`click${eventNamespace}`, event);
            } else {
              module.error(error.notFound, selector);
            }
          },

          bind: {
            events() {
              module.verbose('Attaching events');
              $module
                .on(`click${eventNamespace}`, selector.close, module.event.close)
                .on(`click${eventNamespace}`, selector.approve, module.event.approve)
                .on(`click${eventNamespace}`, selector.deny, module.event.deny);
              $window
                .on(`resize${elementNamespace}`, module.event.resize);
            },
          },

          get: {
            id() {
              return (`${Math.random().toString(16)}000000000`).substr(2, 8);
            },
          },

          event: {
            approve() {
              if (settings.onApprove.call(element, $(this)) === false) {
                module.verbose('Approve callback returned false cancelling hide');
                return;
              }
              module.hide();
            },
            deny() {
              if (settings.onDeny.call(element, $(this)) === false) {
                module.verbose('Deny callback returned false cancelling hide');
                return;
              }
              module.hide();
            },
            close() {
              module.hide();
            },
            click(event) {
              const
                $target = $(event.target);
              const isInModal = ($target.closest(selector.modal).length > 0);
              const isInDOM = $.contains(document.documentElement, event.target);
              if (!isInModal && isInDOM) {
                module.debug('Dimmer clicked, hiding all modals');
                if (module.is.active()) {
                  module.remove.clickaway();
                  if (settings.allowMultiple) {
                    module.hide();
                  } else {
                    module.hideAll();
                  }
                }
              }
            },
            debounce(method, delay) {
              clearTimeout(module.timer);
              module.timer = setTimeout(method, delay);
            },
            keyboard(event) {
              const
                keyCode = event.which;
              const escapeKey = 27;
              if (keyCode == escapeKey) {
                if (settings.closable) {
                  module.debug('Escape key pressed hiding modal');
                  module.hide();
                } else {
                  module.debug('Escape key pressed, but closable is set to false');
                }
                event.preventDefault();
              }
            },
            resize() {
              if ($dimmable.dimmer('is active')) {
                requestAnimationFrame(module.refresh);
              }
            },
          },

          toggle() {
            if (module.is.active() || module.is.animating()) {
              module.hide();
            } else {
              module.show();
            }
          },

          show(callback) {
            callback = $.isFunction(callback)
              ? callback
              : function () {};
            module.refreshModals();
            module.showModal(callback);
          },

          hide(callback) {
            callback = $.isFunction(callback)
              ? callback
              : function () {};
            module.refreshModals();
            module.hideModal(callback);
          },

          showModal(callback) {
            callback = $.isFunction(callback)
              ? callback
              : function () {};
            if (module.is.animating() || !module.is.active()) {
              module.showDimmer();
              module.cacheSizes();
              module.set.position();
              module.set.screenHeight();
              module.set.type();
              module.set.clickaway();

              if (!settings.allowMultiple && module.others.active()) {
                module.hideOthers(module.showModal);
              } else {
                settings.onShow.call(element);
                if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                  module.debug('Showing modal with css animations');
                  $module
                    .transition({
                      debug: settings.debug,
                      animation: `${settings.transition} in`,
                      queue: settings.queue,
                      duration: settings.duration,
                      useFailSafe: true,
                      onComplete() {
                        settings.onVisible.apply(element);
                        module.add.keyboardShortcuts();
                        module.save.focus();
                        module.set.active();
                        if (settings.autofocus) {
                          module.set.autofocus();
                        }
                        callback();
                      },
                    });
                } else {
                  module.error(error.noTransition);
                }
              }
            } else {
              module.debug('Modal is already visible');
            }
          },

          hideModal(callback, keepDimmed) {
            callback = $.isFunction(callback)
              ? callback
              : function () {};
            module.debug('Hiding modal');
            if (settings.onHide.call(element, $(this)) === false) {
              module.verbose('Hide callback returned false cancelling hide');
              return;
            }

            if (module.is.animating() || module.is.active()) {
              if (settings.transition && $.fn.transition !== undefined && $module.transition('is supported')) {
                module.remove.active();
                $module
                  .transition({
                    debug: settings.debug,
                    animation: `${settings.transition} out`,
                    queue: settings.queue,
                    duration: settings.duration,
                    useFailSafe: true,
                    onStart() {
                      if (!module.others.active() && !keepDimmed) {
                        module.hideDimmer();
                      }
                      module.remove.keyboardShortcuts();
                    },
                    onComplete() {
                      settings.onHidden.call(element);
                      module.restore.focus();
                      callback();
                    },
                  });
              } else {
                module.error(error.noTransition);
              }
            }
          },

          showDimmer() {
            if ($dimmable.dimmer('is animating') || !$dimmable.dimmer('is active')) {
              module.debug('Showing dimmer');
              $dimmable.dimmer('show');
            } else {
              module.debug('Dimmer already visible');
            }
          },

          hideDimmer() {
            if ($dimmable.dimmer('is animating') || ($dimmable.dimmer('is active'))) {
              $dimmable.dimmer('hide', () => {
                module.remove.clickaway();
                module.remove.screenHeight();
              });
            } else {
              module.debug('Dimmer is not visible cannot hide');
            }
          },

          hideAll(callback) {
            const
              $visibleModals = $allModals.filter(`.${className.active}, .${className.animating}`);
            callback = $.isFunction(callback)
              ? callback
              : function () {};
            if ($visibleModals.length > 0) {
              module.debug('Hiding all visible modals');
              module.hideDimmer();
              $visibleModals
                .modal('hide modal', callback);
            }
          },

          hideOthers(callback) {
            const
              $visibleModals = $otherModals.filter(`.${className.active}, .${className.animating}`);
            callback = $.isFunction(callback)
              ? callback
              : function () {};
            if ($visibleModals.length > 0) {
              module.debug('Hiding other modals', $otherModals);
              $visibleModals
                .modal('hide modal', callback, true);
            }
          },

          others: {
            active() {
              return ($otherModals.filter(`.${className.active}`).length > 0);
            },
            animating() {
              return ($otherModals.filter(`.${className.animating}`).length > 0);
            },
          },

          add: {
            keyboardShortcuts() {
              module.verbose('Adding keyboard shortcuts');
              $document
                .on(`keyup${eventNamespace}`, module.event.keyboard);
            },
          },

          save: {
            focus() {
              $focusedElement = $(document.activeElement).blur();
            },
          },

          restore: {
            focus() {
              if ($focusedElement && $focusedElement.length > 0) {
                $focusedElement.focus();
              }
            },
          },

          remove: {
            active() {
              $module.removeClass(className.active);
            },
            clickaway() {
              if (settings.closable) {
                $dimmer
                  .off(`click${elementNamespace}`);
              }
            },
            bodyStyle() {
              if ($body.attr('style') === '') {
                module.verbose('Removing style attribute');
                $body.removeAttr('style');
              }
            },
            screenHeight() {
              module.debug('Removing page height');
              $body
                .css('height', '');
            },
            keyboardShortcuts() {
              module.verbose('Removing keyboard shortcuts');
              $document
                .off(`keyup${eventNamespace}`);
            },
            scrolling() {
              $dimmable.removeClass(className.scrolling);
              $module.removeClass(className.scrolling);
            },
          },

          cacheSizes() {
            const
              modalHeight = $module.outerHeight();
            if (module.cache === undefined || modalHeight !== 0) {
              module.cache = {
                pageHeight: $(document).outerHeight(),
                height: modalHeight + settings.offset,
                contextHeight: (settings.context == 'body')
                  ? $(window).height()
                  : $dimmable.height(),
              };
            }
            module.debug('Caching modal and container sizes', module.cache);
          },

          can: {
            fit() {
              return ((module.cache.height + (settings.padding * 2)) < module.cache.contextHeight);
            },
          },

          is: {
            active() {
              return $module.hasClass(className.active);
            },
            animating() {
              return $module.transition('is supported')
                ? $module.transition('is animating')
                : $module.is(':visible');
            },
            scrolling() {
              return $dimmable.hasClass(className.scrolling);
            },
            modernBrowser() {
            // appName for IE11 reports 'Netscape' can no longer use
              return !(window.ActiveXObject || 'ActiveXObject' in window);
            },
          },

          set: {
            autofocus() {
              const
                $inputs = $module.find(':input').filter(':visible');
              const $autofocus = $inputs.filter('[autofocus]');
              const $input = ($autofocus.length > 0)
                ? $autofocus.first()
                : $inputs.first();
              if ($input.length > 0) {
                $input.focus();
              }
            },
            clickaway() {
              if (settings.closable) {
                $dimmer
                  .on(`click${elementNamespace}`, module.event.click);
              }
            },
            screenHeight() {
              if (module.can.fit()) {
                $body.css('height', '');
              } else {
                module.debug('Modal is taller than page content, resizing page height');
                $body
                  .css('height', module.cache.height + (settings.padding * 2));
              }
            },
            active() {
              $module.addClass(className.active);
            },
            scrolling() {
              $dimmable.addClass(className.scrolling);
              $module.addClass(className.scrolling);
            },
            type() {
              if (module.can.fit()) {
                module.verbose('Modal fits on screen');
                if (!module.others.active() && !module.others.animating()) {
                  module.remove.scrolling();
                }
              } else {
                module.verbose('Modal cannot fit on screen setting to scrolling');
                module.set.scrolling();
              }
            },
            position() {
              module.verbose('Centering modal on page', module.cache);
              if (module.can.fit()) {
                $module
                  .css({
                    top: '',
                    marginTop: -(module.cache.height / 2),
                  });
              } else {
                $module
                  .css({
                    marginTop: '',
                    top: $document.scrollTop(),
                  });
              }
            },
            undetached() {
              $dimmable.addClass(className.undetached);
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

  $.fn.modal.settings = {

    name: 'Modal',
    namespace: 'modal',

    debug: false,
    verbose: false,
    performance: true,

    observeChanges: false,

    allowMultiple: false,
    detachable: true,
    closable: true,
    autofocus: true,

    inverted: false,
    blurring: false,

    dimmerSettings: {
      closable: false,
      useCSS: true,
    },

    context: 'body',

    queue: false,
    duration: 500,
    offset: 0,
    transition: 'scale',

    // padding with edge of page
    padding: 50,

    // called before show animation
    onShow() {},

    // called after show animation
    onVisible() {},

    // called before hide animation
    onHide() { return true; },

    // called after hide animation
    onHidden() {},

    // called after approve selector match
    onApprove() { return true; },

    // called after deny selector match
    onDeny() { return true; },

    selector: {
      close: '> .close',
      approve: '.actions .positive, .actions .approve, .actions .ok',
      deny: '.actions .negative, .actions .deny, .actions .cancel',
      modal: '.ui.modal',
    },
    error: {
      dimmer: 'UI Dimmer, a required component is not included in this page',
      method: 'The method you called is not defined.',
      notFound: 'The element you specified could not be found',
    },
    className: {
      active: 'active',
      animating: 'animating',
      blurring: 'blurring',
      scrolling: 'scrolling',
      undetached: 'undetached',
    },
  };
}(jQuery, window, document));
