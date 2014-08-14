biojs-sniper
-------------

                          .-----------------TTTT_-----_______
                        /''''''''''(______O] ----------____  \______/]_
     __...---'"""\_ --''   Q                               ___________@
 |'''                   ._   _______________=---------"""""""
 |                ..--''|   l L |_l   |
 |          ..--''      .  /-___j '   '
 |    ..--''           /  ,       '   '
 |--''                /           `    \
                      L__'         \    -
                                    -    '-.
                                     '.    /

```
npm install biojs-sniper
```

CLI Server for Snippets.

How to use
----------

### 1. create a `sniper.toml` in your main folder

```
snippetJS = [ "node_modules/jquery/dist/jquery.min.js", "https://drone.io/github.com/greenify/biojs-vis-msa/files/build/biojs_vis_msa.js" ]
snippetCSS = ["/css/msa.css"]
```

specify all global dependencies like jQuery or your component.

### 2. Create snippets

Create `js` files in the `snippets` folder.

```
var msa = new biojs.vis.msa.msa(yourDiv);
```

You can safely assume that `yourDiv` is your main div.
If you dislike the wrapping, create your own `<same-filename>.html` file.

### 3. If you need to add extra js-Files for a snippet

... just create the ```same_filename.toml`.

```
js = ["/node_modules/biojs-model/biojs.model.min.js"]
```

Specification and more info
---------------------------

See the [biojs2 wiki](https://github.com/biojs/biojs2/wiki/Snippets).
