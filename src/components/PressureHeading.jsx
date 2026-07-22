import TextPressure from "./TextPressure";

/**
 * Reusable wrapper that renders a page/section title using the
 * reactbits TextPressure interactive variable-font effect.
 *
 * TextPressure fills its parent, so we give it a sized container.
 * Drop-in replacement for a big bold <h1>/<h2> hero heading.
 */
export default function PressureHeading({
  text,
  height = 90,
  minFontSize = 36,
  textColor = "#FFFFFF",
  className = "",
  ...rest
}) {
  return (
    <div
      className={`pressure-heading ${className}`}
      style={{ position: "relative", width: "100%", height }}
    >
      <TextPressure
        text={text}
        textColor={textColor}
        minFontSize={minFontSize}
        {...rest}
      />
    </div>
  );
}
