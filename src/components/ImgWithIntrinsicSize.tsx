/** Source: https://twitter.com/OliverJAsh/status/1087349367634317316 */

import React, { ComponentProps, CSSProperties } from "react";

type Dimensions = { width: number; height: number };

const fractionToPercentage = (n: number) => n * 100;
const formatCssPercentage = (n: number) => `${n}%`;
const fractionToCssPercentage = (n: number) =>
  formatCssPercentage(fractionToPercentage(n));

const numberToPixels = (n: number) => `${n}px`;

const getContainerStyles = ({
  width,
  height,
}: Partial<Dimensions>): CSSProperties => ({
  ...(width !== undefined ? { width: numberToPixels(width) } : {}),
  ...(height !== undefined ? { height: numberToPixels(height) } : {}),
});

/**
 * Provides a `padding-bottom` percentage in proportion to the parent element's width.
 * This allows us to reserve space for where an image will load.
 * http://andyshora.com/css-image-container-padding-hack.html
 * https://css-tricks.com/aspect-ratio-boxes/
 */
const getImgContainerStyles = (intrinsicSize: Dimensions): CSSProperties => {
  const heightAsWidth = intrinsicSize.height / intrinsicSize.width;
  const heightAsPercentageOfWidthLength = fractionToCssPercentage(
    heightAsWidth,
  );

  return {
    paddingBottom: heightAsPercentageOfWidthLength,
  };
};

type Props = ComponentProps<"img"> & {
  intrinsicSize: Dimensions;
  className?: string;
} & Partial<Dimensions>;

function ImgWithIntrinsicSize({
  intrinsicSize,
  width,
  height,
  className,
  ...imgProps
}: Props) {
  const classes = `${className} imgIntrinsic`;
  return (
    <div style={getContainerStyles({ width, height })}>
      <div
        className="imgIntrinsicContainer"
        style={getImgContainerStyles(intrinsicSize)}
      >
        <img {...imgProps} className={classes} />
      </div>
    </div>
  );
}

export default ImgWithIntrinsicSize;
