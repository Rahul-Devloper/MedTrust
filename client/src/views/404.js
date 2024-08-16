import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const RandomPageRedirect = () => {
  const history = useHistory()

  // useEffect(() => {
  //   history.goBack();
  //   console.log('redirecting')
  //   history.push('/home')
  // });

  // return null;
  history.push('/home')
};

export default RandomPageRedirect;
