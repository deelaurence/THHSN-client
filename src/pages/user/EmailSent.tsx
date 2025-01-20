import { IoMailUnreadOutline } from "react-icons/io5"
import { PiMailbox } from "react-icons/pi"

const EmailSent = () => {
  return (
    <div className="text-center h-[70vh] flex flex-col items-center justify-center mt-20">
          <h1 className="text-4xl font-queens font-bold opacity-70">Email Sent.</h1>
          <IoMailUnreadOutline className="opacity-70 hidden dark:block text-[8rem]"/>
          <PiMailbox className="opacity-70 dark:hidden text-[8rem]"/>
          <p className="mt-4 opacity-60">Follow the instructions in your email to verify your account.</p>
    </div>
  )
}

export default EmailSent