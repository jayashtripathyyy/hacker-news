import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { formatDistanceToNow } from "date-fns";
import { Story } from '../../types/story';
import { ChevronUp } from 'lucide-react';

interface StoryItemProps {
    story: Story;
    onClick: () => void;
}

const StoryItem = forwardRef<HTMLDivElement, StoryItemProps>(
    ({ story, onClick }, ref) => {
        return (
            <div
                ref={ref}
                onClick={onClick}
                className="py-8  px-6 md:px-4 bg-card hover:bg-muted/40 cursor-pointer transition-colors border-b border-border "
            >
                <div className='flex gap-3 items-center'>
                    <div className="w-10 h-10 aspect-square bg-secondary/50 rounded-xl flex justify-center items-center flex-col p-1 ">
                        <ChevronUp />
                        <div className='text-[.5rem] font-bold'>{story.points}</div>
                    </div>
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
        )
    }
);

StoryItem.displayName = 'StoryItem';

export default StoryItem;