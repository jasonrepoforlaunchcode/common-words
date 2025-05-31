export function getRandomNum(min, max){
    return Math.round(Math.random() * (Number(max) - Number(min)) + Number(min));
}