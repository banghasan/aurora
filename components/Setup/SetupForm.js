import { useForm } from "react-hook-form";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

export function SetupForm(props) {
  const { register, handleSubmit, formState } = useForm();

  return (
    <form
      className="grid grid-cols-1 gap-4"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Input label="First Name" placeholder="John" {...register("firstname")} />
      <Input label="Last Name" placeholder="Wick" {...register("lastname")} />
      <Input
        label="Your Email"
        placeholder="john.wick@example.com"
        {...register("email")}
      />
      <Input
        type="password"
        label="Your Password"
        placeholder="******"
        {...register("password")}
      />
      <Input
        type="password"
        label="Confirm Password"
        placeholder="******"
        {...register("confirmPassword")}
      />

      <div className="pt-6">
        <Button
          disabled={formState.isSubmitting}
          isLoading={formState.isSubmitting}
          type="submit"
          label="Create Account!"
        />
      </div>
    </form>
  );
}
