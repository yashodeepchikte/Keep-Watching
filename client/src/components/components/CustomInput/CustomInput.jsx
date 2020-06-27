import React from "react"

import {StylisedCustomInput} from "./StylisedCustomInput"

const CustomInput = ({type, name, label, handelChange, required, value}) => {
    return(
        
            <tr>
                
               <td>
                    <label htmlFor={name}>{label}</label>
               </td> 
               <td>
                    <input type={type} name={name} value={value} onChange={handelChange} />
               </td>
           
            </tr>
          
    )
}

export default CustomInput