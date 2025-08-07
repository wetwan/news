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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "@/lib/apprwrite";
import { useState } from "react";

const Addadmin = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(email, password, name, role);
      alert("User created! Now log in.");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <Card className="w-full max-w-md mx-auto sm:mt-20 sm:py-20">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(t) => setName(t.target.value)}
                className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(t) => setEmail(t.target.value)}
                className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(t) => setPassword(t.target.value)}
                className="focus-within:ring-0 border-blue-400 focus-within:border-blue-500"
              />
            </div>

            <div className="grid gap-2">
              <Label>Select role</Label>
              <Select onValueChange={setRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Create Admin
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Addadmin;
