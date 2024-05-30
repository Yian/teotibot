/** @jsx jsx */
import { useRef, useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { StartTiles } from "./StartTiles";
import { TechTiles } from "./TechTiles";
import { TempleTiles } from "./TempleTiles";
import { RoyalTiles } from "./RoyalTiles";
import {
  btnContinue,
  orangeTemple,
  setupContainer,
  setupSection,
} from "./Setup.css";
import { DicePlacement } from "./DicePlacement";
import { find, remove, cloneDeep, shuffle } from "lodash";
import { StartingResources } from "./StartingResources";
import { PriestPriestessTiles } from "./PriestPriestessTiles";
import {
  getActionItemByValue,
  getNeutralArray,
  getPlayerArray,
  getRandomArrayIndex,
  getTeotibotArray,
} from "../Logic";
import {
  baseStartTiles,
  xitleStartTiles,
  initialTeotibotStartingResources,
  periodStartTiles,
  baseTechTiles,
  baseRoyalTiles,
  xitleTechTiles,
  periodTechTiles,
  baseTempleTiles,
  basePriestPriestessTiles,
  baseTeotiPriestPriestessTiles,
  obsidianPriestPriestessTiles,
  altarsAndShamansPriestPriestessTiles,
  getActionImage,
} from "../Constants";

export const Setup = (props) => {
  const startTileRef = useRef(null);
  const playerResourceRef = useRef(null);
  const teotibotResourceRef = useRef(null);
  const neutralPlayerResourceRef = useRef(null);
  const continueRef = useRef(null);
  const [startTiles, setStartTiles] = useState([]);
  const [techTiles, setTechTiles] = useState([]);
  const [templeTiles, setTempleTiles] = useState([]);
  const [royalTiles, setRoyalTiles] = useState([]);
  const [priestPriestessTiles, setPriestPriestessTiles] = useState([]);
  const [teotibotPriestPriestessTiles, setTeotibotPriestPriestessTiles] =
    useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [selectedStartTiles, setSelectedStartTiles] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [teotibotStartingResources, setTeotibotStartingResources] = useState(
    initialTeotibotStartingResources(
      props.teotibotStartingGold,
      props.teotibotStartingWood,
      props.teotibotStartingStone
    )
  );
  const [remainingStartTiles, setRemainingStartTiles] = useState([]);
  const [playerPlacements, setPlayerPlacements] = useState([]);
  const [teotibotPlacements, setTeotibotPlacements] = useState([]);
  const [teotibotShamanPlacement, setTeotibotShamanPlacement] = useState([]);
  const [neutralPlacements1, setNeutralPlacements1] = useState([]);
  const [neutralPlacements2, setNeutralPlacements2] = useState([]);
  const [showPlayerStartingResources, setShowPlayerStartingResources] =
    useState(false);
  const [showTeotibotStartingResources, setShowTeotibotStartingResources] =
    useState(false);
  const [showPlayerPlacements, setShowPlayerPlacements] = useState(false);
  const [showTechs, setShowTechs] = useState(true);
  const [showTemples, setShowTemples] = useState(false);
  const [showRoyalTiles, setShowRoyalTiles] = useState(false);
  const [showStartTiles, setShowStartTiles] = useState(false);
  const [showPlayerPriestPriestessTiles, setShowPlayerPriestPriestessTiles] =
    useState(false);
  const [showIsHeightOfDevelopment, setShowIsHeightOfDevelopment] =
    useState(false);
  const [showIsAltarsAndShamans, setShowIsAltarsAndShamans] = useState(false);
  const [
    showTeotibotPriestPriestessTiles,
    setShowTeotibotPriestPriestessTiles,
  ] = useState(false);
  const [showTeotibotDice, setShowTeotibotDice] = useState(false);
  const [showNeutralPlayer1, setShowNeutralPlayer1] = useState(false);
  const [showNeutralPlayer2, setShowNeutralPlayer2] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const getTeotibotPlacement = useCallback(() => {
    return getTeotibotArray(
      props.teotibotWorkerPowerForAction4,
      props.teotibotWorkerPowerForAction6,
      props.teotibotWorkerPowerForAction8
    );
  }, []);

  const getShamanPlacement = useCallback((shuffledTiles) => {
    let index = getRandomArrayIndex(shuffledTiles);
    return shuffledTiles[index].numbers[0];
  }, []);

  const getNeutralPlacement = useCallback((shuffledTiles) => {
    return getNeutralArray(shuffledTiles);
  }, []);

  const getPlayerPlacements = useCallback((selectedStartTiles) => {
    return getPlayerArray(selectedStartTiles);
  }, []);

  const calcDicePlacements = useCallback(() => {
    let shuffledTiles = shuffle(cloneDeep(remainingStartTiles));
    setPlayerPlacements(getPlayerPlacements(selectedStartTiles));
    setTeotibotPlacements(getTeotibotPlacement());
    setTeotibotShamanPlacement(getShamanPlacement(shuffledTiles));
    setNeutralPlacements1(getNeutralPlacement(shuffledTiles));
    setNeutralPlacements2(getNeutralPlacement(shuffledTiles));
  }, [selectedStartTiles, remainingStartTiles]);

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

    //add 1 Cocoa for player start
    addResourceQuantities(result, { type: "cocoa", quantity: 1 });

    return result;
  }, []);

  useEffect(() => {
    let startTiles = baseStartTiles;
    let techTiles = baseTechTiles;
    let templeTiles = baseTempleTiles;
    let royalTiles = baseRoyalTiles;
    let priestPriestessTiles = basePriestPriestessTiles;
    let teotibotPriestPriestessTiles = baseTeotiPriestPriestessTiles;

    if (props.isXitle) {
      startTiles = [...startTiles, ...xitleStartTiles];
      techTiles = [...techTiles, ...xitleTechTiles];
    }

    if (props.isObsidian) {
      startTiles = [...startTiles, ...periodStartTiles];
      techTiles = [...techTiles, ...periodTechTiles];
      priestPriestessTiles = [
        ...priestPriestessTiles,
        ...obsidianPriestPriestessTiles,
      ];
    }

    if (props.isAltarsAndShamans) {
      priestPriestessTiles = [
        ...priestPriestessTiles,
        ...altarsAndShamansPriestPriestessTiles,
      ];
    }

    setStartTiles(startTiles);
    setTechTiles(techTiles);
    setTempleTiles(templeTiles);
    setRoyalTiles(royalTiles);
    setPriestPriestessTiles(priestPriestessTiles);
    setTeotibotPriestPriestessTiles(teotibotPriestPriestessTiles);
  }, [props.isXitle, props.isObsidian, props.isAltarsAndShamans]);

  useEffect(() => {
    if (selectedStartTiles.length >= 2) {
      setRemainingStartTiles(
        startTiles.filter((el) => {
          return (
            el.name !== selectedStartTiles[0].name &&
            el.name !== selectedStartTiles[1].name
          );
        })
      );
      setSelectedResources(getResources(selectedStartTiles));
      setShowPlayerStartingResources(true);
    } else {
      setShowPlayerPlacements(false);
      setShowTeotibotDice(false);
      setShowNeutralPlayer1(false);
      setShowNeutralPlayer2(false);
      setShowPlayerStartingResources(false);
      setShowPlayerPriestPriestessTiles(false);
      setShowTeotibotPriestPriestessTiles(false);
      setShowTeotibotStartingResources(false);
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
      setShowRoyalTiles(true);
    }

    if (showRoyalTiles) {
      setShowStartTiles(true);
    }

    if (showPlayerStartingResources) {
      setShowPlayerPlacements(true);
      scrollIntoView(playerResourceRef);
      if (props.isPriestAndPriestess) {
        setShowPlayerPriestPriestessTiles(true);
      }
    }
    if (showPlayerPlacements) {
      setShowTeotibotStartingResources(true);
    }
    if (showTeotibotStartingResources) {
      if (props.isPriestAndPriestess) {
        setShowTeotibotPriestPriestessTiles(true);
      }
      if (props.isHeightOfDevelopment) {
        setShowIsHeightOfDevelopment(true);
      }
      if (props.isAltarsAndShamans) {
        setShowIsAltarsAndShamans(true);
      }
      scrollIntoView(teotibotResourceRef);
      setShowTeotibotDice(true);
    }
    if (showTeotibotDice) {
      setShowNeutralPlayer1(true);
    }
    if (showNeutralPlayer1) {
      scrollIntoView(neutralPlayerResourceRef);
      setShowNeutralPlayer2(true);
    }
    if (showNeutralPlayer2) {
      setShowContinue(true);
      scrollIntoView(continueRef, true);
    }
  };

  const scrollIntoView = (ref, finishScroll) => {
    if (!hasScrolled) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    if (finishScroll) {
      setHasScrolled(true);
    }
  };

  return (
    <div css={setupContainer}>
      {showTechs && (
        <div css={setupSection}>
          <h3>Technology Tiles</h3>
          <TechTiles techTiles={techTiles} onRest={onRest} />
        </div>
      )}
      {showTemples && (
        <div css={setupSection}>
          <h3>Temple Tiles</h3>
          <TempleTiles templeTiles={templeTiles} onRest={onRest} />
        </div>
      )}
      {showRoyalTiles && (
        <div css={setupSection}>
          <div css={setupSection}>
            <h3>Royal Tiles</h3>
            <RoyalTiles royalTiles={royalTiles} onRest={onRest} />
          </div>
        </div>
      )}
      <div css={setupSection} ref={startTileRef}>
        {showStartTiles && (
          <div>
            <h3>Select 2 Start Tiles:</h3>
            <StartTiles
              startTiles={startTiles}
              selectedStartTiles={selectedTile}
            />
          </div>
        )}
      </div>
      <div css={setupSection} ref={playerResourceRef}>
        <h2>Player setup</h2>
        {showPlayerStartingResources && (
          <div>
            <h3>Player Starting Resources:</h3>
            <StartingResources
              startingResources={selectedResources}
              onRest={onRest}
            />
          </div>
        )}
        {showPlayerPriestPriestessTiles && (
          <div css={setupSection}>
            <h3>Priest/Priestess Tiles:</h3>
            <PriestPriestessTiles
              priestPriestessTiles={priestPriestessTiles}
              numberToPick={2}
            />
          </div>
        )}
        {showPlayerPlacements && (
          <div css={setupSection}>
            <h3>Player Placements:</h3>
            <DicePlacement dicePlacements={playerPlacements} onRest={onRest} />
          </div>
        )}
      </div>
      <div css={setupSection} ref={teotibotResourceRef}>
        <h2>Teotibot Setup</h2>
        {showTeotibotStartingResources && (
          <div>
            <h3>Teotibot Starting Resources:</h3>
            <StartingResources
              startingResources={teotibotStartingResources}
              onRest={onRest}
            />
          </div>
        )}
        {showTeotibotPriestPriestessTiles && (
          <div>
            <h3>Teotibot Priest/Priestess Tile:</h3>
            <PriestPriestessTiles
              priestPriestessTiles={teotibotPriestPriestessTiles}
              numberToPick={1}
            />
          </div>
        )}
        {showTeotibotDice && (
          <div>
            <h3>Teotibot Placement:</h3>
            <DicePlacement
              dicePlacements={teotibotPlacements}
              onRest={onRest}
            />
            {showIsHeightOfDevelopment && (
              <div css={orangeTemple}>
                <h3>Height of development</h3>
                <span>
                  Place one of Teotibot's worshippers on the Temple Bonus tile
                  of the orange temple.{" "}
                  <img src={`${process.env.PUBLIC_URL}/resources/to.png`} />
                </span>
              </div>
            )}
            {showIsAltarsAndShamans && (
              <div css={orangeTemple}>
                <h3>Altars and Shamans</h3>
                <span>
                  Place the Shaman on the Major Discovery space of the first
                  Altar counter-clockwise from:
                </span>
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/actions/no${teotibotShamanPlacement}.png`}
                  />
                  {getActionItemByValue(teotibotShamanPlacement).name}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div css={setupSection} ref={neutralPlayerResourceRef}>
        <h2>Neutral Player Setup</h2>
        {showNeutralPlayer1 && (
          <div>
            <h3>Neutral player 1:</h3>
            <DicePlacement
              dicePlacements={neutralPlacements1}
              onRest={onRest}
            />
          </div>
        )}
        {showNeutralPlayer2 && (
          <div>
            <h3>Neutral player 2:</h3>
            <DicePlacement
              dicePlacements={neutralPlacements2}
              onRest={onRest}
            />
          </div>
        )}
      </div>
      <div ref={continueRef}>
        {showContinue && (
          <div css={btnContinue} onClick={props.startApp}>
            <span>Continue</span>
          </div>
        )}
      </div>
    </div>
  );
};
