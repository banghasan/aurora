import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading/Heading";
import { Title } from "../../components/Heading/Title";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Prose } from "../../components/UI/Prose";
import { Select } from "../../components/UI/Select";
import { Textarea } from "../../components/UI/Textarea";

export function SubTitle(props) {
  return (
    <h3 className="font-bold tracking-tighter text-2xl md:text-4xl text-gray-900">
      {props.children}
    </h3>
  );
}

export default function Create(props) {
  const options = [
    { label: "Nope, I Want to Keep it Private!", value: "0" },
    { label: "Yes, Make it Public!", value: "1" },
  ];

  return (
    <Container>
      <Heading title="Create Website">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus
        dui, sagittis nec dapibus in, interdum eget leo. Duis finibus turpis nec
        nibh mattis, in aliquam dui condimentum.
      </Heading>

      <div className="grid grid-cols-1 gap-6">
        <Input label="Name" name="name" />
        <Input label="URL" name="url" />
        <Textarea label="Description" name="description" />

        <div className="space-y-3 pt-10">
          <SubTitle>Share Statistics</SubTitle>
          <Prose>
            If you choose to make statistics public, a public URL will be
            available presenting a read-only version of the Aurora Dashboard.
            Don't worry, you can always disable it later!
          </Prose>
        </div>

        <Select label="Visibility" name="visibility" options={options} />

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
          <Button label="Create Website!" />
        </div>
      </div>
    </Container>
  );
}
