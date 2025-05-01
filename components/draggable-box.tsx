import { memo, FC } from 'react'
import { useDrag } from 'react-dnd'
import type { DragSourceMonitor } from 'react-dnd'

export interface DraggableBoxProps {
    children: React.ReactNode
}

export const DraggableBox: FC<DraggableBoxProps> = memo(function DraggableBox(
    {children},
) {
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: 'box',
			collect: (monitor: DragSourceMonitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
	)

	return (
		<div
			ref={drag as unknown as React.Ref<HTMLDivElement>}
			role="DraggableBox"
            style={{
                opacity: isDragging ? 0.5 : 1,
                left:12,
                top: 12,
                position: 'absolute',
                cursor: 'move',
                width: '100px',
                height: '100px',
                backgroundColor: 'lightblue',
            }}
		>
			{children}
		</div>
	)
})