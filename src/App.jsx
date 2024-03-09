import SearchCtxProvider from "./constexts/Providers/SearchCtxProvider"
import UserAuthProvoder from "./constexts/Providers/UserAuthProvoder"
import Blogify from "./projectModule/Blogify"



function App() {
  return (
    <UserAuthProvoder>
      <SearchCtxProvider>
        <Blogify />
      </SearchCtxProvider>
    </UserAuthProvoder>
  )
}

export default App
