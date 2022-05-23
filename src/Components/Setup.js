/** @jsx jsx */
import React, { useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import { StartTiles } from "./Tiles/StartTiles";
import { TechTiles } from "./Tiles/TechTiles";
import { TempleTiles } from "./Tiles/TempleTiles";
import { useSpring, useTransition, a, useSpringRef } from "@react-spring/web";
import { resources } from "./Constants";
import { animationTest, startTileContainer, startTile } from "./Tiles/Setup.css";

export const Setup = (props) => {
  const [selectedStartTiles, setSelectedStartTiles] = useState([]);

  const getResources = (selectedTiles) => {
      return selectedTiles.resources;
  };

  const transitions = useTransition(getResources(selectedStartTiles), {
    key: (item) => item.name,
    from: ({x}) => ({x, y: 0, opacity: 0 }),
    enter: ({x}) => ({x, y: 800, opacity: 1}),
    update: ({x}) => ({x}),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 100,
  });

  const selectedTile = (starttile) => {
    setSelectedStartTiles(starttile);
  };

  return (
    <div>
      {transitions((props, item, state, index) => {
        return (
          <a.div
            css={startTile}
            key={item.name}
            style={{
              ...props,
            }}
            className="box"
          >
            <a.img
              src={
                process.env.PUBLIC_URL +
                "/resources/" +
                item.t +
                ".png"
              }
            />
          </a.div>
        );
      })}
      <StartTiles selectedStartTiles={selectedTile} />
      <TechTiles />
      <TempleTiles />
    </div>
  );
};
