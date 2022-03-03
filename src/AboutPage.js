import React from 'react';
import LILogo from './LI.png';
import GHLogo from './GitHub-Mark-120px-plus.png';
import Cliff from './Cliff.png';
import Trevor from './Trevor.png';
import Alex from './Alex.png';
import Denzel from './Denzel.jpg';
import './styles/AboutPage.css';

export default function AboutPage() {
  return (
    <>
      <h2>About The Developers</h2>
      <section>
        <div className="dev-container">
          <h4 className="dev-name">Cliff Maxson</h4>
          <img className="dev-image" src={Cliff} />
          <p>
            Cliff is a full stack software developer from Portland, Oregon. While not coding, Cliff
            is eagerly waiting for the release of the next book in the A Song of Ice and Fire
            series, by George R. R. Martin. His favorite book in the series was A Feast of Crows.
          </p>
          <div className="dev-link-container">
            <a
              href="https://www.linkedin.com/in/clifford-maxson-a77a10ab/"
              target="_blank"
              rel="noreferrer"
            >
              <img className="dev-link" src={LILogo} />
            </a>
            <a href="https://github.com/Cliffmax85" target="_blank" rel="noreferrer">
              <img className="dev-link" src={GHLogo} />
            </a>
          </div>
        </div>
        <div className="dev-container">
          <h4 className="dev-name">Trevor Rezac</h4>
          <img className="dev-image" src={Trevor} />
          <p>
            Trevor is a full stack software developer developer based on Beaverton, OR. Some of his
            favorite authors include Kurt Vonnegut and Chuck Palahniuk. He is currently reading “The
            Wise Man’s Fear”, the second book in the Kingkiller Chronicle.
          </p>
          <div className="dev-link-container">
            <a
              href="https://www.linkedin.com/in/trevor-rezac-a14840124/"
              target="_blank"
              rel="noreferrer"
            >
              <img className="dev-link" src={LILogo} />
            </a>
            <a href="https://github.com/Trevor-Rezac" target="_blank" rel="noreferrer">
              <img className="dev-link" src={GHLogo} />
            </a>
          </div>
        </div>
        <div className="dev-container">
          <h4 className="dev-name">Denzel Bartolaba</h4>
          <img className="dev-image" src={Denzel} />
          <p>
            Denzel is a full-stack software engineer currently living in Vancouver, WA. He strives
            to make the world of the internet a much easier place for everyone! His hobbies are
            boxing, archery, playing video games, and his favorite book is The Book of Five Rings by
            Miyamoto Musashi.
          </p>
          <div className="dev-link-container">
            <a
              href="https://www.linkedin.com/in/denzel-bartolaba-45a322b5/"
              target="_blank"
              rel="noreferrer"
            >
              <img className="dev-link" src={LILogo} />
            </a>
            <a href="https://github.com/xDenzelB" target="_blank" rel="noreferrer">
              <img className="dev-link" src={GHLogo} />
            </a>
          </div>
        </div>
        <div className="dev-container">
          <h4 className="dev-name">Alex Blair</h4>
          <img className="dev-image" src={Alex} />
          <p>
            Alex is a software developer in Portland, OR. He has over 2 decades of customer facing
            experience in the food and beverage industry. In 2021, he decided to pursue a career in
            software development. His favorite book is a toss up between Ender’s Shadow by Orson
            Scott Card and The Book of Illusions by Paul Auster.
          </p>
          <div className="dev-link-container">
            <a
              href="https://www.linkedin.com/in/alex-blair-a72a10ab/"
              target="_blank"
              rel="noreferrer"
            >
              <img className="dev-link" src={LILogo} />
            </a>
            <a href="https://www.github.com/alex-i-blair" target="_blank" rel="noreferrer">
              <img className="dev-link" src={GHLogo} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
