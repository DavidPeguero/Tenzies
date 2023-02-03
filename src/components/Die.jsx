import React from "react"

export default function Die(props){

    return(
        <div className="die" onClick={()=> props.freeze(props.id)} 
        style={{backgroundColor : props.held ? "#59E391" : ""}}>
            {props.value}
        </div>
    )
}