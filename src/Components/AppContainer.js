/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { TileList } from "./Tiles/TileList";
import { Setup } from "./Setup/Setup";
import { Checkbox } from "./Checkbox";
import { PlayerSelector } from "./PlayerSelector";
import { appContainer, mainImg, start, options } from "./AppContainer.css";
import { activeText } from "./Tiles/TileList.css";
import shuffle from "lodash";
import {
  baseBotTiles,
  directionTiles,
  initialOrdering,
  initialDirectionOrdering,
  baseStartTiles,
} from "./Constants";

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenMode: 1,
      isOptions: false,
      playerCount: 5,
      cycleCount: 0,
      lastPlayerIndex: 4,
      tiles: baseBotTiles,
      directionTiles,
      ordering: shuffle(initialOrdering),
      directionOrdering: shuffle(initialDirectionOrdering),
      isXitle: false,
      shuffleHistory: [
        {
          cycle: 0,
          order: initialOrdering,
          wasShuffled: true,
        },
      ],
    };
  }

  componentDidMount() {
    //Preloading images
    baseBotTiles.forEach((tile) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/${tile.name}.png`;
    });

    baseStartTiles.forEach((tile) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/StartTiles/base/${tile.name}.jpg`;
    });

    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}/blank.png`;
  }

  incrementCycleCount = () => {
    this.setState({
      cycleCount: this.state.cycleCount + 1,
    });
  };

  setPlayerCount = (playerCount) => {
    var lastPlayerIndex = playerCount - 1;
    var tilesToUse = baseBotTiles;

    this.setState({
      playerCount,
      lastPlayerIndex,
      tiles: [],
    });

    //hack to get highlighting working
    setTimeout(() => {
      this.setState({
        tiles: tilesToUse,
      });
    });
  };

  setIsXitle = isXitle => {
    this.setState({
      isXitle,
    });
  };

  onChangeXitle = e => {
    this.setIsXitle(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  addToShuffleHistory = (newValue) => {
    var newHistory = [...this.state.shuffleHistory, newValue];
    this.setState({
      shuffleHistory: newHistory,
    });
  };

  setOrdering = (newOrder) => {
    this.setState({
      ordering: newOrder,
    });
  };

  setDirectionOrdering = (newOrder) => {
    this.setState({
      directionOrdering: newOrder,
    });
  };

  setHadesActive = () => {
    this.setState({
      hadesActive: true,
    });
  };

  resetHades = () => {
    this.setState({
      hadesTotal: 0,
    });
  };

  setHades = (total) => {
    this.setState({
      hadesTotal: total,
    });
  };

  start = () => {
    this.setState({
      screenMode: 2,
      hadesTotal: 0,
      hadesActive: false,
      cycleCount: 0,
    });
  };

  back = () => {
    this.setState({
      screenMode: 1,
    });
  };

  options = () => {
    this.setState({
      screenMode: 4,
    });
  };

  renderApp = () => {
    if (this.state.screenMode === 1) {
      return (
        <ul css={start}>
          <div css={mainImg} />
          <li onClick={this.start}>Start</li>
          <li onClick={this.options}>Options</li>
        </ul>
      );
    } else if (this.state.screenMode === 2) {
      return <Setup isXitle={this.state.isXitle} />;
    } else if (this.state.screenMode === 3) {
      return (
        <TileList
          ordering={this.state.ordering}
          directionOrdering={this.state.directionOrdering}
          setOrdering={this.setOrdering}
          setDirectionOrdering={this.setDirectionOrdering}
          addToHistory={this.addToShuffleHistory}
          incrementCycle={this.incrementCycleCount}
          back={this.back}
          isXitle={this.setState.isXitle}
          lastPlayerIndex={this.state.lastPlayerIndex}
          cycleCount={this.state.cycleCount}
          tiles={this.state.tiles}
          directionTiles={this.state.directionTiles}
          shuffleHistory={this.state.shuffleHistory}
          playerCount={this.state.playerCount}
          defaultFavorTiles={this.state.defaultFavorTiles}
          dice1={this.state.dice1}
          dice2={this.state.dice2}
        />
      );
    } else if (this.state.screenMode === 4) {
      return (
        <div css={options}>
          <div css={activeText} onClick={this.back}>
            back
          </div>
          <div className={"checkbox-container"}>
            <Checkbox
              label="Shadow of Xitle"
              checked={this.state.isXitle}
              onChange={this.onChangeXitle}
            />
          </div>
        </div>
      );
    }
  };

  render() {
    return <div css={appContainer}>{this.renderApp()}</div>;
  }
}
