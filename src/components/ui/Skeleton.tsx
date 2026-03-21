import type { HTMLAttributes } from "react"
import styled, { css, keyframes } from "styled-components"

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  borderRadius?: string
  aspectRatio?: string
}

const SkeletonDiv = styled.div<{
  $width?: number | string
  $height?: number | string
  $borderRadius?: string
  $aspectRatio?: string
}>`
  display: block;
  background-color: var(--color-surface-container-high);
  border-radius: ${({ $borderRadius }) => $borderRadius ?? "var(--radius-lg)"};
  animation: ${pulse} 1.4s ease-in-out infinite;

  ${({ $width }) =>
    $width !== undefined &&
    css`
      width: ${typeof $width === "number" ? `${$width}px` : $width};
    `}

  ${({ $height }) =>
    $height !== undefined &&
    css`
      height: ${typeof $height === "number" ? `${$height}px` : $height};
    `}

  ${({ $aspectRatio }) =>
    $aspectRatio !== undefined &&
    css`
      aspect-ratio: ${$aspectRatio};
    `}
`

export function Skeleton({
  width,
  height,
  borderRadius,
  aspectRatio,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <SkeletonDiv
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      $aspectRatio={aspectRatio}
      style={style}
      {...rest}
    />
  )
}
