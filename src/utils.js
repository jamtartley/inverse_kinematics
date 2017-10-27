export function getRandIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getEuclideanDistance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}
