import { Link } from "react-router-dom"
//line-height, letter-spasing

export default function SubTitle({title, btnTitle, pathText}){
    return(
        <div style={{display:"flex", justifyContent:"space-between", paddingTop:"7px"}}>
            <div className="sub-tile" >
                {title}
            </div>
            <div>
            {btnTitle ? (
                <Link to={pathText}  style={{textDecoration:'none'}}>
                    <div className="shopping-now">{btnTitle}</div>
                </Link>
            ): null} </div>
        </div>
    )
}