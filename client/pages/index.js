import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.replace("/login");
    } else {
      router.replace("/dashboard");
    }
  }, []);

  return <div />;
}
