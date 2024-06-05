import React, { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Wallet } from "lucide-react"
import PoolCard from "./pool-card"
import { useSession } from "next-auth/react"
import useAxiosAuth from "lib/hooks/useAxiosAuth"

const PoolCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [price, setPrice] = useState(0)
  const { data: session } = useSession()
  const axiosAuth = useAxiosAuth()

  const pools = [
    {
      name: "long"
    },
    {
      name: "mid"
    },
    {
      name: "short"
    }
  ]

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  const getPrice = async (pool) => {
    const res = await axiosAuth.get(`/api/token/lime/price`)
    setPrice(res.data.price)
  }

  useEffect(() => {
    if (!session) return
    getPrice()
  }, [session])

  return (
    <div className="embla relative  ">
      <div className="embla__viewport  rounded-xl" ref={emblaRef}>
        <div className="embla__container ">
          {pools.map((pool, index) => (
            <PoolCard key={index} name={pool.name} limePrice={price} />
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
