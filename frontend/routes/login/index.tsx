import { PageProps } from "$fresh/server.ts";

import Login from "../../islands/Login/index.tsx";

/**
 * The code for this login page comes from the
 * Hyper UI Components website:
 * https://www.hyperui.dev/components/marketing/forms#component-1
 */
export default function LoginPage(props: PageProps) {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Deno GraphQL Login
        </h1>

        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
          eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>
      <Login />
    </div>
  );
}