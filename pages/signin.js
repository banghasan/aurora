import { Aurora } from "../components/Icons/Aurora";
import { SignInForm } from "../components/SignIn/SignInForm";
import { Card } from "../components/UI/Card";

export default function SignIn() {
  const handleSubmit = async (data) => {
    console.log(data);
    // TODO: change to signin
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Aurora className="h-28 w-28 mb-10" />

      <Card className="w-full max-w-md bg-white shadow-md p-8">
        <SignInForm onSubmit={handleSubmit} />

        <p className="mt-8 text-center text-gray-500 text-sm">
          &copy;2021 Aurora - Open Web Analytics.
        </p>
      </Card>
    </div>
  );
}
