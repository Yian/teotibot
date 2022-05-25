/** @jsx jsx */
import { useCallback, useState } from "react";
import { jsx } from "@emotion/react";
import { StartTiles } from "./StartTiles";
import { TechTiles } from "./TechTiles";
import { TempleTiles } from "./TempleTiles";
import { useTransition, a } from "@react-spring/web";
import { startResource, resourceContainer } from "./Setup.css";
import find from "lodash.find";
import remove from "lodash.remove";
import { NeutralPlacement } from "./NeutralPlacement";
import { baseStartTiles } from "../Constants";
import union from "lodash.union";
import sortBy from "lodash.sortby";

export const Setup = (props) => {
  const [selectedStartTiles, setSelectedStartTiles] = useState([]);

  function remainingStartTiles() {
    if (selectedStartTiles.length >= 2) {
      return baseStartTiles.filter((el) => {
        return (
          el.name !== selectedStartTiles[0].name &&
          el.name !== selectedStartTiles[1].name
        );
      });
    }
  }

  function addTileResource(arr, item) {
    const { length } = arr;
    const found = arr.some((el) => el.type === item.type);
    let index = arr.findIndex((el) => el.type === item.type);

    if (index >= 0) {
      arr[index].quantity += item.quantity;
    }

    if (!found) arr.push({ ...item, x: length * 100 });

    return arr;
  }

  function addTileNumber(arr, tileNumber, i, arrTileNumbers) {
    const { length } = arr;
    arr.push({ type: `no${tileNumber}`, x: (i === 0 ? (arr[length - 1].x + 200) : (arr[length - 1].x + arrTileNumbers.length * 20)) });

    return arr;
  }

  const mergeResources = (resources, arrTileResources) => {
    for (let i = 0; i < arrTileResources.length; i++) {
      addTileResource(resources, arrTileResources[i]);
    }

    return resources;
  };

  const mergeNumbers = (resources, arrTileNumbers) => {
    for (let i = 0; i < arrTileNumbers.length; i++) {
      addTileNumber(resources, arrTileNumbers[i], i, arrTileNumbers);
    }

    return resources;
  }


  function getResources(selectedStartTiles) {
    if (selectedStartTiles.length >= 2) {
      const resources = [];
      let numbers = [];
      let result = [];

      selectedStartTiles.forEach((selectedStartTile) => {
        result = mergeResources(
          resources,
          selectedStartTile.resources,
        );
      });

      selectedStartTiles.forEach((selectedStartTile) => {
        numbers = [...numbers, ...selectedStartTile.numbers]
      });

      result = mergeNumbers(
        resources,
        union(numbers),
      );

      var lol = sortBy(result, ["quantity", "type"]);
      return lol;
    }
  }

  const transitions = useTransition(getResources(selectedStartTiles), {
    key: (item) => item.name,
    from: ({ x }) => ({ x, y: 0, opacity: 0 }),
    enter: ({ x }) => ({ x, y: 700, opacity: 1 }),
    update: ({ x }) => ({ x }),
    leave: { height: 0, opacity: 0, y: 0 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 100,
  });

  const selectedTile = (startTile) => {
    if (startTile) {
      let newTitle = startTile;
      var newHistory = [...selectedStartTiles];
      var listItem = find(newHistory, ["name", startTile.name]);

      //add
      if (listItem == null) {
        if (newHistory.length < 2) {
          newTitle.selected = !startTile.selected;
          newHistory = [...selectedStartTiles, newTitle];
        } else {
          return;
        }
      } else {
        //update
        listItem.selected = !listItem.selected;
        if (listItem.selected === false) {
          remove(newHistory, (item) => {
            return item.name === listItem.name;
          });
        }
      }

      setSelectedStartTiles(newHistory);
    }
  };

  return (
    <div>
      {transitions((props, item) => {
        return (
          <a.div
            css={resourceContainer}
            key={item.name}
            style={{
              ...props,
            }}
            className="box"
          >
            <div css={startResource}>
              <div>{item.quantity}</div>
              <a.img
                src={
                  process.env.PUBLIC_URL + "/resources/" + item.type + ".png"
                }
              />
            </div>
          </a.div>
        );
      })}
      <StartTiles selectedStartTiles={selectedTile} />
      <TechTiles />
      <TempleTiles />
      <NeutralPlacement remainingStartTiles={remainingStartTiles()} />
    </div>
  );
};
