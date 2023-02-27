import { Outlet } from "react-router-dom"

import './layout-personal-cabinet.css'

export const LayoutPersonalCabinet = () => (
    <div className="container-layout-personal-cabinet">
        <p className="layout-personal-cabinet-text">Cleverland</p>
    
        <Outlet />
    </div>
)