import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-4BND2DZFCF");
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
