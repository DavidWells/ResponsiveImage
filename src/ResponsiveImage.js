'use strict';

let assign = require('object-assign');

module.exports = React.createClass({
  displayName: "ResponsiveImage",

  propsTypes: {
    src: React.PropTypes.string.isRequired,
    srcSet: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object]).isRequired,
    placeholder: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      src: null,
      srcSet: null,
      placeholder: null,
    };
  },

	getInitialState: function(){
    return {loaded:false};
  },

  render:function() {

    var isObject = this.props.srcSet.hasOwnProperty("srcSet"),
      srcSet = isObject ? this.props.srcSet.srcSet : this.props.srcSet,
      placeholder = isObject ? this.props.srcSet.placeholder : this.props.placeholder;

    if (!placeholder) {
      return this.renderNoPlaceholder(srcSet);
    }

    return this.renderCover(srcSet, placeholder);
  },

	renderNoPlaceholder:function(srcSet) {

    var img = assign({}, this.props, {
      srcSet:srcSet,
      style:assign({}, this.props.style || {}),
      onLoad:function(){
        this.setState({loaded:true});
      }.bind(this)});
    delete img.srcSet;

    return React.createElement('img', img);
  },

  renderCover:function(srcSet, placeholder) {

    var coverStyle = {
      top: '0',
      left: '0',
      width: '100%'};
    var coverWrapperStyle = {
      position: 'relative',
      width:'100vw',
      minWidth:'100%',
      minHeight:'100%'
    };

    var temp = {className:'placeholder',
      src:placeholder,
      style:assign({}, {
        opacity:(this.state.loaded ? 0 : 1),
        transition: 'opacity 10ms 3100ms'},
        (this.props.cover ? {width: '100%'} : null))};

    var img = assign({}, this.props, {
      srcSet:srcSet,
      style:assign({}, {
        opacity:(!placeholder || this.state.loaded ? 1 : 0),
        transition: (!placeholder ? '' : 'opacity 3000ms'),
        position:'absolute'},
        (this.props.cover ? coverStyle : null)),
      onLoad:function(){
        this.setState({loaded:true});
      }.bind(this)});
    delete img.srcSet;
    delete img.placeholder;

    var style = assign({}, this.props.style);
    style.height = style.height || '100%';

    return React.createElement('div', {style:style},
      React.createElement('div', {style:coverWrapperStyle},
        React.createElement('img', temp),
        React.createElement('img', img)));
  },

});
