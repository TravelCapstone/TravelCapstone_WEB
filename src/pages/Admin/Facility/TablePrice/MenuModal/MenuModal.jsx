import React, { useState, useEffect } from "react";
import MenuManagement from "../../MenuManagement";

function MenuModal({ isOpen, setIsOpen, menuId, handleClose }) {
  console.log(menuId);

  return <>{isOpen && <MenuManagement />}</>;
}

export default MenuModal;
