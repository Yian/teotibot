/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { generateRandomInteger } from "./Logic";
import { pathTile, drawTile, pathSelectorContainer } from "./QuestionForm.css";

export const PathSelector = (props) => {
  const [tileNo, setTileNo] = useState(1);
  const [state, toggle] = useState(false);
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 200 },
  })

  const drawPathTile = () => {
    toggle(false);
    setTimeout(() => {
      setTileNo(generateRandomInteger(1, 4));
      toggle(true);
    }, 300)
  }

  return (
    <div css={pathSelectorContainer}>
      <div css={drawTile} onClick={drawPathTile}>Draw Path Tile</div>
      <animated.div
          style={{
            opacity: x.to({ range: [0, 1], output: [0, 1] }),
          }}>
           <animated.img style={{
            opacity: x.to({ range: [0, 1], output: [0, 1] }),
          }} css={pathTile} src={`${process.env.PUBLIC_URL}/empire/PT${tileNo}.jpg`} />
        </animated.div>
    </div>
  );
};
