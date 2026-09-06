import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footermain">
        <p>{portfolioData.footer}</p>
      </div>
    </footer>
  );
}
