import React, {  } from 'react'
import './sidebar.css'
import { Link } from "react-router-dom";
import { lists } from '../../landpage/welcome';

const Sidebar = () => {
    return (
        <div id='sidebar' style={{ width: "10%", marginTop: "10%" }}>
            {lists.map((list, index) => (
                <button
                    aria-label='sidebar_link'
                    id='sidebar_btn'
                    className={` mt-3 border border-${list.bgcolor} bg-${list.bgcolor} bg-opacity-75`}
                    key={index}
                >
                    <Link to={`/${list.endpoint}`}> 
                        <i className={`bi ${list.imsrc} text-white fs-2`}></i>
                        <label className="fs-5 text-white" style={{ marginLeft: '10px' }}>{list.title}</label>
                    </Link>
                </button>
            ))}
        </div>
    )
}
export default Sidebar