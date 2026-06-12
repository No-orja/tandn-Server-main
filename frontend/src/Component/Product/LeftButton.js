import next from '../../Image/next.png'

export default function LeftButton(onClick, onDisable){
    return(
        <img
            src={next}
            alt=""
            width="35px"
            onClick={onClick}
            onDisable={onDisable}
            height="35px"
            style={{ float: "left", marginTop: "220px", cursor: "pointer" }}
        />
    )
}