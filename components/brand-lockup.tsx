export function BrandLockup() {
  return <svg className="brand-lockup" viewBox="0 0 360 430" role="img" aria-labelledby="brand-lockup-title">
    <title id="brand-lockup-title">BlueGreen Tourism and Spitogo</title>
    <g className="brand-tourism">
      <circle cx="256" cy="67" r="33" fill="#f2bf31"/>
      <g fill="#f2bf31">{Array.from({length:9},(_,i)=><path key={i} d="M252 18h8l-4-18z" transform={`rotate(${i*24-96} 256 67)`}/>)}</g>
      <path d="M79 97c31-18 56-19 78-6-27 3-45 10-62 24 26-7 46-5 63 4-25 2-43 8-58 19 27-6 45-3 60 8-31 3-57-3-81-18-17-11-31-23-48-25 13-8 30-8 48-4Z" fill="#75b747"/>
      <path d="M144 110c-3 21-1 37 7 53m-8-38-21-21m26 34 25-23m-23 41 29-11" fill="none" stroke="#64a944" strokeWidth="5" strokeLinecap="round"/>
      <path d="M66 193c59-57 119-72 190-47 20 7 40 11 68 9-31 22-62 24-94 9-61-28-108-17-164 29Z" fill="none" stroke="#2586bd" strokeWidth="8" strokeLinecap="round"/>
      <path d="m292 151 38 8-34 15 6-11-10-4Z" fill="#2586bd"/>
      <text x="180" y="238" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="43" fontWeight="700" letterSpacing="-2"><tspan fill="#2c75ac">Blue</tspan><tspan fill="#5da84b">Green</tspan></text>
      <text x="278" y="215" fill="#e7bd36" fontFamily="Georgia,serif" fontStyle="italic" fontSize="23">tourism</text>
    </g>
    <g className="brand-spitogo" fill="none" stroke="#ea842f" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
      <path d="m108 316 72-60 72 60v65h-56"/>
      <path d="M154 310h20v20h-20zm29 0h20v20h-20zm-29 28h20v20h-20z" fill="#ea842f" stroke="none"/>
      <circle cx="227" cy="360" r="22" fill="#171c29" stroke="#ea842f" strokeWidth="9"/>
      <path d="m243 376 20 20" strokeWidth="12"/>
    </g>
    <text className="brand-spitogo-word" x="180" y="426" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="47" fontWeight="700" letterSpacing="-2">spitogo</text>
  </svg>;
}
