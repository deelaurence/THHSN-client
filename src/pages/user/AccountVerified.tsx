import { PiUserCheckDuotone} from "react-icons/pi"
import { Link } from "react-router-dom"
import { sdk } from "../../utils/sdk"

const AccountVerified = () => {
  return (
    <div className="text-center h-[70vh] flex flex-col items-center justify-center mt-20">
          <PiUserCheckDuotone className="opacity-70 mb-12 hidden dark:block text-[8rem]"/>
          <PiUserCheckDuotone className="opacity-70 dark:hidden text-[8rem]"/>
          <h1 className="text-4xl font-queens font-bold opacity-70">Account Verified.</h1>
          <Link className="opacity-70" to={sdk.userLoginRoute}>Proceed to login</Link>
    </div>
  )
}

export default AccountVerified