import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const RandomPageRedirect = () => {
  const history = useHistory();

  useEffect(() => {
    history.goBack();
  });

  return null;
};

export default RandomPageRedirect;
