/** @jsx jsx */
import { useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import useMedia from "../UseMedia";
import useMeasure from "react-use-measure";
import { useTransition, a } from "@react-spring/web";
import { tileContainer, priestPriestessTile } from "../Setup/Setup.css";
import { shuffle } from "lodash";

export const PriestPriestessTiles = (props) => {
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 768px)", "(max-width: 767px)"],
    [ 2, 1],
    1
  );
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();

  // Hook3: Hold items
  const [items, set] = useState([]);

  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    if (items.length <= 0) {
      set(props.priestPriestessTiles);
    }

    const t = setInterval(() => {
      if (items.length > props.numberToPick) {
        items.pop();
        set(shuffle);
      }
    }, 50);
    return () => clearInterval(t);
  }, [items, props.numberToPick]);

  let tileHeight = (width * 1.4661654135338345864661654135338)/columns;

  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let gridItems = items?.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column; // x = container width / number of columns * column index,
      const y = (heights[column] += tileHeight / 2) - tileHeight / 2; // y = it's just the height of the current column
      return { ...child, x, width: width, y };
    });
    return [heights, gridItems];
  }, [columns, items, width, tileHeight]);

  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.name,
    from: ({ x, y, }) => ({ x, y, opacity: 0 }),
    enter: ({ x, y,  }) => ({ x, y, opacity: 1 }),
    update: ({ x, y,  }) => ({ x, y, }),
    leave: { height: 0, opacity: 0 },
    config: { duration: 500, mass: 5, tension: 500, friction: 50 },
    trail: 25,
    onRest: props.onRest
  });

  return (
    <div ref={ref} css={tileContainer} style={{ height: Math.max(...heights) }}>
      {transitions((style, item) => (
        <a.img
          css={priestPriestessTile}
          style={style}
          src={`${process.env.PUBLIC_URL}/priest_priestess_tiles/${item.src}/${item.name}.jpg`}
        />
      ))}
    </div>
  );
};
