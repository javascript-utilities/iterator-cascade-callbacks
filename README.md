# Iterator Cascade Callbacks
[heading__top]:
  #iterator-cascade-callbacks
  "&#x2B06; Iterator that chains callback function execution"


Iterator that chains callback function execution


## [![Byte size of Iterator Cascade Callbacks][badge__main__iterator_cascade_callbacks__source_code]][iterator_cascade_callbacks__main__source_code] [![Open Issues][badge__issues__iterator_cascade_callbacks]][issues__iterator_cascade_callbacks] [![Open Pull Requests][badge__pull_requests__iterator_cascade_callbacks]][pull_requests__iterator_cascade_callbacks] [![Latest commits][badge__commits__iterator_cascade_callbacks__main]][commits__iterator_cascade_callbacks__main] [![Build Status][badge_travis_ci]][build_travis_ci]


---


- [&#x2B06; Top of Document][heading__top]

- [&#x1F3D7; Requirements][heading__requirements]

- [&#9889; Quick Start][heading__quick_start]
  - [&#x1F4DD; Edit Your ReadMe File][heading__your_readme_file]
  - [&#x1F4BE; Commit and Push][heading__commit_and_push]

- [&#x1F9F0; Usage][heading__usage]
  - [NodeJS Examples][heading__nodejs_examples]
  - [Web Application Example][heading__web_application_example]

- [&#x1F523; API][heading__api]

  - [Class `Stop_Iteration`][heading__class_stop_iteration]
    - [Method `Stop_Iteration.constructor`][heading__method_stop_iterationconstructor]

  - [Class `Pause_Iteration`][heading__class_pause_iteration]
    - [Method `Pause_Iteration.constructor`][heading__method_pause_iterationconstructor]

  - [Class `Callback_Object`][heading__class_callback_object]
    - [Method `Callback_Object.constructor`][heading__method_callback_objectconstructor]
    - [Method `Callback_Object.call`][heading__method_callback_objectcall]

  - [Class `Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]
    - [Method `Iterator_Cascade_Callbacks.constructor`][heading__method_iterator_cascade_callbacksconstructor]
    - [Static Method `zip`][heading__static_method_zip]
    - [Method `collect`][heading__method_collect]
    - [Method `collectToArray`][heading__method_collecttoarray]
    - [Method `collectToFunction`][heading__method_collecttofunction]
    - [Method `collectToObject`][heading__method_collecttoobject]
    - [Method `entries`][heading__method_entries]
    - [Method `filter`][heading__method_filter]
    - [Method `forEach`][heading__method_foreach]
    - [Method `inspect`][heading__method_inspect]
    - [Method `limit`][heading__method_limit]
    - [Method `map`][heading__method_map]
    - [Method `next`][heading__method_next]
    - [Method `skip`][heading__method_skip]
    - [Method `step`][heading__method_step]
    - [Method `take`][heading__method_take]

  - [Custom Interfaces][heading__custom_interfaces]
    - [Interface `Callback_Object`][heading__interface_callback_object]

  - [Custom Types][heading__custom_types]
    - [Type `Callback_Function`][heading__type_callback_function]
    - [Type `Callback_Function_References`][heading__type_callback_function_references]
    - [Type `Callback_Wrapper`][heading__type_callback_wrapper]
    - [Type `Collect_To_Function`][heading__type_collect_to_function]
    - [Type `Comparison_Results`][heading__type_comparisonresults]
    - [Type `Dictionary`][heading__type_dictionary]
    - [Type `Generator_Function_Instance`][heading__type_generator_function_instance]
    - [Type `Index_Or_Key`][heading__type_index_or_key]
    - [Type `Yielded_Tuple`][heading__type_yielded_tuple]
    - [Type `Yielded_Result`][heading__type_yielded_result]

- [&#x1F5D2; Notes][heading__notes]

- [&#x2714; To Dos][heading__to_dos]
  - [Version `0.0.6`][heading__version_006]
  - [Version `0.0.5`][heading__version_005]

- [&#x1F4C8; Contributing][heading__contributing]
  - [&#x1F531; Forking][heading__forking]
  - [&#x1F4B1; Sponsor][heading__sponsor]

- [&#x1F4C7; Attribution][heading__attribution]

- [&#x2696; Licensing][heading__license]


---


## Requirements
[heading__requirements]:
  #requirements
  "&#x1F3D7; Prerequisites and/or dependencies that this project needs to function properly"


NodeJS dependencies may be installed via NPM...


```Bash
npm install
```


**Notice** as of version `0.0.6` NodeJS dependencies are for **development only**, ie. if utilizing this project within other applications or as a submodule, then no dependencies are required.


______


## Quick Start
[heading__quick_start]:
  #quick-start
  "&#9889; Perhaps as easy as one, 2.0,..."


NodeJS projects may use `npm` to install `iterator-cascade-callbacks` as a dependency...


```Bash
npm install iterator-cascade-callbacks
```


... or as a development dependency via `--save-dev` command-line flag...


```Bash
npm install --save-dev iterator-cascade-callbacks
```


... Check [NodeJS Examples][heading__nodejs_examples] for details on how to import this project within your own source code.


---


Web projects, such has those hosted on GitHub Pages, are encouraged to utilize Git Submodules instead...


**Bash Variables**


```Bash
_module_name='iterator-cascade-callbacks'
_module_https_url="https://github.com/javascript-utilities/iterator-cascade-callbacks.git"
_module_base_dir='assets/javascript/modules'
_module_path="${_module_base_dir}/${_module_name}"
```


**Bash Submodule Commands**


```Bash
cd "<your-git-project-path>"


git checkout gh-pages

mkdir -vp "${_module_base_dir}"


git submodule add -b main\
                  --name "${_module_name}"\
                  "${_module_https_url}"\
                  "${_module_path}"
```


---


### Your ReadMe File
[heading__your_readme_file]:
  #your-readme-file
  "&#x1F4DD; Suggested additions for your ReadMe.md file so everyone has a good time with submodules"


Suggested additions for your _`ReadMe.md`_ file so everyone has a good time with submodules


```MarkDown
Clone with the following to avoid incomplete downloads


    git clone --recurse-submodules <url-for-your-project>


Update/upgrade submodules via


    git submodule update --init --merge --recursive
```


---


### Commit and Push
[heading__commit_and_push]:
  #commit-and-push
  "&#x1F4BE; It may be just this easy..."


```Bash
git add .gitmodules
git add "${_module_path}"


## Add any changed files too


git commit -F- <<'EOF'
:heavy_plus_sign: Adds `javascript-utilities/iterator-cascade-callbacks#1` submodule



**Additions**


- `.gitmodules`, tracks submodules AKA Git within Git _fanciness_

- `README.md`, updates installation and updating guidance

- `_modules_/iterator-cascade-callbacks`, Iterator that chains callback function execution
EOF


git push origin gh-pages
```


**:tada: Excellent :tada:** your project is now ready to begin unitizing code from this repository!


______


## Usage
[heading__usage]:
  #usage
  "&#x1F9F0; Examples on how to utilize this repository"


> Examples on how to utilize this repository


---


### NodeJS Examples
[heading__nodejs_examples]: #nodejs-examples


```JavaScript
#!/usr/bin/env node


'use strict';


const {
  Callback_Object,
  Iterator_Cascade_Callbacks,
  Stop_Iteration,
  Pause_Iteration,
} = require('iterator-cascade-callbacks');


/**
 * Generator that produces Fibonacci sequence
 * @see {link} https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
 */
function* fibonacci() {
  let current = 0;
  let next = 1;
  while (true) {
    let reset = yield current;
    [current, next] = [next, next + current];
    if (reset) {
      current = 0;
      next = 1;
    }
  }
}


const icc = new Iterator_Cascade_Callbacks(fibonacci);

icc.filter((value) => {
  return value % 2 === 0;
}).skip(1).map((evens) => {
  return evens / 2;
}).take(5);


const collection = icc.collect([]);

console.log(collection);
//> [ 1, 4, 17, 72, 305 ]
```


The above filters even numbers from `fibonacci` Generator, skips the first even result, divides results by two, limits iteration to five results, and finally collects values to an array.


To achieve the same output but without [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks] class, code may be similar to...


```javascript
'use strict';


let match_count = 0;
let skip_count = 0;
let collection = [];

for (let value of fibonacci()) {
  if (!(value % 2 === 0)) {
    continue;
  }

  skip_count++;
  if (skip_count <= 1) {
    continue;
  }

  collection.push(value / 2);
  match_count++;
  if (match_count >= 5) {
    break;
  }
}

console.log(collection);
```


---


### Web Application Example
[heading__web_application_example]: #web-application-example


**`index.html`**


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Iterator Cascade Callbacks Example</title>
    <script src="/assets/javascript/modules/iterator-cascade-callbacks/iterator-cascade-callbacks.js" defer></script>
    <script src="/assets/javascript/index.js" defer></script>
  </head>
  <body>
    <code>
      const counter = new Counter(<span id="code__span__counter__start">0</span>);
      <br>
      const icc = new Iterator_Cascade_Callbacks(counter);
      <br>
      <br>

      const collection = icc.filter((value) =&gt; {
      <div style="text-indent: 2em;">
        return value % <span id="code__span__filter_modulo">2</span> === 0;
      </div>
      }).map((value) =&gt; {
      <div style="text-indent: 2em;">
        return value * <span id="code__span__map_multiplier">1</span>;
      </div>
      }).take(<span id="code__span__take_amount">2</span>).collect([]);
    </code>
    <br>
    <br>

    <div id="output-text__container">
      <label for="output-text__results">Results: </label>
      <input id="output-text__results" type="text" value="" readonly>
    </div>
    <br>

    <div id="input-text__container">
      <label for="input-text__counter__start">Counter Start: </label>
      <input id="input-text__counter__start" type="text" value="0">
      <br>

      <label for="input-text__filter_modulo">Filter Modulo: </label>
      <input id="input-text__filter_modulo" type="text" value="2">
      <br>

      <label for="input-text__map_multiplier">Map Multiplier: </label>
      <input id="input-text__map_multiplier" type="text" value="1">
      <br>

      <label for="input-text__take_amount">Take Amount: </label>
      <input id="input-text__take_amount" type="text" value="2">
    </div>

    <div id="button__container">
      <input id="button__iterate" type="button" value="Iterate">
    </div>
  </body>
</html>
```


**`assets/javascript/index.js`**


```javascript
'use strict';


class Counter {
  constructor(value = -1) {
    this.value = value;
    this.done = false;
  }

  next() {
    this.value++;
    return this;
  }

  [Symbol.iterator]() {
    return this;
  }
};


window.addEventListener('load', () => {
  const output_text__results = document.getElementById('output-text__results');

  const input_text__counter__start = document.getElementById('input-text__counter__start');
  const code__span__counter__start = document.getElementById('code__span__counter__start');

  const input_text__filter_modulo = document.getElementById('input-text__filter_modulo');
  const code__span__filter_modulo = document.getElementById('code__span__filter_modulo');

  const input_text__map_multiplier = document.getElementById('input-text__map_multiplier');
  const code__span__map_multiplier = document.getElementById('code__span__map_multiplier');

  const input_text__take_amount = document.getElementById('input-text__take_amount');
  const code__span__take_amount = document.getElementById('code__span__take_amount');

  const button__iterate = document.getElementById('button__iterate');
  button__iterate.addEventListener('click', () => {
    console.error('CLICKED!');
    /**
     * Parse inputs
     */
    let count_start = input_text__counter__start.value;
    if (isNaN(count_start)) {
      count_start = 0;
      input_text__counter__start = count_start;
    }
    code__span__counter__start.innerText = count_start;

    let filter_modulo = Number(input_text__filter_modulo.value);
    if (isNaN(filter_modulo)) {
      filter_modulo = 1;
      input_text__filter_modulo.value = filter_modulo;
    }
    code__span__filter_modulo.innerText = filter_modulo;

    let map_multiplier = Number(input_text__map_multiplier.value);
    if (isNaN(map_multiplier)) {
      map_multiplier = 1;
      input_text__map_multiplier.value = map_multiplier;
    }
    code__span__map_multiplier.innerText = map_multiplier;

    let take_amount = Number(input_text__take_amount.value);
    if (isNaN(take_amount)) {
      take_amount = 1;
      input_text__take_amount.value = take_amount;
    }
    code__span__take_amount.innerText = take_amount;

    const counter = new Counter(count_start);
    const icc = new Iterator_Cascade_Callbacks(counter);

    icc.filter((value) => {
      return value % filter_modulo === 0;
    }).map((value) => {
      return value * map_multiplier;
    }).take(take_amount);

    const collection = icc.collect([]);

    console.log('collection ->', collection);
    const results = `[ ${collection.join(', ')} ]`;
    output_text__results.value = results;
  });
});
```


______


## API
[heading__api]:
  #api
  "&#x1F523; Documentation for classes, methods, parameters, and custom types/data-structures"


> Documentation for classes, methods, parameters, and custom types/data-structures
>
> TypeScript source may be reviewed at [`ts/iterator-cascade-callbacks.ts`][file__ts__iterator_cascade_callbacks_ts].


---


### Class `Stop_Iteration`
[heading__class_stop_iteration]:
  #class-stop_iteration
  "Custom error type to permanently stop iteration prematurely"


Custom error type to permanently stop iteration prematurely


**Example**


```javascript
const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);

const collection = icc.map((value, index_or_key) => {
  if (index_or_key > 2) {
    throw new Stop_Iteration('map says to stop at indexes greater than 2');
  }
  return value;
}).collect([]);

console.log(collection);
//> [ 1, 2, 3 ]
```


#### Method `Stop_Iteration.constructor`
[heading__method_stop_iterationconstructor]:
  #method-stop_iterationconstructor
  "Builds new instance of `Stop_Iteration` for throwing"


Builds new instance of `Stop_Iteration` for throwing


**Parameters**


- **{string}** `message` - Error message to print


---


### Class `Pause_Iteration`
[heading__class_pause_iteration]:
  #class-pause_iteration
  "Custom error type to temporarily stop iteration prematurely"


Custom error type to temporarily stop iteration prematurely


#### Method `Pause_Iteration.constructor`
[heading__method_pause_iterationconstructor]:
  #method-pause_iterationconstructor
  "Builds new instance of `Pause_Iteration` for throwing"


**Parameters**


- **{string}** `message` - Error message to print


---


### Class `Callback_Object`
[heading__class_callback_object]:
  #class-callback_object
  "Classy object for storing wrapper function state between iterations"


Classy object for storing wrapper function state between iterations


#### Method `Callback_Object.constructor`
[heading__method_callback_objectconstructor]:
  #method-callback_objectconstructor
  "Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list"


Builds new instance of `Callback_Object` to append to `Iterator_Cascade_Callbacks.callbacks` list


**Parameters**


- [**{Callback_Wrapper}**][heading__type_callback_wrapper] `callback_wrapper` - Function wrapper that handles input/output between [`Callback_Function`][heading__type_callback_function] and [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]


#### Method `Callback_Object.call`
[heading__method_callback_objectcall]:
  #method-callback_objectcall
  "Calls `this.wrapper` function with reference to this `Callback_Object` and `Iterator_Cascade_Callbacks`"


Calls `this.wrapper` function with reference to this `Callback_Object` and [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]


**Parameters**


- [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks] `iterator_cascade_callbacks` - Reference to [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks] instance


---


### Class `Iterator_Cascade_Callbacks`
[heading__class_iterator_cascade_callbacks]:
  #class-iterator_cascade_callbacks
  "Iterator that chains callback function execution"


Iterator that chains callback function execution


**Properties**


- [**{Dictionary}**][heading__type_dictionary] `state` - Data shared between [`Callback_Wrapper`][heading__type_callback_wrapper] functions on each iteration

- [**{Dictionary}**][heading__type_dictionary] `storage` - Data shared between [`Callback_Function`][heading__type_callback_function] for each iteration


#### Method `Iterator_Cascade_Callbacks.constructor`
[heading__method_iterator_cascade_callbacksconstructor]:
  #method-iterator_cascade_callbacksconstructor
  "Instantiates new instance of `Iterator_Cascade_Callbacks` from `iterable` input&#10;&#10;new Iterator_Cascade_Callbacks(iterable: any) =&gt; Iterator_Cascade_Callbacks"


Instantiates new instance of [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks] from `iterable` input


**Parameters**


- **{any}** `iterable` - Currently may be an array, object, generator, or iterator type


#### Static Method `zip`
[heading__static_method_zip]:
  #static-method-zip
  "Returns new instance of `Iterator_Cascade_Callbacks` that yields lists of values from each iteration"


Returns new instance of [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks] that yields lists of values from each iteration


**Parameters**


- **{any[]}** `iterables` - List of Generators, Iterators, and/or instances of [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]


**Example** Equal Length Iterables


```javascript
const icc_one = new Iterator_Cascade_Callbacks([1, 2, 3]);
const icc_two = new Iterator_Cascade_Callbacks([4, 5, 6]);

const icc_zip = Iterator_Cascade_Callbacks.zip(icc_one, icc_two);

for (let values of icc_zip) {
  console.log('values ->', values);
}
//> values -> [ 1, 4 ]
//> values -> [ 2, 5 ]
//> values -> [ 3, 6 ]
```


#### Method `collect`
[heading__method_collect]:
  #method-collect
  "Collects results from `this` to either an Array or Object&#10;&#10;collect(&#10;  target: (any[] | Dictionary | any),&#10;  callback_or_amount?: (Collect_To_Function | number),&#10;  amount?: number&#10;) =&gt; (any[] | Dictionary | undefined))"


Collects results from `this` to either an Array or Object


**Parameters**


- **{any[] | Object | any}** `target` - When `target` is Array values are pushed, when `target` is Object key value pares are assigned, `callback` is required for other types

- [**{Collect_To_Function?|number?}**][heading__type_collect_to_function] `callback_or_amount` - Callback function for collecting to custom type, or amount to limit known collection object types to

- **{number?}** `amount` - Limit collection to no more than amount


Returns **{any[] | Dictionary | undefined}**


#### Method `collectToArray`
[heading__method_collecttoarray]:
  #method-collecttoarray
  "Collects results from `this.next()` to an Array&#10;&#10;collectToArray(target: any[], amount?: number) =&gt; any[]"


Collects results from `this.next()` to an Array


**Parameters**


- **{any[]}** `target` - Array to push collected values to

- **{number?}** `amount` - Limit collection to no more than amount


Returns **{any[]}**


**Example**


```javascript
const icc = new Iterator_Cascade_Callbacks([5, 6, 7, 8, 9]);

const collection = icc.filter((value) => {
  return value % 2 === 0;
}).collectToArray([1, 2, 3]);

console.log(collection);
//> [ 1, 2, 3, 6, 8 ]
```


#### Method `collectToFunction`
[heading__method_collecttofunction]:
  #method-collecttofunction
  "Collects results from `this.next()` to a callback function target&#10;&#10;collectToFunction(target: any, callback: Collect_To_Function, amount?: number) =&gt; any"


Collects results from `this.next()` to a callback function target


**Parameters**


- **{any}** `target` - Any object or primitive, will be passed to `callback` function along with `value` and `index_or_key`

- **{Function}** `callback` - Custom callback function for collecting iterated values

- **{number?}** `amount` - Limit collection to no more than amount


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });

const map = new Map();

const collection = icc.collectToFunction(map, (target, value, index_or_key) => {
  target.set(index_or_key, value);
});

console.log(collection);
//> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
```


#### Method `collectToObject`
[heading__method_collecttoobject]:
  #method-collecttoobject
  "Collects results from `this.next()` to an Object&#10;&#10;collectToObject(target: Dictionary, amount?: number) =&gt; Dictionary"


Collects results from `this.next()` to an Object



**Parameters**


- **{Object}** `target` - Dictionary like object to assign key value pares to

- **{number?}** `amount` - Limit collection to no more than amount


Returns dictionary-like object


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });

const collection = icc.collectToObject({});

console.log(collection);
//> { spam: 'flavored', canned: 'ham' }
```


#### Method `copyCallbacksOnto`
[heading__method_copycallbacksonto]:
  #method-copycallbacksonto
  "Returns new instance of `Iterator_Cascade_Callbacks` with copy of callbacks&#10;&#10;copyCallbacksOnto(iterable: any) =&gt; Iterator_Cascade_Callbacks"


Returns new instance of [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks] with copy of callbacks


**Parameters**


- **{any}** `iterable` - Any compatible iterable object, iterator, or generator


**Example**


```JavaScript
const iterable_one = [1, 2, 3, 4, 5];
const iterable_two = [9, 8, 7, 6, 5];

const icc_one = new Iterator_Cascade_Callbacks(iterable_one);

icc_one.filter((value) => {
  return value % 2 === 0;
}).map((evens) => {
  return evens / 2;
});

const icc_two = icc_one.copyCallbacksOnto(iterable_two);

console.log('Collection One ->', icc_one.collect([]));
//> [ 1, 2 ]
console.log('Collection Two ->', icc_two.collect([]));
//> [ 4, 3 ]
```


#### Method `entries`
[heading__method_entries]:
  #method-entries
  "Sets `this.value` to `Yielded_Entry` which contains `[this.yielded_data.index_or_key, this.yielded_data.content]`"


Sets `this.value` to `Yielded_Entry` which contains `[this.yielded_data.index_or_key, this.yielded_data.content]`

Returns `this` [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

const collection = icc.filter(([index, value]) => {
  return (value - index) % 3 === 0;
}).collect([]);

console.log(collection);
//> [ [ 0, 9 ], [ 3, 6 ] ]
```


#### Method `filter`
[heading__method_filter]:
  #method-filter
  "Sets `this.value` if callback function returns _truthy_, else consumes `this.iterator` and recomputes value for callback to test&#10;&#10;filter(callback: Callback_Function, ...parameters: any[]) =&gt; Iterator_Cascade_Callbacks"


Sets `this.value` if callback function returns _truthy_, else consumes `this.iterator` and recomputes value for callback to test


**Parameters**


- [**{Callback_Function}**][heading__type_callback_function] `callback` - Function that determines truth of `value` and/or `index_or_key` for each iteration

- **{...any[]}** `parameters` - List of arguments that are passed to callback on each iteration


Returns `this` [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

const collection = icc.filter((value) => {
  return value % 2 === 0;
}).collect([]);

console.log(collection);
//> [ 8, 6 ]
```


#### Method `forEach`
[heading__method_foreach]:
  #method-foreach
  "Executes callback for each iteration&#10;&#10;forEach(callback: Callback_Function, ...paramaters: any[]) =&gt; Iterator_Cascade_Callbacks"


Executes callback for each iteration


**Parameters**


- [**{Callback_Function}**][heading__type_callback_function] `callback` - Function that generally does not mutate `value` or `index_or_key` for [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks] instance

- **{...any[]}** `parameters` - List of arguments that are passed to callback on each iteration


Returns `this` [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

const collection = icc.forEach((value) => {
  console.log(value);
}).collect([]);

console.log(collection);
//> [ 9, 8, 7, 6, 5 ]
```


**Notes**


- If mutation of `value` or `index_or_key` are desired then `map` is a better option

- No protections are in place to prevent mutation of `value` or `index_or_key` Objects


#### Method `inspect`
[heading__method_inspect]:
  #method-inspect
  "Useful for debugging and inspecting iteration state&#10;&#10;inspect(callback: Callback_Function, ...paramaters: any[]) =&gt; Iterator_Cascade_Callbacks"


Useful for debugging and inspecting iteration state


**Parameters**


- [**{Callback_Function}**][heading__type_callback_function] `callback` - Function that logs something about each iteration

- **{...any[]}** `parameters` - List of arguments that are passed to callback on each iteration


**Example**


```JavaScript
function inspector(value, index_or_key, { callback_object, iterator_cascade_callbacks }, ...parameters) {
  console.log('value ->', value);
  console.log('index_or_key ->', index_or_key);
  console.log('callback_object ->', callback_object);
  console.log('iterator_cascade_callbacks ->', iterator_cascade_callbacks);
}

const icc = new Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

const collection = icc.filter((value) => {
  return value % 2 === 0;
}).inspect(inspector).map((even) => {
  return even / 2;
}).inspect(inspector).collect([]);
```


#### Method `limit`
[heading__method_limit]:
  #method-limit
  "Stops iteration when limit is reached&#10;&#10;limit(amount: number) =&gt; Iterator_Cascade_Callbacks"


Stops iteration when limit is reached


**Parameters**


- **{number}** `amount` - Max number of values to compute


Returns `this` [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);

const collection = icc.limit(2).collect([]);

console.log(collection);
//> [1, 2]
```


**Notes**


- Useful when iterating over data of indeterminate, or infinite, length

- More predictable if ordered at the end of `this.callbacks` list

- Callbacks exist when `amount` is reached will be called prior to throwing `Stop_Iteration`


#### Method `map`
[heading__method_map]:
  #method-map
  "Applies `callback` to modify `value` and/or `index_or_key` for each iteration&#10;&#10;map(callback: Callback_Function, ...parameters: any[]) =&gt; Iterator_Cascade_Callbacks"


Applies `callback` to modify `value` and/or `index_or_key` for each iteration


**Parameters**


- [**{Callback_Function}**][heading__type_callback_function] `callback` - Function may modify `value` and/or `index_or_key`

- **{...any[]}** `parameters` - List of arguments that are passed to callback on each iteration


Returns `this` [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([9, 8, 7, 6, 5]);

const collection = icc.filter((value) => {
  return value % 2 === 0;
}).map((value) => {
  return value / 2;
}).collect([]);

console.log(collection);
//> [4, 3]
```


**Notes**


- If callback does **not** return `Yielded_Tuple` (array), then results from callback are used as `value` and initial `index_or_key` is reused


#### Method `next`
[heading__method_next]:
  #method-next
  "Updates `this.value` from chaining `this.callbacks` list, and `this.done` from `this.iterator.next()`&#10;&#10;next() =&gt; Iterator_Cascade_Callbacks"


Updates `this.value` from chaining `this.callbacks` list, and `this.done` from `this.iterator.next()`


Returns `this` [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);

for (let [value, index_or_key] of icc) {
  console.log('index_or_key ->', index_or_key, 'value ->', value);
}
//> index_or_key -> 0 value -> 1
//> index_or_key -> 1 value -> 2
//> index_or_key -> 2 value -> 3
//> index_or_key -> 3 value -> 4
```


#### Method `skip`
[heading__method_skip]:
  #method-skip
  "Skip number of iterations&#10;&#10;skip(amount: number) =&gt; Iterator_Cascade_Callbacks"


Skip number of iterations


**Parameters**


- **{number}** amount - Number of iterations to skip past


Returns `this` [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);

const collection = icc.skip(2).collect([]);

console.log(collection);
//> [ 2, 3, 4, 5 ]
```


#### Method `step`
[heading__method_step]:
  #method-step
  "Step over every _n_ iterations&#10;&#10;step(amount: number) =&gt; Iterator_Cascade_Callbacks"


Step over every _n_ iterations


**Parameters**


- **{number}** `amount` - Number of iterations to step over


Returns `this` [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([0, 1, 2, 3, 4, 5]);

const collection = icc.step(1).collect([]);

console.log(collection);
//> [ 1, 3, 5 ]
```


#### Method `take`
[heading__method_take]:
  #method-take
  "Pauses/breaks iteration when limit is reached&#10;&#10;take(amount: number) =&gt; Iterator_Cascade_Callbacks"


Pauses/breaks iteration when limit is reached


**Parameters**


- **{number}** `amount` - Number of values to compute before pausing


Returns `this` [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks]


Throws [**{Pause_Iteration}**][heading__class_pause_iteration]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([1, 2, 3, 4]);

icc.take(2);

const collection_one = icc.collect([]);
console.log(collection_one);
//> [ 1, 2 ]

const collection_two = icc.collect([]);
console.log(collection_two);
//> [ 3, 4 ]
```


**Notes**


- If immediately collecting to an object, consider using `collect()` method instead


---


### Custom Interfaces
[heading__custom_interfaces]:
  #custom-interfaces
  "Descriptions of data structures and generic behaviour"


> Descriptions of data structures and generic behaviour


#### Interface `Callback_Object`
[heading__interface_callback_object]:
  #interface-callback_object
  "Classy object for storing wrapper function state between iterations&#10;&#10;{&#10;  wrapper: Callback_Wrapper,&#10;  storage: Dictionary&#10;}"


Classy object for storing wrapper function state between iterations


**Properties**


- [**{Callback_Wrapper}**][heading__type_callback_wrapper] `wrapper` - Wrapper for callback function that parses inputs and outputs

- [**{Dictionary}**][heading__type_dictionary] `storage` - Generic dictionary like object


---


### Custom Types
[heading__custom_types]:
  #custom-types
  "Documentation for custom type definitions"


> Documentation for custom type definitions


#### Type `Callback_Function`
[heading__type_callback_function]:
  #type-callback_function
  "Generic callback function for parsing and/or mutating iterator data&#10;&#10;(value: any, index_or_key: Index_Or_Key, references: Callback_Function_References, ...parameters: any[]) =&gt; any"


Generic callback function for parsing and/or mutating iterator data


**Parameters**


- **{any}** `value` - First half of `Yielded_Tuple` stored in `this.value` or `value` from `this.iterator.next()`

- [**{Index_Or_Key}**][heading__type_index_or_key] `index_or_key` - Either a `string` or `number` depending upon iterable type

- [**{Callback_Function_References}**][heading__type_callback_function_references] `references` - Dictionary with reference to _`this`_ [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks] and _`this`_ `Callback_Object`


#### Type `Callback_Function_References`
[heading__type_callback_function_references]:
  #type-callback_function_references
  "Object with references to `Iterator_Cascade_Callbacks` and `Callback_Object` instances&#10;&#10;{&#10;  iterator_cascade_callbacks: Iterator_Cascade_Callbacks,&#10;  callback_object: Callback_Object,&#10;}"


Object with references to [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks] and `Callback_Object` instances


**Properties**


- [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks] `iterator_cascade_callbacks` - Instance reference to `this` of [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]

- [**{Callback_Object}**][heading__interface_callback_object] `callback_object` - Instance reference to `this` of `Callback_Object`


#### Type `Callback_Wrapper`
[heading__type_callback_wrapper]:
  #type-callback_wrapper
  "Wrapper for callback function that parses inputs and outputs&#10;&#10;(callback_object: Callback_Object, iterator_cascade_callbacks: Iterator_Cascade_Callbacks) =&gt; void"


Wrapper for callback function that parses inputs and outputs


**Parameters**


- [**{Callback_Object}**][heading__interface_callback_object] `callback_object` - Instance reference to `this` of `Callback_Object`

- [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks] `iterator_cascade_callbacks` - Instance reference to `this` of [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]


#### Type `Collect_To_Function`
[heading__type_collect_to_function]:
  #type-collect_to_function
  "Callback function for custom collection algorithms&#10;&#10;(target: any, value: any, index_or_key: Index_Or_Key, iterator_cascade_callbacks: Iterator_Cascade_Callbacks) =&gt; any"


Callback function for custom collection algorithms


**Parameters**


- **{any}** `target` - An object that function will collect values to

- **{value}** `any` - Value portion of `Yielded_Tuple` from [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]

- **{number|string}** `index_or_key` - Index or Key portion of `Yielded_Tuple` from [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]

- [**{Iterator_Cascade_Callbacks}**][heading__class_iterator_cascade_callbacks] `iterator_cascade_callbacks` - Instance reference to `this` of [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks({ spam: 'flavored', canned: 'ham' });

const map = new Map();

const collection = icc.collectToFunction(map, (target, value) => {
  target.set(index_or_key, value);
});

console.log(collection);
//> Map(2) { 'spam' => 'flavored', 'canned' => 'ham' }
```


#### Type `Comparison_Results`
[heading__type_comparisonresults]:
  #type-comparisonresults
  "Return string value for comparisons&#10;&#10;'==' | '===' | '!=' | '!==' | '>=' | '>' | '<=', '<'"


Return string value for comparisons; `'=='`, `'==='`, `'!='`, `'!=='`, `'>='`, `'>'`, `'<='`, or `'<'`


**Notes**


- `==` values are equivalent after type coercion

- `===` values and types are equal

- `!=` values are not equivalent after type coercion

- `!==` values are not equal but types are equivalent

- `>=` left is greater than right and types are equal

- `>` left is greater than right after type coercion

- `<=` left is less than right but types are equivalent

- `<` left is less than right after type coercion


#### Type `Dictionary`
[heading__type_dictionary]:
  #type-dictionary
  "Generic dictionary like object&#10;&#10;{ [key: string]: any }"


Generic dictionary like object


**Example**


```JavaScript
const data: Dictionary = { key: 'value' };
```


#### Type `Generator_Function_Instance`
[heading__type_generator_function_instance]:
  #type-generator_function_instance
  "Generator function that has not been initialized&#10;&#10;(...args: any[]) =&gt; Generator&lt;unknown, any, unknown&gt;"


Generator function that has not been initialized


**Example** As Function Parameter


```JavaScript
function* gen() { for (let i = 0; i < 10; i++;) { yield i; } }

function collect(generator: Generator_Function_Instance): any[] {
  let collection = [];
  const iterable = generator();
  for (const value of iterable) {
    collection.push(value);
  }
  return collection;
}
```


#### Type `Index_Or_Key`
[heading__type_index_or_key]:
  #type-index_or_key
  "Array `index` or Object `key` or Generator `count`&#10;&#10;number | string"


Array `index` or Object `key` or Generator `count`


**Example**


```JavaScript
const key: Index_Or_Key = 'key';
const index: Index_Or_Key = 42;
```


#### Type `Yielded_Tuple`
[heading__type_yielded_tuple]:
  #type-yielded_tuple
  "Array with `value` and `index_or_key` entries&#10;&#10;[ any, Index_Or_Key ]"


Array with `value` and `index_or_key` entries


**Example**


```JavaScript
const result: Yielded_Tuple = ['spam', 3];
```


#### Type `Yielded_Result`
[heading__type_yielded_result]:
  #type-yielded_result
  "Results from Generator/Iterator function/class&#10;&#10;{ done: boolean, value?: Yielded_Tuple }"


Results from Generator/Iterator function/class


**Properties**


- **{boolean}** `done`

- [**{any|Yielded_Tuple}**][heading__type_yielded_tuple] `value`


**Example**


```JavaScript
const icc = new Iterator_Cascade_Callbacks([1, 2, 3]);

let results = icc.next();
while (!results.done) {
  const { value, done } = results;
  console.log('value ->', value, '| done ->', done);

  const [ data, index_or_key ] = value;
  console.log('data ->', data, '| index_or_key ->', index_or_key)

  results = icc.next();
}
```


______


## Notes
[heading__notes]:
  #notes
  "&#x1F5D2; Additional things to keep in mind when developing"


This repository may not be feature complete and/or fully functional, Pull Requests that add features or fix bugs are certainly welcomed.


Experimental features of TypeScript are utilized by this project, namely `experimentalDecorators`, which enable type hints for static methods and properties. If errors are experienced during build/transpiling please check that the version of TypeScript matches the version defined within the [`package-lock.json`][file__package_lock_json] file.


______


## To Dos
[heading__to_dos]:
  #to-dos
  "&#x2714; List of unimplemented features and/or undefined behaviour that may be corrected in future versions"


> List of unimplemented features and/or undefined behaviour that may be corrected in future versions


Sub-headings within this section will experience much _churn_; completed items will remain for one minor version after which items, or sections, will be removed from this document. Contributors are encouraged to target incomplete items via Pull Request for merging, or new Git Tag for publishing.


---


### Version `0.0.6`
[heading__version_006]:
  #version-006


**`@types/iterator-cascade-callbacks/iterator-cascade-callbacks.d.ts`**


- [X] [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks] - Define `static` method types in a way that TypeScript understands and produce errors **only** if used improperly

> Achieved via experimental TypeScript decorator features


**`ts/iterator-cascade-callbacks.ts`**


- [ ] Remove `/* istanbul ignore next */` comments from source code; currently there are three (`3`) places that JestJS tests ignores

- [ ] Add _`Skip_Iteration`_, or similar, `Error` type and refactor `skip`, and `step`, methods to throw such error type

- [X] `zipCompareValues` - Fix `any` usage to utilize the correct type hint of [`Iterator_Cascade_Callbacks`][heading__class_iterator_cascade_callbacks]

> **Fixed** by changing _`any`_ to _`Iterator_Cascade_Callbacks`_, after enabling experimental TypeScript decorator features, and adjusting _`interface`s_


**`tsconfig.json`**


- [ ] Change `removeComments` to `true` once `/* istanbul ignore next */` commits are removed from source

- [X] Enable _stricter_ transpiling options

> Added `strictBindCallApply`, `strictFunctionTypes`, and `strictPropertyInitialization` configurations


---


### Version `0.0.5`
[heading__version_005]:
  #version-005


**`ts/__tests__/tests-iterator-cascade-callbacks.ts`**


- [X] `testsInspect` - Sort out why JestJS does not recognize tests as covering lines within `inspect_wrapper` function.

> _**Fixed**_ by testing `...paramaters` within an `inspect` callback function


______


## Contributing
[heading__contributing]:
  #contributing
  "&#x1F4C8; Options for contributing to iterator-cascade-callbacks and javascript-utilities"


Options for contributing to iterator-cascade-callbacks and javascript-utilities


---


### Forking
[heading__forking]:
  #forking
  "&#x1F531; Tips for forking iterator-cascade-callbacks"


Start making a [Fork][iterator_cascade_callbacks__fork_it] of this repository to an account that you have write permissions for.


- Add remote for fork URL. The URL syntax is _`git@github.com:<NAME>/<REPO>.git`_...


```Bash
cd ~/git/hub/javascript-utilities/iterator-cascade-callbacks

git remote add fork git@github.com:<NAME>/iterator-cascade-callbacks.git
```


- Commit your changes and push to your fork, eg. to fix an issue...


```Bash
cd ~/git/hub/javascript-utilities/iterator-cascade-callbacks


git commit -F- <<'EOF'
:bug: Fixes #42 Issue


**Edits**


- `<SCRIPT-NAME>` script, fixes some bug reported in issue
EOF


git push fork main
```


> Note, the `-u` option may be used to set `fork` as the default remote, eg. _`git push -u fork main`_ however, this will also default the `fork` remote for pulling from too! Meaning that pulling updates from `origin` must be done explicitly, eg. _`git pull origin main`_


- Then on GitHub submit a Pull Request through the Web-UI, the URL syntax is _`https://github.com/<NAME>/<REPO>/pull/new/<BRANCH>`_


> Note; to decrease the chances of your Pull Request needing modifications before being accepted, please check the [dot-github](https://github.com/javascript-utilities/.github) repository for detailed contributing guidelines.


---


### Sponsor
  [heading__sponsor]:
  #sponsor
  "&#x1F4B1; Methods for financially supporting javascript-utilities that maintains iterator-cascade-callbacks"


Thanks for even considering it!


Via Liberapay you may <sub>[![sponsor__shields_io__liberapay]][sponsor__link__liberapay]</sub> on a repeating basis.


Regardless of if you're able to financially support projects such as iterator-cascade-callbacks that javascript-utilities maintains, please consider sharing projects that are useful with others, because one of the goals of maintaining Open Source repositories is to provide value to the community.


______


## Attribution
[heading__attribution]:
  #attribution
  "&#x1F4C7; Resources that where helpful in building this project so far."


- [GitHub -- `github-utilities/make-readme`](https://github.com/github-utilities/make-readme)

- [Dev IO -- Iterators in Typescript](https://dev.to/gsarciotto/iterators-in-typescript-1d78)

- [GitHub -- `Microsoft/TypeScript` -- Issue `3841` -- T.constructor should be of type T](https://github.com/Microsoft/TypeScript/issues/3841)

- [geekAbyte -- Typeing Iterables and Iterators with TypeScript](https://www.geekabyte.io/2019/06/typing-iterables-and-iterators-with.html)

- [Medium -- How to chain functions in JavaScript](https://medium.com/@jamischarles/how-to-chain-functions-in-javascript-6644d44793fd)

- [Mozilla Developer Network -- Iterators and Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

- [StackOverflow -- check if function is a generator](https://stackoverflow.com/questions/16754956/)

- [StackOverflow -- Checking whether something is iterable](https://stackoverflow.com/questions/18884249/)

- [StackOverflow -- Interfaces with construct signatures not type checking](https://stackoverflow.com/questions/12952248/)

- [StackOverflow -- How can I add new line/linebreak character in title attribute in HTML](https://stackoverflow.com/questions/18606877/)


______


## License
[heading__license]:
  #license
  "&#x2696; Legal side of Open Source"


```
Iterator that chains callback function execution
Copyright (C) 2021 S0AndS0

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```


For further details review full length version of [AGPL-3.0][branch__current__license] License.



[branch__current__license]:
  /LICENSE
  "&#x2696; Full length version of AGPL-3.0 License"


[badge__commits__iterator_cascade_callbacks__main]:
  https://img.shields.io/github/last-commit/javascript-utilities/iterator-cascade-callbacks/main.svg

[commits__iterator_cascade_callbacks__main]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/commits/main
  "&#x1F4DD; History of changes on this branch"


[iterator_cascade_callbacks__community]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/community
  "&#x1F331; Dedicated to functioning code"


[issues__iterator_cascade_callbacks]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/issues
  "&#x2622; Search for and _bump_ existing issues or open new issues for project maintainer to address."

[iterator_cascade_callbacks__fork_it]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/
  "&#x1F531; Fork it!"

[pull_requests__iterator_cascade_callbacks]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/pulls
  "&#x1F3D7; Pull Request friendly, though please check the Community guidelines"

[iterator_cascade_callbacks__main__source_code]:
  https://github.com/javascript-utilities/iterator-cascade-callbacks/
  "&#x2328; Project source!"

[badge__issues__iterator_cascade_callbacks]:
  https://img.shields.io/github/issues/javascript-utilities/iterator-cascade-callbacks.svg

[badge__pull_requests__iterator_cascade_callbacks]:
  https://img.shields.io/github/issues-pr/javascript-utilities/iterator-cascade-callbacks.svg

[badge__main__iterator_cascade_callbacks__source_code]:
  https://img.shields.io/github/repo-size/javascript-utilities/iterator-cascade-callbacks


[sponsor__shields_io__liberapay]:
  https://img.shields.io/static/v1?logo=liberapay&label=Sponsor&message=javascript-utilities

[sponsor__link__liberapay]:
  https://liberapay.com/javascript-utilities
  "&#x1F4B1; Sponsor developments and projects that javascript-utilities maintains via Liberapay"


[badge_travis_ci]:
  https://travis-ci.com/javascript-utilities/iterator-cascade-callbacks.svg?branch=main

[build_travis_ci]:
  https://travis-ci.com/javascript-utilities/iterator-cascade-callbacks


[file__ts__iterator_cascade_callbacks_ts]:
  ts/iterator-cascade-callbacks.ts
  "TypeScript source code of this repository that is intended to be used by other projects"

[file__package_lock_json]:
  /package-lock.json
  "Targets specific versions of dependencies"

