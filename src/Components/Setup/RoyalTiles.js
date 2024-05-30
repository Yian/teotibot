/** @jsx jsx */
import { useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import useMedia from "../UseMedia";
import useMeasure from "react-use-measure";
import { useTransition, a } from "@react-spring/web";
import { tileContainer, techTile } from "./Setup.css";
import { shuffle, orderBy } from "lodash";
import Tippy, { useSingleton } from "@tippyjs/react";
import { removeRandomItemFromArray } from '../Logic';
import "tippy.js/dist/tippy.css";

export const RoyalTiles = (props) => {
  const tileHeight = 175;
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
  
  const [items, setTiles] = useState([]);

const removeRandomItemFromArray = (array) => {
  // Create a copy of the array to avoid modifying the original array
  let tilesCopy = [...array];

  // Helper function to count the number of items in each category
  const countCategories = (tiles) => {
    return tiles.reduce((acc, tile) => {
      acc[tile.category] = (acc[tile.category] || 0) + 1;
      return acc;
    }, {});
  };

  // Get initial counts of each category
  let categoryCounts = countCategories(tilesCopy);

  // Function to get a random integer between min and max (inclusive)
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Loop until only three items remain in total
  while (tilesCopy.length > 3) {
    // Get an array of categories with more than one item
    const removableCategories = Object.keys(categoryCounts).filter(category => categoryCounts[category] > 1);

    if (removableCategories.length > 0) {
      // Select a random category from the removable categories
      const randomCategory = removableCategories[getRandomInt(0, removableCategories.length - 1)];

      // Get all items in the selected category
      const categoryItems = tilesCopy.filter(tile => tile.category === randomCategory);

      // Select a random item from the category items
      const itemToRemove = categoryItems[getRandomInt(0, categoryItems.length - 1)];

      // Remove the selected item from the tiles copy
      tilesCopy = tilesCopy.filter(tile => tile !== itemToRemove);

      // Update the counts after removal
      categoryCounts = countCategories(tilesCopy);
    } else {
      break;
    }
  }

  return orderBy(tilesCopy, ['category'], ['asc']);
  }

  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    if (items.length <= 0) {
      var tiles = removeRandomItemFromArray(props.royalTiles);

      setTiles(tiles);
    }

    const t = setInterval(() => {
      if (items.length >= 4) {

        setTiles(shuffle);
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

  const onRest = () => {
    setTimeout(() => {
      props.onRest();
    }, 500);
  };

  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.name,
    from: ({ x, y }) => ({ x, y, opacity: 0 }),
    enter: ({ x, y }) => ({ x, y, opacity: 1 }),
    update: ({ x, y }) => ({ x, y }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 25,
    onRest,
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
            src={`${process.env.PUBLIC_URL}/royal_tiles/${item.src}/${item.name}.jpg`}
          />
        </Tippy>
      ))}
    </div>
  );
};
