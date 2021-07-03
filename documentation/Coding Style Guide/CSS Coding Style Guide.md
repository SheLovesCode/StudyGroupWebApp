# CSS Coding Style Guide
* Reference: https://docs.ckan.org/en/ckan-2.7.3/contributing/css.html

---

## Introduction

Below are the CSS coding style guidelines/standards used throughout the project.

---

## Formatting

The standard `.css` files must have the following formating conventions:
* `Two spaces` for identation
* No trailing whitespace
* Use shorthand notation where possible
* Put spaces before `:` in property declaration.
* Put spaces before `{` in rule declarations.
* Use hex color codes #000 unless using rgba().
* Use one line per property declaration.
* Always quote url() and @import() contents.
* Do not indent blocks.

For example:

```css
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

## Naming conventions

Lowercase ids, classes, and attributes are required, with hyphens used to separate them.

For example:

```css
/* GOOD */
.dataset-list {}

/* BAD */
.datasetlist {}
.datasetList {}
.dataset_list {}
```

## Comments

Comments should be liberally utilized to explain anything that is unclear at first glance, notably workarounds or hacks for Internet Explorer.

```css
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