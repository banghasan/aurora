import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Filters } from "./Filters";
import { Button } from "../UI/Button";
import { Select } from "../UI/Select";
import { SubTitle } from "../UI/SubTitle";
import { Modal } from "../UI/Modal";
import { useForm } from "react-hook-form";

export function Informations(props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(router.query);
  const { register, handleSubmit, formState } = useForm();

  useEffect(() => {
    if (router.isReady) {
      setActiveFilters(router.query);
    }
  }, [router.isReady]);

  const filters = [
    { label: "Country", value: "country" },
    { label: "Browser", value: "browser" },
    { label: "Page", value: "page" },
  ];

  const handleApply = (data) => {
    setActiveFilters((prev) => {
      const next = { ...prev, ...{ [data.filter]: data.value } };

      router.push({ pathname: "/dashboard", query: next }, undefined, {
        shallow: true,
      });

      return next;
    });

    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center space-x-5">
      <h3 className="tracking-tighter font-medium text-2xl text-gray-900">
        useaurora.app
      </h3>

      <Filters filters={activeFilters} />

      <div className="flex justify-end w-4/12 space-x-2">
        <div className="flex w-2/4">
          <Button label="Add Filter" onClick={() => setIsModalOpen(true)} />
        </div>
        <div className="flex w-full">
          <Select
            options={[
              { value: "1", label: "Last 12 Months" },
              { value: "2", label: "Last 6 Months" },
            ]}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen}>
        <div className="space-y-3 mb-10 flex flex-col">
          <SubTitle>Add Filter</SubTitle>
          <div className="max-w-sm flex text-lg text-gray-600">
            Select the filter, and click.
          </div>
        </div>

        <form onSubmit={handleSubmit(handleApply)}>
          <div className="space-y-5 mb-10 flex flex-col">
            <Select label="Filter" {...register("filter")} options={filters} />
            <Select
              label="Value"
              {...register("value")}
              options={[
                { value: "firefox", label: "Firefox" },
                { value: "chrome", label: "Chrome" },
              ]}
            />
          </div>
          <div className="flex space-x-4">
            <Button type="submit" label="Apply!" />
            <Button onClick={() => setIsModalOpen(false)} label="Close!" />
          </div>
        </form>
      </Modal>
    </div>
  );
}
