import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-bold mb-4">Unauthorized Access</h2>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
