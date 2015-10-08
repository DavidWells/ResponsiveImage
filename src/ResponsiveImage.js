'use strict';

let assign = require('object-assign');

module.exports = React.createClass({
  displayName: "ResponsiveImage",

  propsTypes: {
    src: React.PropTypes.string.isRequired,
    srcset: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      src: null,
      srcset: null,
      placeholder: null,
    };
  },

	getInitialState: () => ({loaded:false}),

	render() {

    var coverStyle = {
      top: '0',
      left: '0',
      width: '100%'};

    var placeholder = {className:'placeholder',
      src:this.props.placeholder,
      style:assign({}, {
        opacity:(this.state.loaded ? 0 : 1),
        transition: 'opacity 10ms 3100ms'},
        (this.props.cover ? {width: '100%'} : null))};

    var img = assign({}, this.props, {
      srcSet:this.props.srcSet,
      style:assign({}, {
        opacity:(this.state.loaded ? 1 : 0),
        transition: 'opacity 3000ms',
        position:'absolute'},
        (this.props.cover ? coverStyle : null)),
      onLoad:() => this.setState({loaded:true})});
    delete img.placeholder;

    var style = assign({}, this.props.style);
    style.height = style.height || '100%';

    return React.createElement('div', {style:style},
      React.createElement('div', {style:{position: 'relative', width:'100vw', minWidth:'100%', minHeight:'100%'}},
        React.createElement('img', placeholder),
        React.createElement('img', img)));
  },
});
