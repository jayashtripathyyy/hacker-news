import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { formatDistanceToNow } from "date-fns";
import { Story, VoteType } from '../../types/story';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
        [VoteType.DOWNVOTE]: 'hover:border-amber-600 hover:text-amber-600 hover:bg-amber-900/30 ',
        [VoteType.UPVOTE]: 'hover:border-primary hover:text-primary hover:bg-primary/30'
    }
    const selectedTWClass: Record<VoteType, string> = {
        [VoteType.DOWNVOTE]: 'border-amber-600 text-amber-600 bg-amber-900/30',
        [VoteType.UPVOTE]: 'border-primary text-primary bg-primary/30'
    }

    const handleVote = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onChange(voteType);
    }
    return (
        <button onClick={handleVote} className={cn('flex items-center gap-1 bg-muted/50 transition-colors duration-250 border border-border px-2 py-1 rounded-lg'
            , highlightedTWClass[voteType]
            , isVoted && selectedTWClass[voteType])}>
            {voteType === VoteType.UPVOTE ?
                <span className='flex items-center gap-1 text-muted-foreground text-xs'>Upvote  <ChevronUp /> </span> :
                <span className='flex items-center gap-1 text-muted-foreground text-xs'>Downvote <ChevronDown /> </span>
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
                className="py-4 pt-6  px-6 md:px-4 bg-card hover:bg-muted/40 cursor-pointer transition-colors border-b border-border "
            >
                <div className='flex gap-3 '>
                    <div className="w-10 h-10 aspect-square bg-secondary/50 rounded-xl flex justify-center items-center flex-col p-1 ">
                        <ChevronUp />
                        <div className='text-[.5rem] font-bold'>{story.points}</div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>

                            <h3 className="text-lg font-semibold">{story.title}</h3>
                            <div className="flex gap-2 text-sm text-muted-foreground">
                                <span> by {story.author}</span>
                                <span>
                                    {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 justify-end'>
                    <VoteButton voteType={VoteType.UPVOTE} onChange={handleVote} isVoted={storiesVoteList[story.objectID] === VoteType.UPVOTE} />
                    <VoteButton voteType={VoteType.DOWNVOTE} onChange={handleVote} isVoted={storiesVoteList[story.objectID] === VoteType.DOWNVOTE} />
                </div>

            </div>
        )
    }
);

StoryItem.displayName = 'StoryItem';

export default StoryItem;