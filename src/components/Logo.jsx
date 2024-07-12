import React from 'react'
import icon from '../assets/pngtree-blog-icon.png'

const Logo = ({ width = "100px" }) => {
    return (
        <div><img src={icon} alt="Logo" style={{ width}} /></div>
    )
}

export default Logo