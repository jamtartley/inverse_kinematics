import Victor from 'victor';

export function getRandIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getEuclideanDistance(a, b) {
    return Math.sqrt(getEuclideanDistanceSquared(a, b));
}

export function getEuclideanDistanceSquared(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return dx * dx + dy * dy;
}

export function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function getPointOnCircle(centre, radius, angle) {
    return new Victor(centre.x + radius * Math.cos(toRadians(angle)), centre.y + radius * Math.sin(toRadians(angle)));
}
