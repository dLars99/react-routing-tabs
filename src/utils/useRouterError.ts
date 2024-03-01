import { useInRouterContext } from "react-router-dom";

export const useRouterError = (component: string) => {
  const isInRouter = useInRouterContext();

  if (!isInRouter) {
    // Don't crash, but make this known
    const rrdError = `${component} is intended to be used within a react-router-dom router.\nYour application may still work, but may be missing key accessibility features.`;
    console.error(rrdError);
  }
};
