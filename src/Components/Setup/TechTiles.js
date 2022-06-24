/** @jsx jsx */
import { useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import useMedia from "../UseMedia";
import useMeasure from "react-use-measure";
import { useTransition, a } from "@react-spring/web";
import { tileContainer, techTile } from "./Setup.css";
import { shuffle } from "lodash";
import { baseTechTiles, xitleTechTiles } from "../Constants";
import Tippy, { useSingleton } from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export const TechTiles = (props) => {
  const tileHeight = 350;
  const [source, target] = useSingleton();

  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [8, 8, 3],
    3
  );
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();
  // Hook3: Hold items
  const templeTiles = props.isXitle
    ? [...baseTechTiles, ...xitleTechTiles]
    : baseTechTiles;
  const [items, set] = useState(templeTiles);

  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    const t = setInterval(() => {
      if (items.length >= 7) {
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
      return { ...child, x, y };
    });
    return [heights, gridItems];
  }, [columns, items, width]);

  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.name,
    from: ({ x, y }) => ({ x, y, opacity: 0 }),
    enter: ({ x, y }) => ({ x, y, opacity: 1 }),
    update: ({ x, y }) => ({ x, y }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 25,
    onRest: props.onRest,
  });

  return (
    <div ref={ref} css={tileContainer} style={{ height: Math.max(...heights) }}>
      <Tippy singleton={source} />
      {transitions((style, item) => (
        <Tippy singleton={target} content={item.tooltip}>
          <a.img
            onContextMenu={(e) => e.preventDefault()}
            css={techTile}
            style={style}
            src={`${process.env.PUBLIC_URL}/tech_tiles/${item.src}/${item.name}.jpg`}
          />
        </Tippy>
      ))}
    </div>
  );
};
