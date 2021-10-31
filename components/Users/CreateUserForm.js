import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { SubTitle } from "../UI/SubTitle";
import { Prose } from "../UI/Prose";

export function CreateUserForm(props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Input label="First Name" name="firstname" />
      <Input label="Last Name" name="lastname" />
      <Input label="Email Address" name="email" />
      <Select label="Role" name="role" options={[]} />

      <div className="space-y-3 pt-10">
        <SubTitle>Set Password</SubTitle>
        <Prose>
          A valid password must be at least 8 characters long and contain at
          least one number, one uppercase letter and one lowercase letter.
        </Prose>
      </div>

      <div className="flex space-x-4">
        <Input label="Password" name="password" type="password" />
        <Input
          label="Confirm Password"
          name="password_confirmation"
          type="password"
        />
      </div>

      <div className="pt-10">
        <Button label="Create User!" />
      </div>
    </div>
  );
}
