import { useState } from "react"

function Square({value})
{ 
return <button className="square">{value}</button>
}


export default function Board()
{
  const [square, Setsquare]=useState(Array(9).fill(null));

  return(
    <>
    <div className="board-row">
    < Square value={Square[0]} />
    <Square value={Square[1]}  />
    <Square value={Square[2]} />
    </div>
    <div className="board-row">
    < Square value={Square[3]} />
    <Square value={Square[4]} />
    <Square value={Square[5]}  />
    </div>
    <div className="board-row">
    < Square value={Square[6]} />
    <Square value={Square[7]} />
    <Square value={Square[8]} />
    </div>  
    </>
  )
}
