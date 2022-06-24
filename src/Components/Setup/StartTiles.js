/** @jsx jsx */
import { useCallback, useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import useMedia from "../UseMedia";
import useMeasure from "react-use-measure";
import { useSpring, useTransition, a } from "@react-spring/web";
import { startTile } from "./Setup.css";
import { shuffle, find } from "lodash";
import Tippy, { useSingleton } from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export const StartTiles = (props) => {
  const tileHeight = 250;
  const [source, target] = useSingleton();

  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    [
      "(min-width: 1500px)",
      "(min-width: 1000px)",
      "(min-width: 600px)",
      "(max-width: 480px)",
    ],
    [4, 4, 4, 4],
    4
  );
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();

  // Hook3: Hold items
  const [items, set] = useState([]);

  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    if (items.length <= 0) {
      set(props.startTiles);
    }
    const t = setInterval(() => {
      if (items.length >= 5) {
        items.pop();
        set(shuffle);
      }
    }, 50);
    return () => clearInterval(t);
  }, [items]);

  useEffect(() => {
    return () => {
      props.startTiles.forEach((item) => {
        item.selected = false;
      });
    };
  }, []);

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
      };
    });
    return [heights, gridItems];
  }, [columns, items, width]);

  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.name,
    from: ({ x }) => ({ x, opacity: 0 }),
    enter: ({ x }) => ({ x, opacity: 1 }),
    update: ({ x }) => ({ x }),
    leave: { height: 0, opacity: 0 },
    config: { duration: 500, mass: 5, tension: 500, friction: 50 },
    trail: 25,
  });

  const [state, toggle] = useState(true);

  const { x, api } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
    loop: true,
  });

  const getStyle = useCallback(
    (item) => {
      var itemList = find(items, ["name", item.name]);
      var test = {
        scale: x.to({
          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
        }),
      };

      return itemList?.selected ? test : {};
    },
    [x, items]
  );

  const onClick = (item) => {
    var listItem = find(items, ["name", item.name]);
    props.selectedStartTiles(listItem);
  };

  return (
    <div ref={ref} style={{ height: tileHeight }}>
      <Tippy singleton={source} />
      {transitions((style, item) => (
        <Tippy singleton={target} content={item.tooltip} touch="hold">
          <a.div css={startTile} style={style}>
            <a.img
              onContextMenu={(e) => e.preventDefault()}
              css={startTile}
              style={getStyle(item)}
              onClick={() => {
                onClick(item);
              }}
              src={`${process.env.PUBLIC_URL}/start_tiles/${item.src}/${item.name}.jpg`}
              data-tip={item.tooltip}
            />
          </a.div>
        </Tippy>
      ))}
    </div>
  );
};
