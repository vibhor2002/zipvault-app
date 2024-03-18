import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <main className="">
      <h1>DropBox</h1>
      
      <UserButton/>
    </main>
  );
}
