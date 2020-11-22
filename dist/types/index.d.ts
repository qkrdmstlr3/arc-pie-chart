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
