biojs-sniper
-------------

```
                                       ____    _     __     _    ____
                                     |####`--|#|---|##|---|#|--'##|#|
   _                                 |____,--|#|---|##|---|#|--.__|_|
 _|#)_____________________________________,--'EEEEEEEEEEEEEE'_=-.
((_____((_________________________,--------[JW](___(____(____(_==)        _________
                               .--|##,----o  o  o  o  o  o  o__|/`---,-,-'=========`=+==.
                               |##|_Y__,__.-._,__,  __,-.___/ J \ .----.#############|##|
                               |##|              `-.|#|##|#|`===l##\   _\############|##|
                              =======-===l          |_|__|_|     \##`-"__,=======.###|##|
                                                                  \__,"          '======'

 ```


```
npm install -g biojs-sniper
```

CLI Server for Snippets.

How to use
----------

### 1. specify all global dependencies in your `package.json`

```
  "sniper": {
    "js": ["/build/msa.js"],
    "css": ["/css/msa.css"],
    "snippets": ["snippets"],
    "first": "msa_show_menu"
  }

```

`js`: (array) all js dependencies
`css`: all css files you need
`snippets`: all snippet folders
`first`: the snippet to be displayed as first example on the BioJS registry
`buildCSS`: (optional array) alternative CSS file to be used for the BioJS registry if you compile your SASS/LESS.


### 2. Create snippets

Create `js` files in the `snippets` folder.

```
var msa = new biojs.vis.msa.msa(yourDiv);
```

You can safely assume that `yourDiv` is your main div. Use `yourDiv.id` if your component expects an id.
If you dislike the wrapping, create your own `<same-filename>.html` file.

### 3. Run the server

```
biojs-sniper <your-dir>
```

If <your-dir> is `.`, you don't need to have this argument.

Now you can open `localhost:9090`.

There are there modes:

1) Overview mode/list

> [localhost:9090/snippets](http://localhost:9090/snippets)

2) List all

> [localhost:9090/snippets/all](http://localhost:9090/snippets/all)

3) List one/detail view

> [localhost:9090/snippets/your_snippet](http://localhost:9090/snippets/your_snippet])

The files are refreshed on every reload.

### 4. If you need to add extra js-Files (or css) for a snippet

... just create the ```same_filename.json`.

```
{js: ["/node_modules/biojs-model/biojs.model.min.js"]}
```

FAQ?
-----

#### How can I request relative data?

If you want to download data via XHR you might normally write `data/data.json` - make it __relative__ by appending `./`.
So you would have `./data/data.json`

#### How can I transmit my events to the registry

add this line somewhere after you created your application instance in the snippet.
E.g. if you make an XHR request it has to be in the callback.

```
//instance=<variable name of your component>
```

(this is - under the hood - replaced with `instance.onAll` and then sends messages to the parent frame).


How does it work?
----------

* normal file server
* if you go into one of the special snippet folders, the general config specifies which js and css needs to be there for every snippet.
* a snippet can either work with `yourDiv` (a predefined variable pointing to a div container) or define a custom, minimal `.html`
* also every snippet can define custom settings, like extra js 

An example can be found at [biojs-vis-msa](https://github.com/greenify/biojs-vis-msa/tree/master/snippets).

Why snippets?
---------------------------

Reason: visually appealing example files in the [registry](http://registry.biojs.net/client/#/detail/biojs-vis-msa) (inspired by [Angular JS](https://docs.angularjs.org/api/ng/directive/ngClick) )
