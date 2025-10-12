import React from 'react'
import { useParams } from 'react-router-dom'

export default function Products() {
    let params=useParams()
    let data=[
        {pid:1001,pname:"Samsung",price:10000,img:"img2.jpg"},
        {pid:1001,pname:"Samsung",price:10000,img:"img2.jpg"}
    ]
  return (
    <div class="container">
      <div style={{display:'flex',flexWrap:'wrap'}}>
        {data.map((obj)=>{
           return <div style={{marginRight:'10px'}}> 
            <h3>{obj.pname}</h3>
            <img src={obj.img} width="150px" height="150px"/>
            <div>{obj.price}</div>
            <button class="btn btn-primary">
                More Info
            </button>
            </div>
        })}
      </div>
    </div>
  )
}
