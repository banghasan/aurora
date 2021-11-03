import { Aurora } from "../components/Icons/Aurora";
import { Button } from "../components/UI/Button";
import { Card } from "../components/UI/Card";
import { Input } from "../components/UI/Input";

export default function SignIn(props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Aurora className="h-28 w-28 mb-10" />

      <Card className="w-full max-w-md bg-white shadow-md p-8">
        <form className="mb-8">
          <div className="mb-4">
            <Input
              type="email"
              placeholder="john.doe@example.com"
              label="Email Address"
            />
          </div>
          <div className="mb-10">
            <Input
              type="password"
              placeholder="********"
              label="Your Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" label="Sign In" />
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm">
          &copy;2021 Aurora - Open Web Analytics.
        </p>
      </Card>
    </div>
  );
}
