import { FaFingerprint } from "react-icons/fa"
import { HiOutlineChat } from "react-icons/hi"
import { IoAppsOutline, IoWifiOutline } from "react-icons/io5"
import { MdNotifications, MdOutlineTouchApp } from "react-icons/md"


const features = [
  {
    title: "Touch to buy",
    description: "Lorem ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: <MdOutlineTouchApp className="size-12 text-pink-600 mx-auto"/>,
  },
  {
    title: "Secure Data",
    description: "Lorem ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: <FaFingerprint className="size-12 text-pink-600 mx-auto" />,
  },
  {
    title: "Instant Chat",
    description: "Lorem ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: <HiOutlineChat className="size-12 text-pink-600 mx-auto" />,
  },
  {
    title: "Live Notifications",
    description: "Lorem ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: <MdNotifications className="size-12 text-pink-600 mx-auto" />,
  },
  {
    title: "Wifi Suppoert",
    description: "Lorem ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: <IoWifiOutline className="size-12 text-pink-600 mx-auto" />,
  },
  {
    title: "App Watch",
    description: "Lorem ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    icon: <IoAppsOutline className="size-12 text-pink-600 mx-auto" />,
  },
]

const Features = () => {
  return (
    <div className="pt-16 pb-16">
      <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="text-center mx-auto"
            data-aos="fade-up"
            data-aos-delay={index * 100} 
            data-aos-anchor-placement="top-center" 
          >
            <div className="mx-auto text-center">
              {feature.icon}
            </div>
            <h1 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features