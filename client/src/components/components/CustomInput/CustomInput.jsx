import React from "react"

import {StylisedCustomInput} from "./StylisedCustomInput"

const CustomInput = ({type, name, label, handelChange, required, value}) => {
    return(
          
            <StylisedCustomInput>
                
               <td className="first">
                    <label htmlFor={name}>{label}</label>
               </td> 
               <td>
                    <input type={type} name={name} value={value} onChange={handelChange} />
               </td>
           
            </StylisedCustomInput>
          
    )
}

export default CustomInput