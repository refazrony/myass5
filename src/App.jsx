import ProfileProvider from "./constexts/Providers/ProfileProvider"
import SearchCtxProvider from "./constexts/Providers/SearchCtxProvider"
import UserAuthProvoder from "./constexts/Providers/UserAuthProvoder"
import Blogify from "./projectModule/Blogify"



function App() {
  return (

    <UserAuthProvoder>
      <ProfileProvider>
        <SearchCtxProvider>
          <Blogify />
        </SearchCtxProvider>
      </ProfileProvider>
    </UserAuthProvoder>
  )
}

export default App
