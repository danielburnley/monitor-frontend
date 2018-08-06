import './style.css'
import React from 'react';
import FooterLogo from './crowncopyright.png'

export default class Footer extends React.Component {
  render() {
    let sitemap = <footer>
      <div class="inner">
        <ul>
          <li><a href="">Help</a></li>
          <li><a href="">Cookies</a></li>
          <li><a href="">Contact</a></li>
          <li><a href="">Terms and conditions</a></li>
          <li><a href="">Rhestr o Wasanaethau Cymraeg</a></li>
        </ul>
      </div>
      <div class="copyright">
        <img src={FooterLogo} alt="British Royal Coat of Arms"></img><br/>
        <a href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/">© Crown copyright</a>
      </div>
    </footer>
    return sitemap
  }
}
