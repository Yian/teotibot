/** @jsx jsx */
import React, { useState, useEffect, useMemo } from 'react'
import { jsx } from "@emotion/react";
import { StartTiles } from './Tiles/StartTiles';
import { TechTiles } from './Tiles/TechTiles';
import { TempleTiles } from './Tiles/TempleTiles';

export const Setup = (props) => {
    return (
        <div>
          <StartTiles />
          <TechTiles />
          <TempleTiles />
        </div>
      )
};

//   return (
//     <div css={startTileContainer}>
//         <ReactTooltip />
//         {baseStartTiles.map(tile => (
//             <img css={startTile} src={process.env.PUBLIC_URL + "/StartTiles/base/" + tile.name + ".jpg"} data-tip={tile.tooltip} alt="tile.name"/>
//         ))};
//         <div>Continue</div>
//     </div>
//   );