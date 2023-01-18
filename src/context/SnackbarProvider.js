import React,{useState, createContext,Provider} from 'react'

export const SnackbarContext=createContext();

const SnackbarProvider = ({children}) => {
  
  const [snackbarState,setSnackbarState]=useState({
    snackbarOpen:false,
    snackbarType:"success",
    snackbarMessage:""
  });
  const { snackbarOpen,snackbarType,snackbarMessage}=snackbarState;
  
  const callSnackbar=(openSnack,type,msg)=>{
    setSnackbarState({
        snackbarOpen:openSnack,
        snackbarType:type,
        snackbarMessage:msg
    })
  }
//   console.log(snackbarOpen,snackbarType,snackbarType);
    return (
    <SnackbarContext.Provider value={
        {
            snackbarOpen,
            snackbarType,
            snackbarMessage,
            callSnackbar
        }
    }>
    {children}
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider