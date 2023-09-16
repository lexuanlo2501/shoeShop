import { useState } from "react"
import './SelectActive.scss'

function SelectActive({children, noActive}) {
    const [active, setActive] = useState()
    
    return (
        <>
        {
            children.map((item, index) => {
                return (
                    <item.type 
                        key={index} 
                        className={active === index ? item.props.className + " " + "select" : item.props.className}
                        onClick={() => {
                            if(!item.props.noActive){
                                setActive(index)
                                item.props?.onClick()
                            }
                        }}
                    >
                        {item.props.children}
                    </item.type>
                )
            })
        }
        </>
    )
}

export default SelectActive 