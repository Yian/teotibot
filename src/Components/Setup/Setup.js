/** @jsx jsx */
import { useRef, useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { StartTiles } from "./StartTiles";
import { TechTiles } from "./TechTiles";
import { TempleTiles } from "./TempleTiles";
import { setupContainer } from "./Setup.css";
import { DicePlacement } from "./DicePlacement";
import {
  actionNames,
  baseStartTiles,
  diceFaces,
  xitleStartTiles,
} from "../Constants";
import { find, remove, union, cloneDeep, shuffle } from "lodash";
import { StartingResources } from "./StartingResources";
import { PriestPriestessTiles } from "./PriestPriestessTiles";
import ReactTooltip from "react-tooltip";
import { getActionItem, getNeutralArray, getPlayerArray } from "../Logic";

export const Setup = (props) => {
  const startTileRef = useRef(null);
  const resourceRef = useRef(null);
  const priestessRef = useRef(null);
  const teotibotPlacementRef = useRef(null);
  const playerPlacementRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [selectedStartTiles, setSelectedStartTiles] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [remainingStartTiles, setRemainingStartTiles] = useState([]);
  const [playerPlacements, setPlayerPlacements] = useState([]);
  const [teotibotPlacements, setTeotibotPlacements] = useState([]);
  const [neutralPlacements1, setNeutralPlacements1] = useState([]);
  const [neutralPlacements2, setNeutralPlacements2] = useState([]);
  const [showStartingResources, setShowStartingResources] = useState(false);
  const [showPlayerPlacements, setShowPlayerPlacements] = useState(false);
  const [showTechs, setShowTechs] = useState(true);
  const [showTemples, setShowTemples] = useState(false);
  const [showStartTiles, setShowStartTiles] = useState(false);
  const [showPlayerPriestPriestessTiles, setShowPlayerPriestPriestessTiles] =
    useState(false);
  const [
    showTeotibotPriestPriestessTiles,
    setShowTeotibotPriestPriestessTiles,
  ] = useState(false);
  const [showTeotibotDice, setShowTeotibotDice] = useState(false);
  const [showNeutralPlayer1, setShowNeutralPlayer1] = useState(false);
  const [showNeutralPlayer2, setShowNeutralPlayer2] = useState(false);

  const getNeutralPlacement = useCallback((shuffledTiles) => {
    return getNeutralArray(shuffledTiles);
  }, []);

  const getPlayerPlacements = useCallback((selectedStartTiles) => {
    return getPlayerArray(selectedStartTiles)
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
      item.key = arr.length;
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
        props.startTiles.filter((el) => {
          return (
            el.name !== selectedStartTiles[0].name &&
            el.name !== selectedStartTiles[1].name
          );
        })
      );
      setSelectedResources(getResources(selectedStartTiles));
      setShowStartingResources(true);
    } else {
      setShowPlayerPlacements(false);
      setShowTeotibotDice(false);
      setShowNeutralPlayer1(false);
      setShowNeutralPlayer2(false);
      setShowStartingResources(false);
      setShowPlayerPriestPriestessTiles(false);
      setShowTeotibotPriestPriestessTiles(false);
      setHasScrolled(false);
      setNeutralPlacements1([]);
      setNeutralPlacements2([]);
      setTeotibotPlacements([]);
      setSelectedResources([]);
    }
  }, [getResources, selectedStartTiles]);

  useEffect(() => {
    if (remainingStartTiles.length > 0) {
      calcDicePlacements();
    }
  }, [calcDicePlacements, remainingStartTiles.length]);

  useEffect(() => {
    if (showStartTiles) {
      setTimeout(() => {
        startTileRef.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [showStartTiles]);

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

  const onRest = () => {
    if (showTechs) {
      setShowTemples(true);
    }
    if (showTemples) {
      setShowStartTiles(true);
    }
    if (showStartingResources) {
      if (props.isPriestAndPriestess) {
        setShowPlayerPriestPriestessTiles(true);
      } else {
        scrollIntoView(resourceRef)
        setShowPlayerPlacements(true);
      }
    }
    if (showTeotibotDice) {
      scrollIntoView(teotibotPlacementRef)
      setShowNeutralPlayer1(true);
    }
    if (showNeutralPlayer1) {
      scrollIntoView(teotibotPlacementRef, true)
      setShowNeutralPlayer2(true);
    }
    if (showPlayerPlacements) {
      if (props.isPriestAndPriestess) {
        setShowTeotibotPriestPriestessTiles(true);
        return;
      } else {
        scrollIntoView(playerPlacementRef);
        setShowTeotibotDice(true);
      }
    }
  };

  const onExpansionRest = () => {
    if (showPlayerPriestPriestessTiles) {
      scrollIntoView(priestessRef);
      setShowPlayerPlacements(true);
    }
    if (showTeotibotPriestPriestessTiles) {
      setShowTeotibotDice(true);
    }
  };

  const scrollIntoView = (ref, finishScroll) => {
    if (!hasScrolled) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    if (finishScroll) {
      setHasScrolled(true);
    }
  }

  return (
    <div css={setupContainer}>
      {showTechs && (
        <div>
          <ReactTooltip multiline={true} clickable={false} />
          <h4>Upgrade tiles</h4>
          <TechTiles isXitle={props.isXitle} onRest={onRest} />
        </div>
      )}
      {showTemples && (
        <div>
          <ReactTooltip multiline={true} />
          <h4>Temple tiles</h4>
          <TempleTiles isXitle={props.isXitle} onRest={onRest} />
        </div>
      )}
      <div ref={startTileRef}>
        {showStartTiles && (
          <div>
            <ReactTooltip multiline={true} />
            <h4>Select 2 Start Tiles:</h4>
            <StartTiles
              startTiles={props.startTiles}
              isXitle={props.isXitle}
              selectedStartTiles={selectedTile}
            />
          </div>
        )}
      </div>
      <div ref={resourceRef}>
        {showStartingResources && (
          <div>
            <h4>Starting resources:</h4>
            <StartingResources
              startingResources={selectedResources}
              onRest={onRest}
            />
          </div>
        )}
      </div>
      <div ref={priestessRef}>
        {showPlayerPriestPriestessTiles && (
          <div>
            <h4>Priest/Priestess tiles:</h4>
            <PriestPriestessTiles numberToPick={2} onRest={onExpansionRest} />
          </div>
        )}
      </div>
      <div ref={playerPlacementRef}>
        {showPlayerPlacements && (
          <div>
            <h4>Player placements:</h4>
            <DicePlacement dicePlacements={playerPlacements} onRest={onRest} />
          </div>
        )}
      </div>
      {showTeotibotPriestPriestessTiles && (
        <div>
          <h4>Teotibot Priest/Priestess tile:</h4>
          <PriestPriestessTiles
            numberToPick={1}
            isTeotibot={true}
            onRest={onExpansionRest}
          />
        </div>
      )}
      <div ref={teotibotPlacementRef}>
        {showTeotibotDice && (
          <div>
            <h4>Teotibot placement:</h4>
            <DicePlacement
              dicePlacements={teotibotPlacements}
              onRest={onRest}
            />
          </div>
        )}
      </div>
      {showNeutralPlayer1 && (
        <div>
          <h4>Neutral player 1:</h4>
          <DicePlacement dicePlacements={neutralPlacements1} onRest={onRest} />
        </div>
      )}
      {showNeutralPlayer2 && (
        <div>
          <h4>Neutral player 2:</h4>
          <DicePlacement dicePlacements={neutralPlacements2} />
        </div>
      )}
    </div>
  );
};
