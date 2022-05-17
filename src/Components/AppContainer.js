/** @jsx jsx */
import React from "react";
import { jsx } from '@emotion/react';
import { TileList } from "./TileList";
import { Checkbox } from "./Checkbox";
import { PlayerSelector } from "./PlayerSelector";
import { appContainer, mainImg, start, options } from "./AppContainer.css";
import { activeText } from "./TileList.css";

const initialGodOrdering = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const players = [3, 4, 5, 6];

const baseBotTiles = [
  { name: "alchemy" },
  { name: "construction" },
  { name: "decorations" },
  { name: "mask_collection" },
  { name: "mastery" },
  { name: "nobles" },
  { name: "worship" },
  { name: "left" },
  { name: "right" },
];

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenMode: 1,
      isOptions: false,
      playerCount: 5,
      players,
      cycleCount: 0,
      lastPlayerIndex: 4,
      tiles: baseBotTiles,
      ordering: initialGodOrdering,
      shuffleHistory: [
        {
          cycle: 0,
          order: initialGodOrdering,
          wasShuffled: true
        }
      ]
    };
  }

  componentDidMount() {
    baseBotTiles.forEach((picture) => {
        const img = new Image();
        img.src = process.env.PUBLIC_URL + "/" + picture + ".png";
    });

    const img = new Image();
    img.src = process.env.PUBLIC_URL + "/" + "blank.png";
}

  incrementCycleCount = () => {
    this.setState({
      cycleCount: this.state.cycleCount + 1
    });
  };

  setPlayerCount = playerCount => {
    var lastPlayerIndex = playerCount - 1;
    var tilesToUse = baseBotTiles

    this.setState({
      playerCount,
      lastPlayerIndex,
      tiles: []
    });

    //hack to get highlighting working
    setTimeout(() => {
      this.setState({
        tiles: tilesToUse
      });
    });
  };

  addToShuffleHistory = newValue => {
    var newHistory = [...this.state.shuffleHistory, newValue];
    this.setState({
      shuffleHistory: newHistory
    });
  };

  setOrdering = newOrder => {
    this.setState({
      ordering: newOrder
    });
  };

  setHadesActive = () => {
    this.setState({
      hadesActive: true
    });
  };

  resetHades = () => {
    this.setState({
      hadesTotal: 0
    });
  };

  setHades = (total) => {
    this.setState({
      hadesTotal: total
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
      screenMode: 1
    });
  };

  options = () => {
    this.setState({
      screenMode: 3
    });
  };

  renderApp = () => {
    if (this.state.screenMode === 1) {
      return (
        <ul css={start}>
          <div css={mainImg} />
          <li onClick={this.start}>Start</li>
          <li onClick={this.options}>
            Options
          </li>
        </ul>
      );
    } else if (this.state.screenMode === 2) {
      return (
        <TileList
          ordering={this.state.ordering}
          setOrdering={this.setOrdering}
          addToHistory={this.addToShuffleHistory}
          incrementCycle={this.incrementCycleCount}
          rollForHades={this.rollForHades}
          setHadesActive={this.setHadesActive}
          resetHades={this.resetHades}
          setHades={this.setHades}
          back={this.back}
          lastPlayerIndex={this.state.lastPlayerIndex}
          cycleCount={this.state.cycleCount}
          tiles={this.state.tiles}
          isTitans={this.state.isTitans}
          isHades={this.state.isHades}
          isFavors={this.state.isFavors}
          shuffleHistory={this.state.shuffleHistory}
          playerCount={this.state.playerCount}
          hadesActive={this.state.hadesActive}
          setFavorTiles={this.setFavorTiles}
          favorTiles={this.state.favorTiles}
          defaultFavorTiles={this.state.defaultFavorTiles}
          dice1={this.state.dice1}
          dice2={this.state.dice2}
        />
      );
    } else if (this.state.screenMode === 3) {
      return (
        <div css={options}>
          <div css={activeText} onClick={this.back}>
            back
          </div>
          <PlayerSelector
            isTitans={this.state.isTitans}
            players={this.state.players}
            playerCount={this.state.playerCount}
            setPlayerCount={this.setPlayerCount}
          />
          <div className={"checkbox-container"}>
            <Checkbox
              label="Titans"
              checked={this.state.isTitans}
              onChange={this.onChangeTitans}
            />
            <Checkbox
              label="Hades"
              checked={this.state.isHades}
              onChange={this.onChangeHades}
            />
            <Checkbox
              label="Favors"
              checked={this.state.isFavors}
              onChange={this.onChangeFavors}
            />
            <Checkbox
              label="Hecate"
              checked={this.state.isHecate}
              onChange={this.onChangeHecate}
              className={!this.state.isFavors && "disabled"}
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
