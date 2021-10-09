export interface CoordinateType {
    x: number;
    y: number;
}
export interface makeTextTagProps {
    text: string;
    percentage: number;
    coordinate: CoordinateType;
    color: string;
    fontSize?: number;
    className?: string;
    gap?: number;
}
export interface DataType {
    name: string;
    percentage: number;
    color: string;
    textColor: string;
    data?: DataType[];
}
/**
 * function type
 */
export interface GetCoordinateType {
    cx: number;
    cy: number;
    radius: number;
    degree: number;
}
export interface MakePathTagType {
    fill: string;
    d: string;
    className: string;
}
export interface HandleHoverEvent {
    event: MouseEvent;
    svg: SVGSVGElement;
    halfWidth: number;
}
export interface IterDataType {
    data: DataType[];
    startDegree: number;
    parentDegree: number;
    svg: SVGSVGElement;
    innerDistanceFromCenter: number;
    outerDistanceFromCenter: number;
    halfWidth: number;
    totalDepth: number;
}
