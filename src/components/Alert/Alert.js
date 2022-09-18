import { useContext,useEffect } from "react";
import MainContext from "../../context/MainContext";
const Alert = () => {
  const { alert ,setAlert} = useContext(MainContext);
useEffect(() => {setTimeout(() => {
  setAlert({
    message: "",
  });
 
}, 2000)},[])
  return alert.message && (
      <div className={"alert alert-" + alert.status}>{alert.message}</div>
    )

};
export default Alert;
