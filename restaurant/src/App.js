import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Admin from "./screens/admin/Admin";
import Header from "./components/Header";
import Error from "./screens/error/Error";
import CreateCategory from "./screens/createCategory/CreateCategory";
import CreateItem from "./screens/createItem/CreateItem";
import Categories from "./screens/categories/Categories";
import Items from "./screens/itemCategories/Items";
import EditCategory from "./screens/editCategory/EditCategory";
import EditItem from "./screens/editItem/EditItem";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />}>
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-item" element={<CreateItem />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<EditCategory />} />
          <Route path="category-items" element={<Items />} />
          <Route path="category-items/:id" element={<EditItem />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
