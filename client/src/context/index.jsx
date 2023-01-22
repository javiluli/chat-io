import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useReducer } from "react";

const __botMessage = {
  user: {
    id: "__bot",
    nickname: "[Bot]",
    picture: "https://uptime.com/media/website_profiles/discordbots.org.png",
  },
  text: "Bienvenido a chat.io",
  color: "hsla(226, 58%, 80%, 1)",
  time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
};

const MaterialUI = createContext();

MaterialUI.displayName = "MaterialUIContext";

function reducer(state, action) {
  const REDUCER_OPTIONS = {
    LIGHTMODE: { ...state, lightMode: action.value },
  };

  return REDUCER_OPTIONS[action.type] || state;
}

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    botMessage: __botMessage,
    lightMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error("useMaterialUIController should be used inside the MaterialUIControllerProvider.");
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setLightMode = (dispatch, value) => dispatch({ type: "LIGHTMODE", value });

export { MaterialUIControllerProvider, useMaterialUIController, setLightMode };
