import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/useAuth";
import { useToast } from "../lib/hooks/useToast";
import { Card } from "../components/UI/Card";
import { Aurora } from "../components/Icons/Aurora";
import { SignInForm } from "../components/SignIn/SignInForm";
import { Toaster } from "react-hot-toast";

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { showError } = useToast();

  const handleSubmit = async (data) => {
    signIn(data)
      .then(() => router.push("/"))
      .catch(() => showError("Invalid email or password"));
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

      <Toaster />
    </div>
  );
}
