import { getSession } from "shared/utils/getSession";

export default async function Panel() {
  const session = await getSession();

  return (
    <div>
      <h2 className="mb-3">User {session?.user.wallet}</h2>
    </div>
  );
}
