/** @jsx jsx */
import { useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import { useTransition, a } from "@react-spring/web";
import { diceFace, neutralContainer, action, actionText, diceContainer } from "./Setup.css";
import useMeasure from "react-use-measure";
import useMedia from "../UseMedia";

export const DicePlacement = (props) => {
  const tileHeight = 200;

  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)", "(max-width: 480px)"],
    [4, 4, 4,2],
    2
  );

  const [ref, { width }] = useMeasure();

  // Hook3: Hold items
  const [items, set] = useState(props.dicePlacements);

  useEffect(() => {
    set(props.dicePlacements);
  }, [props.dicePlacements]);

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
      };
    });
    return [heights, gridItems];
  }, [columns, items, width]);

  const transitions = useTransition(gridItems, {
    key: (item) => item.key,
    from: ({ x, y }) => ({ x: 0, y, opacity: 0 }),
    enter: ({ x, y }) => ({ x, y, opacity: 1 }),
    update: ({ x, y }) => ({ x, y, opacity: 1  }),
    leave: { height: 0, opacity: 0 },
    config: { duration: 1000, mass: 5, tension: 500, friction: 50 },
    trail: 25,
    onRest: props.onRest
  });

  return (
    <div
      ref={ref}
      css={neutralContainer}
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => (
        <a.div css={diceContainer} key={item.name} style={style}>
          <div>
            <a.img
              css={diceFace}
              src={`${process.env.PUBLIC_URL}/dice/${item.diceFace.name}.png`}
            />
            <a.img
              css={action}
              src={`${process.env.PUBLIC_URL}/actions/no${item.number}.png`}
            />
            </div>
          <span style={{color: item.color}} css={actionText}>{item.actionName}</span>
        </a.div>
      ))}
    </div>
  );
};
