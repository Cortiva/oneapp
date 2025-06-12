import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const goTo = (page: string) => {
    router.push(page);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Login
      </h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button className="w-full py-2 bg-primary text-white rounded hover:bg-teal-600">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-300">
        {"Don't have an account? "}
        <button
          onClick={() => goTo("/register")}
          className="text-primary hover:underline"
        >
          Register
        </button>
      </p>
    </AuthLayout>
  );
}
