import { PageProps } from "$fresh/server.ts";

import Login from "../../islands/Login/index.tsx";

/**
 * The code for this login page comes from the
 * Hyper UI Components website:
 * https://www.hyperui.dev/components/marketing/forms#component-1
 */
export default function LoginPage(props: PageProps) {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-5xl font-bold">
          Deno GraphQL Login Demonstration
        </h1>

        <p className="mt-4 text-gray-500">
          This website is a demonstration on how authentication
          and authorization can be implemented using Deno and GraphQL.
        </p>
      </div>
      <Login />
    </div>
  );
}