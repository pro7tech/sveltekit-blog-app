// collection of commonnly used tailwind classes
export let t = {
  label: "block text-sm font-medium text-gray-700",
  input:
    "px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm",
  readonly: "bg-gray-50 cursor-not-allowed",
  cancel_button:
    "inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
  save_button:
    "ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
  blue_button:
    "inline-flex justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
  white_button:
    "inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-sky-400 hover:bg-opacity-75",
  danger_button:
    "inline-flex justify-center rounded-md border border-transparent bg-red-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2",
  full_button:
    "flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2",
  first_header_column:
    "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6",
  header_column: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
  first_tbody_column:
    "whitespace-nowrap py-4 pl-4 pr-3 text-sm medium text-gray-900 sm:pl-6",
  tbody_column: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
  tbody_column_wrap: "px-3 py-4 text-sm text-gray-500",
  tbody_action_column:
    "relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6",
}

// combine arguments into a single string of classes
export let all = (...args) => {
  return args.join(" ")
}
