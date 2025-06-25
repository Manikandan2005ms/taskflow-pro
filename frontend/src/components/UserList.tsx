"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { User } from "@/types/user";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container max-w-5xl mx-auto mt-8">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 text-center tracking-tight">All Users</h2>
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full bg-white rounded-2xl">
          <thead>
            <tr className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white">
              <th className="py-3 px-6 rounded-tl-2xl">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6 rounded-tr-2xl">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border-b last:border-b-0 hover:bg-blue-50 transition-colors">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
