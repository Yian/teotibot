/** @jsx jsx */
import { useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import { useTransition, a } from "@react-spring/web";
import { diceFace, neutralContainer } from "./Setup.css";
import useMeasure from "react-use-measure";
import useMedia from "../UseMedia";

export const DicePlacement = (props) => {
  const tileHeight = 200;

  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [3, 3, 3],
    3
  );
  
  const [ref, { width }] = useMeasure();

  // Hook3: Hold items
  const [items, set] = useState(props.dicePlacements);

  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    set(props.dicePlacements);
  }, [props.dicePlacements]);

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

  const transitions = useTransition(gridItems, {
    key: (item) => item.name,
    from: ({ x }) => ({ x: 0, opacity: 0 }),
    enter: ({ x }) => ({ x, opacity: 1 }),
    update: ({ x, y }) => ({ x, y }),
    leave: { x: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 25,
  });

  return (
    <div ref={ref} css={neutralContainer} style={{ height: Math.max(...heights) }}>
      {transitions((style, item) => (
        <a.div key={item.name} style={style}>
          <a.img
            css={diceFace}
            src={process.env.PUBLIC_URL + `/resources/no${item.number}.png`}
          />
          <a.img
            css={diceFace}
            src={
              process.env.PUBLIC_URL + "/Dice/" + item.diceFace.name + ".png"
            }
          />
        </a.div>
      ))}
    </div>
  );
};
