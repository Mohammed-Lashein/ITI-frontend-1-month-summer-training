# Personal Blog design

### Font size twice that of the parent element
How can we achieve the requirement in the previous heading?  
```css
.intro::first-letter {
    font-size: 200%;
}
```
If we refer to [mdn docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#formal_definition), we will find this quote: 
> percentage: refers to the parent element's font size