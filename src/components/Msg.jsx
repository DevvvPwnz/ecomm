import React from "react";
import useFetchFirestore from "../hooks/useFetchFirestore";

import CloseIcon from "@material-ui/icons/Close";

function Msg() {
  const { totalOrders, pushMsg, setPushMsg } = useFetchFirestore("newOrders");

  const onCloseMsg = () => {
    setPushMsg(false);
  };
  /// make orders link
  return (
    <div className="msg">
      {pushMsg && (
        <div className="msg__wrapper">
            <div className="msg__close">
              <CloseIcon onClick={onCloseMsg} />
            </div>
          <div className="msg__text">
            You Have {totalOrders} new orders
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Msg;
