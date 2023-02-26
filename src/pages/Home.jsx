import ChatSide from "../components/ChatSide";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <ChatSide />
      </div>
    </div>
  );
};

export default Home;
