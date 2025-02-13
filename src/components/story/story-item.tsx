import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { formatDistanceToNow } from "date-fns";
import { Story } from '../../types/story';

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
                className="p-4 bg-card hover:bg-card/80 rounded-lg cursor-pointer transition-colors"
            >
                <h3 className="text-lg font-semibold mb-2">{story.title}</h3>
                <div className="flex gap-2 text-sm text-muted-foreground">
                   
                    <span>by {story.author}</span>
                    <span>
                        {formatDistanceToNow(new Date(story.created_at), { addSuffix: true })}
                    </span>
                  
                </div>
            </div>
        )
    }
);

StoryItem.displayName = 'StoryItem';

export default StoryItem;