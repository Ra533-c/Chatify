import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const LandingPage = () => {
    const navigate = useNavigate();
    const { authUser } = useSelector((store) => store.user);

    const handleGetStarted = () => {
        if (authUser) {
            // Agar logged in hai toh chat pe jao
            navigate('/chat');
        } else {
            // Nahi toh login pe
            navigate('/login');
        }
    };

    return (
        <StyledWrapper>
            <div className="container">
                {/* Animated Title */}
                <h1 className="title">
                    <span className="letter">C</span>
                    <span className="letter">h</span>
                    <span className="letter">a</span>
                    <span className="letter">t</span>
                    <span className="letter">i</span>
                    <span className="letter">f</span>
                    <span className="letter">y</span>
                </h1>

                {/* Tagline */}
                <p className="tagline">Connect. Chat. Communicate.</p>

                {/* CTA Button */}
                <button className="cta-button" onClick={handleGetStarted}>
                    {authUser ? 'Go to Chat' : 'Start Chatting'}
                    <span className="arrow">→</span>
                </button>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .container {
    text-align: center;
  }
  
  .title {
    font-size: 5rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 1rem;
  }
  
  .letter {
    display: inline-block;
    animation: bounce 0.5s ease infinite alternate;
  }
  
  .letter:nth-child(1) { animation-delay: 0s; }
  .letter:nth-child(2) { animation-delay: 0.1s; }
  .letter:nth-child(3) { animation-delay: 0.2s; }
  .letter:nth-child(4) { animation-delay: 0.3s; }
  .letter:nth-child(5) { animation-delay: 0.4s; }
  .letter:nth-child(6) { animation-delay: 0.5s; }
  .letter:nth-child(7) { animation-delay: 0.6s; }
  
  @keyframes bounce {
    from { transform: translateY(0); }
    to { transform: translateY(-15px); }
  }
  
  .tagline {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
  }
  
  .cta-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 50px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }
  
  .cta-button:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
  }
  
  .arrow {
    transition: transform 0.3s ease;
  }
  
  .cta-button:hover .arrow {
    transform: translateX(5px);
  }
  
  .footer {
    position: fixed;
    bottom: 20px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }
`;

export default LandingPage;