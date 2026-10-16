export default function HeroCard({title,children}:{title:string,children:any}){
  return (
    <div style={{background:'#fff',padding:20,borderRadius:8,boxShadow:'0 4px 14px rgba(2,6,23,0.06)'}}>
      <h3 style={{margin:'0 0 8px'}}>{title}</h3>
      <div style={{color:'#44515a'}}>{children}</div>
    </div>
  )
}
