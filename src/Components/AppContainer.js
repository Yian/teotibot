/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { TileList } from "./Tiles/TileList";
import { Setup } from "./Setup/Setup";
import {
  appContainer,
  mainImg,
  start,
} from "./AppContainer.css";
import {shuffle} from "lodash";
import {
  baseBotTiles,
  initialOrdering,
  baseStartTiles,
  StartScreen,
  SetupScreen,
  AppScreen,
  OptionsScreen,
  diceFaces,
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
      img.src = `${process.env.PUBLIC_URL}/${tile.src}.png`;
    });

    baseStartTiles.forEach((tile) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/startTiles/base/${tile.name}.jpg`;
    });

    const img1 = new Image();
    img1.src = `${process.env.PUBLIC_URL}/test.jpg`;

    const img2 = new Image();
    img2.src = `${process.env.PUBLIC_URL}/late-preclassic.jpg`;

    const img3 = new Image();
    img3.src = `${process.env.PUBLIC_URL}/xitle.jpg`;

    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}/blank.png`;

    diceFaces.forEach((dface) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/dice/${dface}.png`;
    });
  }

  incrementCycleCount = () => {
    this.setState({
      cycleCount: this.state.cycleCount + 1,
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
      screenMode: OptionsScreen,
    });
  };

  app = () => {
    this.setState({
      screenMode: AppScreen
    })
  }
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
            css={{}}
            onClick={() => this.options(SetupScreen)}
            src="./resources/settings.png"
            alt="Settings"
          />
          <span onClick={() => this.app()}>Continue</span>
          <Setup isXitle={this.state.isXitle} isPriestAndPriestess={this.state.isPriestAndPriestess} />
        </div>
      );
    } else if (this.state.screenMode === AppScreen) {
      return (
        <TileList
          addToHistory={this.addToShuffleHistory}
          incrementCycle={this.incrementCycleCount}
          back={this.back}
          isXitle={this.setState.isXitle}
          lastPlayerIndex={this.state.lastPlayerIndex}
          cycleCount={this.state.cycleCount}
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
