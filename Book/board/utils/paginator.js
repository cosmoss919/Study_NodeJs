const lodash = require("lodash");
const PAGE_LIST_SIZE = 10;

// 총 개수, 페이지, 한페이지에 표시하는 게시물 개수를 매개변수로 받음
module.exports = ({totalCount, page, perPage = 10}) => {
    const totalPage = Math.ceil(totalCount / perPage); // 총 페이지 수 계산

    // 시작 페이지 : 몫 * PAGE_LIST_SIZE + 1
    let quotient = Math.floor(page / perPage);
    if(page % PAGE_LIST_SIZE === 0) {
        quotient -= 1;
    }
    const startPage = quotient * PAGE_LIST_SIZE + 1;    // 시작 페이지 구하기

    // 끝 페이지 : startPage + PAGE_LIST_SIZE - 1
    const endPage = startPage + PAGE_LIST_SIZE - 1 < totalPage ? startPage + PAGE_LIST_SIZE - 1 : totalPage;   // 끝 페이지 구하기
    const isFirstPage = page === 1;
    const isLastPage = page === totalPage;
    const hasPrev = page > 1;
    const hasNext = page < totalPage;

    const paginator = {
        // 표시할 페이지 번호 리스트를 만들어줌
        pageList: lodash.range(startPage, endPage + 1),
        page,
        prevPage: page - 1,
        nextPage: page + 1,
        startPage,
        lastPage: totalPage,
        hasPrev,
        hasNext,
        isFirstPage,
        isLastPage,
    };

    return paginator;
}