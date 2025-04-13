import Image from "next/image";
import { Result_Box } from "./components/prompt";
import { AppBar } from "./components/bar";

export default function Home() {
  return <div className="w-screen h-screen">
    <Result_Box/>
  </div>
}
