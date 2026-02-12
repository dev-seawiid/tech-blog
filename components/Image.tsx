import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

/** 절대 URL(protocol 또는 data:)이면 basePath를 붙이지 않음 */
function isAbsoluteUrl(src: string): boolean {
  return (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('//') ||
    src.startsWith('data:')
  )
}

/**
 * src는 문자열(path) 또는 정적 import 결과(StaticImageData 객체)일 수 있다.
 * StaticImageData일 때 `${basePath}${src}`처럼 문자열 연산을 하면
 * src가 "[object Object]"로 바뀌어 Invalid URL 에러가 난다.
 * 따라서 문자열일 때만 상대 경로에 basePath를 붙이고, 절대 URL·객체는 그대로 NextImage에 넘긴다.
 */
const Image = ({ src, ...rest }: ImageProps) => {
  const resolvedSrc =
    typeof src === 'string' ? (isAbsoluteUrl(src) ? src : `${basePath || ''}${src}`) : src
  return <NextImage src={resolvedSrc} {...rest} />
}

export default Image
