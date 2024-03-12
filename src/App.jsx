import { ToastContainer } from "react-toastify";
import ProfileProvider from "./constexts/Providers/ProfileProvider"
import SearchCtxProvider from "./constexts/Providers/SearchCtxProvider"
import Blogify from "./projectModule/Blogify"
import { BrowserRouter as Router } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import BlogProvider from "./constexts/Providers/BlogProvider";



function App() {
  return (

    <BlogProvider>
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
    </BlogProvider>

  )
}

export default App
