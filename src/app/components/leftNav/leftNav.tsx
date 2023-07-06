"use client"
import { useState } from "react";
import navlinks from "../../navLinks/navLinks";
import '../../styles/leftNav.css'
import Link from 'next/link'

const LeftNav = () => {
    const [selectedItem, setSelectedItem] = useState<number>()
    return ( 
        <div className="leftNav">
            <div className="logo">
            Feedforward &nbsp; &gt; 
            </div>
            <div className="navLinks">
            {navlinks.map((item)=>{
                return(
                <div key={item.id} className= {`navItem ${selectedItem === item.id ? "selected" : ""}`}  onClick={() => setSelectedItem(item.id)}>
                    <div className="flex gap-2">
                   <span className="navLogo"><item.icon/></span> <span><Link style={{color: selectedItem === item.id ? "white" : "black", textDecoration: "none"}} href={item.route}> {item.name} </Link>
                   </span>
                   </div>
                   {selectedItem === item.id && <span>&gt;</span>}
                    </div>
                )
            })}
            </div>
        </div>
     );
}
 
export default LeftNav;