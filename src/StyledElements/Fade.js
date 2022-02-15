import React from 'react'
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 0;
  }
  to {
    transform: scale(.25);
    opacity: 1;
  }
`;

const Fade = styled.div`
  display: inline-block;
  margin: 0 auto;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOut : fadeIn} .5s linear;
  transition: visibility .5s linear;
`;

export default Fade;
