import { PageProps } from "$fresh/server.ts";

import Login from "../../islands/Login/index.tsx";

export default function LoginPage(props: PageProps) {
  return (
    <div class="my-10 flex flex-col items-center justify-center gap-10">
      <div class="flex flex-col items-center">
        <h1 class="text-7xl">Habit Tracker</h1>
        <h2 class="text-5xl">Web Application</h2>
      </div>
      <Login class="w-1/3" />
    </div>
  );
}