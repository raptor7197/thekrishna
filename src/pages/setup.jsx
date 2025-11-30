import React from 'react';
import './setup.css';

const Setup = () => {
  const devices = [
    {
      name: 'HP Pavilion 15 (15.6 inch, 2021) 16 GB 512 SSD i5 1340p ',
      review: 'love it, just perfect ',
    },
    {
      name: 'Sony WH-520H',
      review: 'very good sound quality , comfy and great battery life ',
    },
    {
      name: 'redmi note 13 pro+ 5G 512 GB',
      review: 'good phone, but i broke it within 1 month :(',
    }, 
    {
      name: 'realme Narzo 20 A',
      review: 'lasting strong from 9+ years ',
    },
    {
      name: 'Boult Audio Astra+',
      review: 'good case shaped like a ufo ',
    }
  ];

  const extensions = [
    { name: 'uBlock Origin', url: 'https://ublockorigin.com/', review: 'The GOAT of ad blockers, nothing comes close' },
    { name: 'daily.dev', url: 'https://daily.dev/', review: 'catch up with latest ongoings .' },
    { name: 'Wappalyzer', url: 'https://www.wappalyzer.com/', review: 'useful to see what sites are built on ' },
    { name: 'Dark Reader', url: 'https://darkreader.org/', review: 'i hate light mode' },
    { name: 'Firefox relay', url: 'https://relay.firefox.com/', review: 'do not want my inbox spammed ' },
    { name: 'Bitwarden Password manager', url: 'https://bitwarden.com/', review: 'to keep my secrets safe ' },
    { name: 'React Developer Tools', url: 'https://reactjs.org/', review: 'good for react debugging' },
    { name: 'Firefox Multi-Account Containers', url: 'https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/', review: 'to keep multiple accounts signed in ' },
  ];  

  const software = [
    { name: 'Firefox', url: 'https://www.mozilla.org/firefox/', review: 'the best piece of open source software ' },
    { name: 'Brave', url: 'https://brave.com/', review: 'need a chromium based browser on my system' },
    { name: 'Youtube Music', url: 'https://music.youtube.com/', review: 'who dosen\'t listen to music these days' },
    { name: 'VS Code v 1.106', url: 'https://code.visualstudio.com/', review: 'The editor that started it all for me. Extensions ecosystem is unmatched.' },
    { name: 'VLC', url: 'https://www.videolan.org/vlc/', review: 'for movies plays anything i throw at it (with necessary codecs ofc )' },
    { name: 'Neo vim', url: 'https://neovim.io/', review: 'learning curve is steep but worth it' },
    { name: 'Fedora Linux 42', url: 'https://getfedora.org/', review: 'settled on it after distro hopping for a year, works perfectly' },
  ];

  return (
    <div className="setup-page">
      <div className="setup-container">
        <header className="setup-header">
          <h1 className="setup-title">My devices</h1>
          <p className="setup-subtitle">Stuff i use daily</p>
        </header>

        <section className="setup-section">
          <h2 className="section-title">electronics</h2>
          <div className="devices-grid">
            {devices.map((device, index) => (
              <div key={index} className="device-card">
                <h3 className="device-name">{device.name}</h3>
                <div className="tooltip-box">
                  <span className="tooltip-icon">my thoughts : </span>
                  <p>{device.review}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="setup-section">
          <h2 className="section-title">browser Extensions</h2>
          <div className="list-grid">
            {extensions.map((ext, index) => (
              <a
                key={index}
                href={ext.url}
                target="_blank"
                rel="noopener noreferrer"
                className="list-item"
              >
                <span className="list-number">{index + 1}</span>
                <span className="list-name">{ext.name}</span>
                <span className="list-arrow">↗</span>
                <div className="tooltip-box">
                  <span className="tooltip-icon">my thoughts : </span>
                  <p>{ext.review}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="setup-section">
          <h2 className="section-title">Software</h2>
          <div className="list-grid">
            {software.map((sw, index) => (
              <a
                key={index}
                href={sw.url}
                target="_blank"
                rel="noopener noreferrer"
                className="list-item"
              >
                <span className="list-number">{index + 1}</span>
                <span className="list-name">{sw.name}</span>
                <span className="list-arrow">↗</span>
                <div className="tooltip-box">
                  <span className="tooltip-icon">my thoughts : </span>
                  <p>{sw.review}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="quote-section">
          <blockquote className="quote">
            <p>"If the pain doesn't kill me, it will only make me stronger."</p>
            <cite>- a wise person </cite>
          </blockquote>
        </section>
      </div>
    </div>
  );
};

export default Setup;