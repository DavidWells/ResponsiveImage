# ResponsiveImage

Cross-browser responsive image implementation for React.

Add one large image to your build and ResponsiveImage will create a send the
most optimized image to the browser. This means pages load and render very fast
with less network usage.

Responsive Image uses the srcset to allow the browser to know about all the
size variations and to download the best image for the screen size,
pixel density and network speed. Webpack and the resize-image-loader will create
alternate sizes at build time.

Responsive Image will optionally create a micro placeholder image as well. This
image is an inline, embedded datauri that will be blured with an SVG filter.
Once the full resolution image is downloaded it will animate between the
placeholder image and the full image.

## Import

Both webpack and resize-image-loader are required. No changes to your
webpack.config.js file is needed.

```
npm install webpack resize-image-loader --save
```

## Usage

```
let ResponsiveImage = require('ResponsiveImage');

render(){
  // creates alternate sizes at 400px * 900px wide as well as a micro placeholder
  return (<ResponsiveImage
		src={require('images/hero-img.jpg')}
		srcSet={require('resize-image?size[]=400w,sizes[]=900w!images/hero-img.jpg')}
		placeholder={require('resize-image?placeholder!images/hero-img.jpg')} />);
}
```


## Working with the ReactComponents project

The goals of this project is to have high quality, composable
components. Each component in this library has as few
cross dependancies as possible. To that end, it's recommended
this you fork each repo and iterate on them when a bug arrises or
you need extra functionality. 
