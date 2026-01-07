![algae-rithm-tech-blog-banner](/public/static/images/twitter-card.png)

# Algae-rithm 개발 블로그

> ⚠️ **현재 업데이트 중입니다**  
> 이 블로그는 [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 템플릿을 기반으로 하여 개인 개발 블로그로 커스터마이징 중입니다.  
> 기능 추가 및 개선이 지속적으로 진행되고 있습니다.

## 📝 소개

개발 기록, 회고 및 트러블슈팅을 기록하는 개인 기술 블로그입니다.

[Next.js](https://nextjs.org/)와 [Tailwind CSS](https://tailwindcss.com/)를 기반으로 하며, [Contentlayer](https://www.contentlayer.dev/)를 사용하여 마크다운 콘텐츠를 관리합니다.

## 🚧 현재 상태

- ✅ 기본 블로그 구조 설정 완료
- ✅ 블로그 포스트 작성 기능
- ✅ 태그 시스템
- ✅ 다크 모드 지원
- 🚧 이메일 구독 기능 (추가 예정)
- 🚧 SNS 링크 추가 (추가 예정)
- 🚧 추가 기능 및 개선 진행 중

## 🛠️ 기술 스택

- **Framework**: [Next.js](https://nextjs.org/) 15.2.4 (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.0
- **Content Management**: [Contentlayer](https://www.contentlayer.dev/)
- **Language**: TypeScript
- **Deployment**: GitHub Pages

## ✨ 주요 기능

- Next.js with TypeScript
- [Contentlayer](https://www.contentlayer.dev/)를 통한 콘텐츠 관리
- [Tailwind CSS](https://tailwindcss.com/)를 통한 쉬운 스타일 커스터마이징
- [MDX](https://mdxjs.com/) - 마크다운에서 JSX 사용 가능
- 라이트/다크 테마 지원
- 태그 시스템 - 각 태그별 페이지 자동 생성
- 다중 레이아웃 지원
- 중첩 라우팅 지원
- 프로젝트 페이지
- SEO 최적화 (RSS feed, sitemap 등)
- 코드 하이라이팅 (라인 번호 및 라인 하이라이트)
- 수학 표현식 지원 ([KaTeX](https://katex.org/))
- 댓글 시스템 ([Giscus](https://github.com/laymonage/giscus))
- 검색 기능 ([Kbar](https://github.com/timc1/kbar))

## 🚀 시작하기

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

`app` 폴더의 레이아웃이나 `data` 폴더의 콘텐츠를 수정하면 자동으로 페이지가 업데이트됩니다.

## 📁 프로젝트 구조

### 주요 설정 파일

- `data/siteMetadata.js` - 사이트 관련 정보 (제목, 설명, SNS 링크 등)
- `data/authors/default.md` - 기본 작성자 정보
- `data/projectsData.ts` - 프로젝트 페이지에 표시될 프로젝트 데이터
- `data/headerNavLinks.ts` - 네비게이션 링크
- `data/logo.svg` - 로고 (자신의 로고로 교체)
- `data/blog` - 블로그 포스트 (`.mdx` 또는 `.md` 파일)

### 스타일 및 설정

- `tailwind.config.js` 및 `css/tailwind.css` - Tailwind 설정 및 스타일시트
- `css/prism.css` - 코드 블록 스타일
- `contentlayer.config.ts` - Contentlayer 설정
- `next.config.js` - Next.js 설정

### 컴포넌트 및 레이아웃

- `components/MDXComponents.tsx` - MDX에서 사용할 커스텀 컴포넌트
- `layouts` - 페이지 템플릿
  - `PostLayout` - 기본 2열 레이아웃 (메타 정보 및 작성자 정보 포함)
  - `PostSimple` - 간소화된 버전
  - `PostBanner` - 배너 이미지가 있는 레이아웃
  - `ListLayout` - 검색 바가 있는 블로그 목록 레이아웃
  - `ListLayoutWithTags` - 태그 사이드바가 있는 블로그 목록 레이아웃

## 📝 블로그 포스트 작성

콘텐츠는 [Contentlayer](https://www.contentlayer.dev/)를 사용하여 모델링됩니다.

### Frontmatter

Frontmatter는 [Hugo의 표준](https://gohugo.io/content-management/front-matter/)을 따릅니다.

지원되는 필드:

```
title (required) - 포스트 제목
date (required) - 작성일 (YYYY-MM-DD)
tags (optional) - 태그 배열
lastmod (optional) - 마지막 수정일
draft (optional) - 초안 여부
summary (optional) - 요약
images (optional) - 이미지 배열
authors (optional) - 작성자 목록 (data/authors의 파일명과 일치해야 함, 기본값: 'default')
layout (optional) - 레이아웃 (PostLayout, PostSimple, PostBanner 등)
canonicalUrl (optional) - SEO를 위한 canonical URL
```

예시:

```yaml
---
title: 'JavaScript 필수 알고리즘'
date: '2024-01-12'
lastmod: '2024-01-18'
tags: ['javascript', 'algorithm', 'guide']
draft: false
summary: 'JavaScript 개발에 필요한 필수 알고리즘들을 정리합니다.'
images: ['/static/images/algorithm.jpg']
authors: ['default']
layout: PostLayout
---
```

## 🚀 배포

### GitHub Pages

이 블로그는 GitHub Pages에 배포됩니다.

1. GitHub Actions를 통한 자동 배포가 설정되어 있습니다.
2. `Settings > Pages > Build and deployment > Source`에서 "GitHub Actions"를 선택합니다.
3. 빌드가 완료되면 `https://<username>.github.io/<repository-name>`에서 확인할 수 있습니다.

### 로컬 빌드 테스트

```bash
pnpm build:pages
```

빌드된 파일은 `out` 폴더에 생성됩니다. 로컬에서 테스트하려면:

```bash
npx serve out
```

## 📚 참고 자료

이 블로그는 [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 템플릿을 기반으로 합니다.

- [Next.js 문서](https://nextjs.org/docs)
- [Contentlayer 문서](https://www.contentlayer.dev/docs/getting-started)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [MDX 문서](https://mdxjs.com/)

## 📄 라이선스

이 프로젝트는 원본 템플릿의 [MIT 라이선스](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/LICENSE)를 따릅니다.

---

**현재 블로그는 지속적으로 업데이트되고 있습니다. 새로운 기능과 개선 사항이 추가될 예정입니다.** 🚀
