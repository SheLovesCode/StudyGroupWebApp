# CSS Coding Style Guide
* Reference: https://docs.ckan.org/en/ckan-2.7.3/contributing/css.html

# Formatting
* All CSS documents must use two spaces for indentation and files should have no trailing whitespace. Other formatting rules:

* Use soft-tabs with a two space indent.
* Use double quotes.
* Use shorthand notation where possible.
* Put spaces after : in property declarations.
* Put spaces before { in rule declarations.
* Use hex color codes #000 unless using rgba().
* Always provide fallback properties for older browsers.
* Use one line per property declaration.
* Always follow a rule with one line of whitespace.
* Always quote url() and @import() contents.
* Do not indent blocks.
For example:
```js
.media {
  overflow: hidden;
  color: #fff;
  background-color: #000; /* Fallback value */
  background-image: linear-gradient(black, grey);
}

.media .img {
  float: left;
  border: 1px solid #ccc;
}

.media .img img {
  display: block;
}

.media .content {
  background: #fff url("../images/media-background.png") no-repeat;
}
```
# Naming
* All ids, classes and attributes must be lowercase with hyphens used for separation.
```js
/* GOOD */
.dataset-list {}

/* BAD */
.datasetlist {}
.datasetList {}
.dataset_list {}
```
# Comments
* Comments should be used liberally to explain anything that may be unclear at first glance, especially IE workarounds or hacks.
```js
.prose p {
  font-size: 1.1666em /* 14px / 12px */;
}

.ie7 .search-form {
  /*
    Force the item to have layout in IE7 by setting display to block.
    See: http://reference.sitepoint.com/css/haslayout
  */
  display: inline-block;
}
```
# Modularity and specificity
* Try keep all selectors loosely grouped into modules where possible and avoid having too many selectors in one declaration to make them easy to override.
```js
/* Avoid */
ul#dataset-list {}
ul#dataset-list li {}
ul#dataset-list li p a.download {}
Instead here we would create a dataset “module” and styling the item outside of the container allows you to use it on it’s own e.g. on a dataset page:

.dataset-list {}
.dataset-list-item {}
.dataset-list-item .download {}
```
* Instead here we would create a dataset “module” and styling the item outside of the container allows you to use it on it’s own e.g. on a dataset page:
```js
.dataset-list {}
.dataset-list-item {}
.dataset-list-item .download {}
```