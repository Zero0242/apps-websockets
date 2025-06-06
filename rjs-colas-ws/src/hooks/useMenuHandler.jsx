import { useContext, useEffect } from "react";
import { UiContext } from "../context/UiContext";

export const useMenuHandler = (ocultar) => {
  const { showMenu, hideMenu } = useContext(UiContext);

  useEffect(() => {
    if (ocultar) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [ocultar, showMenu, hideMenu]);
};
