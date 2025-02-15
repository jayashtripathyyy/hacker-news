import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { formatDistanceToNow } from "date-fns";
import { Story, VoteType } from '../../types/story';
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../../store/global';

interface StoryItemProps {
    story: Story;
    onClick: () => void;
}

const VoteButton = ({ voteType, onChange, isVoted }:
    {
        voteType: VoteType, onChange: (voteType: VoteType) => void
        isVoted: boolean
    }) => {

    const highlightedTWClass: Record<VoteType, string> = {
        [VoteType.DOWNVOTE]: ' hover:text-amber-600 hover:bg-amber-900/30 ',
        [VoteType.UPVOTE]: ' hover:text-primary hover:bg-primary/30',
        [VoteType.NEUTRAL]: ' hover:text-muted-foreground hover:bg-muted-foreground/30'
    }
    const selectedTWClass: Record<VoteType, string> = {
        [VoteType.DOWNVOTE]: 'border-amber-600 text-amber-600 bg-amber-900/30',
        [VoteType.UPVOTE]: 'border-primary text-primary bg-primary/30',
        [VoteType.NEUTRAL]: 'border-muted-foreground text-muted-foreground bg-muted-foreground/30'
    }

    const handleVote = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (isVoted) onChange(VoteType.NEUTRAL);
        else onChange(voteType);
    }
    return (
        <button onClick={handleVote} className={cn('flex items-center gap-1 bg-muted/50 transition-colors duration-250 border border-border px-2 py-1 rounded-lg'
            , highlightedTWClass[voteType]
            , isVoted && selectedTWClass[voteType])}>
            {voteType === VoteType.UPVOTE ?
                <span className='flex items-center gap-1 text-muted-foreground text-xs'>Upvote  <ArrowUp size={16} /> </span> :
                <span className='flex items-center gap-1 text-muted-foreground text-xs'>Downvote <ArrowDown size={16} /> </span>
            }
        </button>
    )
}

const StoryItem = forwardRef<HTMLDivElement, StoryItemProps>(
    ({ story, onClick }, ref) => {
        const { storiesVoteList, setStoriesVoteList } = useStore();
        const handleVote = (voteType: VoteType) => {
            setStoriesVoteList({ ...storiesVoteList, [story.objectID]: voteType });
        }
        return (
            <div
                ref={ref}
                onClick={onClick}
                className="py-4 md:pt-6 px-2 md:px-6 bg-card hover:bg-muted/40 cursor-pointer transition-colors border-b border-border h-full flex flex-col justify-between overflow-hidden "
            >
                <div className='flex flex-1 gap-3 overflow-hidden '>
                    <div className="w-10 h-10 aspect-square bg-secondary/50 rounded-xl flex justify-center items-center flex-col p-1 ">
                        <ChevronUp />
                        <div className='text-[.5rem] font-bold'>{story.points}</div>
                    </div>
                    <div className='flex flex-col  flex-1 overflow-hidden'>
                        <h3 className="text-lg font-semibold line-clamp-2">{story.title}</h3>
                        {story.url && <a href={story.url} target='_blank' className='text-sm text-muted-foreground'>{story.url}</a>}
                    </div>
                </div>

                <div className='flex gap-2 justify-between items-center mt-4'>
                    <div className="flex gap-2 text-sm md:text-xs text-muted-foreground md:flex-row flex-col">
                        <span> by {story.author}</span>
                        <span>
                            {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
                        </span>
                    </div>
                    <div className='flex gap-2'>

                        <VoteButton voteType={VoteType.UPVOTE} onChange={handleVote} isVoted={storiesVoteList[story.objectID] === VoteType.UPVOTE} />
                        <VoteButton voteType={VoteType.DOWNVOTE} onChange={handleVote} isVoted={storiesVoteList[story.objectID] === VoteType.DOWNVOTE} />
                    </div>
                </div>

            </div>
        )
    }
);

StoryItem.displayName = 'StoryItem';

export default StoryItem;