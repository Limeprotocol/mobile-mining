import React, { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Wallet } from "lucide-react"

const PoolCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const pools = [
    {
      name: "long",
      daily: 1.97,
      apy: 54180,
      tvl: 5456234,
    },
    {
      name: "mid",
      daily: 1.97,
      apy: 54180,
      tvl: 5456234,
    },
    {
      name: "short",
      daily: 1.97,
      apy: 54180,
      tvl: 5456234,
    },
  ]

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <div className="embla relative  ">
      <div className="embla__viewport  rounded-xl" ref={emblaRef}>
        <div className="embla__container ">
          {pools.map((pool, index) => (
            <div
              key={index}
              className="embla__slide   bg-[#1c1c1c] text-white  flex flex-col  w-full h-max"
            >
              <div className="w-full p-5 justify-between flex">
                <h1 className="uppercase text-[26px] font-bold">
                  {pool.name} TERM
                </h1>
                <div className="bg-[#DFF26A] rounded-full text-[#1c1c1c] px-3 py-1.5">
                  <span className="font-bold mr-1 text-[14px]">
                    {pool.daily}%
                  </span>
                  <span className="text-[11px]">/day</span>
                </div>
              </div>
              <div className="w-[90%] mx-auto h-[1px] bg-white/30 rounded-full" />
              <div className="w-full justify-between p-5 flex">
                <div className="flex flex-col items-start">
                  <h1 className="text-[18px] text-[#DFF26A]">APY</h1>
                  <h2 className="text-[22px] font-bold">{pool.apy}%</h2>
                </div>
                <div className="flex flex-col items-end ml-5">
                  <h1 className="text-[18px] text-[#DFF26A]">TVL</h1>
                  <h2 className="text-[22px] font-bold">${pool.tvl}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute -left-4 z-10 top-1/2 transform -translate-y-1/2 bg-primary text-[#1c1c1c] p-2.5 rounded-full"
      >
        <ChevronLeft className="" size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute -right-4 z-10 top-1/2 transform -translate-y-1/2 bg-primary text-[#1c1c1c]  p-2.5 rounded-full"
      >
        <ChevronRight className="" size={24} />
      </button>
    </div>
  )
}

export default PoolCarousel
