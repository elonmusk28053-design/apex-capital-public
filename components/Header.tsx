import Link from 'next/link';
export default function Header(){
  return (
    <header className="header">
      <div className="inner wrap">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Link href="/"><a aria-label="Apex Capital Home"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#d7b56d"/><path d="M6 15L10 9L14 15L18 9" stroke="#071526" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></a></Link>
          <span style={{fontWeight:700}}>Apex Capital</span>
        </div>
        <nav>
          <a href="#top">Home</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
