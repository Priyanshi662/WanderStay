import BottomNav from '../components/BottomNav';
import NavBar from '../components/Navbar';
import Login from '../components/user/Login';

const Home = () => {
  return (
    <>
      <Login />
      <NavBar />
      <BottomNav />
    </>
  );
};

export default Home;