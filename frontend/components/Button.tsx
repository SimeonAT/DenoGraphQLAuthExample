import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & {
  class?: string,
}; 

export function Button(props: ButtonProps) {
  const styles =
    "px-2 py-1 border-gray-500 border-2 rounded " + 
    "bg-white hover:bg-gray-200 transition-colors " +
    props.class;

  return (
    <button
      {...props}
      disabled={false}
      class={styles}
    />
  );
}