import NextLink from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TranslateIcon } from "@heroicons/react/solid";

const MenuItem = ({ locale }) => {
  return (
    <Menu.Item>
      <NextLink href="/" locale={locale}>
        <a className="block px-0 py-2 text-xs font-bold text-center rounded-md text-black dark:text-gray-200 dark:hover:text-white">
          {locale.toUpperCase()}
        </a>
      </NextLink>
    </Menu.Item>
  );
};

export function LocaleDialog() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="w-10 h-10 p-3 bg-gray-200 rounded dark:bg-gray-800">
              <TranslateIcon
                className="w-4 h-4 text-gray-800 dark:text-gray-200 dark:hover:text-white"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition show={open} as={Fragment}>
            <Menu.Items
              static
              className="origin-top-left absolute left-0 mt-3 w-56 rounded shadow focus:outline-none"
            >
              <div className="p-1 grid grid-cols-2 text-black dark:text-white bg-gray-200 dark:bg-gray-800 rounded">
                <MenuItem locale="en" />
                <MenuItem locale="it" />
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
