import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faChalkboardUser, faBookOpenReader, faFrog } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Summary.scss';
import kilgorePortrait from '../assets/images/profile-pic-kilgore.png';

function Summary() {

  return (
    <div className="container" id="about">
      <div className="summary-container">
        <div className="portrait-shell">
          <div className="portrait-content">
            <h1>Who Am I?</h1>
            <p className="summary-lede">
              Full Stack Engineer with 5+ years in the EdTech industry, architecting and developing solutions for everything from enterprise-grade LMS platforms, and internal tooling & data systems for Content management pipelines. 
              I have a passion for creating intuitive, performant, and accessible experiences that empower educators and learners.
            </p>
            <p className="summary-lede thin">
             With a background in digital art, animation and large-scale text encoding/analysis - I bring a unique perspective to software development, blending technical expertise with creative problem-solving.
              I am also a lifelong learner, constantly seeking to expand my knowledge and skills in the ever-evolving field of technology.
            </p>
            <p className="summary-lede thin">
              Aside from my full-time work as a software engineer, I am an adjunct lecturer of an intro-level Digital Art studio course at a local university - where I teach students the fundamentals of 
              digital art creation on a variety of mediums through hands-on explorations.
            </p>
            <div className="badge-row">
              <Chip className="chip" icon={<FontAwesomeIcon icon={faCode} />} label="Coder" />
              <Chip className="chip" icon={<FontAwesomeIcon icon={faChalkboardUser} />} label="Educator" />
              <Chip className="chip" icon={<FontAwesomeIcon icon={faBookOpenReader} />} label="Lifelong Learner" />
              <Chip className="chip" icon={<FontAwesomeIcon icon={faFrog} />} label="Frog-Lover" />
            </div>
          </div>
          <div className="portrait-art" aria-hidden="true">
            <img className="portrait-image" src={kilgorePortrait} alt="Digital portrait of a character I created named Kilgore" />
            {/* <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="summaryArtGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#006161" />
                  <stop offset="55%" stopColor="#1c8f8f" />
                  <stop offset="100%" stopColor="#5000ca" />
                </linearGradient>
              </defs>
              <rect width="400" height="400" fill="url(#summaryArtGradient)" />
              <circle cx="120" cy="140" r="95" fill="rgba(255,255,255,0.16)" />
              <circle cx="290" cy="260" r="120" fill="rgba(0,0,0,0.18)" />
              <path d="M0 330 Q100 250 200 305 T400 280 V400 H0Z" fill="rgba(255,255,255,0.10)" />
            </svg> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
