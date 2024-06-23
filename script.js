function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}const { useState, useEffect } = React;
const { useSpring, animated, interpolate } = ReactSpring;
const { useDrag } = ReactUseGesture;
const rootElement = document.getElementById("root");
const height = window.innerHeight;
const width = window.innerWidth;
let w = width ;
if (width <= 500) {
  w = width;
}
const content = [
{
  contentL2: "许遥老师拍的粉色的云",
  contentL3:
  "分我半朵~",
  src:
  "./img/4.jpg" },

{
  contentL2: "好运莲莲🪷",
  contentL3:
  "分给许老师一片莲花",
  src:
  "./img/5.jpg" },

{
  contentL2: "西梅美式",
  contentL3:
  "瑞の减脂计划 势必闯出丶名堂",
  src:
  "./img/6.jpg" },
  {
    contentL2: "你的头发",
    contentL3:
    "嗅到危机 它不敢大声说话",
    src:
    "./img/7.jpg" }];


const keyMap = {
  0: 1,
  1: 2,
  2: 3,
  3: 0

};

const getPath = (y, x, width) => {
  const anchorDistance = 200 + x * 0.5;
  const curviness = anchorDistance - 60;
  return `M0, 
    ${height} 
    H0V0h${width}v 
    ${y - anchorDistance} 
    c0, 
    ${curviness} 
    , 
   ${x} 
    , 
    ${curviness} 
    , 
   ${x} 
    , 
    ${anchorDistance} 
    S${width}, 
    ${y} 
    ,${width}, 
    ${y + anchorDistance * 2}
    V
    ${height}
    z`;
};
const Page = ({ data, index, setActive, gone = false }) => {
  const [isGone, setGone] = useState(gone);
  const [isMove, setMove] = useState(false);
  const {  contentL2, contentL3, src } = data;
  const [{ posX, posY }, setPos] = useSpring(() => ({
    posX: -500,
    posY: height * .72 - 20,
    config: {
      mass: 3 } }));


  const [{ d }, setDvalue] = useSpring(() => ({
    d: gone ? getPath(0, 0, w) : getPath(height * 0.72, 0, 0),
    config: {
      mass: 3 },

    onRest: () => {
      if (isGone) {
        setDvalue(getPath(0, 0, w));
      }
    } }));

  useEffect(() => {
    if (!gone) {
      setDvalue({
        d: getPath(height * 0.72, 300, 5) });

      setTimeout(() => {
        setPos({
          posX: 7 });

      }, 100);
    }
  }, [gone]);

  const bind = useDrag(({ down, movement: [mx], xy: [, my], vxvy: [vx] }) => {
    if (!isGone) {
      if (down && isMove) {
        setDvalue({
          d: getPath(my, mx + 60, 10) });
        setPos({
          posX: mx + 20,
          posY: my - 20 });

        if (mx > 3/4*w || vx > 3) {
          setDvalue({
            d: getPath(my, -50, w) });

          setGone(true);
          setTimeout(() => {
            setDvalue({
              d: getPath(my, 0, w) });

            setActive(index);
          }, 240);
        }
      } else {
        setDvalue({
          d: getPath(height * 0.72, 300, 5) });

        setPos({
          posX: 7,
          posY: height * 0.72 - 20 });

      }
    }
  });
  return /*#__PURE__*/(
    React.createElement("div", _extends({ id: `pageContainer${index}`, className: "pageContainer" }, bind()), /*#__PURE__*/
    React.createElement("svg", { version: "1.1", id: "blob", xmlns: "http://www.w3.org/2000/svg" }, /*#__PURE__*/
    React.createElement("clipPath", { id: `clipping${index}` }, /*#__PURE__*/
    React.createElement(animated.path, { id: `blob-path${index}`, d: d }))), /*#__PURE__*/


    React.createElement("div", {
      id: `page${index}`,
      className: "page",
      style: {
        clipPath: `url(#clipping${index})`,
        WebkitClipPath: `url(#clipping${index})` } }, /*#__PURE__*/


    React.createElement("div", { id: `header${index}`, className: "header" }, /*#__PURE__*/
    React.createElement("div", null, "致许老师"), /*#__PURE__*/
    React.createElement("div", { className: `skip text${index}` }, "2024.6.23")), /*#__PURE__*/

    React.createElement("img", { alt: `img${index}`, src: src }), /*#__PURE__*/
    React.createElement("div", { id: "content" }, /*#__PURE__*/
    React.createElement("div", { className: `contentL2 text${index}` }, contentL2), /*#__PURE__*/
    React.createElement("div", { className: `contentL3 text${index}` }, contentL3))), /*#__PURE__*/


    React.createElement(animated.button, {
      className: `button${index}`,
      onMouseDown: () => {
        setMove(true);
      },
      onMouseUp: () => {
        setMove(false);
      },
      onTouchStart: () => {
        setMove(true);
      },
      onTouchEnd: () => {
        setMove(false);
      },
      style: {
        opacity: posX.interpolate({
          range: [0, 100],
          output: [1, 0] }),

        transform: interpolate(
        [
        posX.interpolate(x => `translateX(${x}px)`),
        posY.interpolate(y => `translateY(${y}px)`)],

        (translateX, translateY) => `${translateX} ${translateY}`) } },



    ">")));



};
const App = () => {
  const [isActive, setActive] = useState(0);
  const [elm, setElm] = useState([/*#__PURE__*/
  React.createElement(Page, {
    key: 0,
    data: content[0],
    index: 0,
    setActive: setActive,
    gone: true })]);



  useEffect(() => {
    const key = keyMap[isActive];
    if (elm.length === 2) {
      setTimeout(() => {
        setElm([
        ...elm.slice(1, 4), /*#__PURE__*/
        React.createElement(Page, {
          key: key,
          data: content[key],
          index: key,
          setActive: setActive })]);


      }, 600);
    } else {
      setElm([
      ...elm, /*#__PURE__*/
      React.createElement(Page, {
        key: key,
        data: content[key],
        index: key,
        setActive: setActive })]);


    }
  }, [isActive]);
  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("div", { id: "container" }, elm)));


};


ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
rootElement);