import { AtSign } from "react-feather";
import { Button, IconButton } from "components";

export default function LoginPage() {
  return (
    <div>
      <Button>Button</Button>
      <IconButton disabled Icon={AtSign}>
        Icon button
      </IconButton>
      <IconButton Icon={AtSign} />
    </div>
  );
}
