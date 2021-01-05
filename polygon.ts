interface Point {
    x: number;
    y: number;
};

function closestDistanceBetweenLineAndDot(A: Point, B: Point, target: Point): Point {
    
    const a: number = A.y - B.y;
    const b: number = B.x - A.x;
    const c: number = A.x * B.y - B.x * A.y;
    const d: number = Math.pow(a, 2) + Math.pow(b, 2)

    let X: number = ( b * (b * target.x - a * target.y) - (a * c) ) / d ;
    let Y: number = ( a * (a * target.y - b * target.x) - (b * c) ) / d;

    X = rangeCheck(X, A.x, B.x);
    Y = rangeCheck(Y, A.y, B.y);

    return { x: X, y: Y };
}

function rangeCheck(value: number, start: number, end: number): number {
    
    let finalValue:number;

    if (value <= start && value <= end) {
        finalValue = (end >= start) ? start : end;
    } else if (value >= start && value >= end) {
        finalValue = (end >= start) ? end : start;
    } else {
        finalValue = value;
    }

    return finalValue;
    
    }

function distanceBetweenTwoPoint(point1: Point, point2: Point): number {

    const point:number =  Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2);
    const distance:number = Math.sqrt(point);
    
    return distance;

}


function isTargetInside(poly: Point[], pos: Point):boolean{

    let c:boolean = false;
    let i:number;
    let j:number;
    const n:number = poly.length;
    
	for(i=0,j=n-1; i<n;j=i++){
		if( ((poly[i].y>pos.y) != (poly[j].y>pos.y)) && (pos.x < (poly[j].x-poly[i].x) * (pos.y-poly[i].y) / (poly[j].y-poly[i].y) + poly[i].x) )
			c=!c;
    }
    
	return c;
}



function getClosestPointInsidePolygon(poly: Point[], pos: Point): Point {

    const polygonSides: number = poly.length;
    let minimumDis: number | null = null;
    let targetPoint: Point = {
        x:0,
        y:0
    };

    if (polygonSides === 1) {
    return poly[0]
    }

    if(isTargetInside(poly, pos)) {
        return pos
    }

    for (let i = 0; i < polygonSides; i++) {

        const nextValue: number = (i + 1 >= polygonSides) ? 0 : i + 1;
        const closestPoint: Point = closestDistanceBetweenLineAndDot(poly[i], poly[nextValue], pos);
        const distance: number = distanceBetweenTwoPoint(closestPoint, pos);

        if (minimumDis === null || (minimumDis !== null && minimumDis > distance)) {
            minimumDis = distance;
            targetPoint = closestPoint;
        }

    }

    return targetPoint
}

