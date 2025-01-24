import { auth } from "../../(auth)/auth";

const AdminDashboard = async () => {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    return null;
  }

  return (
    <div className="w-full h-full bg-gray-200 text-black">
      <div>This is the admin dashboard.</div>
    </div>
  );
};

export default AdminDashboard;
