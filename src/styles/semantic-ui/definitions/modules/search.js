/*!
 * # Semantic UI - Search
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

(function ($, window, document, undefined) {
  $.fn.search = function (parameters) {
    const
      $allModules = $(this);
    const moduleSelector = $allModules.selector || '';

    let time = new Date().getTime();
    let performance = [];

    const query = arguments[0];
    const methodInvoked = (typeof query === 'string');
    const queryArguments = [].slice.call(arguments, 1);
    let returnedValue;
    $(this)
      .each(function () {
        const
          settings = ($.isPlainObject(parameters))
            ? $.extend(true, {}, $.fn.search.settings, parameters)
            : $.extend({}, $.fn.search.settings);

        const { className } = settings;
        const { metadata } = settings;
        const { regExp } = settings;
        const { fields } = settings;
        const { selector } = settings;
        const { error } = settings;
        const { namespace } = settings;

        const eventNamespace = `.${namespace}`;
        const moduleNamespace = `${namespace}-module`;

        const $module = $(this);
        const $prompt = $module.find(selector.prompt);
        const $searchButton = $module.find(selector.searchButton);
        let $results = $module.find(selector.results);
        const $result = $module.find(selector.result);
        const $category = $module.find(selector.category);

        const element = this;
        let instance = $module.data(moduleNamespace);

        let module;
        module = {

          initialize() {
            module.verbose('Initializing module');
            module.determine.searchFields();
            module.bind.events();
            module.set.type();
            module.create.results();
            module.instantiate();
          },
          instantiate() {
            module.verbose('Storing instance of module', module);
            instance = module;
            $module
              .data(moduleNamespace, module);
          },
          destroy() {
            module.verbose('Destroying instance');
            $module
              .off(eventNamespace)
              .removeData(moduleNamespace);
          },

          bind: {
            events() {
              module.verbose('Binding events to search');
              if (settings.automatic) {
                $module
                  .on(module.get.inputEvent() + eventNamespace, selector.prompt, module.event.input);
                $prompt
                  .attr('autocomplete', 'off');
              }
              $module
              // prompt
                .on(`focus${eventNamespace}`, selector.prompt, module.event.focus)
                .on(`blur${eventNamespace}`, selector.prompt, module.event.blur)
                .on(`keydown${eventNamespace}`, selector.prompt, module.handleKeyboard)
              // search button
                .on(`click${eventNamespace}`, selector.searchButton, module.query)
              // results
                .on(`mousedown${eventNamespace}`, selector.results, module.event.result.mousedown)
                .on(`mouseup${eventNamespace}`, selector.results, module.event.result.mouseup)
                .on(`click${eventNamespace}`, selector.result, module.event.result.click);
            },
          },

          determine: {
            searchFields() {
            // this makes sure $.extend does not add specified search fields to default fields
            // this is the only setting which should not extend defaults
              if (parameters && parameters.searchFields !== undefined) {
                settings.searchFields = parameters.searchFields;
              }
            },
          },

          event: {
            input() {
              clearTimeout(module.timer);
              module.timer = setTimeout(module.query, settings.searchDelay);
            },
            focus() {
              module.set.focus();
              if (module.has.minimumCharacters()) {
                module.query();
                if (module.can.show()) {
                  module.showResults();
                }
              }
            },
            blur(event) {
              const
                pageLostFocus = (document.activeElement === this);
              const callback = function () {
                module.cancel.query();
                module.remove.focus();
                module.timer = setTimeout(module.hideResults, settings.hideDelay);
              };
              if (pageLostFocus) {
                return;
              }
              if (module.resultsClicked) {
                module.debug('Determining if user action caused search to close');
                $module
                  .one('click', selector.results, (event) => {
                    if (!module.is.animating() && !module.is.hidden()) {
                      callback();
                    }
                  });
              } else {
                module.debug('Input blurred without user action, closing results');
                callback();
              }
            },
            result: {
              mousedown() {
                module.resultsClicked = true;
              },
              mouseup() {
                module.resultsClicked = false;
              },
              click(event) {
                module.debug('Search result selected');
                const
                  $result = $(this);
                const $title = $result.find(selector.title).eq(0);
                const $link = $result.find('a[href]').eq(0);
                const href = $link.attr('href') || false;
                const target = $link.attr('target') || false;
                const title = $title.html();
                // title is used for result lookup
                const value = ($title.length > 0)
                  ? $title.text()
                  : false;
                const results = module.get.results();
                const result = $result.data(metadata.result) || module.get.result(value, results);
                let returnedValue;
                if ($.isFunction(settings.onSelect)) {
                  if (settings.onSelect.call(element, result, results) === false) {
                    module.debug('Custom onSelect callback cancelled default select action');
                    return;
                  }
                }
                module.hideResults();
                if (value) {
                  module.set.value(value);
                }
                if (href) {
                  module.verbose('Opening search link found in result', $link);
                  if (target == '_blank' || event.ctrlKey) {
                    window.open(href);
                  } else {
                    window.location.href = (href);
                  }
                }
              },
            },
          },
          handleKeyboard(event) {
            const
            // force selector refresh
              $result = $module.find(selector.result);
            const $category = $module.find(selector.category);
            const currentIndex = $result.index($result.filter(`.${className.active}`));
            const resultSize = $result.length;

            const keyCode = event.which;
            const keys = {
              backspace: 8,
              enter: 13,
              escape: 27,
              upArrow: 38,
              downArrow: 40,
            };
            let newIndex
          ;
          // search shortcuts
            if (keyCode == keys.escape) {
              module.verbose('Escape key pressed, blurring search field');
              module.trigger.blur();
            }
            if (module.is.visible()) {
              if (keyCode == keys.enter) {
                module.verbose('Enter key pressed, selecting active result');
                if ($result.filter(`.${className.active}`).length > 0) {
                  module.event.result.click.call($result.filter(`.${className.active}`), event);
                  event.preventDefault();
                  return false;
                }
              } else if (keyCode == keys.upArrow) {
                module.verbose('Up key pressed, changing active result');
                newIndex = (currentIndex - 1 < 0)
                  ? currentIndex
                  : currentIndex - 1;
                $category
                  .removeClass(className.active);
                $result
                  .removeClass(className.active)
                  .eq(newIndex)
                  .addClass(className.active)
                  .closest($category)
                  .addClass(className.active);
                event.preventDefault();
              } else if (keyCode == keys.downArrow) {
                module.verbose('Down key pressed, changing active result');
                newIndex = (currentIndex + 1 >= resultSize)
                  ? currentIndex
                  : currentIndex + 1;
                $category
                  .removeClass(className.active);
                $result
                  .removeClass(className.active)
                  .eq(newIndex)
                  .addClass(className.active)
                  .closest($category)
                  .addClass(className.active);
                event.preventDefault();
              }
            } else {
            // query shortcuts
              if (keyCode == keys.enter) {
                module.verbose('Enter key pressed, executing query');
                module.query();
                module.set.buttonPressed();
                $prompt.one('keyup', module.remove.buttonFocus);
              }
            }
          },

          setup: {
            api() {
              const
                apiSettings = {
                  debug: settings.debug,
                  on: false,
                  cache: 'local',
                  action: 'search',
                  onError: module.error,
                };
              let searchHTML;
              module.verbose('First request, initializing API');
              $module.api(apiSettings);
            },
          },

          can: {
            useAPI() {
              return $.fn.api !== undefined;
            },
            show() {
              return module.is.focused() && !module.is.visible() && !module.is.empty();
            },
            transition() {
              return settings.transition && $.fn.transition !== undefined && $module.transition('is supported');
            },
          },

          is: {
            animating() {
              return $results.hasClass(className.animating);
            },
            hidden() {
              return $results.hasClass(className.hidden);
            },
            empty() {
              return ($results.html() === '');
            },
            visible() {
              return ($results.filter(':visible').length > 0);
            },
            focused() {
              return ($prompt.filter(':focus').length > 0);
            },
          },

          trigger: {
            blur() {
              const
                events = document.createEvent('HTMLEvents');
              const promptElement = $prompt[0];
              if (promptElement) {
                module.verbose('Triggering native blur event');
                events.initEvent('blur', false, false);
                promptElement.dispatchEvent(events);
              }
            },
          },

          get: {
            inputEvent() {
              const
                prompt = $prompt[0];
              const inputEvent = (prompt !== undefined && prompt.oninput !== undefined)
                ? 'input'
                : (prompt !== undefined && prompt.onpropertychange !== undefined)
                  ? 'propertychange'
                  : 'keyup';
              return inputEvent;
            },
            value() {
              return $prompt.val();
            },
            results() {
              const
                results = $module.data(metadata.results);
              return results;
            },
            result(value, results) {
              const
                lookupFields = ['title', 'id'];
              let result = false;
              value = (value !== undefined)
                ? value
                : module.get.value();
              results = (results !== undefined)
                ? results
                : module.get.results();
              if (settings.type === 'category') {
                module.debug('Finding result that matches', value);
                $.each(results, (index, category) => {
                  if ($.isArray(category.results)) {
                    result = module.search.object(value, category.results, lookupFields)[0];
                    // don't continue searching if a result is found
                    if (result) {
                      return false;
                    }
                  }
                });
              } else {
                module.debug('Finding result in results object', value);
                result = module.search.object(value, results, lookupFields)[0];
              }
              return result || false;
            },
          },

          set: {
            focus() {
              $module.addClass(className.focus);
            },
            loading() {
              $module.addClass(className.loading);
            },
            value(value) {
              module.verbose('Setting search input value', value);
              $prompt
                .val(value);
            },
            type(type) {
              type = type || settings.type;
              if (settings.type == 'category') {
                $module.addClass(settings.type);
              }
            },
            buttonPressed() {
              $searchButton.addClass(className.pressed);
            },
          },

          remove: {
            loading() {
              $module.removeClass(className.loading);
            },
            focus() {
              $module.removeClass(className.focus);
            },
            buttonPressed() {
              $searchButton.removeClass(className.pressed);
            },
          },

          query() {
            const
              searchTerm = module.get.value();
            const cache = module.read.cache(searchTerm);
            if (module.has.minimumCharacters()) {
              if (cache) {
                module.debug('Reading result from cache', searchTerm);
                module.save.results(cache.results);
                module.addResults(cache.html);
                module.inject.id(cache.results);
              } else {
                module.debug('Querying for', searchTerm);
                if ($.isPlainObject(settings.source) || $.isArray(settings.source)) {
                  module.search.local(searchTerm);
                } else if (module.can.useAPI()) {
                  module.search.remote(searchTerm);
                } else {
                  module.error(error.source);
                }
              }
              settings.onSearchQuery.call(element, searchTerm);
            } else {
              module.hideResults();
            }
          },

          search: {
            local(searchTerm) {
              const
                results = module.search.object(searchTerm, settings.content);
              let searchHTML;
              module.set.loading();
              module.save.results(results);
              module.debug('Returned local search results', results);

              searchHTML = module.generateResults({
                results,
              });
              module.remove.loading();
              module.addResults(searchHTML);
              module.inject.id(results);
              module.write.cache(searchTerm, {
                html: searchHTML,
                results,
              });
            },
            remote(searchTerm) {
              const
                apiSettings = {
                  onSuccess(response) {
                    module.parse.response.call(element, response, searchTerm);
                  },
                  onFailure() {
                    module.displayMessage(error.serverError);
                  },
                  urlData: {
                    query: searchTerm,
                  },
                };
              if (!$module.api('get request')) {
                module.setup.api();
              }
              $.extend(true, apiSettings, settings.apiSettings);
              module.debug('Executing search', apiSettings);
              module.cancel.query();
              $module
                .api('setting', apiSettings)
                .api('query');
            },
            object(searchTerm, source, searchFields) {
              const
                results = [];
              const fuzzyResults = [];
              const searchExp = searchTerm.toString().replace(regExp.escape, '\\$&');
              const matchRegExp = new RegExp(regExp.beginsWith + searchExp, 'i');

              // avoid duplicates when pushing results
              const addResult = function (array, result) {
                const
                  notResult = ($.inArray(result, results) == -1);
                const notFuzzyResult = ($.inArray(result, fuzzyResults) == -1);
                if (notResult && notFuzzyResult) {
                  array.push(result);
                }
              };
              source = source || settings.source;
              searchFields = (searchFields !== undefined)
                ? searchFields
                : settings.searchFields
              ;

              // search fields should be array to loop correctly
              if (!$.isArray(searchFields)) {
                searchFields = [searchFields];
              }

              // exit conditions if no source
              if (source === undefined || source === false) {
                module.error(error.source);
                return [];
              }

              // iterate through search fields looking for matches
              $.each(searchFields, (index, field) => {
                $.each(source, (label, content) => {
                  const
                    fieldExists = (typeof content[field] === 'string');
                  if (fieldExists) {
                    if (content[field].search(matchRegExp) !== -1) {
                    // content starts with value (first in results)
                      addResult(results, content);
                    } else if (settings.searchFullText && module.fuzzySearch(searchTerm, content[field])) {
                    // content fuzzy matches (last in results)
                      addResult(fuzzyResults, content);
                    }
                  }
                });
              });
              return $.merge(results, fuzzyResults);
            },
          },

          fuzzySearch(query, term) {
            const
              termLength = term.length;
            const queryLength = query.length;
            if (typeof query !== 'string') {
              return false;
            }
            query = query.toLowerCase();
            term = term.toLowerCase();
            if (queryLength > termLength) {
              return false;
            }
            if (queryLength === termLength) {
              return (query === term);
            }
            search: for (let characterIndex = 0, nextCharacterIndex = 0; characterIndex < queryLength; characterIndex++) {
              const
                queryCharacter = query.charCodeAt(characterIndex);
              while (nextCharacterIndex < termLength) {
                if (term.charCodeAt(nextCharacterIndex++) === queryCharacter) {
                  continue search;
                }
              }
              return false;
            }
            return true;
          },

          parse: {
            response(response, searchTerm) {
              const
                searchHTML = module.generateResults(response);
              module.verbose('Parsing server response', response);
              if (response !== undefined) {
                if (searchTerm !== undefined && response[fields.results] !== undefined) {
                  module.addResults(searchHTML);
                  module.inject.id(response[fields.results]);
                  module.write.cache(searchTerm, {
                    html: searchHTML,
                    results: response[fields.results],
                  });
                  module.save.results(response[fields.results]);
                }
              }
            },
          },

          cancel: {
            query() {
              if (module.can.useAPI()) {
                $module.api('abort');
              }
            },
          },

          has: {
            minimumCharacters() {
              const
                searchTerm = module.get.value();
              const numCharacters = searchTerm.length;
              return (numCharacters >= settings.minCharacters);
            },
          },

          clear: {
            cache(value) {
              const
                cache = $module.data(metadata.cache);
              if (!value) {
                module.debug('Clearing cache', value);
                $module.removeData(metadata.cache);
              } else if (value && cache && cache[value]) {
                module.debug('Removing value from cache', value);
                delete cache[value];
                $module.data(metadata.cache, cache);
              }
            },
          },

          read: {
            cache(name) {
              const
                cache = $module.data(metadata.cache);
              if (settings.cache) {
                module.verbose('Checking cache for generated html for query', name);
                return (typeof cache === 'object') && (cache[name] !== undefined)
                  ? cache[name]
                  : false;
              }
              return false;
            },
          },

          create: {
            id(resultIndex, categoryIndex) {
              const
                resultID = (resultIndex + 1); // not zero indexed
              const categoryID = (categoryIndex + 1);
              let firstCharCode;
              let letterID;
              let id;
              if (categoryIndex !== undefined) {
              // start char code for "A"
                letterID = String.fromCharCode(97 + categoryIndex);
                id = letterID + resultID;
                module.verbose('Creating category result id', id);
              } else {
                id = resultID;
                module.verbose('Creating result id', id);
              }
              return id;
            },
            results() {
              if ($results.length === 0) {
                $results = $('<div />')
                  .addClass(className.results)
                  .appendTo($module);
              }
            },
          },

          inject: {
            result(result, resultIndex, categoryIndex) {
              module.verbose('Injecting result into results');
              const
                $selectedResult = (categoryIndex !== undefined)
                  ? $results
                    .children().eq(categoryIndex)
                    .children(selector.result).eq(resultIndex)
                  : $results
                    .children(selector.result).eq(resultIndex);
              module.verbose('Injecting results metadata', $selectedResult);
              $selectedResult
                .data(metadata.result, result);
            },
            id(results) {
              module.debug('Injecting unique ids into results');
              let
              // since results may be object, we must use counters
                categoryIndex = 0;
              let resultIndex = 0;
              if (settings.type === 'category') {
              // iterate through each category result
                $.each(results, (index, category) => {
                  resultIndex = 0;
                  $.each(category.results, (index, value) => {
                    const
                      result = category.results[index];
                    if (result.id === undefined) {
                      result.id = module.create.id(resultIndex, categoryIndex);
                    }
                    module.inject.result(result, resultIndex, categoryIndex);
                    resultIndex++;
                  });
                  categoryIndex++;
                });
              } else {
              // top level
                $.each(results, (index, value) => {
                  const
                    result = results[index];
                  if (result.id === undefined) {
                    result.id = module.create.id(resultIndex);
                  }
                  module.inject.result(result, resultIndex);
                  resultIndex++;
                });
              }
              return results;
            },
          },

          save: {
            results(results) {
              module.verbose('Saving current search results to metadata', results);
              $module.data(metadata.results, results);
            },
          },

          write: {
            cache(name, value) {
              const
                cache = ($module.data(metadata.cache) !== undefined)
                  ? $module.data(metadata.cache)
                  : {};
              if (settings.cache) {
                module.verbose('Writing generated html to cache', name, value);
                cache[name] = value;
                $module
                  .data(metadata.cache, cache);
              }
            },
          },

          addResults(html) {
            if ($.isFunction(settings.onResultsAdd)) {
              if (settings.onResultsAdd.call($results, html) === false) {
                module.debug('onResultsAdd callback cancelled default action');
                return false;
              }
            }
            $results
              .html(html);
            if (module.can.show()) {
              module.showResults();
            }
          },

          showResults() {
            if (!module.is.visible()) {
              if (module.can.transition()) {
                module.debug('Showing results with css animations');
                $results
                  .transition({
                    animation: `${settings.transition} in`,
                    debug: settings.debug,
                    verbose: settings.verbose,
                    duration: settings.duration,
                    queue: true,
                  });
              } else {
                module.debug('Showing results with javascript');
                $results
                  .stop()
                  .fadeIn(settings.duration, settings.easing);
              }
              settings.onResultsOpen.call($results);
            }
          },
          hideResults() {
            if (module.is.visible()) {
              if (module.can.transition()) {
                module.debug('Hiding results with css animations');
                $results
                  .transition({
                    animation: `${settings.transition} out`,
                    debug: settings.debug,
                    verbose: settings.verbose,
                    duration: settings.duration,
                    queue: true,
                  });
              } else {
                module.debug('Hiding results with javascript');
                $results
                  .stop()
                  .fadeOut(settings.duration, settings.easing);
              }
              settings.onResultsClose.call($results);
            }
          },

          generateResults(response) {
            module.debug('Generating html from response', response);
            const
              template = settings.templates[settings.type];
            const isProperObject = ($.isPlainObject(response[fields.results]) && !$.isEmptyObject(response[fields.results]));
            const isProperArray = ($.isArray(response[fields.results]) && response[fields.results].length > 0);
            let html = '';
            if (isProperObject || isProperArray) {
              if (settings.maxResults > 0) {
                if (isProperObject) {
                  if (settings.type == 'standard') {
                    module.error(error.maxResults);
                  }
                } else {
                  response[fields.results] = response[fields.results].slice(0, settings.maxResults);
                }
              }
              if ($.isFunction(template)) {
                html = template(response, fields);
              } else {
                module.error(error.noTemplate, false);
              }
            } else {
              html = module.displayMessage(error.noResults, 'empty');
            }
            settings.onResults.call(element, response);
            return html;
          },

          displayMessage(text, type) {
            type = type || 'standard';
            module.debug('Displaying message', text, type);
            module.addResults(settings.templates.message(text, type));
            return settings.templates.message(text, type);
          },

          setting(name, value) {
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

  $.fn.search.settings = {

    name: 'Search',
    namespace: 'search',

    debug: false,
    verbose: false,
    performance: true,

    type: 'standard',
    // template to use (specified in settings.templates)

    minCharacters: 1,
    // minimum characters required to search

    apiSettings: false,
    // API config

    source: false,
    // object to search

    searchFields: [
      'title',
      'description',
    ],
    // fields to search

    displayField: '',
    // field to display in standard results template

    searchFullText: true,
    // whether to include fuzzy results in local search

    automatic: true,
    // whether to add events to prompt automatically

    hideDelay: 0,
    // delay before hiding menu after blur

    searchDelay: 200,
    // delay before searching

    maxResults: 7,
    // maximum results returned from local

    cache: true,
    // whether to store lookups in local cache

    // transition settings
    transition: 'scale',
    duration: 200,
    easing: 'easeOutExpo',

    // callbacks
    onSelect: false,
    onResultsAdd: false,

    onSearchQuery(query) {},
    onResults(response) {},

    onResultsOpen() {},
    onResultsClose() {},

    className: {
      animating: 'animating',
      active: 'active',
      empty: 'empty',
      focus: 'focus',
      hidden: 'hidden',
      loading: 'loading',
      results: 'results',
      pressed: 'down',
    },

    error: {
      source: 'Cannot search. No source used, and Semantic API module was not included',
      noResults: 'Your search returned no results',
      logging: 'Error in debug logging, exiting.',
      noEndpoint: 'No search endpoint was specified',
      noTemplate: 'A valid template name was not specified.',
      serverError: 'There was an issue querying the server.',
      maxResults: 'Results must be an array to use maxResults setting',
      method: 'The method you called is not defined.',
    },

    metadata: {
      cache: 'cache',
      results: 'results',
      result: 'result',
    },

    regExp: {
      escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      beginsWith: '(?:\s|^)',
    },

    // maps api response attributes to internal representation
    fields: {
      categories: 'results', // array of categories (category view)
      categoryName: 'name', // name of category (category view)
      categoryResults: 'results', // array of results (category view)
      description: 'description', // result description
      image: 'image', // result image
      price: 'price', // result price
      results: 'results', // array of results (standard)
      title: 'title', // result title
      url: 'url', // result url
      action: 'action', // "view more" object name
      actionText: 'text', // "view more" text
      actionURL: 'url', // "view more" url
    },

    selector: {
      prompt: '.prompt',
      searchButton: '.search.button',
      results: '.results',
      category: '.category',
      result: '.result',
      title: '.title, .name',
    },

    templates: {
      escape(string) {
        const
          badChars = /[&<>"'`]/g;
        const shouldEscape = /[&<>"'`]/;
        const escape = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '`': '&#x60;',
        };
        const escapedChar = function (chr) {
          return escape[chr];
        };
        if (shouldEscape.test(string)) {
          return string.replace(badChars, escapedChar);
        }
        return string;
      },
      message(message, type) {
        let
          html = '';
        if (message !== undefined && type !== undefined) {
          html += `${''
          + '<div class="message '}${type}">`
          ;
          // message type
          if (type == 'empty') {
            html += `${''
            + '<div class="header">No Results</div class="header">'
            + '<div class="description">'}${message}</div class="description">`;
          } else {
            html += ` <div class="description">${message}</div>`;
          }
          html += '</div>';
        }
        return html;
      },
      category(response, fields) {
        let
          html = '';
        const { escape } = $.fn.search.settings.templates;
        if (response[fields.categoryResults] !== undefined) {
        // each category
          $.each(response[fields.categoryResults], (index, category) => {
            if (category[fields.results] !== undefined && category.results.length > 0) {
              html += '<div class="category">';

              if (category[fields.categoryName] !== undefined) {
                html += `<div class="name">${category[fields.categoryName]}</div>`;
              }

              // each item inside category
              $.each(category.results, (index, result) => {
                if (result[fields.url]) {
                  html += `<a class="result" href="${result[fields.url]}">`;
                } else {
                  html += '<a class="result">';
                }
                if (result[fields.image] !== undefined) {
                  html += `${''
                  + '<div class="image">'
                  + ' <img src="'}${result[fields.image]}">`
                  + '</div>';
                }
                html += '<div class="content">';
                if (result[fields.price] !== undefined) {
                  html += `<div class="price">${result[fields.price]}</div>`;
                }
                if (result[fields.title] !== undefined) {
                  html += `<div class="title">${result[fields.title]}</div>`;
                }
                if (result[fields.description] !== undefined) {
                  html += `<div class="description">${result[fields.description]}</div>`;
                }
                html += ''
                + '</div>';
                html += '</a>';
              });
              html += ''
              + '</div>';
            }
          });
          if (response[fields.action]) {
            html += `${''
          + '<a href="'}${response[fields.action][fields.actionURL]}" class="action">${
              response[fields.action][fields.actionText]
            }</a>`;
          }
          return html;
        }
        return false;
      },
      standard(response, fields) {
        let
          html = '';
        if (response[fields.results] !== undefined) {
        // each result
          $.each(response[fields.results], (index, result) => {
            if (result[fields.url]) {
              html += `<a class="result" href="${result[fields.url]}">`;
            } else {
              html += '<a class="result">';
            }
            if (result[fields.image] !== undefined) {
              html += `${''
              + '<div class="image">'
              + ' <img src="'}${result[fields.image]}">`
              + '</div>';
            }
            html += '<div class="content">';
            if (result[fields.price] !== undefined) {
              html += `<div class="price">${result[fields.price]}</div>`;
            }
            if (result[fields.title] !== undefined) {
              html += `<div class="title">${result[fields.title]}</div>`;
            }
            if (result[fields.description] !== undefined) {
              html += `<div class="description">${result[fields.description]}</div>`;
            }
            html += ''
            + '</div>';
            html += '</a>';
          });

          if (response[fields.action]) {
            html += `${''
          + '<a href="'}${response[fields.action][fields.actionURL]}" class="action">${
              response[fields.action][fields.actionText]
            }</a>`;
          }
          return html;
        }
        return false;
      },
    },
  };
}(jQuery, window, document));
