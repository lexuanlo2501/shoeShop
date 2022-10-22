import { useState } from "react"
import './SelectActive.scss'

function SelectActive({children}) {
    // console.log(children.props)
    const [active, setActive] = useState(0)
    
    return (
        <>
            {/* {
                children.map((item, index) => {
                    const Com = item
                    return (
                    <div 
                        key={index} 
                        className={active === index ? "select" : ""}
                        onClick={() => {setActive(index)}}
                    >
                        {item}
                    </div>)
                })
            } */}

            {
                children.map((item, index) => {
                    return (
                        <item.type 
                            key={index} 
                            className={active === index ? item.props.className + " " + "select" : item.props.className}
                            onClick={() => {
                                setActive(index)
                                item.props.onClick()
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