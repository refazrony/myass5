import { ToastContainer } from "react-toastify";
import ProfileProvider from "./constexts/Providers/ProfileProvider"
import SearchCtxProvider from "./constexts/Providers/SearchCtxProvider"
import UserAuthProvoder from "./constexts/Providers/UserAuthProvoder"
import Blogify from "./projectModule/Blogify"
import { BrowserRouter as Router } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (

    <UserAuthProvoder>
      <ProfileProvider>
        <SearchCtxProvider>
          <Router>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition:Bounce
            />
            <Blogify />
          </Router>
        </SearchCtxProvider>
      </ProfileProvider>
    </UserAuthProvoder>
  )
}

export default App
