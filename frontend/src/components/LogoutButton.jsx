import React from 'react';
import styled from 'styled-components';

const LogoutButton = ({ onClick }) => {
    return (
        <StyledWrapper>
            <button onClick={onClick}>
                <span className="span-mother">
                    <span>L</span>
                    <span>o</span>
                    <span>g</span>
                    <span>o</span>
                    <span>u</span>
                    <span>t</span>
                </span>
                <span className="span-mother2">
                    <span>L</span>
                    <span>o</span>
                    <span>g</span>
                    <span>o</span>
                    <span>u</span>
                    <span>t</span>
                </span>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
    font-weight: bold;
    color: white;
    padding: 9px;
    border-radius: 2rem;
    cursor: pointer;
    width: 80px;
    height: 26px;
    border: none;
    background-color: #ef4444;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
    font-size: 11px;
    overflow: hidden;
    position: relative;
  }

  button:hover {
    background-color: #dc2626;
  }

  button .span-mother {
    display: flex;
    overflow: hidden;
    position: relative;
  }

  button:hover .span-mother {
    position: absolute;
  }

  button:hover .span-mother span {
    transform: translateY(1.2em);
  }

  button .span-mother span:nth-child(1) {
    transition: 0.2s;
  }

  button .span-mother span:nth-child(2) {
    transition: 0.3s;
  }

  button .span-mother span:nth-child(3) {
    transition: 0.4s;
  }

  button .span-mother span:nth-child(4) {
    transition: 0.5s;
  }

  button .span-mother span:nth-child(5) {
    transition: 0.6s;
  }

  button .span-mother span:nth-child(6) {
    transition: 0.7s;
  }

  button .span-mother2 {
    display: flex;
    position: absolute;
    overflow: hidden;
  }

  button .span-mother2 span {
    transform: translateY(-2em);
  }

  button:hover .span-mother2 span {
    transform: translateY(0);
  }

  button .span-mother2 span {
    transition: 0.2s;
  }

  button .span-mother2 span:nth-child(2) {
    transition: 0.3s;
  }

  button .span-mother2 span:nth-child(3) {
    transition: 0.4s;
  }

  button .span-mother2 span:nth-child(4) {
    transition: 0.5s;
  }

  button .span-mother2 span:nth-child(5) {
    transition: 0.6s;
  }

  button .span-mother2 span:nth-child(6) {
    transition: 0.7s;
  }
`;

export default LogoutButton;
