/*!
 * # Semantic UI - Transition
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

(function ($, window, document, undefined) {
  $.fn.transition = function () {
    const
      $allModules = $(this);
    const moduleSelector = $allModules.selector || '';

    let time = new Date().getTime();
    let performance = [];

    const moduleArguments = arguments;
    const query = moduleArguments[0];
    const queryArguments = [].slice.call(arguments, 1);
    let methodInvoked = (typeof query === 'string');

    const requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function (callback) { setTimeout(callback, 0); };

    let returnedValue;
    $allModules
      .each(function (index) {
        const
          $module = $(this);
        const element = this;

        // set at run time
        let settings;
        let instance;

        let error;
        let className;
        let metadata;
        let animationEnd;
        let animationName;

        let namespace;
        let moduleNamespace;
        let eventNamespace;
        let module;
        module = {

          initialize() {
          // get full settings
            settings = module.get.settings.apply(element, moduleArguments);

            // shorthand
            className = settings.className;
            error = settings.error;
            metadata = settings.metadata;

            // define namespace
            eventNamespace = `.${settings.namespace}`;
            moduleNamespace = `module-${settings.namespace}`;
            instance = $module.data(moduleNamespace) || module;

            // get vendor specific events
            animationEnd = module.get.animationEndEvent();

            if (methodInvoked) {
              methodInvoked = module.invoke(query);
            }

            // method not invoked, lets run an animation
            if (methodInvoked === false) {
              module.verbose('Converted arguments into settings object', settings);
              if (settings.interval) {
                module.delay(settings.animate);
              } else {
                module.animate();
              }
              module.instantiate();
            }
          },

          instantiate() {
            module.verbose('Storing instance of module', module);
            instance = module;
            $module
              .data(moduleNamespace, instance);
          },

          destroy() {
            module.verbose('Destroying previous module for', element);
            $module
              .removeData(moduleNamespace);
          },

          refresh() {
            module.verbose('Refreshing display type on next animation');
            delete module.displayType;
          },

          forceRepaint() {
            module.verbose('Forcing element repaint');
            const
              $parentElement = $module.parent();
            const $nextElement = $module.next();
            if ($nextElement.length === 0) {
              $module.detach().appendTo($parentElement);
            } else {
              $module.detach().insertBefore($nextElement);
            }
          },

          repaint() {
            module.verbose('Repainting element');
            const
              fakeAssignment = element.offsetWidth;
          },

          delay(interval) {
            let
              direction = module.get.animationDirection();
            let shouldReverse;
            let delay;
            if (!direction) {
              direction = module.can.transition()
                ? module.get.direction()
                : 'static';
            }
            interval = (interval !== undefined)
              ? interval
              : settings.interval;
            shouldReverse = (settings.reverse == 'auto' && direction == className.outward);
            delay = (shouldReverse || settings.reverse == true)
              ? ($allModules.length - index) * settings.interval
              : index * settings.interval;
            module.debug('Delaying animation by', delay);
            setTimeout(module.animate, delay);
          },

          animate(overrideSettings) {
            settings = overrideSettings || settings;
            if (!module.is.supported()) {
              module.error(error.support);
              return false;
            }
            module.debug('Preparing animation', settings.animation);
            if (module.is.animating()) {
              if (settings.queue) {
                if (!settings.allowRepeats && module.has.direction() && module.is.occurring() && module.queuing !== true) {
                  module.debug('Animation is currently occurring, preventing queueing same animation', settings.animation);
                } else {
                  module.queue(settings.animation);
                }
                return false;
              }
              if (!settings.allowRepeats && module.is.occurring()) {
                module.debug('Animation is already occurring, will not execute repeated animation', settings.animation);
                return false;
              }

              module.debug('New animation started, completing previous early', settings.animation);
              instance.complete();
            }
            if (module.can.animate()) {
              module.set.animating(settings.animation);
            } else {
              module.error(error.noAnimation, settings.animation, element);
            }
          },

          reset() {
            module.debug('Resetting animation to beginning conditions');
            module.remove.animationCallbacks();
            module.restore.conditions();
            module.remove.animating();
          },

          queue(animation) {
            module.debug('Queueing animation of', animation);
            module.queuing = true;
            $module
              .one(`${animationEnd}.queue${eventNamespace}`, function () {
                module.queuing = false;
                module.repaint();
                module.animate.apply(this, settings);
              });
          },

          complete(event) {
            module.debug('Animation complete', settings.animation);
            module.remove.completeCallback();
            module.remove.failSafe();
            if (!module.is.looping()) {
              if (module.is.outward()) {
                module.verbose('Animation is outward, hiding element');
                module.restore.conditions();
                module.hide();
              } else if (module.is.inward()) {
                module.verbose('Animation is outward, showing element');
                module.restore.conditions();
                module.show();
              } else {
                module.verbose('Static animation completed');
                module.restore.conditions();
                settings.onComplete.call(element);
              }
            }
          },

          force: {
            visible() {
              const
                style = $module.attr('style');
              const userStyle = module.get.userStyle();
              const displayType = module.get.displayType();
              const overrideStyle = `${userStyle}display: ${displayType} !important;`;
              const currentDisplay = $module.css('display');
              const emptyStyle = (style === undefined || style === '');
              if (currentDisplay !== displayType) {
                module.verbose('Overriding default display to show element', displayType);
                $module
                  .attr('style', overrideStyle);
              } else if (emptyStyle) {
                $module.removeAttr('style');
              }
            },
            hidden() {
              const
                style = $module.attr('style');
              const currentDisplay = $module.css('display');
              const emptyStyle = (style === undefined || style === '');
              if (currentDisplay !== 'none' && !module.is.hidden()) {
                module.verbose('Overriding default display to hide element');
                $module
                  .css('display', 'none');
              } else if (emptyStyle) {
                $module
                  .removeAttr('style');
              }
            },
          },

          has: {
            direction(animation) {
              let
                hasDirection = false;
              animation = animation || settings.animation;
              if (typeof animation === 'string') {
                animation = animation.split(' ');
                $.each(animation, (index, word) => {
                  if (word === className.inward || word === className.outward) {
                    hasDirection = true;
                  }
                });
              }
              return hasDirection;
            },
            inlineDisplay() {
              const
                style = $module.attr('style') || '';
              return $.isArray(style.match(/display.*?;/, ''));
            },
          },

          set: {
            animating(animation) {
              let
                animationClass;
              let direction
            ;
            // remove previous callbacks
              module.remove.completeCallback();

              // determine exact animation
              animation = animation || settings.animation;
              animationClass = module.get.animationClass(animation);

              // save animation class in cache to restore class names
              module.save.animation(animationClass);

              // override display if necessary so animation appears visibly
              module.force.visible();

              module.remove.hidden();
              module.remove.direction();

              module.start.animation(animationClass);
            },
            duration(animationName, duration) {
              duration = duration || settings.duration;
              duration = (typeof duration === 'number')
                ? `${duration}ms`
                : duration;
              if (duration || duration === 0) {
                module.verbose('Setting animation duration', duration);
                $module
                  .css({
                    'animation-duration': duration,
                  });
              }
            },
            direction(direction) {
              direction = direction || module.get.direction();
              if (direction == className.inward) {
                module.set.inward();
              } else {
                module.set.outward();
              }
            },
            looping() {
              module.debug('Transition set to loop');
              $module
                .addClass(className.looping);
            },
            hidden() {
              $module
                .addClass(className.transition)
                .addClass(className.hidden);
            },
            inward() {
              module.debug('Setting direction to inward');
              $module
                .removeClass(className.outward)
                .addClass(className.inward);
            },
            outward() {
              module.debug('Setting direction to outward');
              $module
                .removeClass(className.inward)
                .addClass(className.outward);
            },
            visible() {
              $module
                .addClass(className.transition)
                .addClass(className.visible);
            },
          },

          start: {
            animation(animationClass) {
              animationClass = animationClass || module.get.animationClass();
              module.debug('Starting tween', animationClass);
              $module
                .addClass(animationClass)
                .one(`${animationEnd}.complete${eventNamespace}`, module.complete);
              if (settings.useFailSafe) {
                module.add.failSafe();
              }
              module.set.duration(settings.duration);
              settings.onStart.call(element);
            },
          },

          save: {
            animation(animation) {
              if (!module.cache) {
                module.cache = {};
              }
              module.cache.animation = animation;
            },
            displayType(displayType) {
              if (displayType !== 'none') {
                $module.data(metadata.displayType, displayType);
              }
            },
            transitionExists(animation, exists) {
              $.fn.transition.exists[animation] = exists;
              module.verbose('Saving existence of transition', animation, exists);
            },
          },

          restore: {
            conditions() {
              const
                animation = module.get.currentAnimation();
              if (animation) {
                $module
                  .removeClass(animation);
                module.verbose('Removing animation class', module.cache);
              }
              module.remove.duration();
            },
          },

          add: {
            failSafe() {
              const
                duration = module.get.duration();
              module.timer = setTimeout(() => {
                $module.triggerHandler(animationEnd);
              }, duration + settings.failSafeDelay);
              module.verbose('Adding fail safe timer', module.timer);
            },
          },

          remove: {
            animating() {
              $module.removeClass(className.animating);
            },
            animationCallbacks() {
              module.remove.queueCallback();
              module.remove.completeCallback();
            },
            queueCallback() {
              $module.off(`.queue${eventNamespace}`);
            },
            completeCallback() {
              $module.off(`.complete${eventNamespace}`);
            },
            display() {
              $module.css('display', '');
            },
            direction() {
              $module
                .removeClass(className.inward)
                .removeClass(className.outward);
            },
            duration() {
              $module
                .css('animation-duration', '');
            },
            failSafe() {
              module.verbose('Removing fail safe timer', module.timer);
              if (module.timer) {
                clearTimeout(module.timer);
              }
            },
            hidden() {
              $module.removeClass(className.hidden);
            },
            visible() {
              $module.removeClass(className.visible);
            },
            looping() {
              module.debug('Transitions are no longer looping');
              if (module.is.looping()) {
                module.reset();
                $module
                  .removeClass(className.looping);
              }
            },
            transition() {
              $module
                .removeClass(className.visible)
                .removeClass(className.hidden);
            },
          },
          get: {
            settings(animation, duration, onComplete) {
            // single settings object
              if (typeof animation === 'object') {
                return $.extend(true, {}, $.fn.transition.settings, animation);
              }
              // all arguments provided
              if (typeof onComplete === 'function') {
                return $.extend({}, $.fn.transition.settings, {
                  animation,
                  onComplete,
                  duration,
                });
              }
              // only duration provided
              if (typeof duration === 'string' || typeof duration === 'number') {
                return $.extend({}, $.fn.transition.settings, {
                  animation,
                  duration,
                });
              }
              // duration is actually settings object
              if (typeof duration === 'object') {
                return $.extend({}, $.fn.transition.settings, duration, {
                  animation,
                });
              }
              // duration is actually callback
              if (typeof duration === 'function') {
                return $.extend({}, $.fn.transition.settings, {
                  animation,
                  onComplete: duration,
                });
              }
              // only animation provided

              return $.extend({}, $.fn.transition.settings, {
                animation,
              });

              return $.fn.transition.settings;
            },
            animationClass(animation) {
              const
                animationClass = animation || settings.animation;
              const directionClass = (module.can.transition() && !module.has.direction())
                ? `${module.get.direction()} `
                : '';
              return `${className.animating} ${
                className.transition} ${
                directionClass
              }${animationClass}`;
            },
            currentAnimation() {
              return (module.cache && module.cache.animation !== undefined)
                ? module.cache.animation
                : false;
            },
            currentDirection() {
              return module.is.inward()
                ? className.inward
                : className.outward;
            },
            direction() {
              return module.is.hidden() || !module.is.visible()
                ? className.inward
                : className.outward;
            },
            animationDirection(animation) {
              let
                direction;
              animation = animation || settings.animation;
              if (typeof animation === 'string') {
                animation = animation.split(' ');
                // search animation name for out/in class
                $.each(animation, (index, word) => {
                  if (word === className.inward) {
                    direction = className.inward;
                  } else if (word === className.outward) {
                    direction = className.outward;
                  }
                });
              }
              // return found direction
              if (direction) {
                return direction;
              }
              return false;
            },
            duration(duration) {
              duration = duration || settings.duration;
              if (duration === false) {
                duration = $module.css('animation-duration') || 0;
              }
              return (typeof duration === 'string')
                ? (duration.indexOf('ms') > -1)
                  ? parseFloat(duration)
                  : parseFloat(duration) * 1000
                : duration;
            },
            displayType() {
              if (settings.displayType) {
                return settings.displayType;
              }
              if ($module.data(metadata.displayType) === undefined) {
              // create fake element to determine display state
                module.can.transition(true);
              }
              return $module.data(metadata.displayType);
            },
            userStyle(style) {
              style = style || $module.attr('style') || '';
              return style.replace(/display.*?;/, '');
            },
            transitionExists(animation) {
              return $.fn.transition.exists[animation];
            },
            animationStartEvent() {
              const
                element = document.createElement('div');
              const animations = {
                animation: 'animationstart',
                OAnimation: 'oAnimationStart',
                MozAnimation: 'mozAnimationStart',
                WebkitAnimation: 'webkitAnimationStart',
              };
              let animation;
              for (animation in animations) {
                if (element.style[animation] !== undefined) {
                  return animations[animation];
                }
              }
              return false;
            },
            animationEndEvent() {
              const
                element = document.createElement('div');
              const animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
              };
              let animation;
              for (animation in animations) {
                if (element.style[animation] !== undefined) {
                  return animations[animation];
                }
              }
              return false;
            },

          },

          can: {
            transition(forced) {
              const
                { animation } = settings;
              const transitionExists = module.get.transitionExists(animation);
              let elementClass;
              let tagName;
              let $clone;
              let currentAnimation;
              let inAnimation;
              let directionExists;
              let displayType;
              if (transitionExists === undefined || forced) {
                module.verbose('Determining whether animation exists');
                elementClass = $module.attr('class');
                tagName = $module.prop('tagName');

                $clone = $(`<${tagName} />`).addClass(elementClass).insertAfter($module);
                currentAnimation = $clone
                  .addClass(animation)
                  .removeClass(className.inward)
                  .removeClass(className.outward)
                  .addClass(className.animating)
                  .addClass(className.transition)
                  .css('animationName');
                inAnimation = $clone
                  .addClass(className.inward)
                  .css('animationName');
                displayType = $clone
                  .attr('class', elementClass)
                  .removeAttr('style')
                  .removeClass(className.hidden)
                  .removeClass(className.visible)
                  .show()
                  .css('display');
                module.verbose('Determining final display state', displayType);
                module.save.displayType(displayType);

                $clone.remove();
                if (currentAnimation != inAnimation) {
                  module.debug('Direction exists for animation', animation);
                  directionExists = true;
                } else if (currentAnimation == 'none' || !currentAnimation) {
                  module.debug('No animation defined in css', animation);
                  return;
                } else {
                  module.debug('Static animation found', animation, displayType);
                  directionExists = false;
                }
                module.save.transitionExists(animation, directionExists);
              }
              return (transitionExists !== undefined)
                ? transitionExists
                : directionExists;
            },
            animate() {
            // can transition does not return a value if animation does not exist
              return (module.can.transition() !== undefined);
            },
          },

          is: {
            animating() {
              return $module.hasClass(className.animating);
            },
            inward() {
              return $module.hasClass(className.inward);
            },
            outward() {
              return $module.hasClass(className.outward);
            },
            looping() {
              return $module.hasClass(className.looping);
            },
            occurring(animation) {
              animation = animation || settings.animation;
              animation = `.${animation.replace(' ', '.')}`;
              return ($module.filter(animation).length > 0);
            },
            visible() {
              return $module.is(':visible');
            },
            hidden() {
              return $module.css('visibility') === 'hidden';
            },
            supported() {
              return (animationEnd !== false);
            },
          },

          hide() {
            module.verbose('Hiding element');
            if (module.is.animating()) {
              module.reset();
            }
            element.blur(); // IE will trigger focus change if element is not blurred before hiding
            module.remove.display();
            module.remove.visible();
            module.set.hidden();
            module.force.hidden();
            settings.onHide.call(element);
            settings.onComplete.call(element);
          // module.repaint();
          },

          show(display) {
            module.verbose('Showing element', display);
            module.remove.hidden();
            module.set.visible();
            module.force.visible();
            settings.onShow.call(element);
            settings.onComplete.call(element);
          // module.repaint();
          },

          toggle() {
            if (module.is.visible()) {
              module.hide();
            } else {
              module.show();
            }
          },

          stop() {
            module.debug('Stopping current animation');
            $module.triggerHandler(animationEnd);
          },

          stopAll() {
            module.debug('Stopping all animation');
            module.remove.queueCallback();
            $module.triggerHandler(animationEnd);
          },

          clear: {
            queue() {
              module.debug('Clearing animation queue');
              module.remove.queueCallback();
            },
          },

          enable() {
            module.verbose('Starting animation');
            $module.removeClass(className.disabled);
          },

          disable() {
            module.debug('Stopping animation');
            $module.addClass(className.disabled);
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
          // modified for transition to return invoke success
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
            return (found !== undefined)
              ? found
              : false;
          },
        };
        module.initialize();
      });
    return (returnedValue !== undefined)
      ? returnedValue
      : this;
  };

  // Records if CSS transition is available
  $.fn.transition.exists = {};

  $.fn.transition.settings = {

    // module info
    name: 'Transition',

    // debug content outputted to console
    debug: false,

    // verbose debug output
    verbose: false,

    // performance data output
    performance: true,

    // event namespace
    namespace: 'transition',

    // delay between animations in group
    interval: 0,

    // whether group animations should be reversed
    reverse: 'auto',

    // animation callback event
    onStart() {},
    onComplete() {},
    onShow() {},
    onHide() {},

    // whether timeout should be used to ensure callback fires in cases animationend does not
    useFailSafe: true,

    // delay in ms for fail safe
    failSafeDelay: 100,

    // whether EXACT animation can occur twice in a row
    allowRepeats: false,

    // Override final display type on visible
    displayType: false,

    // animation duration
    animation: 'fade',
    duration: false,

    // new animations will occur after previous ones
    queue: true,

    metadata: {
      displayType: 'display',
    },

    className: {
      animating: 'animating',
      disabled: 'disabled',
      hidden: 'hidden',
      inward: 'in',
      loading: 'loading',
      looping: 'looping',
      outward: 'out',
      transition: 'transition',
      visible: 'visible',
    },

    // possible errors
    error: {
      noAnimation: 'Element is no longer attached to DOM. Unable to animate.',
      repeated: 'That animation is already occurring, cancelling repeated animation',
      method: 'The method you called is not defined',
      support: 'This browser does not support CSS animations',
    },

  };
}(jQuery, window, document));
