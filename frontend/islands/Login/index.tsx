import { PropertyDeclaration } from "https://deno.land/x/ts_morph@17.0.1/ts_morph.js";
import { Button } from "../../components/Button.tsx";
import Input from "../../components/Input.tsx";

interface LoginProps {
  class?: string,
}

export default function Login(props: LoginProps) {
  return (
    <div class={props.class === undefined ? "" : props.class}>
      <div class="flex flex-col gap-4">
        <Input class="text-3xl"/>
        <Input class="text-3xl"/>
        <div>
        <Button class="text-3xl">
          Log in
        </Button>
        </div>
      </div>
    </div>
  );
}