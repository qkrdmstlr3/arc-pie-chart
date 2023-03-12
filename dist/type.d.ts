interface CoordinateType {
    x: number;
    y: number;
}
interface makeTextTagProps {
    text: string;
    percentage: number;
    coordinate: CoordinateType;
    color: string;
    fontSize?: number;
    className?: string;
    gap?: number;
}
interface DataType {
    name: string;
    percentage: number;
    color: string;
    textColor: string;
    data?: DataType[];
}
/**
 * function type
 */
interface GetCoordinateType {
    cx: number;
    cy: number;
    radius: number;
    degree: number;
}
interface MakePathTagType {
    fill: string;
    d: string;
    className: string;
}
interface HandleHoverEvent {
    event: MouseEvent;
    svg: SVGSVGElement;
    halfWidth: number;
}
interface IterDataType {
    data: DataType[];
    startDegree: number;
    parentDegree: number;
    svg: SVGSVGElement;
    innerDistanceFromCenter: number;
    outerDistanceFromCenter: number;
    halfWidth: number;
    totalDepth: number;
}

export { CoordinateType, DataType, GetCoordinateType, HandleHoverEvent, IterDataType, MakePathTagType, makeTextTagProps };
