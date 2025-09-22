# Personal portfolio markup

### Repeat the `h2` or use styled `p` tags?
If you notice the design, you will find that each section has a header.

I was skeptic about repeating the `h2` tags, so I thought I may use `p` tags then style them to have the shape of a header.  

I asked claude and he told me that the better way is to: 
```html
<section>
  <h2> </h2>
</section>
```
This markup makes sense because a `p` isn't supposed to be a heading, while at the sime time it is semantically meaningful.  

What about using `h3`, `h4`, ...etc but style them as an `h2`?  

Since most of the headings in this page have consistent format and importance (a heading for each section), semantically using different heading types is not good.  

I may search about the accessiblity and the effect on SEO of such approaches.