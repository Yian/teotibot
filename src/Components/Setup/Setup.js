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

export const Setup = (props) => {
  const [selectedStartTiles, setSelectedStartTiles] = useState([]);

  function remainingStartTiles() {
    if (selectedStartTiles.length >= 2) {
      return baseStartTiles.filter(function (el) {
        return (
          el.name !== selectedStartTiles[0].name &&
          el.name !== selectedStartTiles[1].name
        );
      });
    }
  }

  function add(arr, item) {
    const { length } = arr;
    const found = arr.some((el) => el.type === item.type);
    let index = arr.findIndex((el) => el.type === item.type);

    if (index >= 0) {
      arr[index].quantity += item.quantity;
    }

    if (!found) arr.push({ ...item, x: length * 100 });

    return arr;
  }

  const merge = (first, second) => {
    for (let i = 0; i < second.length; i++) {
      add(first, { ...second[i] });
    }

    return first;
  };

  function getResources(st) {
    const resources = [];
    let result = [];
    st.forEach((selectedStartTile) => {
      result = merge(resources, selectedStartTile.resources);
    });
    return result;
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
