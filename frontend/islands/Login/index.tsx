import { PropertyDeclaration } from "https://deno.land/x/ts_morph@17.0.1/ts_morph.js";
import { Button } from "../../components/Button.tsx";
import Input from "../../components/Input.tsx";

interface LoginProps {
  class?: string,
}

/**
 * The code for this login form comes from the
 * Hyper UI Components website:
 * https://www.hyperui.dev/components/marketing/forms#component-1
 */
export default function Login(props: LoginProps) {
  return (
    <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-xl shadow-sm"
            placeholder="Enter email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-xl shadow-sm"
            placeholder="Enter password"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-xl font-medium text-white"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}