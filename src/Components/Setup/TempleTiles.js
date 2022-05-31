/** @jsx jsx */
import { useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import useMedia from "../UseMedia";
import useMeasure from "react-use-measure";
import { useTransition, a } from "@react-spring/web";
import { tileContainer, templeTile } from "../Setup/Setup.css";
import ReactTooltip from "react-tooltip";
import {shuffle} from "lodash";
import { baseTempleTiles } from "../Constants";

export const TempleTiles = (props) => {
  const tileHeight = 300;
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 5, 5],
    3
  );
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();

  // Hook3: Hold items
  const templeTiles  = baseTempleTiles;
  const [items, set] = useState(templeTiles);

  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    const t = setInterval(() => {
      if (items.length >= 4) {
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
      return { ...child, x, y};
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
  });

  return (
    <div
      ref={ref}
      css={tileContainer}
      style={{ height: Math.max(...heights) }}
    >
      <ReactTooltip />
      {transitions((style, item) => (
        <a.img
          css={templeTile}
          style={style}
          src={
            `${process.env.PUBLIC_URL}/TempleTiles/base/${item.name}.jpg`
          }
          data-tip={item.tooltip}
        />
      ))}
    </div>
  );
};
