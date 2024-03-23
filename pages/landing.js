import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { Check, Shield } from "lucide-react"

const Landing = () => {
  const [init, setInit] = useState(false)

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
      //await loadBasic(engine);
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = (container) => {
    console.log(container)
  }

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "trnasparent",
        },
      },
      fullScreen: {
        enable: false,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#DFF26A",
        },
        links: {
          color: "#DFF26A",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 200,
        },
        opacity: {
          value: 0.1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 7 },
        },
      },
      detectRetina: true,
    }),
    []
  )

  return (
    <div className="flex flex-col bg-[#0c0c0c]   min-h-screen h-full">
      <div className="w-full items-center p-4 max-w-6xl mx-auto flex justify-between">
        <h1 className="font-bold text-lg">LIME PROTOCOL</h1>
        <ul className=" gap-6 hidden md:flex">
          <li className="cursor-pointer hover:underline underline-offset-4 transition-all ">
            <a href="#home">Home</a>
          </li>
          <li
            href="#mining"
            className="cursor-pointer hover:underline underline-offset-4 transition-all "
          >
            <a href="#mining">Mining</a>
          </li>
          <li
            href="#delegated"
            className="cursor-pointer hover:underline underline-offset-4 transition-all "
          >
            <a href="#delegated">Delegated Trading</a>
          </li>
          <li
            href="#token"
            className="cursor-pointer hover:underline underline-offset-4 transition-all "
          >
            <a href="#token">$LIME Token</a>
          </li>
        </ul>
        <button
          disabled
          className="bg-[#DFF26A] text-black px-4 py-2 rounded-md mr-4"
        >
          ENTER DAPP
        </button>
      </div>
      <div id="home" className=" relative flex items-center justify-center">
        {init && (
          <Particles
            id="tsparticles"
            options={options}
            container={particlesLoaded}
            className="!h-full absolute top-0 left-0 w-full  z-0"
          />
        )}
        <div className="px-4  md:py-48 py-24 max-w-6xl">
          <div className="flex-col-reverse  md:flex-row flex gap-10 w-full items-center">
            <div className="flex flex-col md:w-[60%] w-full">
              <h1 className="font-bold text-3xl">
                Unlocking the Future of Digital Assets with Lime Protocol: Where
                Every Click Mines Value
              </h1>
              <div className="flex mt-8">
                <button
                  disabled
                  className="bg-[#DFF26A] text-black px-4 py-2 rounded-md mr-4"
                >
                  ENTER DAPP
                </button>
                <button
                  disabled
                  className="bg-transparent text-[#DFF26A] px-4 py-2 rounded-md border border-[#DFF26A]"
                  onClick={() => {
                    window.scrollTo({
                      top: window.innerHeight,
                      behavior: "smooth",
                    })
                  }}
                >
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">
              LIME PROTOCOL Value Proposition
            </h1>
            <h1c className="text-2xl font-bold">
              <span className="text-[#DFF26A]">
                Bring value to users through innovation and focus:
              </span>
            </h1c>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-10 sm:grid-cols-2 grid-cols-1">
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Check size={25} />
                </div>
                <h1 className="text-xl font-bold">Mine $LIME through $USDT</h1>
              </div>

              <p className="text-sm">
                By staking $USDT, users can seamlessly accumulate $LIME,allowing
                them to enter the Mobile Miner ecosystem risk-free.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Check size={25} />
                </div>
                <h1 className="text-xl font-bold">
                  Delegated Investment Tiers
                </h1>
              </div>

              <p className="text-sm">
                This feature allows users to delegate their $LIME holdings in a
                manner that aligns with their individual risk profiles and
                investment objectives.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Check size={25} />
                </div>
                <h1 className="text-xl font-bold">
                  Designed for Broad Adoption
                </h1>
              </div>

              <p className="text-sm">
                Its intuitive and engaging interface invites users of all
                backgrounds to explore the possibilities of digital assets
                without the usual complexities.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Check size={25} />
                </div>
                <h1 className="text-xl font-bold">Multiple Access Points</h1>
              </div>

              <p className="text-sm">
                Google Account Authentication or Email and Password Setup
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Check size={25} />
                </div>
                <h1 className="text-xl font-bold">$LIME token</h1>
              </div>

              <p className="text-sm">
                At the core of the Mobile Miner ecosystem lies $LIME, the
                pivotal element that connects all the app's features.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Check size={25} />
                </div>
                <h1 className="text-xl font-bold">Community</h1>
              </div>

              <p className="text-sm">
                Lime Protocol encourages community members to help each other
                and rewards users for collaboration in development, marketing,
                sharing, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="delegated" className="p-4 max-w-6xl mx-auto mt-14">
          <div className="flex md:flex-row flex-col-reverse items-center justify-between">
            <div className="md:w-[60%] w-full">
              <h1 className="text-2xl font-bold">
                <span className="text-[#DFF26A]">Delegated Trading</span>
              </h1>
              <h1 className="text-base font-bold mt-4">
                We offer three distinct trading strategies, each with varying
                lock periods and rewards. Remember, the longer the lock period,
                the higher your potential daily return on investment.
              </h1>
            </div>

            <div className="">
              <img src="/images/ins.webp" alt="" className="" />
            </div>
          </div>
          <div className="w-full mt-10 md:mt-0">
            <div className="grid lg:grid-cols-3 gap-10 mt-5 sm:grid-cols-2 grid-cols-1">
              <div className="bg-[#141414] col-span-1  gap-3 flex flex-col border-gray-800 border rounded-xl p-3">
                <img src="/images/Group 25.svg" alt="" />
              </div>
              <div className="bg-[#141414] col-span-1 gap-3 flex flex-col border-gray-800 border rounded-xl p-3">
                <img src="/images/Group 26.svg" alt="" />
              </div>

              <div className="bg-[#141414]  col-span-1 gap-3 flex flex-col border-gray-800 border rounded-xl p-3">
                <img src="/images/Group 27.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="mining" className="p-4 max-w-6xl mx-auto mt-14">
          <div className="flex md:flex-row flex-col gap-10 items-center">
            <div className="md:w-[60%] w-full">
              <h1 className="text-2xl font-bold">
                <span className="text-[#DFF26A]">Mining Section</span>
              </h1>
              <h1 className="text-base font-bold mt-4">
                Your gateway to join the $LIME mining program. Start by
                depositing and locking your $USDT to participate.
              </h1>
              <ul className="ml-5 flex flex-col gap-2 mt-5">
                <li>
                  - <span className="text-[#DFF26A]">Locking Period:</span> To
                  start mining, you'll need to lock your $USDT for a period of 4
                  days.
                </li>
                <li>
                  -{" "}
                  <span className="text-[#DFF26A]">Return on Investment:</span>{" "}
                  Enjoy a daily reward of 1% on your investment, paid out in
                  $LIME.
                </li>
                <li>
                  - <span className="text-[#DFF26A]">Zero Commissions:</span>{" "}
                  This mining feature is commission-free, ensuring maximum
                  returns for your investment.
                </li>
                <li>
                  - <span className="text-[#DFF26A]">Getting Started:</span>{" "}
                  Select the amount of $USDT you wish to deposit and initiate
                  the mining process by tapping the 'Confirm' button.
                </li>
              </ul>
            </div>

            <div>
              <img src="/images/mining.png" alt="" className="w-1/2 mx-auto" />
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <div className="p-4 max-w-6xl mx-auto mt-14">
          <div className="flex gap-20  w-full items-center">
            <div className="md:w-[50%]">
              <div className="grid lg:grid-cols-4 gap-4 mt-10 sm:grid-cols-2 grid-cols-1">
                <div className="bg-[#141414] col-span-2  gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
                  <img src="/images/Group 25.svg" alt="" />
                </div>
                <div className="bg-[#141414] col-span-2 gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
                  <img src="/images/Group 26.svg" alt="" />
                </div>
                <div></div>
                <div className="bg-[#141414]  col-span-2 gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
                  <img src="/images/Group 27.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="md:w-[40%] ">
              <h1 className="text-2xl font-bold">
                <span className="text-[#DFF26A]">Choose your profile risk</span>
              </h1>
              <h1 className="text-base font-bold mt-4">
                WOW EARN Smart Pledge realizes asset optimization allocation,
                guarantees fund security, and locks in stable pledge income.
              </h1>
            </div>
          </div>
        </div>
      </div> */}
      <div>
        <div id="token" className="p-4 max-w-6xl mx-auto ">
          <div className="flex md:flex-row flex-col gap-10 items-center">
            <div>
              <img src="/images/pie.png" alt="" className="max-w-[450px]" />
            </div>
            <div className="md:w-[50%] w-full">
              <h1 className="text-2xl font-bold">
                <span className="text-[#DFF26A]">$LIME Coin</span>
              </h1>
              <h1 className="text-base font-bold mt-4">
                $LIME stands as the cornerstone of the Mobile Miner ecosystem,
                powering both the Mining and Delegated Investment features. Its
                primary goal is to maximize value for its holders and to expand
                the user base of Mobile Miner.
              </h1>
              <ul className="ml-5 flex flex-col gap-2 mt-5">
                <li>
                  - <span className="text-[#DFF26A]">Total Supply:</span>{" "}
                  50,000,000 $TOKEN
                </li>
                <li>
                  - <span className="text-[#DFF26A]">Buying Transactions:</span>{" "}
                  4% tax
                </li>
                <li>
                  -{" "}
                  <span className="text-[#DFF26A]">Selling Transactions:</span>{" "}
                  8% tax
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
