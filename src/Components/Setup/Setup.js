/** @jsx jsx */
import { useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { StartTiles } from "./StartTiles";
import { TechTiles } from "./TechTiles";
import { TempleTiles } from "./TempleTiles";
import { useTransition, a } from "@react-spring/web";
import { startResource, resourceContainer, setupContainer } from "./Setup.css";
import find from "lodash.find";
import remove from "lodash.remove";
import { DicePlacement } from "./DicePlacement";
import { baseStartTiles, diceFaces, getRandom } from "../Constants";
import union from "lodash.union";
import sortBy from "lodash.sortby";
import shuffle from "lodash.shuffle";

export const Setup = (props) => {
  const [selectedStartTiles, setSelectedStartTiles] = useState([]);
  const [remainingStartTiles, setRemainingStartTiles] = useState([]);
  const [teotibotPlacements, setTeotibotPlacements] = useState([]);
  const [neutralPlacements1, setNeutralPlacements1] = useState([]);
  const [neutralPlacements2, setNeutralPlacements2] = useState([]);
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

  const getNeutralPlacement = useCallback((shuffledTiles) => {
    //Draw 2 random start tiles
    let index = getRandomArrayIndex(shuffledTiles);
    console.log(shuffledTiles);
    console.log(index);
    let numbers1 = shuffledTiles[index].numbers;

    shuffledTiles.splice(index, 1);

    index = getRandomArrayIndex(shuffledTiles);
    let numbers2 = shuffledTiles[index].numbers;

    shuffledTiles.splice(index, 1);

    let mergedNumbers = union(numbers1, numbers2);

    //Get the 3 dice values
    let dice = getRandom(diceFaces, noNeutralDice);

    return [
      { diceFace: dice[0], number: [mergedNumbers[0]] },
      { diceFace: dice[1], number: [mergedNumbers[1]] },
      { diceFace: dice[2], number: [mergedNumbers[2]] },
    ];
  }, []);

  const calcDicePlacements = useCallback(() => {
    let shuffledTiles = shuffle(remainingStartTiles);
    setTeotibotPlacements(getNeutralPlacement(shuffledTiles));
    setNeutralPlacements1(getNeutralPlacement(shuffledTiles));
    setNeutralPlacements2(getNeutralPlacement(shuffledTiles));
  }, [getNeutralPlacement, remainingStartTiles]);

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
      setShowTeotibotDice(true);
      setShowNeutralPlayer1(true);
      setShowNeutralPlayer2(true);
    } else {
      setNeutralPlacements1([]);
      setNeutralPlacements2([]);
      setTeotibotPlacements([]);
      setShowTeotibotDice(false);
      setShowNeutralPlayer1(false);
      setShowNeutralPlayer2(false);
    }
  }, [selectedStartTiles]);

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
    arr.push({
      type: `no${tileNumber}`,
      x:
        i === 0
          ? arr[length - 1].x + 200
          : arr[length - 1].x + arrTileNumbers.length * 20,
    });

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
  };

  function getResources(selectedStartTiles) {
    if (selectedStartTiles.length >= 2) {
      const resources = [];
      let numbers = [];
      let result = [];

      selectedStartTiles.forEach((selectedStartTile) => {
        result = mergeResources(
          resources,
          sortBy(selectedStartTile.resources, ["quantity", "type"])
        );
      });

      selectedStartTiles.forEach((selectedStartTile) => {
        numbers = [...numbers, ...selectedStartTile.numbers];
      });

      result = mergeNumbers(resources, union(numbers));

      return result;
    }
  }

  const transitions = useTransition(getResources(selectedStartTiles), {
    key: (item) => item.name,
    from: ({ x }) => ({ x, y: 0, opacity: 0 }),
    enter: ({ x }) => ({ x, y: 300, opacity: 1 }),
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
    <div css={setupContainer}>
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
                  `${process.env.PUBLIC_URL}/resources/${item.type}.png`
                }
              />
            </div>
          </a.div>
        );
      })}
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
