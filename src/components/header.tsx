import { cn } from "../lib/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function Header({className, ...props}: Props) {
  return (
    <div className={cn('flex justify-between items-center text-primary border-b border-dashed border-border  ', className)} {...props}>
        <div className='flex   container_wrapper p-4 '>
            <h1 className='text-2xl font-bold'>Hacker News</h1>
        </div>
    </div>
  )
}

export default Header