/** @jsx jsx */
import { useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import { useTransition, a } from "@react-spring/web";
import { resourceContainer, startResource, resource } from "./Setup.css";
import useMeasure from "react-use-measure";
import useMedia from "../UseMedia";
import {orderBy}  from "lodash";

export const StartingResources = (props) => {
  const columns = useMedia(
    [
      "(min-width: 1500px)",
      "(min-width: 1000px)",
      "(min-width: 600px)",
      "(min-width: 480px)",
    ],
    [20, 20, 20, 20],
    10
  );

  const [ref, { width }] = useMeasure();

  const [startingResources, setStartingResources] = useState(
    props.dicePlacements
  );

  useEffect(() => {
    setStartingResources(props.startingResources);
  }, [props.startingResources]);

  const [heights, resources] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let resources = orderBy(startingResources, ["quantity", "type"], ["desc", "desc"]).map(
      (child, i) => {
        const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
        const x = (width / columns) * column; // x = container width / number of columns * column index,
        const y = (heights[column] += 150 / 2) - 150 / 2; // y = it's just the height of the current column
        return {
          ...child,
          y,
          x,
        };
      }
    );
    return [heights, resources];
  }, [width, columns, startingResources]);

  const resourceTransitions = useTransition(resources, {
    key: (item) => item.name,
    from: ({ x }) => ({ x, y: -1000, opacity: 0 }),
    enter: ({ x, y }) => ({ x, y, opacity: 1 }),
    update: ({ x }) => ({ x }),
    leave: { height: 0, opacity: 0, y: -1000 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 100,
  });

  return (
    <div
      ref={ref}
      css={resourceContainer}
      style={{ height: Math.max(...heights) }}
    >
      {resourceTransitions((props, item) => {
        return (
          <a.div
            css={resource}
            key={item.name}
            style={{
              ...props,
            }}
            className="box"
          >
            <div css={startResource}>
              <div>{item.quantity}</div>
              <a.img
                src={`${process.env.PUBLIC_URL}/resources/${item.type}.png`}
              />
            </div>
          </a.div>
        );
      })}
    </div>
  );
};
