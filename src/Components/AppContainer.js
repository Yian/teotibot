/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { TileList } from "./Tiles/TileList";
import { Setup } from "./Setup/Setup";
import { appContainer, mainImg, start } from "./AppContainer.css";
import {
  backgroundsToPreload,
  baseStartTiles,
  xitleStartTiles,
  baseTechTiles,
  xitleTechTiles,
  baseTempleTiles,
  StartScreen,
  SetupScreen,
  AppScreen,
  OptionsScreen,
  diceFaces,
  resourcesToPreload,
  actionNames,
  botTiles,
  empireResourcesToPreload,
} from "./Constants";
import { Options } from "./Options";
import { btnSettings, setup } from "./Setup/Setup.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { Loading } from "./Loading";
import { Heading } from "./Heading";
import { PathTiles } from "./Tiles/PathTiles";

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screenMode: StartScreen,
      lastScreen: StartScreen,
      isXitle: JSON.parse(reactLocalStorage.get("isXitle") ?? false),
      isPriestAndPriestess: JSON.parse(
        reactLocalStorage.get("isPriestAndPriestess") ?? false
      ),
      isHeightOfDevelopment: JSON.parse(
        reactLocalStorage.get("isHeightOfDevelopment") ?? false
      ),
      isSeasonsOfProgress: JSON.parse(
        reactLocalStorage.get("isSeasonsOfProgress") ?? false
      ),
      isAlternateTeotibotMovement: JSON.parse(
        reactLocalStorage.get("isAlternateTeotibotMovement") ?? false
      ),
      isObsidian: JSON.parse(reactLocalStorage.get("isObsidian") ?? false),
      isMansion: JSON.parse(reactLocalStorage.get("isMansion") ?? false),
      isAltarsAndShamans: JSON.parse(
        reactLocalStorage.get("isAltarsAndShamans") ?? false
      ),
      isEmpires: JSON.parse(reactLocalStorage.get("isEmpires") ?? false),
      isSetupComplete: JSON.parse(
        reactLocalStorage.get("isSetupComplete") ?? false
      ),
      isAscend: JSON.parse(reactLocalStorage.get("isAscend") ?? false),
      isDarkEclipse: JSON.parse(
        reactLocalStorage.get("isDarkEclipse") ?? false
      ),
      isMoveNeutral: JSON.parse(
        reactLocalStorage.get("isMoveNeutral") ?? false
      ),
      isAdvanced: JSON.parse(reactLocalStorage.get("isAdvanced") ?? false),
      isSkipSetup: false,
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
      teotibotResourcesToGain: 1,
      imagesLoaded: false,
    };
  }

  componentDidMount() {
    var imageUrls = [];

    [...baseTechTiles, ...xitleTechTiles].forEach((tile) => {
      imageUrls.push(
        `${process.env.PUBLIC_URL}/tech_tiles/${tile.src}/${tile.name}.jpg`
      );
    });

    [...baseStartTiles, ...xitleStartTiles].forEach((tile) => {
      imageUrls.push(
        `${process.env.PUBLIC_URL}/start_tiles/${tile.src}/${tile.name}.jpg`
      );
    });

    baseTempleTiles.forEach((tile) => {
      imageUrls.push(
        `${process.env.PUBLIC_URL}/temple_tiles/${tile.src}/${tile.name}.jpg`
      );
    });

    actionNames.forEach((action) => {
      imageUrls.push(`${process.env.PUBLIC_URL}/actions/no${action.value}.png`);
    });

    diceFaces.forEach((action) => {
      imageUrls.push(`${process.env.PUBLIC_URL}/game_dice/d${action.value}.png`);
    });

    resourcesToPreload.forEach((resourceName) => {
      imageUrls.push(`${process.env.PUBLIC_URL}/game_resources/${resourceName}.png`);
    });

    botTiles().forEach((tile) => {
      imageUrls.push(`${process.env.PUBLIC_URL}/bot_tiles/${tile.src}.png`);
    });

    backgroundsToPreload.forEach((background) => {
      imageUrls.push(`${process.env.PUBLIC_URL}/backgrounds/${background}.jpg`);
    });
    
    empireResourcesToPreload.forEach((background) => {
      imageUrls.push(`${process.env.PUBLIC_URL}/empire/${background}.jpg`);
    });

    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        // wait 2 seconds to simulate loading time
        loadImg.onload = () => resolve(image);
        loadImg.onerror = (err) => reject(image);
      });
    };

    Promise.all(imageUrls.map((image) => loadImage(image)))
      .then(() => {
        this.setState({ imagesLoaded: true });
      })
      .catch((err) => {
        console.log("Failed to load images", err);
        this.setState({ imagesLoaded: true });
      });

    if (JSON.parse(reactLocalStorage.get("isSetupComplete") ?? false)) {
      this.setState({
        screenMode: AppScreen,
      });
    }
  }

  //Expansions
  setIsXitle = (isXitle) => {
    this.setState(
      {
        isXitle,
      },
      () => {
        reactLocalStorage.set("isXitle", isXitle);
      }
    );
  };

  onChangeXitle = (e) => {
    this.setIsXitle(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsAlternateTeotibotMovement = (isAlternateTeotibotMovement) => {
    this.setState(
      {
        isAlternateTeotibotMovement,
      },
      () => {
        reactLocalStorage.set(
          "isAlternateTeotibotMovement",
          isAlternateTeotibotMovement
        );
      }
    );
  };

  onChangeAlternateTeotibotMovement = (e) => {
    this.setIsAlternateTeotibotMovement(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsPriestAndPriestess = (isPriestAndPriestess) => {
    this.setState(
      {
        isPriestAndPriestess,
      },
      () => {
        reactLocalStorage.set("isPriestAndPriestess", isPriestAndPriestess);
      }
    );
  };

  onChangeIsPriestAndPriestess = (e) => {
    this.setIsPriestAndPriestess(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsAscend = (isAscend) => {
    this.setState(
      {
        isAscend,
      },
      () => {
        reactLocalStorage.set("isAscend", isAscend);
      }
    );
  };

  onChangeIsAscend = (e) => {
    this.setIsAscend(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsDarkEclipse = (isDarkEclipse) => {
    this.setState(
      {
        isDarkEclipse,
      },
      () => {
        reactLocalStorage.set("isDarkEclipse", isDarkEclipse);
      }
    );
  };

  setIsMoveNeutral = (isMoveNeutral) => {
    this.setState(
      {
        isMoveNeutral,
      },
      () => {
        reactLocalStorage.set("isMoveNeutral", isMoveNeutral);
      }
    );
  };

  onChangeIsDarkEclipse = (e) => {
    this.setIsDarkEclipse(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };
  
  onChangeIsMoveNeutral = (e) => {
    this.setIsMoveNeutral(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };
  
  setIsAdvanced = (isAdvanced) => {
    this.setState(
      {
        isAdvanced,
      },
      () => {
        reactLocalStorage.set("isAdvanced", isAdvanced);
      }
    );
  };

  onChangeIsAdvanced = (e) => {
    this.setIsAdvanced(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsSeasonsOfProgress = (isSeasonsOfProgress) => {
    this.setState(
      {
        isSeasonsOfProgress,
      },
      () => {
        reactLocalStorage.set("isSeasonsOfProgress", isSeasonsOfProgress);
      }
    );
  };

  onChangeIsSeasonsOfProgress = (e) => {
    this.setIsSeasonsOfProgress(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsHeightOfDevelopment = (isHeightOfDevelopment) => {
    this.setState(
      {
        isHeightOfDevelopment,
      },
      () => {
        reactLocalStorage.set("isHeightOfDevelopment", isHeightOfDevelopment);
      }
    );
  };

  onChangeIsHeightOfDevelopment = (e) => {
    this.setIsHeightOfDevelopment(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsObsidian = (isObsidian) => {
    if (!isObsidian) {
      this.setIsMansion(false);
      this.setIsAltarsAndShamans(false);
      this.setIsEmpires(false);
    }

    this.setState(
      {
        isObsidian,
      },
      () => {
        reactLocalStorage.set("isObsidian", isObsidian);
      }
    );
  };

  onChangeIsObsidian = (e) => {
    this.setIsObsidian(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  setIsMansion = (isMansion) => {
    this.setState(
      {
        isMansion,
      },
      () => {
        reactLocalStorage.set("isMansion", isMansion);
      }
    );
  };

  onChangeIsMansion = (e) => {
    this.setIsMansion(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );

    this.setIsObsidian(true);
  };

  setIsAltarsAndShamans = (isAltarsAndShamans) => {
    this.setState(
      {
        isAltarsAndShamans,
      },
      () => {
        reactLocalStorage.set("isAltarsAndShamans", isAltarsAndShamans);
      }
    );
  };

  onChangeIsAltarsAndShamans = (e) => {
    this.setIsAltarsAndShamans(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );

    this.setIsObsidian(true);
  };

  setIsEmpires = (isEmpires) => {
    this.setState(
      {
        isEmpires,
      },
      () => {
        reactLocalStorage.set("isEmpires", isEmpires);
      }
    );
  };

  onChangeIsEmpires = (e) => {
    this.setIsEmpires(
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );

    this.setIsObsidian(true);
  };

  setIsSkipSetup = (isSkipSetup) => {
    this.setState({
      isSkipSetup,
    });
  };

  onChangeIsSkipSetup = (e) => {
    this.setIsSkipSetup(
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

  onIncreaseTeotibotResourcesToGain = (e) => {
    if (this.state.teotibotResourcesToGain < 2) {
      this.setState({
        teotibotResourcesToGain: this.state.teotibotResourcesToGain + 1,
      });
    }
  };

  onDecreaseTeotibotResourcesToGain = (e) => {
    if (this.state.teotibotResourcesToGain > 1) {
      this.setState({
        teotibotResourcesToGain: this.state.teotibotResourcesToGain - 1,
      });
    }
  };

  start = () => {
    this.setState({
      screenMode: SetupScreen,
    });
  };

  newGame = () => {
    let screen = StartScreen;

    if (this.state.isSkipSetup) {
      screen = AppScreen
    }

    this.setState({
      screenMode: screen,
    });

    reactLocalStorage.remove("eclipseStage");
    reactLocalStorage.remove("stepsUntilEclipse");
    reactLocalStorage.remove("isSetupComplete");
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
      isSetupComplete: true,
    });
    reactLocalStorage.set("isSetupComplete", true);
  };

  renderApp = () => {
    if (this.state.screenMode === StartScreen) {
      return (
        <div>
          {this.state.imagesLoaded ? (
            <div>
              <ul css={start}>
                <Heading />
                <div css={mainImg} />
                <li onClick={this.start}>Start</li>
                <li onClick={() => this.options(StartScreen)}>Options</li>
              </ul>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      );
    } else if (this.state.screenMode === SetupScreen) {
      return (
        <div css={setup}>
          <img
            css={btnSettings}
            onClick={() => this.options(SetupScreen)}
            src="./game_resources/settings-white.png"
            alt="Settings"
          />
          <Setup
            startApp={this.startApp}
            isXitle={this.state.isXitle}
            isObsidian={this.state.isObsidian}
            isAltarsAndShamans={this.state.isAltarsAndShamans}
            isHeightOfDevelopment={this.state.isHeightOfDevelopment}
            isPriestAndPriestess={this.state.isPriestAndPriestess}
            isAlternateTeotibotMovement={this.state.isAlternateTeotibotMovement}
            isSetupComplete={this.state.isSetupComplete}
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
          isObsidian={this.state.isObsidian}
          isMansion={this.state.isMansion}
          isAltarsAndShamans={this.state.isAltarsAndShamans}
          isEmpires={this.state.isEmpires}
          isHeightOfDevelopment={this.state.isHeightOfDevelopment}
          isAlternateTeotibotMovement={this.state.isAlternateTeotibotMovement}
          isMoveNeutral={this.state.isMoveNeutral}
          teotibotVPFor10Cocoa={this.state.teotibotVPFor10Cocoa}
          teotibotVPForTechTiles={this.state.teotibotVPForTechTiles}
          teotibotVPForTempleTiles={this.state.teotibotVPForTempleTiles}
          lastPlayerIndex={this.state.lastPlayerIndex}
          shuffleHistory={this.state.shuffleHistory}
          playerCount={this.state.playerCount}
          defaultFavorTiles={this.state.defaultFavorTiles}
          options={this.options}
          dice1={this.state.dice1}
          dice2={this.state.dice2}
          teotibotStepsPerWorship={this.state.teotibotStepsPerWorship}
          teotibotResourcesToGain={this.state.teotibotResourcesToGain}
          isAscend={this.state.isAscend}
          isDarkEclipse={this.state.isDarkEclipse}
          isAdvanced={this.state.isAdvanced}
        />
      );
    } else if (this.state.screenMode === OptionsScreen) {
      return (
        <Options
          isXitle={this.state.isXitle}
          onChangeXitle={this.onChangeXitle}
          isAscend={this.state.isAscend}
          onChangeIsAscend={this.onChangeIsAscend}
          isDarkEclipse={this.state.isDarkEclipse}
          onChangeIsDarkEclipse={this.onChangeIsDarkEclipse}
          isMoveNeutral={this.state.isMoveNeutral}
          onChangeIsMoveNeutral={this.onChangeIsMoveNeutral}
          isAdvanced={this.state.isAdvanced}
          onChangeIsAdvanced={this.onChangeIsAdvanced}
          isPriestAndPriestess={this.state.isPriestAndPriestess}
          onChangeIsPriestAndPriestess={this.onChangeIsPriestAndPriestess}
          isObsidian={this.state.isObsidian}
          onChangeIsObsidian={this.onChangeIsObsidian}
          isMansion={this.state.isMansion}
          onChangeIsMansion={this.onChangeIsMansion}
          isAltarsAndShamans={this.state.isAltarsAndShamans}
          onChangeIsAltarsAndShamans={this.onChangeIsAltarsAndShamans}
          isEmpires={this.state.isEmpires}
          onChangeIsEmpires={this.onChangeIsEmpires}
          isSeasonsOfProgress={this.state.isSeasonsOfProgress}
          onChangeIsSeasonsOfProgress={this.onChangeIsSeasonsOfProgress}
          isSetupComplete={this.state.isSetupComplete}
          isHeightOfDevelopment={this.state.isHeightOfDevelopment}
          isAlternateTeotibotMovement={this.state.isAlternateTeotibotMovement}
          onChangeAlternateTeotibotMovement={
            this.onChangeAlternateTeotibotMovement
          }
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
          teotibotResourcesToGain={this.state.teotibotResourcesToGain}
          onIncreaseTeotibotResourcesToGain={
            this.onIncreaseTeotibotResourcesToGain
          }
          onDecreaseTeotibotResourcesToGain={
            this.onDecreaseTeotibotResourcesToGain
          }
          isSkipSetup={this.state.isSkipSetup}
          onChangeIsSkipSetup={this.onChangeIsSkipSetup}
          newGame={this.newGame}
          back={this.back}
        />
      );
    }
  };

  render() {
    return <div css={appContainer}>{this.renderApp()}</div>;
  }
}
