import React from 'react';
import LILogo from './LI.png';
import GHLogo from './GitHub-Mark-120px-plus.png';
import NormalGuy from './normal-gur.jpg';
import './styles/AboutPage.css';

export default function AboutPage() {
  return (
    <>  
      <h2>About The Developers</h2>
      <section>
        <div className='dev-container'>
          <h4 className='dev-name'>dev name</h4>
          <img className='dev-image' src={NormalGuy}/>
          <p>Duis volutpat sodales risus, eu dictum velit feugiat eget. Curabitur sed dui nec turpis congue convallis ac quis magna. Nam metus orci, rutrum a ipsum ac, rutrum ornare nunc. Vivamus lacus lorem, tincidunt non finibus sit amet, sagittis sed leo. Phasellus ullamcorper vel elit eget convallis. Sed ultricies facilisis turpis in tincidunt.</p>
          <div className='dev-link-container'>
            <a href='https://www.linkedin.com/' target='_blank' rel="noreferrer" ><img className='dev-link' src={LILogo}/></a>
            <a href='https://www.github.com' target='_blank' rel="noreferrer"><img className='dev-link' src={GHLogo}/></a>
          </div>
        </div>
      </section>
    </>
  );
}
