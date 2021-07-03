# HTML Coding Style Guide
* Reference: https://codeguide.co/

## Introduction

Below are the HTML coding style guidelines used throughout the project.

---


## Syntax
* Don't capitalize tags, including the doctype.
* Nested elements should be indented once (two spaces).
* Always use double quotes, never single quotes, on attributes.

```js
<!doctype html>
<html>
  <head>
    <title>Page title</title>
  </head>
  <body>
    <img src="images/company-logo.png" alt="Company">
    <h1 class="hello-world">Hello, world!</h1>
  </body>
</html>
```

## HTML5 doctype
* Enforce standards mode and more consistent rendering in every browser possible with this simple doctype at the beginning of every HTML page.

```js
<!doctype html>
<html>
  <head>
  </head>
</html>
```

## Language attribute
* Specify Language attribute

```js
<html lang="en">
  <!-- ... -->
</html>
```

### Practicality over purity
* Keep the implementation practical with only necessary implementation, avoiding extra unnecessary ones.

## Attribute order

```js
* HTML attributes should come in this particular order for easier reading of code.
 <a class="..." id="..." data-toggle="modal" href="#">
  Example link
</a>

<input class="form-control" type="text">

<img src="..." alt="..."> 
```

## Boolean attributes
* Don't add a value.

```js
<input type="text" disabled>

<input type="checkbox" value="1" checked>

<select>
  <option value="1" selected>1</option>
</select>
```
## Reducing markup
* Avoid superfluous parent elements when writing HTML. 

```js
<!-- Not so great -->
<span class="avatar">
  <img src="...">
</span>

<!-- Better -->
<img class="avatar" src="...">
```

## Character encoding
* Quickly and easily ensure proper rendering of your content by declaring an explicit character encoding. 

```js
<head>
  <meta charset="utf-8">
</head>
```