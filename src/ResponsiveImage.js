'use strict';

let assign = require('object-assign');

module.exports = React.createClass({
  displayName: "ResponsiveImage",

  propsTypes: {
    src: React.PropTypes.string.isRequired,
    srcset: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object]).isRequired,
    placeholder: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      src: null,
      srcset: null,
      placeholder: null,
    };
  },

	getInitialState: function(){
    return {loaded:false};
  },

	render:function() {

    var isObject = typeof this.props.srcset === "object",
      srcset = isObject ? this.props.srcset.srcset : this.props.srcset,
      placeholder = isObject ? this.props.srcset.placeholder : this.props.placeholder;

    var coverStyle = {
      top: '0',
      left: '0',
      width: '100%'};

    var temp = {className:'placeholder',
      src:placeholder,
      style:assign({}, {
        opacity:(this.state.loaded ? 0 : 1),
        transition: 'opacity 10ms 3100ms'},
        (this.props.cover ? {width: '100%'} : null))};

    var img = assign({}, this.props, {
      srcSet:srcset,
      style:assign({}, {
        opacity:(this.state.loaded ? 1 : 0),
        transition: 'opacity 3000ms',
        position:'absolute'},
        (this.props.cover ? coverStyle : null)),
      onLoad:function(){
        this.setState({loaded:true});
      }.bind(this)});
    delete img.placeholder;

    var style = assign({}, this.props.style);
    style.height = style.height || '100%';

    return React.createElement('div', {style:style},
      React.createElement('div', {style:{position: 'relative', width:'100vw', minWidth:'100%', minHeight:'100%'}},
        React.createElement('img', temp),
        React.createElement('img', img)));
  },
});
