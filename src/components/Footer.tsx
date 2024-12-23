import Image from "next/image";
import Link from "next/link";

const Footer = () => (
  <footer className="flex flex-col text-black-100  mt-1 border-t border-gray-100">
    <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-2">
      <div className="flex flex-col justify-start items-start gap-2">
        <h1 className="text-2xl font-bold text-primary-blue">SudokuKe</h1>
        {/* <Image
          src="/logo.svg"
          alt="logo"
          width={118}
          height={18}
          className="object-contain"
        /> */}
        <p className="text-base text-gray-700">
          SudokuKe 2023 <br />
          All Rights Reserved &copy;
        </p>
      </div>
    </div>

    <div className="flex justify-between items-center flex-wrap border-t border-gray-100 sm:px-16 px-6 py-4">
      <p>@2024 SudokuKe. All rights reserved</p>

      <div className="footer__copyrights-link">
        <Link href="/" className="text-gray-500">
          Privacy & Policy
        </Link>
        <Link href="/" className="text-gray-500">
          Terms & Condition
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
