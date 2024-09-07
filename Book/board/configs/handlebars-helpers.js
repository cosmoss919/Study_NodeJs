module.exports = {
    //리스트 길이 반환
    lengthOfList: (list = []) => list.length,
    // 두 값을 비교해 같은지 여부를 반환
    eq: (val1, val2) => val1 === val2,
    //ISO 날짜 문자열에서 날짜와 시간을 반환
    dateString: (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
};