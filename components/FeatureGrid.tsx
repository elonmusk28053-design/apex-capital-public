export default function FeatureGrid(){
  const items = [
    {t:'Disciplined Process',d:'Systematic research and risk controls.'},
    {t:'Transparent Fees',d:'Clear fee schedule and reconciliations.'},
    {t:'Compliance First',d:'KYC/AML baked into onboarding.'},
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16}}>
      {items.map(it=>(
        <div key={it.t} style={{padding:16,borderRadius:8,border:'1px solid #e6eef2'}}>
          <h4 style={{margin:'0 0 8px'}}>{it.t}</h4>
          <p style={{margin:0,color:'#51646e'}}>{it.d}</p>
        </div>
      ))}
    </div>
  )
}
