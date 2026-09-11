import React from 'react';

export default function PromoStripe() {
  return (
    <div className="promo-header-stripe">
      <div className="promo-header-stripe__inner">
        <p className="promo-header-stripe__text">
          Recognized as the Global Leader in AI-First Product Engineering by The Economic Times
        </p>
        <a href="#awards" className="promo-header-stripe__cta">
          <span className="promo-header-stripe__cta-text">Read the Report</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
