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

### 1. create a `sniper.toml` in your main folder

```
js = [ "node_modules/jquery/dist/jquery.min.js", "https://drone.io/github.com/greenify/biojs-vis-msa/files/build/biojs_vis_msa.js" ]
css = ["/css/msa.css"]
```

specify all global dependencies like jQuery or your component.

### 2. Create snippets

Create `js` files in the `snippets` folder.

```
var msa = new biojs.vis.msa.msa(yourDiv);
```

You can safely assume that `yourDiv` is your main div.
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

... just create the ```same_filename.toml`.

```
js = ["/node_modules/biojs-model/biojs.model.min.js"]
```

How does it work?
----------

* normal file server
* if you go into one of the special snippet folders, the general `sniper.toml` specifies which js and css needs to be there for every snippet.
* a snippet can either work with `yourDiv` (a predefined variable pointing to a div container) or define a custom, minimal `.html`
* also every snippet can define custom settings, like extra js 

An example can be found at [biojs-vis-msa](https://github.com/greenify/biojs-vis-msa/tree/master/snippets).


Specification and more info
---------------------------

See the [biojs2 wiki](https://github.com/biojs/biojs2/wiki/Snippets).
