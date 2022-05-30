/** @jsx jsx */
import { useCallback, useEffect, useMemo, useState } from "react";
import { jsx } from "@emotion/react";
import { StartTiles } from "./StartTiles";
import { TechTiles } from "./TechTiles";
import { TempleTiles } from "./TempleTiles";
import { useTransition, a } from "@react-spring/web";
import {
  startResource,
  resourceContainer,
  resource,
  setupContainer,
} from "./Setup.css";
import { DicePlacement } from "./DicePlacement";
import {
  actionNames,
  baseStartTiles,
  diceFaces,
  getRandom,
} from "../Constants";
import find from "lodash.find";
import remove from "lodash.remove";
import union from "lodash.union";
import sortBy from "lodash.sortby";
import cloneDeep from "lodash.clonedeep";
import shuffle from "lodash.shuffle";
import useMeasure from "react-use-measure";
import useMedia from "../UseMedia";

export const Setup = (props) => {
  const [selectedStartTiles, setSelectedStartTiles] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  const [remainingStartTiles, setRemainingStartTiles] = useState([]);
  const [teotibotPlacements, setTeotibotPlacements] = useState([]);
  const [neutralPlacements1, setNeutralPlacements1] = useState([]);
  const [neutralPlacements2, setNeutralPlacements2] = useState([]);
  const [showStartingResources, setStartingResources] = useState(false);
  const [showStartingPlacements, setStartingPlacements] = useState(false);
  const [showTechs, setShowTechs] = useState(false);
  const [showTemples, setShowTemples] = useState(false);
  const [showStartTiles, setShowStartTiles] = useState(false);
  const [showTeotibotDice, setShowTeotibotDice] = useState(false);
  const [showNeutralPlayer1, setShowNeutralPlayer1] = useState(false);
  const [showNeutralPlayer2, setShowNeutralPlayer2] = useState(false);

  const noNeutralDice = 3;

  const columns = useMedia(
    [
      "(min-width: 1500px)",
      "(min-width: 1000px)",
      "(min-width: 600px)",
      "(min-width: 480px)",
    ],
    [7, 7, 7, 7],
    7
  );

  const [ref, { width }] = useMeasure();

  function getRandomArrayIndex(arr) {
    return Math.floor(Math.random() * (arr.length - 1)) + 1;
  }

  const getNeutralPlacement = useCallback((shuffledTiles) => {
    //Draw 2 random start tiles
    let index = getRandomArrayIndex(shuffledTiles);
    let numbers1 = shuffledTiles[index].numbers;

    shuffledTiles.splice(index, 1);

    index = getRandomArrayIndex(shuffledTiles);
    let numbers2 = shuffledTiles[index].numbers;

    shuffledTiles.splice(index, 1);

    let mergedNumbers = union(numbers1, numbers2);

    //Get the 3 dice values
    let dice = getRandom(diceFaces, noNeutralDice);

    return [
      {
        diceFace: dice[0],
        number: [mergedNumbers[0]],
        actionName: getActionItem(0).name,
        color: getActionItem(0).color,
      },
      {
        diceFace: dice[1],
        number: [mergedNumbers[1]],
        actionName: getActionItem(1).name,
        color: getActionItem(1).color,
      },
      {
        diceFace: dice[2],
        number: [mergedNumbers[2]],
        actionName: getActionItem(2).name,
        color: getActionItem(2).color,
      },
    ];

    function getActionItem(value) {
      return find(actionNames, ["value", mergedNumbers[value]]);
    }
  }, []);

  const calcDicePlacements = useCallback(() => {
    let shuffledTiles = shuffle(remainingStartTiles);
    setTeotibotPlacements(getNeutralPlacement(shuffledTiles));
    setNeutralPlacements1(getNeutralPlacement(shuffledTiles));
    setNeutralPlacements2(getNeutralPlacement(shuffledTiles));
  }, [getNeutralPlacement, remainingStartTiles]);

  const getActions = (selectedStartTiles) => {
    let actions = [];

    selectedStartTiles.forEach((selectedStartTile) => {
      actions = [...actions, ...selectedStartTile.numbers];
    });

    return actions;
  };

  function addResourceQuantities(arr, item) {
    const found = arr.some((el) => el.type === item.type);
    let index = arr.findIndex((el) => el.type === item.type);

    if (index >= 0) {
      arr[index].quantity += item.quantity;
    }

    if (!found) {
      arr.push(item);
    }

    return arr;
  }

  const getResources = useCallback((selectedStartTiles) => {
    let result = [];

    selectedStartTiles.forEach((selectedStartTile) => {
      let arr = cloneDeep(selectedStartTile.resources);
      arr.forEach((resource) => {
        addResourceQuantities(result, resource);
      });
    });

    return result;
  }, []);

  useEffect(() => {
    if (selectedStartTiles.length >= 2) {
      setRemainingStartTiles(
        baseStartTiles.filter((el) => {
          return (
            el.name !== selectedStartTiles[0].name &&
            el.name !== selectedStartTiles[1].name
          );
        })
      );
      setSelectedResources(getResources(selectedStartTiles));
      setSelectedActions(getActions(selectedStartTiles));
      setShowTeotibotDice(true);
      setShowNeutralPlayer1(true);
      setShowNeutralPlayer2(true);
      setStartingPlacements(true);
      setStartingResources(true);
    } else {
      setNeutralPlacements1([]);
      setNeutralPlacements2([]);
      setTeotibotPlacements([]);
      setShowTeotibotDice(false);
      setShowNeutralPlayer1(false);
      setShowNeutralPlayer2(false);
      setSelectedResources([]);
      setSelectedActions([]);
      setStartingPlacements(false);
      setStartingResources(false);
    }
  }, [getResources, selectedStartTiles]);

  useEffect(() => {
    const t = setInterval(() => {
      setShowTechs(true);
    }, 0);
    const u = setInterval(() => {
      setShowTemples(true);
    }, 1000);
    const v = setInterval(() => {
      setShowStartTiles(true);
    }, 2000);

    if (remainingStartTiles.length > 0) {
      calcDicePlacements();
    }
    return () => {
      clearInterval(t);
      clearInterval(u);
      clearInterval(v);
    };
  }, [calcDicePlacements, remainingStartTiles]);

  const [resourceHeights, actionHeights, actions, resources] = useMemo(() => {
    let resourceHeights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let actionHeights = new Array(columns).fill(0); // Each column gets a height starting with zero

    let actions = selectedActions.map((child, i) => {
      const column = actionHeights.indexOf(Math.min(...actionHeights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column; // x = container width / number of columns * column index,
      const y = (actionHeights[column] += 150 / 2) - 150 / 2; // y = it's just the height of the current column
      return {
        value: child,
        y,
        x,
      };
    });

    let resources = sortBy(selectedResources, ['quantity', 'type']).map((child, i) => {
      const column = resourceHeights.indexOf(Math.min(...resourceHeights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column; // x = container width / number of columns * column index,
      const y = (resourceHeights[column] += 150 / 2) - 150 / 2; // y = it's just the height of the current column
      return {
        ...child,
        y,
        x,
      };
    });
    return [resourceHeights, actionHeights, actions, resources];
  }, [selectedActions, width, columns, selectedResources]);

  const resourceTransitions = useTransition(resources, {
    key: (item) => item.name,
    from: ({ x }) => ({ x, y: -1000, opacity: 0 }),
    enter: ({ x, y }) => ({ x, y, opacity: 1 }),
    update: ({ x }) => ({ x }),
    leave: { height: 0, opacity: 0, y: -1000 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 100,
  });

  const actionTransitions = useTransition(actions, {
    key: (item) => item.name,
    from: ({ x }) => ({ x, y: -1000, opacity: 0 }),
    enter: ({ x, y }) => ({ x, y, opacity: 1 }),
    update: ({ x }) => ({ x }),
    leave: { height: 0, opacity: 0, y: -1000 },
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
    <div css={setupContainer}>
      {showTechs && (
        <div>
          <h3>Upgrade tiles</h3>
          <TechTiles />
        </div>
      )}
      {showTemples && (
        <div>
          <h3>Temple tiles</h3>
          <TempleTiles />
        </div>
      )}
      {showStartTiles && (
        <div>
          {" "}
          <h3>Select 2 tiles:</h3>
          <StartTiles selectedStartTiles={selectedTile} />
        </div>
      )}
      {showStartingResources && (
        <div
          ref={ref}
          css={resourceContainer}
          style={{ height: Math.max(...resourceHeights) }}
        >
          <span>Starting Resources:</span>
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
      )}
      {showStartingPlacements && (
        <div
          ref={ref}
          css={resourceContainer}
          style={{ height: Math.max(...actionHeights) }}
        >
          <span>Starting Placements:</span>
          {actionTransitions((props, item) => {
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
                    src={`${process.env.PUBLIC_URL}/actions/no${item.value}.png`}
                  />
                </div>
              </a.div>
            );
          })}
        </div>
      )}
      {showTeotibotDice && (
        <div>
          <h3>Teotibot Placement</h3>
          <DicePlacement dicePlacements={teotibotPlacements} />
        </div>
      )}
      {showNeutralPlayer1 && (
        <div>
          <h3>Neutral player 1</h3>
          <DicePlacement dicePlacements={neutralPlacements1} />
        </div>
      )}
      {showNeutralPlayer2 && (
        <div>
          <h3>Neutral player 2</h3>
          <DicePlacement dicePlacements={neutralPlacements2} />
        </div>
      )}
    </div>
  );
};
