import { useState, useRef } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';

interface LineData {
    tool: string;
    points: number[];
}

const App = () => {
    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState<LineData[]>([]);
    const isDrawing = useRef(false);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const handleMouseDown = (e: any) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e: any) => {
        if (!isDrawing.current) {
            return;
        }

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];

        lastLine.points = lastLine.points.concat([point.x, point.y]);


        lines.splice(lines.length - 1, 1, lastLine);

        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return (
        <div>
            <select
                value={tool}
                onChange={(e: any) => {
                    setTool(e.target.value);
                }}
            >
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
            </select>
            <h1>Start Drawing</h1>
            <Stage
                width={width}
                height={height}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                onTouchMove={handleMouseMove}
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line 
                            key={i}
                            points={line.points}
                            stroke="df4b26"
                            strokeWidth={5}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation={
                                line.tool === 'eraser' ? 'destination-out' : 'source-over'
                            }
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    )





};

export default App
