import { BrowserRouter, Routes, Route } from 'react-router-dom';

//admin
import { Admin } from './components/admin/Admin';
import { AdminDashboard } from './components/admin/dashboard/AdminDashboard';

//user
import { Signin } from './components/user/signinsignup/Signin'
import {Signup} from './components/user/signinsignup/Signup'
import { AddSong } from './components/admin/addsongs/AddSong';
import { User } from './components/admin/user/User'
import { Artist } from './components/user/before_login/Artist';
import Products from './components/NestedRoutes/Products';
import Featured from './components/NestedRoutes/Featured';
import View from './components/NestedRoutes/View';
import { Home } from './components/user/home/Home';
import { UserDashboard } from './components/user/home/UserDashboard';
import { Search } from './components/user/search/Search';
import { Playlist } from './components/user/play_list/Playlist';
import { UserPage } from './components/user/after_login/UserPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin/:username' element={<Admin />} />
          <Route path='/admin/addsongs' element={<AddSong />} />
          <Route path='/user' element={<User />} />
          <Route path='/product' element={<Products/>}>
            <Route index element={<Featured/>}></Route>
            <Route path='featured' element={<Featured/>}></Route>
            <Route path='view' element={<View/>}></Route>
          </Route>
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/playlist' element={<Playlist />} />
          <Route path='/' element={<UserDashboard />}>
            <Route index element={<Home />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='search' element={<Search />}></Route>
            <Route path=':artistName' element={<Artist />} />
            <Route path='/user/:userName' element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
