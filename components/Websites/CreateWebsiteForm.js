import { useForm } from "react-hook-form";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { SubTitle } from "../UI/SubTitle";
import { Prose } from "../UI/Prose";
import { Textarea } from "../UI/Textarea";

export function CreateWebsiteForm() {
  const { register, handleSubmit, formState } = useForm();

  // TODO: Remove this
  const onSubmit = async (data) => {
    console.log("Parto");
    await simulateServerResponse();
    console.log(data);
  };

  const simulateServerResponse = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
  };

  const options = [
    { label: "Nope, I Want to Keep it Private!", value: "0" },
    { label: "Yes, Make it Public!", value: "1" },
  ];

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Name" {...register("name")} />
      <Input label="URL" name="url" {...register("url")} />
      <Textarea label="Description" {...register("description")} />

      <div className="space-y-3 pt-10">
        <SubTitle>Share Statistics</SubTitle>
        <Prose>
          If you choose to make statistics public, a public URL will be
          available presenting a read-only version of the Aurora Dashboard.
          Don't worry, you can always disable it later!
        </Prose>
      </div>

      <Select label="Visibility" {...register("is_public")} options={options} />

      <div className="space-y-3 pt-10">
        <SubTitle>Link to Share</SubTitle>
        <Prose>Inserire Qui</Prose>
      </div>

      <div className="space-y-3 pt-10">
        <SubTitle>How to Connect Your Website</SubTitle>
        <Prose>Copy this line of code in the HEAD of your page.</Prose>
      </div>

      <pre className="p-4 bg-gray-200 text-black dark:text-white">
        TODO: Inserire SCRIPT
      </pre>

      <div className="pt-10">
        <Button
          disabled={formState.isSubmitting}
          isLoading={formState.isSubmitting}
          type="submit"
          label="Create Website!"
        />
      </div>
    </form>
  );
}
