import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold">Able Pro</h2>
      <nav className="mt-6">
        <Link to="/profile" className="block py-2 px-4 bg-blue-500 text-white rounded">View Profile</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
