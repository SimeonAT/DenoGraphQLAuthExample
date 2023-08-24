import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

/**
 * https://fresh.deno.dev/components
 */
export default function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  const style = 
    `px-3 py-2 bg-white rounded border(2 gray-500) ` +
    `disabled:(opacity-50 cursor-not-allowed) ${
      props.class ?? ""
    }`
  return (
    <input
      {...props}
      disabled={false}
      class={style}
    />
  );
}