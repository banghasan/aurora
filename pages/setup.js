import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuth } from "../lib/hooks/useAuth";
import { useToast } from "../lib/hooks/useToast";
import { Card } from "../components/UI/Card";
import { Aurora } from "../components/Icons/Aurora";
import { SetupForm } from "../components/Setup/SetupForm";
import { SubTitle } from "../components/UI/SubTitle";
import { Prose } from "../components/UI/Prose";
import { useSetup } from "../lib/hooks/useSetup";

export default function Setup() {
  const router = useRouter();
  const { setUp } = useAuth();
  const { showError } = useToast();
  const { setup, isLoading, isError } = useSetup();

  const handleSubmit = async (data) => {
    setUp(data)
      .then(() => router.push("/signin"))
      .catch(() =>
        showError("An error has occurred by creating the account..")
      );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-around min-h-screen">
        <div className="flex flex-col space-y-4 p-5 sm:p-0 items-center animate-pulse">
          <Aurora className="h-28 w-28 mb-10" />
          <SubTitle>Loading Setup..</SubTitle>
          <Prose>
            We are checking the system. This may take a few seconds.
          </Prose>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-around min-h-screen">
        <div className="flex flex-col space-y-4 p-5 sm:p-0 items-center">
          <Aurora className="h-28 w-28 mb-10" />
          <SubTitle>Whoops.. Something goes wrong!</SubTitle>
          <Prose>
            An error has occurred, please check if you have set up the database
            connection correctly.
          </Prose>
        </div>
      </div>
    );
  }

  if (!setup.needsSetup) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-around min-h-screen">
        <div className="flex flex-col space-y-4 p-5 sm:p-0 items-center">
          <Aurora className="h-28 w-28 mb-10" />
          <SubTitle>Nothing to do here!</SubTitle>
          <Prose>
            You already done the setup. You can now sign in to your account and
            start using Aurora!
          </Prose>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-around min-h-screen">
      <div className="flex flex-col space-y-4 p-5 sm:p-0">
        <Aurora className="h-28 w-28 mb-10" />
        <SubTitle>Welcome!</SubTitle>
        <Prose>
          You are about to setup your first Aurora account. Please fill the form
          to continue. You will be able to change your information later.
        </Prose>
      </div>
      <div class="flex items-center w-full max-w-xl">
        <Card className="bg-white shadow-md p-8">
          <SetupForm onSubmit={handleSubmit} />

          <p className="mt-8 text-center text-gray-500 text-sm">
            &copy;2021 Aurora - Open Web Analytics.
          </p>
        </Card>
      </div>

      <Toaster />
    </div>
  );
}
