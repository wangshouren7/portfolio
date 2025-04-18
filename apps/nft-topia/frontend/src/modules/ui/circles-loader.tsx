import { type IComponentBaseProps, mp } from "@pfl-wsr/ui";
import React from "react";
import styled from "styled-components";

const CirclesLoader = (props: IComponentBaseProps) => {
  return mp(
    props,
    <StyledWrapper className="duration-3000 animate-in fade-in">
      <div className="circles-loader">
        <div className="circle-loader__circle">
          <div className="circle-loader__dot" />
          <div className="circle-loader__outline" />
        </div>
        <div className="circle-loader__circle">
          <div className="circle-loader__dot" />
          <div className="circle-loader__outline" />
        </div>
        <div className="circle-loader__circle">
          <div className="circle-loader__dot" />
          <div className="circle-loader__outline" />
        </div>
        <div className="circle-loader__circle">
          <div className="circle-loader__dot" />
          <div className="circle-loader__outline" />
        </div>
      </div>
    </StyledWrapper>,
  );
};

const StyledWrapper = styled.div`
  .circles-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    --color: hsl(0, 0%, 87%);
    --animation: 2s ease-in-out infinite;
  }

  .circles-loader .circle-loader__circle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 20px;
    height: 20px;
    border: solid 2px var(--color);
    border-radius: 50%;
    margin: 0 10px;
    background-color: transparent;
    animation: circle-keys var(--animation);
  }

  .circles-loader .circle-loader__circle .circle-loader__dot {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--color);
    animation: dot-keys var(--animation);
  }

  .circles-loader .circle-loader__circle .circle-loader__outline {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    animation: outline-keys var(--animation);
  }

  .circles-loader .circle-loader__circle:nth-child(2) {
    animation-delay: 0.3s;
  }

  .circles-loader .circle-loader__circle:nth-child(3) {
    animation-delay: 0.6s;
  }

  .circles-loader .circle-loader__circle:nth-child(4) {
    animation-delay: 0.9s;
  }

  .circles-loader .circle-loader__circle:nth-child(5) {
    animation-delay: 1.2s;
  }

  .circles-loader .circle-loader__circle:nth-child(2) .circle-loader__dot {
    animation-delay: 0.3s;
  }

  .circles-loader .circle-loader__circle:nth-child(3) .circle-loader__dot {
    animation-delay: 0.6s;
  }

  .circles-loader .circle-loader__circle:nth-child(4) .circle-loader__dot {
    animation-delay: 0.9s;
  }

  .circles-loader .circle-loader__circle:nth-child(5) .circle-loader__dot {
    animation-delay: 1.2s;
  }

  .circles-loader .circle-loader__circle:nth-child(1) .circle-loader__outline {
    animation-delay: 0.9s;
  }

  .circles-loader .circle-loader__circle:nth-child(2) .circle-loader__outline {
    animation-delay: 1.2s;
  }

  .circles-loader .circle-loader__circle:nth-child(3) .circle-loader__outline {
    animation-delay: 1.5s;
  }

  .circles-loader .circle-loader__circle:nth-child(4) .circle-loader__outline {
    animation-delay: 1.8s;
  }

  .circles-loader .circle-loader__circle:nth-child(5) .circle-loader__outline {
    animation-delay: 2.1s;
  }

  @keyframes circle-keys {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes dot-keys {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes outline-keys {
    0% {
      transform: scale(0);
      outline: solid 20px var(--color);
      outline-offset: 0;
      opacity: 1;
    }

    100% {
      transform: scale(1);
      outline: solid 0 transparent;
      outline-offset: 20px;
      opacity: 0;
    }
  }
`;

export { CirclesLoader };
