import Header from "./components/header"
import { cn } from "./lib/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function App({className, ...props}: Props) {
  return (
    <div className={cn(' dark flex justify-center items-center h-screen w-screen bg-background text-primary', className)} {...props}>
   
        <div className="container_wrapper ">
          <Header />
        </div>
   
    </div>
  )
}

export default App