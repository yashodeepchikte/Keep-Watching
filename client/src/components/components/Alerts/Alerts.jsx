import React, {useContext} from "react"
import AlertContext from "../../../context/AlertContext/AlertContext"

import "./Alerts.styles.css"

const Alerts = () => {
    const alertContext = useContext(AlertContext)
    return(
        alertContext.alerts.length > 0 && 
        alertContext.alerts.map( alert => (
            <div key = {alert.id} className={"alert alert-"+alert.type}>
                <p>{alert.msg!=="" ? alert.msg: "Some error"}</p>
            </div>
        ))
    )
}

export default Alerts