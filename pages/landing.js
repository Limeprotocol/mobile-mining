import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { Shield } from "lucide-react"

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
        <h1>LANDING</h1>
        <ul className="flex gap-6">
          <li>Home</li>
          <li>Mining</li>
          <li>Delegated Trading</li>
          <li>$LIME</li>
          <li>Docs</li>
          <li>Socials</li>
        </ul>
        <button className="bg-[#DFF26A] text-black px-4 py-2 rounded-md mr-4">
          ENTER DAPP
        </button>
      </div>
      <div className=" relative flex items-center justify-center">
        {init && (
          <Particles
            id="tsparticles"
            options={options}
            container={particlesLoaded}
            className="!h-full absolute top-0 left-0 w-full  z-0"
          />
        )}
        <div className="px-4  py-20 max-w-6xl">
          <div className="flex-col-reverse  md:flex-row flex gap-10 w-full items-center">
            <div className="flex flex-col md:w-[60%] w-full">
              <h1 className="font-bold text-3xl">
                Building a seamless connection between users and the blockchain
                world web3 Platform
              </h1>
              <div className="flex mt-8">
                <button className="bg-[#DFF26A] text-black px-4 py-2 rounded-md mr-4">
                  ENTER DAPP
                </button>
                <button
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
            <div>
              <img
                src="/images/banner.webp"
                alt="placeholder"
                className="w-96"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">LIME COIN Value Proposition</h1>
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
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Security</h1>
              </div>

              <p className="text-sm">
                Use the latest blockchain technology and strict security
                measures and protocols to protect users assets from any
                malicious attacks.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Experience</h1>
              </div>

              <p className="text-sm">
                Friendly, intuitive and convenient operation interface, perfect
                user support system, provide users with more comprehensive
                service and support.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Direction</h1>
              </div>

              <p className="text-sm">
                User needs always come first, WOW EARN formulates its roadmap
                and creates/upgrades products around this core principle.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Lime Coin</h1>
              </div>

              <p className="text-sm">
                WOW Coin is the governance token of the WOW EARN ecosystem, and
                as the WOW EARN continues to develop, the value of WOW will
                continue to rise.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Public</h1>
              </div>

              <p className="text-sm">
                Through various social platforms, users can keep abreast of the
                companys latest developments and stage planning in real time,
                everything is fair, just and open.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Community</h1>
              </div>

              <p className="text-sm">
                WOW EARN encourages community members to help each other and
                rewards users for collaboration in development, marketing,
                sharing, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 max-w-6xl mx-auto mt-14">
          <div className="flex items-center">
            <div className="md:w-[60%] w-full">
              <h1 className="text-2xl font-bold">
                <span className="text-[#DFF26A]">Delegated Trading</span>
              </h1>
              <h1 className="text-base font-bold mt-4">
                WOW EARN Smart Pledge realizes asset optimization allocation,
                guarantees fund security, and locks in stable pledge income.
              </h1>
            </div>
            <div>
              <img src="/images/ins.webp" alt="" />
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-4 mt-10 sm:grid-cols-2 grid-cols-1">
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Security</h1>
              </div>
              <span className="w-full h-[1px] bg-gray-700/40 rounded-full my-1 block"></span>
              <p className="text-sm">
                A variety of staking strategies to easily earn passive income.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Experience</h1>
              </div>
              <span className="w-full h-[1px] bg-gray-700/40 rounded-full my-1 block"></span>
              <p className="text-sm">
                Double pledge income, earn more WOW Coin.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Direction</h1>
              </div>
              <span className="w-full h-[1px] bg-gray-700/40 rounded-full my-1 block"></span>
              <p className="text-sm">
                Support a variety of global mainstream web3 assets.
              </p>
            </div>
            <div className="bg-[#141414] gap-3 flex flex-col border-gray-800 border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-gray-700 w-max p-2 rounded-full">
                  <Shield size={25} />
                </div>
                <h1 className="text-xl font-bold">Lime Coin</h1>
              </div>
              <span className="w-full h-[1px] bg-gray-700/40 rounded-full my-1 block"></span>
              <p className="text-sm">
                Comprehensive audit, on-chain settlement, safe and worry-free.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
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
      </div>
      <div>
        <div className="p-4 max-w-6xl mx-auto ">
          <div className="flex items-center">
            <div className="md:w-[60%] w-full">
              <h1 className="text-2xl font-bold">
                <span className="text-[#DFF26A]">$Lime Coin</span>
              </h1>
              <h1 className="text-base font-bold mt-4">
                WOW EARN Smart Pledge realizes asset optimization allocation,
                guarantees fund security, and locks in stable pledge income.
              </h1>
              <ul className="ml-5 flex flex-col gap-2 mt-5">
                <li>
                  - WOW EARN Smart Pledge realizes asset optimization allocation
                </li>
                <li>
                  - WOW EARN Smart Pledge realizes asset optimization allocation
                </li>
                <li>
                  - WOW EARN Smart Pledge realizes asset optimization allocation
                </li>
              </ul>
            </div>
            <div>
              <img src="/images/aa.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
