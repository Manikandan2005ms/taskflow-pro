import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <p className="text-muted-foreground">Manage your account information</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex flex-col items-center md:w-1/3">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl mb-4">
                {user?.name?.charAt(0) || "U"}
              </div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">Role: {user?.role}</p>
              <p className="text-muted-foreground mt-1">Email: {user?.email}</p>
            </div>
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={user?.name || ""}
                    disabled
                    className="form-input border rounded-md p-2 w-full bg-muted/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="form-input border rounded-md p-2 w-full bg-muted/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input
                    type="text"
                    value={user?.role || ""}
                    disabled
                    className="form-input border rounded-md p-2 w-full bg-muted/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 