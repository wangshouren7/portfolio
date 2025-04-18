import Link from "next/link";
import { FileTextIcon } from "@pfl-wsr/ui";

export const Header: React.FC = () => {
  return (
    <nav className="container mx-auto flex items-center justify-between px-2 py-4 lg:px-8">
      <Link
        className="flex shrink-0 items-center gap-1 lg:flex-1 lg:gap-2"
        href={"/"}
      >
        <FileTextIcon className="h-5 w-5 text-gray-900 transition-transform duration-200 ease-in-out hover:rotate-12 lg:h-8 lg:w-8" />
        <span className="font-extrabold text-gray-900 lg:text-xl">
          PDFGenius
        </span>
      </Link>
      <Link href={"/#pricing"}>Pricing</Link>
      <Link href={"/sign-in"}>Sign In</Link>
    </nav>
  );
};
