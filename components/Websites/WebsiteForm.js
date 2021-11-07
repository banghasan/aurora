import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { SubTitle } from "../UI/SubTitle";
import { Prose } from "../UI/Prose";
import { Textarea } from "../UI/Textarea";

export function WebsiteForm(props) {
  const { name, description, url, is_public } = props.defaultValues;

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { name, description, url, is_public },
  });

  const options = [
    { label: "Nope, I Want to Keep it Private!", value: "false" },
    { label: "Yes, Make it Public!", value: "true" },
  ];

  const currentUrl = location.protocol + "//" + location.host;
  const sharedLink = `${currentUrl}/s/${props.defaultValues.id}`;
  const generatedLink = `<script async defer src="${currentUrl}/aurora.js" aurora-id="${props.defaultValues.id}"></script>`;

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
            <Prose>
              <a href={sharedLink}>{sharedLink}</a>
            </Prose>
          </div>

          <div className="space-y-3 pt-10">
            <SubTitle>How to Connect Your Website</SubTitle>
            <Prose>
              Copy this line and paste it in your website's HEAD section:
            </Prose>
          </div>

          <pre className="p-4 bg-gray-200 text-black dark:text-white">
            {generatedLink}
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
