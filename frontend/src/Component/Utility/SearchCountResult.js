import React from 'react'
import UnopDropdown from "unop-react-dropdown";
import sort from '../../Image/sort.png'

export default function SearchCountResult({onClick, title}){

    const handler=()=> {

    }
    const clickMe=(key)=>{
        localStorage.setItem("sortType", key)
        console.log("🔄 تم تحديث الترتيب إلى:", key);
        onClick();  
    }
    return(
        <div className="d-flex justify-content-between pt-3 px-2">
            <div className="sub-tile">{title}</div>
            <div className="search-count-text d-flex ">
                <UnopDropdown
                    onAppear={handler}
                    onDisappearStart={handler}
                    trigger={
                        <p className="mx-1">
                            <img
                                width="20px"
                                height="20px"
                                className="ms-1"
                                src={sort}
                                alt=""
                            />
                            ترتيب حسب
                        </p>
                    }
                    delay={0}
                    align="CENTER"
                    hover>
                        
                    <div className="card-filter">
                        <div className="border-bottom card-filter-item" onClick={()=>clickMe("بدون ترتيب")}>بدون ترتيب</div>
                        <div className="border-bottom card-filter-item" onClick={()=>clickMe("الاكثر مبيعا")}>الاكثر مبيعا</div>
                        <div className="border-bottom card-filter-item" onClick={()=>clickMe("الاعلي تقييما")}>الاعلي تقييما</div>
                        <div className="border-bottom card-filter-item" onClick={()=>clickMe("السعر من الاقل للاعلى")}>السعر من الاقل للاعلى</div>
                        <div className=" card-filter-item" onClick={()=>clickMe("السعر من الاعلى للاقل")}>السعر من الاعلي للاقل</div>
                    </div>
                </UnopDropdown>
            </div>
        </div>
    )
}