import { useForm } from "react-hook-form";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

export function SignInForm(props) {
  const { register, handleSubmit, formState } = useForm();

  return (
    <form
      className="grid grid-cols-1 gap-4"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Input
        label="Your Email"
        placeholder="john.doe@example.com"
        {...register("email")}
      />
      <Input
        type="password"
        label="Your Password"
        placeholder="******"
        {...register("password")}
      />

      <div className="pt-6">
        <Button
          disabled={formState.isSubmitting}
          isLoading={formState.isSubmitting}
          type="submit"
          label="Sign In"
        />
      </div>
    </form>
  );
}
