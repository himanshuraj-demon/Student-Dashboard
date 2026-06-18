import { useEffect, useState } from "react";
import Nav from "../services/Nav";
import { getUsers, updateRole } from "../services/adminapi";
import { type User } from "../context/AuthContext";

interface Props {
  currentUser: {
    _id: string;
    role: string;
  };
}

const AdminPage = ({ currentUser }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      const updatedUser = await updateRole(userId, role);
      setUsers((prev) => prev.map((u) => (u._id === userId ? updatedUser : u)));
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  return (
    <div className="main">
      <Nav />

      <div className="mx-auto max-w-6xl p-6 sm:p-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            User Management
          </h1>
          <p className="text-sm text-slate-500">
            Review, manage, and update user access levels across your organization.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-100">
          {loading ? (
            /* Modern Shimmer/Loading Skeleton */
            <div className="space-y-4 p-6 animate-pulse">
              <div className="h-5 w-1/4 rounded bg-slate-200" />
              <hr className="border-slate-100" />
              <div className="space-y-3">
                <div className="h-9 rounded bg-slate-100" />
                <div className="h-9 rounded bg-slate-100" />
                <div className="h-9 rounded bg-slate-100" />
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3.5">Name</th>
                    <th className="px-6 py-3.5">Email Address</th>
                    <th className="px-6 py-3.5">Role Authorization</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="transition-colors duration-150 hover:bg-slate-50/50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">
                        {user.name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                        {user.email}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {user._id === currentUser._id ? (
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            {user.role} (You)
                          </span>
                        ) : (
                          <div className="relative inline-block w-40">
                            <select
                              value={user.role}
                              onChange={(e) =>
                                handleRoleChange(user._id, e.target.value)
                              }
                              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                            >
                              <option value="STUDENT">STUDENT</option>
                              <option value="ADVISER">ADVISER</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
                            {/* Custom dropdown arrow icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;