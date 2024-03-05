import SearchCtxProvider from "./constexts/Providers/SearchCtxProvider"
import Blogify from "./projectModule/Blogify"



function App() {
  return (
    <SearchCtxProvider>
      <Blogify />
    </SearchCtxProvider>
  )
}

export default App
