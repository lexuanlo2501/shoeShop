import { useNavigate } from "react-router-dom"




const withNavigate = (Component) => (previousPage) => {
    const navigate = useNavigate

    return <Component {...props} navigate={navigate}/>
}

export default withNavigate