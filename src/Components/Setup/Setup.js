/** @jsx jsx */
import { useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { StartTiles } from "./StartTiles";
import { TechTiles } from "./TechTiles";
import { TempleTiles } from "./TempleTiles";
import {
  setupContainer,
} from "./Setup.css";
import { DicePlacement } from "./DicePlacement";
import {
  actionNames,
  baseStartTiles,
  diceFaces,
  getRandom,
} from "../Constants";
import {find, remove, union, cloneDeep, shuffle} from "lodash";
import { StartingResources } from "./StartingResources";

export const Setup = (props) => {
  const [selectedStartTiles, setSelectedStartTiles] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [remainingStartTiles, setRemainingStartTiles] = useState([]);
  const [playerPlacements, setPlayerPlacements] = useState([]);
  const [teotibotPlacements, setTeotibotPlacements] = useState([]);
  const [neutralPlacements1, setNeutralPlacements1] = useState([]);
  const [neutralPlacements2, setNeutralPlacements2] = useState([]);
  const [showStartingResources, setShowStartingResources] = useState(false);
  const [showPlayerPlacements, setShowPlayerPlacements] = useState(false);
  const [showTechs, setShowTechs] = useState(false);
  const [showTemples, setShowTemples] = useState(false);
  const [showStartTiles, setShowStartTiles] = useState(false);
  const [showTeotibotDice, setShowTeotibotDice] = useState(false);
  const [showNeutralPlayer1, setShowNeutralPlayer1] = useState(false);
  const [showNeutralPlayer2, setShowNeutralPlayer2] = useState(false);

  const noNeutralDice = 3;

  function getRandomArrayIndex(arr) {
    return Math.floor(Math.random() * (arr.length - 1)) + 1;
  }

  function getActionItem(item) {
    return find(actionNames, ["value", item]);
  }

  const getNeutralPlacement = useCallback((shuffledTiles) => {
    //Draw 2 random start tiles
    let index = getRandomArrayIndex(shuffledTiles);
    let numbers1 = shuffledTiles[index].numbers;

    shuffledTiles.splice(index, 1);

    index = getRandomArrayIndex(shuffledTiles);
    let numbers2 = shuffledTiles[index].numbers;

    shuffledTiles.splice(index, 1);

    let mergedActions = union(numbers1, numbers2);

    //Get the 3 dice values
    let dice = getRandom(diceFaces, noNeutralDice);

    return [
      {
        diceFace: dice[0],
        number: [mergedActions[0]],
        actionName: getActionItem(mergedActions[0]).name,
        color: getActionItem(mergedActions[0]).color,
      },
      {
        diceFace: dice[1],
        number: [mergedActions[1]],
        actionName: getActionItem(mergedActions[1]).name,
        color: getActionItem(mergedActions[1]).color,
      },
      {
        diceFace: dice[2],
        number: [mergedActions[2]],
        actionName: getActionItem(mergedActions[2]).name,
        color: getActionItem(mergedActions[2]).color,
      },
    ];
  }, []);

  const getPlayerPlacements = useCallback((selectedStartTiles) => {
    let actions = [];

    selectedStartTiles.forEach((selectedStartTile) => {
      actions = union([...actions, ...selectedStartTile.numbers]);
    });

    return [
      {
        diceFace: diceFaces[0],
        number: [actions[0]],
        actionName: getActionItem(1).name,
        color: getActionItem(1).color,
      },
      {
        diceFace: diceFaces[0],
        number: [actions[1]],
        actionName: getActionItem(2).name,
        color: getActionItem(2).color,
      },
      {
        diceFace: diceFaces[0],
        number: [actions[2]],
        actionName: getActionItem(3).name,
        color: getActionItem(3).color,
      },
    ];
  }, []);

  const calcDicePlacements = useCallback(() => {
    let shuffledTiles = shuffle(remainingStartTiles);
    setPlayerPlacements(getPlayerPlacements(selectedStartTiles));
    setTeotibotPlacements(getNeutralPlacement(shuffledTiles));
    setNeutralPlacements1(getNeutralPlacement(shuffledTiles));
    setNeutralPlacements2(getNeutralPlacement(shuffledTiles));
  }, [
    selectedStartTiles,
    getPlayerPlacements,
    getNeutralPlacement,
    remainingStartTiles,
  ]);

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
      setShowPlayerPlacements(true);
      setShowTeotibotDice(true);
      setShowNeutralPlayer1(true);
      setShowNeutralPlayer2(true);
      setShowStartingResources(true);
    } else {
      setShowPlayerPlacements(false);
      setShowTeotibotDice(false);
      setShowNeutralPlayer1(false);
      setShowNeutralPlayer2(false);
      setShowStartingResources(false);
      setNeutralPlacements1([]);
      setNeutralPlacements2([]);
      setTeotibotPlacements([]);
      setSelectedResources([]);
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
          <h4>Upgrade tiles</h4>
          <TechTiles isXitle={props.isXitle} />
        </div>
      )}
      {showTemples && (
        <div>
          <h4>Temple tiles</h4>
          <TempleTiles isXitle={props.isXitle} />
        </div>
      )}
      {showStartTiles && (
        <div>
          {" "}
          <h4>Select 2 tiles:</h4>
          <StartTiles isXitle={props.isXitle} selectedStartTiles={selectedTile} />
        </div>
      )}
      {showStartingResources && (
        <div>
          <h4>Starting Resources:</h4>
          <StartingResources startingResources={selectedResources} />
        </div>
      )}
      {showPlayerPlacements && (
        <div>
          <span>Starting Placements:</span>
          <DicePlacement dicePlacements={playerPlacements} />
        </div>
      )}
      {showTeotibotDice && (
        <div>
          <h4>Teotibot Placement</h4>
          <DicePlacement dicePlacements={teotibotPlacements} />
        </div>
      )}
      {showNeutralPlayer1 && (
        <div>
          <h4>Neutral player 1</h4>
          <DicePlacement dicePlacements={neutralPlacements1} />
        </div>
      )}
      {showNeutralPlayer2 && (
        <div>
          <h4>Neutral player 2</h4>
          <DicePlacement dicePlacements={neutralPlacements2} />
        </div>
      )}
    </div>
  );
};
