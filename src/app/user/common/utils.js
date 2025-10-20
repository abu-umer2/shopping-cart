import { useState } from "react";
import "./common.scss";
export default {
  ShowDialog(props) {
    const[children,setChildren] = useState(props.childComponent)
    function funClose(){
        alert("Called")
        setChildren("")
    }
    return (
      <div className="modal-overlay " onKeyUp={()=>funClose()}>
        <div className="modal-content">{children}</div>
      </div>
    );
  },
};
