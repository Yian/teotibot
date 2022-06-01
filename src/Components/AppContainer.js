/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { TileList } from "./Tiles/TileList";
import { Setup } from "./Setup/Setup";
import {
  appContainer,
  mainImg,
  start,
  optionsButton,
} from "./AppContainer.css";
import shuffle from "lodash";
import {
  baseBotTiles,
  directionTiles,
  initialOrdering,
  initialDirectionOrdering,
  baseStartTiles,
  StartScreen,
  SetupScreen,
  AppScreen,
  OptionsScreen,
} from "./Constants";
import { Options } from "./Options";

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenMode: StartScreen,
      lastScreen: StartScreen,
      isOptions: false,
      playerCount: 5,
      cycleCount: 0,
      lastPlayerIndex: 4,
      tiles: baseBotTiles,
      directionTiles,
      ordering: shuffle(initialOrdering),
      directionOrdering: shuffle(initialDirectionOrdering),
      isXitle: false,
      isPriestAndPriestess: false,
      isHeightOfDevelopment: false,
      isSeasonsOfProgress: false,
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

  setIsXitle = (isXitle) => {
    this.setState({
      isXitle,
    });
  };

  onChangeXitle = (e) => {
    this.setIsXitle(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsPriestAndPriestess = (isPriestAndPriestess) => {
    this.setState({
      isPriestAndPriestess,
    });
  };

  onChangeIsPriestAndPriestess = (e) => {
    this.setIsPriestAndPriestess(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsSeasonsOfProgress = (isSeasonsOfProgress) => {
    this.setState({
      isSeasonsOfProgress,
    });
  };

  onChangeIsSeasonsOfProgress = (e) => {
    this.setIsSeasonsOfProgress(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsHeightOfDevelopment = (isHeightOfDevelopment) => {
    this.setState({
      isHeightOfDevelopment,
    });
  };

  onChangeIsHeightOfDevelopment = (e) => {
    this.setIsHeightOfDevelopment(
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
      screenMode: this.state.lastScreen,
    });
  };

  options = (lastScreen) => {
    this.setState({
      lastScreen,
      screenMode: 4,
    });
  };

  renderApp = () => {
    if (this.state.screenMode === StartScreen) {
      return (
        <ul css={start}>
          <div css={mainImg} />
          <li onClick={this.start}>Start</li>
          <li onClick={() => this.options(StartScreen)}>Options</li>
        </ul>
      );
    } else if (this.state.screenMode === SetupScreen) {
      return (
        <div>
          <img
            css={optionsButton}
            onClick={() => this.options(SetupScreen)}
            src="/settings.png"
            alt="settings"
          />
          <Setup isXitle={this.state.isXitle} isPriestAndPriestess={this.state.isPriestAndPriestess} />
        </div>
      );
    } else if (this.state.screenMode === AppScreen) {
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
    } else if (this.state.screenMode === OptionsScreen) {
      return (
        <Options
          isXitle={this.state.isXitle}
          onChangeXitle={this.onChangeXitle}
          isPriestAndPriestess={this.state.isPriestAndPriestess}
          onChangeIsPriestAndPriestess={this.onChangeIsPriestAndPriestess}
          isSeasonsOfProgress={this.state.isSeasonsOfProgress}
          onChangeIsSeasonsOfProgress={this.onChangeIsSeasonsOfProgress}
          isHeightOfDevelopment={this.state.isHeightOfDevelopment}
          onChangeIsHeightOfDevelopment={this.onChangeIsHeightOfDevelopment}
          back={this.back}
        />
      );
    }
  };

  render() {
    return <div css={appContainer}>{this.renderApp()}</div>;
  }
}
