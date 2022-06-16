/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { TileList } from "./Tiles/TileList";
import { Setup } from "./Setup/Setup";
import { appContainer, mainImg, start } from "./AppContainer.css";
import {
  baseBotTiles,
  baseStartTiles,
  xitleStartTiles,
  baseTechTiles,
  xitleTechTiles,
  baseTempleTiles,
  initialOrdering,
  StartScreen,
  SetupScreen,
  AppScreen,
  OptionsScreen,
  diceFaces,
} from "./Constants";
import { Options } from "./Options";
import { btnSettings, setup } from "./Setup/Setup.css";

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenMode: AppScreen,
      lastScreen: StartScreen,
      isOptions: false,
      isXitle: false,
      isPriestAndPriestess: false,
      isHeightOfDevelopment: false,
      isSeasonsOfProgress: false,
      startTiles: baseStartTiles,
      isAlternateTeotibotMovement: false,
      teotibotStartingGold: 2,
      teotibotStartingWood: 2,
      teotibotStartingStone: 2,
      teotibotVPFor10Cocoa: 3,
      teotibotStepsPerWorship: 2,
      teotibotVPForTempleTiles: 15,
      teotibotVPForTechTiles: 2,
      teotibotWorkerPowerForAction4: 2,
      teotibotWorkerPowerForAction6: 2,
      teotibotWorkerPowerForAction8: 2,
    };
  }

  componentDidMount() {
    //Preloading images
    baseTechTiles.forEach((tile) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/tech_tiles/${tile.src}.png`;
    });

    xitleTechTiles.forEach((tile) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/tech_tiles/${tile.src}.png`;
    });

    baseTempleTiles.forEach((tile) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/temple_tiles/${tile.src}.png`;
    });

    baseStartTiles.forEach((tile) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/start_tiles/base/${tile.name}.jpg`;
    });

    xitleStartTiles.forEach((tile) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/start_tiles/base/${tile.name}.jpg`;
    });

    const imgForms = new Image();
    imgForms.src = `${process.env.PUBLIC_URL}/backgrounds/forms.jpg`;

    const imgExp1 = new Image();
    imgExp1.src = `${process.env.PUBLIC_URL}/backgrounds/xitle.jpg`;

    const imgExp2 = new Image();
    imgExp2.src = `${process.env.PUBLIC_URL}/backgrounds/late-preclassic.jpg`;

    baseBotTiles.forEach((tile) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/bot_tiles/${tile.src}.png`;
    });

    diceFaces.forEach((dface) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/dice/${dface}.png`;
    });
  }

  //Tiles
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

  //Expansions
  setIsXitle = (isXitle) => {
    this.setState({
      isXitle,
      startTiles: [...baseStartTiles, ...xitleStartTiles],
    });
  };

  onChangeXitle = (e) => {
    this.setIsXitle(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  onChangeAlternateTeotibotMovement = (e) => {
    this.setState({
      isAlternateTeotibotMovement: !this.state.isAlternateTeotibotMovement,
    });
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

  //Options

  //Teotibot starting resources
  onIncreaseTeotibotStartingGold = (e) => {
    if (this.state.teotibotStartingGold < 3) {
      this.setState({
        teotibotStartingGold: this.state.teotibotStartingGold + 1,
      });
    }
  };
  onDecreaseTeotibotStartingGold = (e) => {
    if (this.state.teotibotStartingGold > 1) {
      this.setState({
        teotibotStartingGold: this.state.teotibotStartingGold - 1,
      });
    }
  };
  onIncreaseTeotibotStartingWood = (e) => {
    if (this.state.teotibotStartingWood < 3) {
      this.setState({
        teotibotStartingWood: this.state.teotibotStartingWood + 1,
      });
    }
  };
  onDecreaseTeotibotStartingWood = (e) => {
    if (this.state.teotibotStartingWood > 1) {
      this.setState({
        teotibotStartingWood: this.state.teotibotStartingWood - 1,
      });
    }
  };
  onIncreaseTeotibotStartingStone = (e) => {
    if (this.state.teotibotStartingStone < 3) {
      this.setState({
        teotibotStartingStone: this.state.teotibotStartingStone + 1,
      });
    }
  };
  onDecreaseTeotibotStartingStone = (e) => {
    if (this.state.teotibotStartingStone > 1) {
      this.setState({
        teotibotStartingStone: this.state.teotibotStartingStone - 1,
      });
    }
  };

  onIncreaseTeotibotVPfor10Cocoa = (e) => {
    if (this.state.teotibotVPFor10Cocoa < 5) {
      this.setState({
        teotibotVPFor10Cocoa: this.state.teotibotVPFor10Cocoa + 1,
      });
    }
  };
  onDecreaseTeotibotVPfor10Cocoa = (e) => {
    if (this.state.teotibotVPFor10Cocoa > 2) {
      this.setState({
        teotibotVPFor10Cocoa: this.state.teotibotVPFor10Cocoa - 1,
      });
    }
  };

  onIncreaseTeotibotStepsPerWorship = (e) => {
    if (this.state.teotibotStepsPerWorship < 3) {
      this.setState({
        teotibotStepsPerWorship: this.state.teotibotStepsPerWorship + 1,
      });
    }
  };
  onDecreaseTeotibotStepsPerWorship = (e) => {
    if (this.state.teotibotStepsPerWorship > 1) {
      this.setState({
        teotibotStepsPerWorship: this.state.teotibotStepsPerWorship - 1,
      });
    }
  };

  onIncreaseTeotibotVPForTempleTiles = (e) => {
    if (this.state.teotibotVPForTempleTiles < 25) {
      this.setState({
        teotibotVPForTempleTiles: this.state.teotibotVPForTempleTiles + 5,
      });
    }
  };
  onDecreaseTeotibotVPForTempleTiles = (e) => {
    if (this.state.teotibotVPForTempleTiles > 5) {
      this.setState({
        teotibotVPForTempleTiles: this.state.teotibotVPForTempleTiles - 5,
      });
    }
  };

  onIncreaseTeotibotVPForTechTiles = (e) => {
    if (this.state.teotibotVPForTechTiles < 4) {
      this.setState({
        teotibotVPForTechTiles: this.state.teotibotVPForTechTiles + 1,
      });
    }
  };
  onDecreaseTeotibotVPForTechTiles = (e) => {
    if (this.state.teotibotVPForTechTiles > 0) {
      this.setState({
        teotibotVPForTechTiles: this.state.teotibotVPForTechTiles - 1,
      });
    }
  };

  onIncreaseTeotibotWorkerPowerForAction4 = (e) => {
    if (this.state.teotibotWorkerPowerForAction4 < 4) {
      this.setState({
        teotibotWorkerPowerForAction4:
          this.state.teotibotWorkerPowerForAction4 + 1,
      });
    }
  };
  onDecreaseTeotibotWorkerPowerForAction4 = (e) => {
    if (this.state.teotibotWorkerPowerForAction4 > 1) {
      this.setState({
        teotibotWorkerPowerForAction4:
          this.state.teotibotWorkerPowerForAction4 - 1,
      });
    }
  };
  onIncreaseTeotibotWorkerPowerForAction6 = (e) => {
    if (this.state.teotibotWorkerPowerForAction6 < 4) {
      this.setState({
        teotibotWorkerPowerForAction6:
          this.state.teotibotWorkerPowerForAction6 + 1,
      });
    }
  };
  onDecreaseTeotibotWorkerPowerForAction6 = (e) => {
    if (this.state.teotibotWorkerPowerForAction6 > 1) {
      this.setState({
        teotibotWorkerPowerForAction6:
          this.state.teotibotWorkerPowerForAction6 - 1,
      });
    }
  };
  onIncreaseTeotibotWorkerPowerForAction8 = (e) => {
    if (this.state.teotibotWorkerPowerForAction8 < 4) {
      this.setState({
        teotibotWorkerPowerForAction8:
          this.state.teotibotWorkerPowerForAction8 + 1,
      });
    }
  };
  onDecreaseTeotibotWorkerPowerForAction8 = (e) => {
    if (this.state.teotibotWorkerPowerForAction8 > 1) {
      this.setState({
        teotibotWorkerPowerForAction8:
          this.state.teotibotWorkerPowerForAction8 - 1,
      });
    }
  };

  start = () => {
    this.setState({
      screenMode: 2,
      hadesTotal: 0,
      hadesActive: false,
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

  startApp = () => {
    this.setState({
      screenMode: AppScreen,
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
        <div css={setup}>
          <img
            css={btnSettings}
            onClick={() => this.options(SetupScreen)}
            src="./resources/settings.png"
            alt="Settings"
          />
          <Setup
            startApp={this.startApp}
            startTiles={this.state.startTiles}
            isXitle={this.state.isXitle}
            isHeightOfDevelopment={this.state.isHeightOfDevelopment}
            isPriestAndPriestess={this.state.isPriestAndPriestess}
            isAlternateTeotibotMovement={this.state.isAlternateTeotibotMovement}
            teotibotWorkerPowerForAction4={
              this.state.teotibotWorkerPowerForAction4
            }
            teotibotWorkerPowerForAction6={
              this.state.teotibotWorkerPowerForAction6
            }
            teotibotWorkerPowerForAction8={
              this.state.teotibotWorkerPowerForAction8
            }
            teotibotStartingGold={this.state.teotibotStartingGold}
            teotibotStartingWood={this.state.teotibotStartingWood}
            teotibotStartingStone={this.state.teotibotStartingStone}
          />
        </div>
      );
    } else if (this.state.screenMode === AppScreen) {
      return (
        <TileList
          back={this.back}
          isXitle={this.state.isXitle}
          isHeightOfDevelopment={this.state.isHeightOfDevelopment}
          isAlternateTeotibotMovement={this.state.isAlternateTeotibotMovement}
          teotibotVPFor10Cocoa={this.state.teotibotVPFor10Cocoa}
          teotibotVPForTechTiles={this.state.teotibotVPForTechTiles}
          teotibotVPForTempleTiles={this.state.teotibotVPForTempleTiles}
          lastPlayerIndex={this.state.lastPlayerIndex}
          startTiles={this.state.startTiles}
          shuffleHistory={this.state.shuffleHistory}
          playerCount={this.state.playerCount}
          defaultFavorTiles={this.state.defaultFavorTiles}
          options={this.options}
          dice1={this.state.dice1}
          dice2={this.state.dice2}
          teotibotStepsPerWorship={this.state.teotibotStepsPerWorship}
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
          isAlternateTeotibotMovement={this.state.isAlternateTeotibotMovement}
          onChangeAlternateTeotibotMovement={this.onChangeAlternateTeotibotMovement}
          onChangeIsHeightOfDevelopment={this.onChangeIsHeightOfDevelopment}
          teotibotStartingGold={this.state.teotibotStartingGold}
          onIncreaseTeotibotStartingGold={this.onIncreaseTeotibotStartingGold}
          onDecreaseTeotibotStartingGold={this.onDecreaseTeotibotStartingGold}
          teotibotStartingWood={this.state.teotibotStartingWood}
          onIncreaseTeotibotStartingWood={this.onIncreaseTeotibotStartingWood}
          onDecreaseTeotibotStartingWood={this.onDecreaseTeotibotStartingWood}
          teotibotStartingStone={this.state.teotibotStartingStone}
          onIncreaseTeotibotStartingStone={this.onIncreaseTeotibotStartingStone}
          onDecreaseTeotibotStartingStone={this.onDecreaseTeotibotStartingStone}
          teotibotVPFor10Cocoa={this.state.teotibotVPFor10Cocoa}
          onIncreaseTeotibotVPfor10Cocoa={this.onIncreaseTeotibotVPfor10Cocoa}
          onDecreaseTeotibotVPfor10Cocoa={this.onDecreaseTeotibotVPfor10Cocoa}
          teotibotStepsPerWorship={this.state.teotibotStepsPerWorship}
          onIncreaseTeotibotStepsPerWorship={
            this.onIncreaseTeotibotStepsPerWorship
          }
          onDecreaseTeotibotStepsPerWorship={
            this.onDecreaseTeotibotStepsPerWorship
          }
          teotibotVPForTempleTiles={this.state.teotibotVPForTempleTiles}
          onIncreaseTeotibotVPForTempleTiles={
            this.onIncreaseTeotibotVPForTempleTiles
          }
          onDecreaseTeotibotVPForTempleTiles={
            this.onDecreaseTeotibotVPForTempleTiles
          }
          teotibotVPForTechTiles={this.state.teotibotVPForTechTiles}
          onIncreaseTeotibotVPForTechTiles={
            this.onIncreaseTeotibotVPForTechTiles
          }
          onDecreaseTeotibotVPForTechTiles={
            this.onDecreaseTeotibotVPForTechTiles
          }
          teotibotWorkerPowerForAction4={
            this.state.teotibotWorkerPowerForAction4
          }
          onIncreaseTeotibotWorkerPowerForAction4={
            this.onIncreaseTeotibotWorkerPowerForAction4
          }
          onDecreaseTeotibotWorkerPowerForAction4={
            this.onDecreaseTeotibotWorkerPowerForAction4
          }
          teotibotWorkerPowerForAction6={
            this.state.teotibotWorkerPowerForAction6
          }
          onIncreaseTeotibotWorkerPowerForAction6={
            this.onIncreaseTeotibotWorkerPowerForAction6
          }
          onDecreaseTeotibotWorkerPowerForAction6={
            this.onDecreaseTeotibotWorkerPowerForAction6
          }
          teotibotWorkerPowerForAction8={
            this.state.teotibotWorkerPowerForAction8
          }
          onIncreaseTeotibotWorkerPowerForAction8={
            this.onIncreaseTeotibotWorkerPowerForAction8
          }
          onDecreaseTeotibotWorkerPowerForAction8={
            this.onDecreaseTeotibotWorkerPowerForAction8
          }
          back={this.back}
        />
      );
    }
  };

  render() {
    return <div css={appContainer}>{this.renderApp()}</div>;
  }
}
