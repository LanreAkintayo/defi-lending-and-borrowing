import Navbar from "../components/ui/Navbar";
import ReserveStatus from "@components/ui/ReserveStatus";
import TokenInfo from "@components/ui/TokenInfo";
import Footer from "@components/ui/Footer";
import Image from "next/image";
import luna from "@assets/luna.png";

export default function Details() {
  return (
    <div className="">
      {/* <Sidebar /> */}

      <div className="relative bg-gray-100 ">
        {/* <Navbar /> */}
        {/* Header */}
        <div className="relative bg-gray-700 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative flex sm:flex-row sm:mt-0 mt-6 flex-col xl:w-5/12 min-w-0 p-3 rounded mb-6 xl:mb-0 ">
                    <div className="flex items-center">
                      <Image
                        src={luna}
                        width={40}
                        height={40}
                        layout="fixed"
                        className="card-img-top"
                        alt="coinimage"
                      />
                      <div className="text-2xl sm:text-4xl text- ml-2 text-white font-bold">
                        DAI
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex pt-2 sm:ml-6 items-center">
                        <div className=" h-9">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-910"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </div>
                        <div className=" ml-2">
                          <p className="text-sm text-white">
                            Reserve Size:{" "}
                            <div className="font-bold text-xl">$200</div>
                          </p>
                        </div>
                      </div>

                      <div className="flex pt-2 ml-6 items-center">
                        <div className=" h-9">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-9 w-9"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                            />
                          </svg>
                        </div>
                        <div className=" ml-2">
                          <p className="text-sm text-white">
                            Available Liquidity:{" "}
                            <div className="font-bold text-xl">$300</div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <ReserveStatus />
            </div>
            <div className="w-full xl:w-4/12 px-4">
              <TokenInfo />
            </div>
          </div>

          <Footer />
        </div>
      </div>

      {/* <ModalBorrow /> */}
    </div>
  );
}
