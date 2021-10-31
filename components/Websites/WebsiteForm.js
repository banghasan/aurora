import { useForm } from "react-hook-form";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { SubTitle } from "../UI/SubTitle";
import { Prose } from "../UI/Prose";
import { Textarea } from "../UI/Textarea";
import { Fragment } from "react";

export function WebsiteForm(props) {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: props.defaultValues,
  });

  const options = [
    { label: "Nope, I Want to Keep it Private!", value: "0" },
    { label: "Yes, Make it Public!", value: "1" },
  ];

  return (
    <form
      className="grid grid-cols-1 gap-6"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Input label="Name *" {...register("name")} />
      <Input label="URL *" name="url" {...register("url")} />
      <Textarea label="Description" {...register("description")} />

      <div className="space-y-3 pt-10">
        <SubTitle>Share Statistics</SubTitle>
        <Prose>
          If you choose to make statistics public, a public URL will be
          available presenting a read-only version of the Aurora Dashboard.
          Don't worry, you can always disable it later!
        </Prose>
      </div>

      <Select
        label="Visibility *"
        {...register("is_public")}
        options={options}
      />

      {!props.isNew && (
        <Fragment>
          <div className="space-y-3 pt-10">
            <SubTitle>Link to Share</SubTitle>
            <Prose>Inserire Qui</Prose>
          </div>

          <div className="space-y-3 pt-10">
            <SubTitle>How to Connect Your Website</SubTitle>
            <Prose>
              Copy this line and paste it in your website's HEAD section:
            </Prose>
          </div>

          <pre className="p-4 bg-gray-200 text-black dark:text-white">
            TODO: Inserire SCRIPT
          </pre>
        </Fragment>
      )}

      <div className="pt-10">
        <Button
          disabled={formState.isSubmitting}
          isLoading={formState.isSubmitting}
          type="submit"
          label={props.isNew ? "Create Website!" : "Update Website!"}
        />
      </div>
    </form>
  );
}

WebsiteForm.defaultProps = {
  defaultValues: {},
  isNew: true,
};
