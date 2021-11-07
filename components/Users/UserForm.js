import { useForm } from "react-hook-form";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { SubTitle } from "../UI/SubTitle";
import { Prose } from "../UI/Prose";

export function UserForm(props) {
  const { firstname, lastname, email } = props.defaultValues;

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { firstname, lastname, email },
  });

  return (
    <form
      className="grid grid-cols-1 gap-6"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Input label="First Name" {...register("firstname")} />
      <Input label="Last Name" {...register("lastname")} />
      <Input label="Email Address" {...register("email")} />
      {/* TODO: Implement role logic with tests */}
      {/* <Select label="Role" {...register("role")} options={[]} /> */}

      <div className="space-y-3 pt-10">
        <SubTitle>Set Password</SubTitle>
        <Prose>
          A valid password must be at least 8 characters long and contain at
          least one number, one uppercase letter and one lowercase letter.
        </Prose>
      </div>

      <div className="flex space-x-4">
        <Input label="Password" type="password" {...register("password")} />
        <Input
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
        />
      </div>

      <div className="pt-10">
        <Button
          disabled={formState.isSubmitting}
          isLoading={formState.isSubmitting}
          type="submit"
          label={props.isNew ? "Create User!" : "Update User!"}
        />
      </div>
    </form>
  );
}

UserForm.defaultProps = {
  defaultValues: {},
};
