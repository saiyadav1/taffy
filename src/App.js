import './App.css';
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./theme/Theme";
import { AuthProvider}  from './context/AuthContext';
import Routing from './routes/Routing';
import CustomizeSnackbar from './components/Snackbar/CustomizeSnackbar';
import SnackbarProvider from './context/SnackbarProvider';
function App() {
  return (
    <div className="App">
        <ThemeProvider theme={customTheme}>
          <SnackbarProvider>
            <AuthProvider>
              <CustomizeSnackbar/>
              <Routing/>
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
    </div>
  );
}

export default App;
