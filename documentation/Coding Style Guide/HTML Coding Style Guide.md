# HTML Coding Style Guide
* Reference: https://codeguide.co/
* Reference: https://www.informit.com/articles/article.aspx?p=24011&seqNum=3
---
## Introduction

Below are the HTML coding style guidelines used throughout the project.

---

## HTML coding style guidelines
*Use well-formed HTML
*Pick good names and ID values
*Indent consistently
*Limit line length
*Standardize character case
*Use comments judiciously


## Syntax
* Don't capitalize tags, including the doctype.
* Nested elements should be indented once (two spaces).
* Always use double quotes, never single quotes, on attributes.

```html
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

```html
<!doctype html>
<html>
  <head>
  </head>
</html>
```

## Language attribute
* Specify Language attribute

```html
<html lang="en">
  <!-- ... -->
</html>
```

## Attribute order
* HTML attributes should come in this particular order for easier reading of code.

```html
<a class="..." id="..." data-toggle="modal" href="#">
  Example link
</a>

<input class="form-control" type="text">

<img src="..." alt="..."> 
```

## Boolean attributes
* Don't add a value.

```html
<input type="text" disabled>

<input type="checkbox" value="1" checked>

<select>
  <option value="1" selected>1</option>
</select>
```
## Reducing markup
* Avoid superfluous parent elements when writing HTML. 

```html
<!-- Not so great -->
<span class="avatar">
  <img src="...">
</span>

<!-- Better -->
<img class="avatar" src="...">
```

## Character encoding
* Quickly and easily ensure proper rendering of your content by declaring an explicit character encoding. 

```html
<head>
  <meta charset="utf-8">
</head>
```

## Use good name and id values
Naming conventions used should be descriptive, short and reasonable.
```html
 <b>Member? </b><input type="Checkbox" name="cbIsMember"><br>
 <b>Admin? </b><input type="Checkbox" name="cbIsAdministrator"><br>
 <b>Owner? </b><input type="Checkbox" name="cbIsOwner"><br>
```

## Indent code with consistency
This must be done to enhance code readibility. (Suggested to also use space when identing)

```html

<table width="80%">
 <tr>
  <td>
   <form name="frmLogin"
      action="login.asp">
    <b>Login: </b><input name="txtLogin"
               type="text"
               size="25"><br>
    <b>Password:</b><input name="txtPwd"
                type="password"
                size="25">
    <input type="Submit" value="Login">
   </form>
  </td>
 </tr>
 <tr>
  <td align="center" valign="top">
   <p>To log into the system, enter your user 
     name and password in the text boxes. Then 
     click the "Login" button.
   </p>
  </td>
 </tr>
</table>
```

## Use comments when necessary
Do not comment every single line or tag. Comment the sections in order to provide a better undersanding
of the action occurring.

```html
<!-- Form for input of security groups -->
<form name="frmSecurityGroups"
   action="https://http://www.mydomain.com/input.asp">
 <b>Member? </b><input type="Checkbox" name="cbIsMember"><br>
 <b>Admin? </b><input type="Checkbox" name="cbIsAdministrator"><br>
 <b>Owner? </b><input type="Checkbox" name="cbIsOwner"><br>
</form>

```