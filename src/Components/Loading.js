/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { animated, useTransition, config } from "@react-spring/web";
import { loadingText } from "./AppContainer.css";
import { num_trans } from "./Constants";

export const Loading = () => {
  const [items, setItems] = useState(num_trans);

  const transitions = useTransition(items, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: config.molasses,
    onRest: () => setItems([]),
  });

  useEffect(() => {
    if (items.length === 0) {
      setTimeout(() => {
        setItems(num_trans);
      }, 2000);
    }
  }, [items]);

  useEffect(() => {
    return () => {
      // cancel the subscription
      setItems([])
  };
  }, []);

  return (
    <div css={loadingText}>
      {transitions(({ opacity }, item) => (
        <animated.div
          style={{
            opacity: opacity.to(item.op),
            transform: opacity
              .to(item.trans)
              .to((y) => `translate3d(0,${y}px,0)`),
          }}
        >
          {item.fig}
        </animated.div>
      ))}
    </div>
  );
};
