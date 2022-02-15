import React from 'react';
import styled, { keyframes } from 'styled-components';
import { bounceInDown, fadeOutUp } from 'react-animations';
import FutureExpanded from './FutureExpanded'

const bounceAnimation = keyframes`${bounceInDown}`;
const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

const fadeOutAnimation = keyframes`${fadeOutUp}`;
const FadeDiv = styled.div`
  animation: 1s ${fadeOutAnimation};
`;

export default function ExpandedContainer({weatherData, units, showDetail }) {

  return (
    showDetail ?
      <>
      <BouncyDiv className="AnimationContainer">
        <FutureExpanded weatherData={weatherData} units={units} showDetail={showDetail}/>
      </BouncyDiv>
      </>
      :
      <>
      <FadeDiv className="AnimationContainer">
        <FutureExpanded weatherData={weatherData} units={units} showDetail={showDetail}/>
      </FadeDiv>
      </>
  )
}