/** @jsx jsx */
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import useMedia from "../UseMedia";
import useMeasure from "react-use-measure";
import { useSpring, useTransition, a, useSpringRef } from "@react-spring/web";
import { animationTest, startTileContainer, startTile } from "./Setup.css";
import ReactTooltip from "react-tooltip";
import shuffle from "lodash.shuffle";
import { baseStartTiles } from "../Constants";
import { tileList } from "./TileList.css";
import find from 'lodash.find';

export const StartTiles = (props) => {
  const tileHeight = 800;
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [4, 4, 4],
    4
  );
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();

  // Hook3: Hold items
  const [items, set] = useState(baseStartTiles);

  // Hook4: shuffle data every 2 seconds
  useEffect(() => {  
    const t = setInterval(() => {
      if (items.length >= 5) {
        items.pop();
        set(shuffle);
      }
    }, 100);
    return () => clearInterval(t);
  }, [items]);

  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let gridItems = items?.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column; // x = container width / number of columns * column index,
      const y = (heights[column] += tileHeight / 2) - tileHeight / 2; // y = it's just the height of the current column

      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: tileHeight / 2,
      };
    });
    return [heights, gridItems];
  }, [columns, items, width]);

  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.name,
    from: ({ x }) => ({ x, opacity: 0 }),
    enter: ({ x }) => ({ x, opacity: 1}),
    update: ({ x }) => ({ x}),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 25,
  });
  
  const [state, toggle] = useState(true);
  const [selectedTiles, setSelectedTiles] = useState([]);


  const { x, api } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
    loop: true,
  })

  const getStyle = useCallback((item) => {
    var itemList = find(items, ['name', item.name]);
    var test = 
    {
      scale:  x.to({
        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
        output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
      })}

      return itemList?.selected ? test : {};
  }, [x, items]);

  const onClick = (item) => {
    find(items, ['name', item.name]).selected = true;
    setSelectedTiles([2]);
  }

  return (
    <div ref={ref} css={startTileContainer} style={{ height: 260 }}>
      <ReactTooltip />
      {transitions((style, item) => (
        <a.div css={startTile}
        style={style}>
        <a.img
        css={startTile}
          style={getStyle(item)}
          onClick={() => {onClick(item)}}
          src={
            process.env.PUBLIC_URL + "/StartTiles/base/" + item.name + ".jpg"
          }
          data-tip={item.tooltip}
        />
        </a.div>
      ))}
    </div>
  );
};

//   return (
//     <div css={startTileContainer}>
//         <ReactTooltip />
//         {baseStartTiles.map(tile => (
//             <img css={startTile} src={process.env.PUBLIC_URL + "/StartTiles/base/" + tile.name + ".jpg"} data-tip={tile.tooltip} alt="tile.name"/>
//         ))};
//         <div>Continue</div>
//     </div>
//   );