import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewsCreation } from "@/context/newsContext";
import { loginUser } from "@/lib/apprwrite";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("wetwan080@gmail.com");
  const [password, setPassword] = useState("hbV?LVcC_Z7t.x!");

  const { setUser, setLoading, loading } = useNewsCreation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      toast.success("Login successful!");
      navigate("/admin");
      setUser(user);
    } catch (err) {
      console.log(err);
      toast.error("Login failed." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Card className="w-full max-w-md mx-auto mt-20 py-20">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(r) => setEmail(r.target.value)}
                className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(r) => setPassword(r.target.value)}
                className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {loading && (
            <Button type="submit" className="w-full">
              <Loader className=" animate-spin" />
            </Button>
          )}
          {!loading && (
            <Button type="submit" className="w-full">
              Login
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
