NPM module that allows you to get __multiple__ jQuery instances that are "detached" from the global namespace (`window`)
i.e. different versions of jQuery and/or multiple instances of the same version. 

__TODO Rename package to "jquery-detached" once we figure out of this is going to work. Do a global s&r__

Install Package:

```
npm install --save detached-jquery-<jquery-version>
```

Of course, the above will depend on whether or not we have published that exact version of jquery. Ping us if we haven't.

# Motivation

Having run into issues using a single shared jQuery instance across multiple libraries/apps running a browser, each
requiring different versions of jQuery, or unwittingly polluting the shared jQuery instance with extensions that 
conflict with each other.

# Getting a shared jQuery instance

Creating multiple instances of jQuery should be avoided if possible, but only when that shared instance is not being
polluted. When running in an environments where it is known to be safe to use a shared jQuery instance e.g. a closed 
environment, where everything is controlled (extensions etc), or in an environment where this shared instance is not 
modified through extension. 


```
var jQuery = require('detached-jquery-<jquery-version>');
var $ = jQuery.getJQuery();

var myDivs = $('.myDivs');

// etc...
```

# Getting a "new" jQuery instance

This is intended for use only with libraries that extend jQuery (e.g. Twitter Bootstrap, jQuery UI), 
allowing them to get a clean jQuery instance to extend. This should then allow these libraries to
work in isolation from each other in environments where multiple libraries and frameworks need to be
able to co-exist e.g. in the Jenkins CI ecosystem, where there are 1000+ plugins, any of which may
be using a variety of different JavaScript libraries that depend on jQuery (and different versions
of jQuery).

```
var jQuery = require('detached-jquery-<jquery-version>');
var $ = jQuery.newJQuery();

//
// Probably need to perform a "noConflict" equivalent operation, backing up the existing jQuery
// globals if any and installing this version (window.$ and window.jQuery). Then "statically" initialise your 
// library here, allowing it to glom onto your jQuery instance. Then restore the global namespace to its
// original state.
// 
```

