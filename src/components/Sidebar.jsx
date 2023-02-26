import Navbar from "./Navbar";
import Search from "./Search";
import Connections from "./Connections";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Connections />
    </div>
  );
};

export default Sidebar;
