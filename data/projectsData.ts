interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: '[운영] 해조류_SEAWIID',
    description: `싱어송라이터 해조류 소개 웹페이지`,
    // imgSrc: '/static/images/twitter-card.png',
    href: 'https://www.seawiid.com/',
  },
  {
    title: '[운영] 시흥버스킹',
    description: `'시흥시 아마추어 버스킹 모임' 일정 공유 웹페이지`,
    // imgSrc: '/static/images/twitter-card.png',
    href: 'https://www.shbusking.com/',
  },
  {
    title: '[업무] 프리비아 항공 > 예약',
    description: `프리비아 항공 NextJS 마이그레이션 > 예약 페이지 개발`,
    // imgSrc: '/static/images/twitter-card.png',
    href: 'https://www.priviatravel.com/flight',
  },
  {
    title: '[업무] 카이트 > 투어&티켓',
    description: `투어&티켓 서비스 > 예약 및 예약상세 페이지 개발`,
    // imgSrc: '/static/images/twitter-card.png',
    href: 'https://kyte.travel/tours',
  },
  {
    title: '[업무] 플레이윙즈 > 유지보수',
    description: `플레이윙즈 크로스브라우징 이슈 수정 및 유지보수`,
    // imgSrc: '/static/images/twitter-card.png',
    href: 'https://www.playwings.co.kr/',
  },
  {
    title: '[웹 도구] 카풀 매칭',
    description: `거리 및 시간 기반 카풀 매칭 웹 도구`,
    // imgSrc: '/static/images/twitter-card.png',
    href: 'https://www.seawiid.com/church/carpool',
  },
  {
    title: '[웹 도구] 성구암송',
    description: `스와이프 / 작성내용 비교 > 성구 암송을 도와주는 웹 도구`,
    // imgSrc: '/static/images/twitter-card.png',
    href: 'https://www.seawiid.com/disciples/recitations/love4or',
  },
  {
    title: '[웹 도구] 그룹 나누기',
    description: `소켓 기반으로 접속자를 n개의 그룹으로 이븐하게 나눠주는 웹 도구`,
    // imgSrc: '/static/images/twitter-card.png',
    href: 'https://www.seawiid.com/tools/grouping',
  },
  // TODO: 추가 예정
  // {
  //   title: 'The Time Machine',
  //   description: `Imagine being able to travel back in time or to the future. Simple turn the knob
  //   to the desired date and press "Go". No more worrying about lost keys or
  //   forgotten headphones with this simple yet affordable solution.`,
  //   imgSrc: '/static/images/time-machine.jpg',
  //   href: '/blog/the-time-machine',
  // },
]

export default projectsData
