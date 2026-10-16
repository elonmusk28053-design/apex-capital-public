export default function Footer(){
  return (
    <footer className="footer">
      <div className="wrap">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:20}}>
          <div>
            <strong>Apex Capital</strong>
            <div style={{marginTop:8}}>© {new Date().getFullYear()} Apex Capital. All rights reserved.</div>
          </div>
          <div>
            <div><a href="#">Privacy</a></div>
            <div><a href="#">Legal</a></div>
            <div><a href="#">Terms</a></div>
          </div>
        </div>
        <div style={{marginTop:16,fontSize:13,color:'#5a6b75'}}>This site is for informational purposes only and does not constitute investment advice.</div>
      </div>
    </footer>
  )
}
